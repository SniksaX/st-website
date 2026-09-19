#!/usr/bin/env node
/* eslint-disable @typescript-eslint/no-require-imports */
const fs = require('fs')
const fsp = require('fs/promises')
const path = require('path')
const crypto = require('crypto')
const nodemailer = require('nodemailer')

const ROOT = path.join(__dirname, '..')
const DEFAULT_QUEUE_FILE = path.join(ROOT, 'data', 'mailing-list-campaigns.json')
const DERIVE_SALT = Buffer.from('sans-transition-mailing-list', 'utf8')
const SANITY_API_VERSION = '2024-01-01'
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function parseArgs(argv) {
  const args = {}
  for (let i = 0; i < argv.length; i += 1) {
    const value = argv[i]
    if (!value.startsWith('--')) continue
    const key = value.slice(2)
    const next = argv[i + 1]
    if (!next || next.startsWith('--')) {
      args[key] = true
      continue
    }
    args[key] = next
    i += 1
  }
  return args
}

function resolveFilePath(file) {
  if (!file) return null
  return path.isAbsolute(file) ? file : path.join(ROOT, file)
}

function loadEnvLocal() {
  const envFiles = [path.join(ROOT, '.env.local'), path.join(ROOT, '.env.newsletter.local')]
  for (const envFile of envFiles) {
    if (!fs.existsSync(envFile)) continue
    const lines = fs.readFileSync(envFile, 'utf8').split(/\r?\n/)
    for (const rawLine of lines) {
      const line = rawLine.trim()
      if (!line || line.startsWith('#')) continue
      const eq = line.indexOf('=')
      if (eq < 1) continue
      const key = line.slice(0, eq).trim()
      let value = line.slice(eq + 1).trim()
      if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
        value = value.slice(1, -1)
      }
      if (process.env[key] === undefined) {
        process.env[key] = value
      }
    }
  }
}

function readRequiredEnv(key) {
  const value = process.env[key] && process.env[key].trim()
  if (!value) {
    throw new Error(`Missing env: ${key}`)
  }
  return value
}

function readOptionalEnv(key) {
  return process.env[key] && process.env[key].trim() ? process.env[key].trim() : null
}

function readPort(value) {
  const n = Number(value)
  if (!Number.isFinite(n) || n <= 0) return 587
  return n
}

function readSecure(value, port) {
  if (!value) return port === 465
  return ['1', 'true', 'yes'].includes(value.toLowerCase())
}

function normalizeHostname(value) {
  return value ? value.replace(/\.$/, '').toLowerCase() : value
}

function deriveKey(secret, context) {
  return crypto.hkdfSync(
    'sha256',
    Buffer.from(secret, 'utf8'),
    DERIVE_SALT,
    Buffer.from(context, 'utf8'),
    32
  )
}

function hashValue(value, key) {
  return crypto.createHmac('sha256', key).update(value).digest('hex')
}


async function querySanity(groq) {
  const projectId = readRequiredEnv('SANITY_PROJECT_ID')
  const dataset = process.env.SANITY_DATASET?.trim() || 'production'
  const token = readRequiredEnv('SANITY_API_TOKEN')
  const url = `https://${projectId}.api.sanity.io/v${SANITY_API_VERSION}/data/query/${dataset}?query=${encodeURIComponent(groq)}`
  const res = await fetch(url, { headers: { Authorization: `Bearer ${token}` } })
  if (!res.ok) {
    const text = await res.text().catch(() => res.statusText)
    throw new Error(`Sanity query failed (${res.status}): ${text}`)
  }
  const json = await res.json()
  return json.result
}

async function mutateSanity(mutations) {
  const projectId = readRequiredEnv('SANITY_PROJECT_ID')
  const dataset = process.env.SANITY_DATASET?.trim() || 'production'
  const token = readRequiredEnv('SANITY_API_TOKEN')
  const url = `https://${projectId}.api.sanity.io/v${SANITY_API_VERSION}/data/mutate/${dataset}`
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ mutations }),
  })
  if (!res.ok) {
    const text = await res.text().catch(() => res.statusText)
    throw new Error(`Sanity mutation failed (${res.status}): ${text}`)
  }
  return res.json()
}

async function readActiveRecipients() {
  const rows = await querySanity(
    '*[_type == "mailingListSubscriber" && unsubscribedAt == null]{ email, emailHash }'
  )
  if (!Array.isArray(rows)) return []
  const seen = new Set()
  return rows.filter((item) => {
    if (!item?.email || !item?.emailHash) return false
    if (seen.has(item.emailHash)) return false
    seen.add(item.emailHash)
    return true
  })
}

async function readSubscriberStats() {
  return querySanity(
    '{ "total": count(*[_type == "mailingListSubscriber"]), "active": count(*[_type == "mailingListSubscriber" && unsubscribedAt == null]) }'
  )
}

function maskEmail(email) {
  const [local, domain] = email.split('@')
  if (!local || !domain) return '***'
  if (local.length < 3) return `${local[0]}***@${domain}`
  return `${local.slice(0, 2)}***@${domain}`
}

function readTextFromArgs(args) {
  if (args['text-file']) {
    const file = resolveFilePath(args['text-file'])
    return fs.readFileSync(file, 'utf8')
  }
  if (args.text) return String(args.text)
  throw new Error('Missing --text or --text-file')
}

function readHtmlFromArgs(args) {
  if (args['html-file']) {
    const file = resolveFilePath(args['html-file'])
    return fs.readFileSync(file, 'utf8')
  }
  if (args.html) return String(args.html)
  return null
}

function escapeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;')
}

function inlineMarkdownToHtml(text) {
  let output = escapeHtml(text)
  const htmlTokens = []

  function stashHtml(html) {
    const token = `@@HTML_${htmlTokens.length}@@`
    htmlTokens.push(html)
    return token
  }

  output = output.replace(
    /\[video:([^\]]+)\]\((https?:\/\/[^|)\s]+)\|(https?:\/\/[^\s)]+)\)/gi,
    (_m, label, imageUrl, targetUrl) => {
      const safeLabel = escapeHtml(label.trim())
      const safeImageUrl = escapeHtml(imageUrl.trim())
      const safeTargetUrl = escapeHtml(targetUrl.trim())
      return stashHtml(
        `<a class="st-video-link" href="${safeTargetUrl}"><img class="st-video-thumb" src="${safeImageUrl}" alt="${safeLabel}" width="280" /></a>`
      )
    }
  )

  output = output.replace(/!\[([^\]]*)\]\((https?:\/\/[^\s)]+)\)/g, (_m, label, url) => {
    const safeLabel = escapeHtml(label.trim())
    const safeUrl = escapeHtml(url.trim())
    return stashHtml(`<img class="st-image" src="${safeUrl}" alt="${safeLabel}" width="560" />`)
  })

  output = output.replace(/\[(?:button|btn):([^\]]+)\]\((https?:\/\/[^\s)]+)\)/gi, (_m, label, url) => {
    const safeLabel = escapeHtml(label.trim())
    const safeUrl = escapeHtml(url.trim())
    return stashHtml(
      `<a class="st-button" href="${safeUrl}" target="_blank" style="display:inline-block;padding:12px 24px;background-color:#c2569b;background-image:linear-gradient(90deg,#7c5af0 0%,#e05fb0 48%,#f97316 100%);border-radius:2px;font-family:'Space Grotesk','Helvetica Neue',Helvetica,Arial,sans-serif;font-size:11px;font-weight:600;letter-spacing:.2em;line-height:1.2;text-transform:uppercase;color:#ffffff !important;text-decoration:none !important"><span style="color:#ffffff">${safeLabel}</span></a>`,
    )
  })

  output = output.replace(/\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g, (_m, label, url) => {
    const safeLabel = escapeHtml(label.trim())
    const safeUrl = escapeHtml(url.trim())
    return stashHtml(`<a href="${safeUrl}">${safeLabel}</a>`)
  })

  output = output.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
  output = output.replace(/\*([^*]+)\*/g, '<em>$1</em>')
  output = output.replace(/`([^`]+)`/g, '<code>$1</code>')
  output = output.replace(/(^|[\s(>])(https?:\/\/[^\s<)"']*[^\s<)"'.,!?;:])/g, '$1<a href="$2">$2</a>')
  output = output.replace(/@@HTML_(\d+)@@/g, (_m, index) => htmlTokens[Number(index)] || '')

  return output
}

function markdownToHtml(markdown) {
  const lines = String(markdown || '')
    .replace(/\r\n/g, '\n')
    .replace(/\r/g, '\n')
    .split('\n')

  const html = []
  let inList = false
  let inCard = false
  let cardTitle = ''
  let cardLines = []

  function closeListIfNeeded() {
    if (inList) {
      html.push('</ul>')
      inList = false
    }
  }

  function flushCard() {
    const inner = markdownToHtml(cardLines.join('\n'))
    const title = cardTitle ? `<h3 class="st-card-title">${inlineMarkdownToHtml(cardTitle)}</h3>` : ''
    html.push(
      `<table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" class="st-card"><tr><td class="st-card-inner">${title}${inner}</td></tr></table>`
    )
    inCard = false
    cardTitle = ''
    cardLines = []
  }

  for (const rawLine of lines) {
    const line = rawLine.trim()

    if (line.toLowerCase().startsWith(':::card')) {
      closeListIfNeeded()
      if (inCard) {
        cardLines.push(rawLine)
        continue
      }
      inCard = true
      cardTitle = rawLine.replace(/^:::card\s*/i, '').trim()
      cardLines = []
      continue
    }

    if (line === ':::') {
      if (inCard) {
        flushCard()
        continue
      }
    }

    if (inCard) {
      cardLines.push(rawLine)
      continue
    }

    if (!line) {
      closeListIfNeeded()
      continue
    }

    if (line === '---') {
      closeListIfNeeded()
      html.push('<hr />')
      continue
    }

    const listMatch = line.match(/^[-*]\s+(.+)/)
    if (listMatch) {
      if (!inList) {
        html.push('<ul>')
        inList = true
      }
      html.push(`<li>${inlineMarkdownToHtml(listMatch[1])}</li>`)
      continue
    }

    closeListIfNeeded()

    if (line.startsWith('### ')) {
      html.push(`<h3>${inlineMarkdownToHtml(line.slice(4))}</h3>`)
      continue
    }

    if (line.startsWith('## ')) {
      html.push(`<h2>${inlineMarkdownToHtml(line.slice(3))}</h2>`)
      continue
    }

    if (line.startsWith('# ')) {
      html.push(`<h1>${inlineMarkdownToHtml(line.slice(2))}</h1>`)
      continue
    }

    html.push(`<p>${inlineMarkdownToHtml(line)}</p>`)
  }

  if (inList) {
    html.push('</ul>')
  }
  if (inCard) {
    flushCard()
  }

  return html.join('\n')
}

function buildHtmlFromMarkdown(markdown, subject = 'Newsletter Sans Transition') {
  const content = markdownToHtml(markdown)
  const safeSubject = escapeHtml(subject)
  return `<!doctype html>
<html lang="fr" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="color-scheme" content="dark light" />
    <meta name="supported-color-schemes" content="dark light" />
    <title>${safeSubject}</title>
    <!--[if mso]>
    <xml><o:OfficeDocumentSettings><o:PixelsPerInch>96</o:PixelsPerInch></o:OfficeDocumentSettings></xml>
    <![endif]-->
    <style type="text/css">
      body{margin:0!important;padding:0!important;width:100%!important;background-color:#08080e;color:#f0ede8}
      table{border-collapse:collapse} img{border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic}
      a{color:#e6a06a} a:hover{color:#f0ede8}
      .st-content{font-family:'Space Grotesk','Helvetica Neue',Helvetica,Arial,sans-serif;font-size:15px;line-height:1.65;color:#cfcad4}
      .st-content h1{margin:0 0 18px;font-size:32px;line-height:1.18;font-weight:700;letter-spacing:-.03em;color:#f0ede8}
      .st-content h2{margin:34px 0 12px;font-size:22px;line-height:1.28;font-weight:700;letter-spacing:-.025em;color:#f0ede8}
      .st-content h3{margin:26px 0 8px;font-size:12px;line-height:1.4;font-weight:500;letter-spacing:.18em;text-transform:uppercase;color:#8f8b9c}
      .st-content p{margin:0 0 18px;font-size:15px;line-height:1.65;color:#cfcad4}
      .st-content ul{margin:0 0 18px;padding-left:22px}
      .st-content li{margin:0 0 8px;font-size:15px;line-height:1.6;color:#cfcad4}
      .st-content a{color:#e6a06a;text-decoration:underline;text-underline-offset:3px}
      .st-content strong{color:#f0ede8;font-weight:600}.st-content em{color:#d8d4de}
      .st-content hr{height:1px;border:0;background-color:#1c1c2c;margin:32px 0}
      .st-card{margin:0 0 20px;background-color:#0d0d18;border:1px solid #1c1c2c;border-radius:3px}
      .st-card-inner{padding:22px 24px}.st-card-title{display:block;margin:0 0 10px!important;font-size:17px!important;line-height:1.3!important;font-weight:700!important;letter-spacing:-.02em!important;color:#f0ede8!important;text-transform:none!important}
      .st-video-link{display:block;width:280px;max-width:100%;margin:0 auto 18px;text-decoration:none!important}.st-video-thumb{display:block;width:280px;max-width:100%;height:auto;margin:0 auto;border:0;border-radius:2px}.st-image{display:block;width:560px;max-width:100%;height:auto;margin:0 auto 18px;border:0;border-radius:2px}
      .st-button{display:inline-block;padding:12px 24px;background-color:#c2569b;background-image:linear-gradient(90deg,#7c5af0 0%,#e05fb0 48%,#f97316 100%);border-radius:2px;font-family:'Space Grotesk','Helvetica Neue',Helvetica,Arial,sans-serif;font-size:11px;font-weight:600;letter-spacing:.2em;line-height:1.2;text-transform:uppercase;color:#fff!important;text-decoration:none!important}
      code{font-family:Consolas,Monaco,monospace;background:#121220;border:1px solid #282840;padding:1px 5px;border-radius:2px}
      @media only screen and (max-width:700px){.st-wrap{width:100%!important}.st-pad{padding-left:20px!important;padding-right:20px!important}.st-content h1{font-size:27px!important}.st-content h2{font-size:20px!important}.st-logo{width:150px!important}.st-card-inner{padding:18px!important}.st-meta{font-size:9px!important;letter-spacing:.18em!important}}
    </style>
  </head>
  <body style="margin:0;padding:0;background-color:#08080e">
    <div style="display:none;max-height:0;overflow:hidden;mso-hide:all;font-size:1px;line-height:1px;color:#08080e">Sans Transition — ${safeSubject}</div>
    <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="background-color:#08080e">
      <tr><td align="center" style="padding:24px 12px 40px">
        <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="680" class="st-wrap" style="width:680px;max-width:680px;background-color:#08080e;border:1px solid #1c1c2c;border-radius:3px">
          <tr><td class="st-pad" style="padding:22px 32px;border-bottom:1px solid #1c1c2c">
            <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%"><tr>
              <td align="left" valign="middle"><a href="https://sanstransition.fr" style="text-decoration:none"><img class="st-logo" src="https://sanstransition.fr/logo-flat.png" width="170" alt="Sans Transition" style="display:block;width:170px;max-width:100%;height:auto;border:0" /></a></td>
              <td align="right" valign="middle" class="st-meta" style="font-family:'Space Grotesk','Helvetica Neue',Helvetica,Arial,sans-serif;font-size:10px;font-weight:400;text-transform:uppercase;letter-spacing:.24em;color:#8f8b9c;line-height:1.5">La newsletter</td>
            </tr></table>
          </td></tr>
          <tr><td height="3" bgcolor="#c2569b" style="height:3px;line-height:3px;font-size:0;background-color:#c2569b;background-image:linear-gradient(90deg,#7c5af0 0%,#e05fb0 48%,#f97316 100%)">&nbsp;</td></tr>
          <tr><td class="st-pad st-content" style="padding:38px 32px 16px;font-family:'Space Grotesk','Helvetica Neue',Helvetica,Arial,sans-serif;font-size:15px;line-height:1.65;color:#cfcad4;mso-line-height-rule:exactly">
${content}
          </td></tr>
          <tr><td class="st-pad" style="padding:26px 32px 30px;border-top:1px solid #1c1c2c">
            <p style="margin:0 0 14px;font-family:'Space Grotesk','Helvetica Neue',Helvetica,Arial,sans-serif;font-size:11px;line-height:1.6;letter-spacing:.04em;color:#8f8b9c">
              <a href="https://www.tiktok.com/@sanstransition" style="color:#a8a4b0;text-decoration:none">TikTok</a>&nbsp;·&nbsp;
              <a href="https://www.instagram.com/sanstransition__" style="color:#a8a4b0;text-decoration:none">Instagram</a>&nbsp;·&nbsp;
              <a href="https://www.youtube.com/@SansTransitionMedia" style="color:#a8a4b0;text-decoration:none">YouTube</a>&nbsp;·&nbsp;
              <a href="https://sanstransition.fr" style="color:#a8a4b0;text-decoration:none">sanstransition.fr</a>
            </p>
            <p style="margin:0;font-family:'Space Grotesk','Helvetica Neue',Helvetica,Arial,sans-serif;font-size:11px;line-height:1.7;color:#8f8b9c">Sans Transition — association loi 1901, Paris, France.</p>
          </td></tr>
        </table>
      </td></tr>
    </table>
  </body>
</html>`
}

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

function renderTemplate(input, variables) {
  let output = input
  for (const [key, value] of Object.entries(variables)) {
    const pattern = new RegExp(`{{\\s*${escapeRegExp(key)}\\s*}}`, 'g')
    output = output.replace(pattern, String(value))
  }
  return output
}

function createUnsubscribeToken(emailHash) {
  const secret = readRequiredEnv('MAILING_LIST_SECRET_KEY')
  const key = deriveKey(secret, 'unsubscribe:v1')
  const normalizedHash = emailHash.toLowerCase()
  const signature = hashValue(normalizedHash, key)
  return `${normalizedHash}.${signature}`
}

function buildSubscribeUrl(email) {
  const secret = readRequiredEnv('MAILING_LIST_SECRET_KEY')
  const key = deriveKey(secret, 'invite:v1')
  const payload = Buffer.from(String(email).trim().toLowerCase(), 'utf8').toString('base64url')
  const exp = Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 90
  const signature = hashValue(`${payload}.${exp}`, key)
  const baseUrl = readRequiredEnv('MAILING_LIST_PUBLIC_BASE_URL').replace(/\/+$/, '')
  return `${baseUrl}/api/mailing-list/join?token=${encodeURIComponent(`${payload}.${exp}.${signature}`)}`
}

function buildUnsubscribeUrl(emailHash) {
  const baseUrl = readRequiredEnv('MAILING_LIST_PUBLIC_BASE_URL').replace(/\/+$/, '')
  const token = createUnsubscribeToken(emailHash)
  return `${baseUrl}/api/mailing-list/unsubscribe?token=${encodeURIComponent(token)}`
}

function buildTransporter() {
  const host = normalizeHostname(readRequiredEnv('ZIMBRA_SMTP_HOST'))
  const user = readRequiredEnv('ZIMBRA_SMTP_USER')
  const pass = readRequiredEnv('ZIMBRA_SMTP_PASS')
  const port = readPort(readOptionalEnv('ZIMBRA_SMTP_PORT') || '587')
  const secure = readSecure(readOptionalEnv('ZIMBRA_SMTP_SECURE'), port)
  const tlsServername = normalizeHostname(readOptionalEnv('ZIMBRA_SMTP_TLS_SERVERNAME')) || host

  return nodemailer.createTransport({
    host,
    port,
    secure,
    auth: { user, pass },
    tls: { servername: tlsServername },
  })
}

function buildCampaignFromArgs(args) {
  const subject = args.subject ? String(args.subject) : null
  if (!subject) {
    throw new Error('Missing --subject')
  }

  return {
    id: null,
    subject,
    text: readTextFromArgs(args),
    html: readHtmlFromArgs(args),
  }
}

function buildCampaignFromQueueItem(item, index) {
  const subject = typeof item?.subject === 'string' ? item.subject.trim() : ''
  if (!subject) {
    throw new Error(`Campaign #${index + 1} is missing "subject".`)
  }

  let text = typeof item?.text === 'string' ? item.text : null
  if (!text && typeof item?.textFile === 'string') {
    text = fs.readFileSync(resolveFilePath(item.textFile), 'utf8')
  }
  if (!text) {
    throw new Error(`Campaign "${item?.id || index + 1}" needs "text" or "textFile".`)
  }

  let html = typeof item?.html === 'string' ? item.html : null
  if (!html && typeof item?.htmlFile === 'string') {
    html = fs.readFileSync(resolveFilePath(item.htmlFile), 'utf8')
  }

  return {
    id: typeof item?.id === 'string' ? item.id : null,
    subject,
    text,
    html,
  }
}

function readRecipientsFile(fileArg) {
  const file = resolveFilePath(String(fileArg))
  const raw = fs.readFileSync(file, 'utf8')
  const seen = new Set()
  const emails = []
  for (const line of raw.split(/\r?\n/)) {
    for (const cell of line.split(/[;,\t]/)) {
      const email = cell.replace(/^\uFEFF/, '').replace(/"/g, '').trim().toLowerCase()
      if (!EMAIL_REGEX.test(email) || seen.has(email)) continue
      seen.add(email)
      emails.push(email)
    }
  }
  return emails
}

function readSentLog(logFile) {
  if (!fs.existsSync(logFile)) return new Set()
  return new Set(
    fs.readFileSync(logFile, 'utf8').split(/\r?\n/).map((l) => l.trim().toLowerCase()).filter(Boolean),
  )
}

async function sendCampaign(campaign, options = {}) {
  const from = readRequiredEnv('MAILING_LIST_FROM')
  const replyTo = readOptionalEnv('MAILING_LIST_REPLY_TO') || from
  const limit = options.limit && Number(options.limit) > 0 ? Number(options.limit) : 0
  const dryRun = Boolean(options.dryRun)
  const testTo = options.testTo ? String(options.testTo).trim().toLowerCase() : null

  if (testTo && !EMAIL_REGEX.test(testTo)) {
    throw new Error('Invalid --test-to email address')
  }

  const recipientsFile = options.recipientsFile || null
  const delayMs = options.delayMs && Number(options.delayMs) > 0 ? Number(options.delayMs) : 0
  let sentLogFile = null
  let externalList = false

  if (recipientsFile && /{{\s*unsubscribe_url\s*}}/.test(campaign.text + (campaign.html || ''))) {
    throw new Error('--recipients-file: ces personnes ne sont pas abonnees, retire {{unsubscribe_url}} du texte.')
  }

  let recipients
  if (testTo) {
    recipients = [{ email: testTo, emailHash: null }]
    console.log(`Test mode: the campaign can only be sent to ${maskEmail(testTo)}.`)
  } else if (recipientsFile) {
    externalList = true
    const fileEmails = readRecipientsFile(recipientsFile)
    let subscribed = new Set()
    try {
      subscribed = new Set((await readActiveRecipients()).map((r) => String(r.email).toLowerCase()))
    } catch (error) {
      console.warn('Impossible de lire les abonnes actuels, aucun filtrage:', error instanceof Error ? error.message : error)
    }
    sentLogFile = resolveFilePath(String(recipientsFile)) + '.sent.log'
    const alreadySent = readSentLog(sentLogFile)
    const skippedSubscribed = fileEmails.filter((e) => subscribed.has(e)).length
    const skippedSent = fileEmails.filter((e) => !subscribed.has(e) && alreadySent.has(e)).length
    if (options.includeSubscribed) subscribed = new Set()
    let pending = fileEmails.filter((e) => !subscribed.has(e) && !alreadySent.has(e))
    if (limit > 0) pending = pending.slice(0, limit)
    recipients = pending.map((email) => ({ email, emailHash: null }))
    console.log(
      `Fichier: ${fileEmails.length} adresses. Deja abonnees (ignorees): ${skippedSubscribed}. Deja envoyees (ignorees): ${skippedSent}. A envoyer: ${recipients.length}.`,
    )
  } else {
    const allRecipients = await readActiveRecipients()
    recipients = limit > 0 ? allRecipients.slice(0, limit) : allRecipients
  }

  if (!recipients.length) {
    return { dryRun, total: 0, success: 0, failed: 0 }
  }

  if (dryRun) {
    console.log(`[Dry run] Ready to send "${campaign.subject}" to ${recipients.length} recipients.`)
    console.log('Sample:', recipients.slice(0, 5).map((item) => maskEmail(item.email)).join(', '))
    return { dryRun, total: recipients.length, success: 0, failed: 0 }
  }

  const transporter = buildTransporter()
  let success = 0
  let failed = 0

  for (const recipient of recipients) {
    const unsubscribeUrl = testTo || externalList
      ? `${readRequiredEnv('MAILING_LIST_PUBLIC_BASE_URL').replace(/\/+$/, '')}/api/mailing-list/unsubscribe?token=APERCU`
      : buildUnsubscribeUrl(recipient.emailHash)
    const vars = { unsubscribe_url: unsubscribeUrl, subscribe_url: buildSubscribeUrl(recipient.email) }
    const text = renderTemplate(campaign.text, vars)
    const html = campaign.html
      ? renderTemplate(campaign.html, vars)
      : buildHtmlFromMarkdown(text, campaign.subject)

    try {
      await transporter.sendMail({
        from,
        to: recipient.email,
        replyTo,
        subject: testTo ? `[TEST] ${campaign.subject}` : campaign.subject,
        text,
        html,
      })
      success += 1
      if (sentLogFile) fs.appendFileSync(sentLogFile, recipient.email + '\n')
      if (externalList) console.log(`[${success + failed}/${recipients.length}] OK ${maskEmail(recipient.email)}`)
    } catch (error) {
      failed += 1
      const message = error instanceof Error ? error.message : 'Unknown SMTP error'
      console.error(`Failed: ${maskEmail(recipient.email)} -> ${message}`)
    }
    if (delayMs) await new Promise((resolve) => setTimeout(resolve, delayMs))
  }

  return { dryRun, total: recipients.length, success, failed }
}

async function runStats() {
  const { total, active } = await readSubscriberStats()
  const inactive = total - active
  console.log(`Subscribers total: ${total}`)
  console.log(`Subscribers active: ${active}`)
  console.log(`Subscribers unsubscribed: ${inactive}`)
}

async function runSmtpCheck() {
  const transporter = buildTransporter()
  try {
    await transporter.verify()
    console.log('SMTP connection and authentication: OK')
  } finally {
    transporter.close()
  }
}

async function runResetSubscribers(args) {
  if (args.confirm !== 'DELETE-TEST-SUBSCRIBERS') {
    throw new Error('Refusing reset: pass --confirm DELETE-TEST-SUBSCRIBERS')
  }

  const ids = await querySanity('*[_type == "mailingListSubscriber"]._id')
  if (!Array.isArray(ids) || ids.length === 0) {
    console.log('No mailing-list subscribers to delete.')
    return
  }

  await mutateSanity(ids.map((id) => ({ delete: { id } })))
  console.log(`Deleted ${ids.length} mailing-list subscriber documents.`)
}

async function runVerifyProductionKey(args) {
  const email = args.email ? String(args.email).trim().toLowerCase() : ''
  if (!EMAIL_REGEX.test(email)) {
    throw new Error('Pass a valid --email address')
  }

  const rows = await querySanity(
    `*[_type == "mailingListSubscriber" && email == ${JSON.stringify(email)}][0]{ emailHash }`
  )
  if (!rows?.emailHash) {
    throw new Error('Subscriber not found in Sanity')
  }

  const secret = readRequiredEnv('MAILING_LIST_SECRET_KEY')
  const localHash = hashValue(email, deriveKey(secret, 'hash:v1'))
  if (localHash !== rows.emailHash) {
    throw new Error('Production and local MAILING_LIST_SECRET_KEY values do not match')
  }
  console.log('Production and local MAILING_LIST_SECRET_KEY values match.')
}

function runInitSecret() {
  const envFile = path.join(ROOT, '.env.newsletter.local')
  if (!fs.existsSync(envFile)) {
    throw new Error('Missing .env.newsletter.local')
  }

  const current = fs.readFileSync(envFile, 'utf8')
  const match = current.match(/^MAILING_LIST_SECRET_KEY=(.*)$/m)
  if (!match) {
    throw new Error('Missing MAILING_LIST_SECRET_KEY entry in .env.newsletter.local')
  }
  if (match[1].trim()) {
    console.log('MAILING_LIST_SECRET_KEY is already configured; nothing changed.')
    return
  }

  const secret = crypto.randomBytes(48).toString('base64url')
  const updated = current.replace(/^MAILING_LIST_SECRET_KEY=.*$/m, `MAILING_LIST_SECRET_KEY=${secret}`)
  fs.writeFileSync(envFile, updated, { encoding: 'utf8', mode: 0o600 })
  console.log('A new MAILING_LIST_SECRET_KEY was generated locally.')
}

async function runExport(args) {
  const recipients = await readActiveRecipients()
  const emails = recipients.map((item) => item.email)
  const outRel = args.out || 'data/mailing-list-emails.csv'
  const outFile = resolveFilePath(outRel)
  await fsp.mkdir(path.dirname(outFile), { recursive: true })
  await fsp.writeFile(outFile, `email\n${emails.join('\n')}\n`, { encoding: 'utf8', mode: 0o600 })
  console.log(`Exported ${emails.length} emails -> ${outFile}`)
}

async function runSend(args) {
  const campaign = buildCampaignFromArgs(args)
  const result = await sendCampaign(campaign, {
    dryRun: Boolean(args['dry-run']),
    limit: args.limit ? Number(args.limit) : 0,
    testTo: args['test-to'] || null,
    recipientsFile: args['recipients-file'] || null,
    delayMs: args['delay-ms'] ? Number(args['delay-ms']) : 0,
    includeSubscribed: Boolean(args['include-subscribed']),
  })
  console.log(`Campaign done. Sent: ${result.success}. Failed: ${result.failed}. Total: ${result.total}.`)
}

function embedLocalPublicImages(html) {
  const publicRoot = path.join(ROOT, 'public')
  return html.replace(/src="https:\/\/sanstransition\.fr\/([^"?#]+)(?:[?#][^"]*)?"/g, (match, relativeUrl) => {
    try {
      const relativePath = decodeURIComponent(relativeUrl).replaceAll('/', path.sep)
      const file = path.resolve(publicRoot, relativePath)
      if (!file.startsWith(`${publicRoot}${path.sep}`) || !fs.existsSync(file)) return match

      const mimeTypes = {
        '.gif': 'image/gif',
        '.jpeg': 'image/jpeg',
        '.jpg': 'image/jpeg',
        '.png': 'image/png',
        '.webp': 'image/webp',
      }
      const mime = mimeTypes[path.extname(file).toLowerCase()]
      if (!mime) return match
      return `src="data:${mime};base64,${fs.readFileSync(file).toString('base64')}"`
    } catch {
      return match
    }
  })
}

async function runPreview(args) {
  const campaign = buildCampaignFromArgs(args)
  const unsubscribeUrl =
    'https://sanstransition.fr/api/mailing-list/unsubscribe?token=APERCU'
  const previewVars = { unsubscribe_url: unsubscribeUrl, subscribe_url: 'https://sanstransition.fr/api/mailing-list/join?token=APERCU' }
  const text = renderTemplate(campaign.text, previewVars)
  const html = campaign.html
    ? renderTemplate(campaign.html, previewVars)
    : buildHtmlFromMarkdown(text, campaign.subject)
  const previewHtml = embedLocalPublicImages(html)
  const outFile = resolveFilePath(args.out || 'data/campaigns/newsletter-preview.html')

  await fsp.mkdir(path.dirname(outFile), { recursive: true })
  await fsp.writeFile(outFile, previewHtml, 'utf8')
  console.log(`Preview written: ${outFile}`)
}

async function readCampaignQueue(queueFile) {
  const raw = await fsp.readFile(queueFile, 'utf8')
  const parsed = JSON.parse(raw)
  if (!Array.isArray(parsed?.campaigns)) {
    throw new Error(`Invalid queue format in ${queueFile}`)
  }
  return parsed
}

async function writeCampaignQueue(queueFile, queue) {
  await fsp.mkdir(path.dirname(queueFile), { recursive: true })
  await fsp.writeFile(queueFile, `${JSON.stringify(queue, null, 2)}\n`, {
    encoding: 'utf8',
    mode: 0o600,
  })
}

function isDueCampaign(item, now) {
  if (!item || typeof item !== 'object') return false
  if (item.disabled) return false
  if (item.status === 'sent') return false
  if (item.sentAt) return false
  if (typeof item.sendAt !== 'string') return false
  const sendAtMs = Date.parse(item.sendAt)
  if (Number.isNaN(sendAtMs)) return false
  return sendAtMs <= now.getTime()
}

async function runSendScheduled(args) {
  const queueFile = resolveFilePath(args.queue) || DEFAULT_QUEUE_FILE
  const dryRun = Boolean(args['dry-run'])
  const campaignLimit = args['campaign-limit'] ? Math.max(Number(args['campaign-limit']) || 0, 0) : 0
  const recipientLimit = args.limit ? Math.max(Number(args.limit) || 0, 0) : 0
  const now = new Date()

  const queue = await readCampaignQueue(queueFile)
  const due = queue.campaigns
    .map((item, index) => ({ item, index }))
    .filter(({ item }) => isDueCampaign(item, now))
    .sort((a, b) => Date.parse(a.item.sendAt) - Date.parse(b.item.sendAt))

  if (!due.length) {
    console.log('No due campaigns.')
    return
  }

  let processed = 0
  for (const entry of due) {
    if (campaignLimit > 0 && processed >= campaignLimit) break
    const { item, index } = entry

    console.log(`Running campaign: ${item.id || `#${index + 1}`} (${item.subject || 'no-subject'})`)

    try {
      const campaign = buildCampaignFromQueueItem(item, index)
      const result = await sendCampaign(campaign, { dryRun, limit: recipientLimit })

      if (!dryRun) {
        item.lastRunAt = new Date().toISOString()
        item.sentCount = result.success
        item.failedCount = result.failed
        item.status = result.failed > 0 ? 'failed' : 'sent'
        item.lastError = result.failed > 0 ? `Failed recipients: ${result.failed}` : null
        if (item.status === 'sent') {
          item.sentAt = new Date().toISOString()
        }
        await writeCampaignQueue(queueFile, queue)
      }

      console.log(`Done: sent=${result.success}, failed=${result.failed}, total=${result.total}`)
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error)
      console.error(`Campaign error: ${message}`)

      if (!dryRun) {
        item.lastRunAt = new Date().toISOString()
        item.status = 'failed'
        item.lastError = message
        await writeCampaignQueue(queueFile, queue)
      }
    }

    processed += 1
  }
}

function printHelp() {
  console.log('Usage:')
  console.log('  node scripts/mailing-list.js smtp-check')
  console.log('  node scripts/mailing-list.js init-secret')
  console.log('  node scripts/mailing-list.js verify-production-key --email address@example.com')
  console.log('  node scripts/mailing-list.js reset-test-subscribers --confirm DELETE-TEST-SUBSCRIBERS')
  console.log('  node scripts/mailing-list.js stats')
  console.log('  node scripts/mailing-list.js export [--out data/mailing-list-emails.csv]')
  console.log('  node scripts/mailing-list.js preview --subject "..." (--text "..." | --text-file file.txt) [--html-file file.html] [--out preview.html]')
  console.log('  node scripts/mailing-list.js send --subject "..." (--text "..." | --text-file file.txt) [--html-file file.html] [--test-to email] [--limit 50] [--dry-run] [--recipients-file liste.csv] [--delay-ms 20000] [--include-subscribed]')
  console.log('  node scripts/mailing-list.js send-scheduled [--queue data/mailing-list-campaigns.json] [--campaign-limit 1] [--limit 50] [--dry-run]')
}

async function main() {
  loadEnvLocal()
  const [command, ...rest] = process.argv.slice(2)
  const args = parseArgs(rest)

  if (!command || command === 'help' || command === '--help') {
    printHelp()
    return
  }

  if (command === 'stats') {
    await runStats()
    return
  }

  if (command === 'smtp-check') {
    await runSmtpCheck()
    return
  }

  if (command === 'init-secret') {
    runInitSecret()
    return
  }

  if (command === 'verify-production-key') {
    await runVerifyProductionKey(args)
    return
  }

  if (command === 'reset-test-subscribers') {
    await runResetSubscribers(args)
    return
  }

  if (command === 'export') {
    await runExport(args)
    return
  }

  if (command === 'preview') {
    await runPreview(args)
    return
  }

  if (command === 'send') {
    await runSend(args)
    return
  }

  if (command === 'send-scheduled') {
    await runSendScheduled(args)
    return
  }

  throw new Error(`Unknown command: ${command}`)
}

main().catch((error) => {
  const message = error instanceof Error ? error.message : String(error)
  console.error(message)
  process.exitCode = 1
})
