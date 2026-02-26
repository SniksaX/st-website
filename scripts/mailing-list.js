#!/usr/bin/env node
/* eslint-disable @typescript-eslint/no-require-imports */
const fs = require('fs')
const fsp = require('fs/promises')
const path = require('path')
const crypto = require('crypto')
const nodemailer = require('nodemailer')

const ROOT = path.join(__dirname, '..')
const STORE_FILE = path.join(ROOT, 'data', 'mailing-list-subscribers.json')
const DEFAULT_QUEUE_FILE = path.join(ROOT, 'data', 'mailing-list-campaigns.json')
const DERIVE_SALT = Buffer.from('sans-transition-mailing-list', 'utf8')

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
  const envFile = path.join(ROOT, '.env.local')
  if (!fs.existsSync(envFile)) return
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

function decryptValue(payload, key) {
  const [ivB64, tagB64, encryptedB64] = String(payload).split(':')
  if (!ivB64 || !tagB64 || !encryptedB64) {
    throw new Error('Invalid encrypted payload format.')
  }

  const iv = Buffer.from(ivB64, 'base64')
  const tag = Buffer.from(tagB64, 'base64')
  const encrypted = Buffer.from(encryptedB64, 'base64')

  const decipher = crypto.createDecipheriv('aes-256-gcm', key, iv)
  decipher.setAuthTag(tag)
  const clear = Buffer.concat([decipher.update(encrypted), decipher.final()])
  return clear.toString('utf8')
}

async function readSubscribers() {
  const raw = await fsp.readFile(STORE_FILE, 'utf8')
  const parsed = JSON.parse(raw)
  return Array.isArray(parsed?.subscribers) ? parsed.subscribers : []
}

async function readActiveRecipients() {
  const secret = readRequiredEnv('MAILING_LIST_SECRET_KEY')
  if (secret.length < 24) {
    throw new Error('MAILING_LIST_SECRET_KEY is too short (min 24 chars).')
  }
  const encryptionKey = deriveKey(secret, 'encryption:v1')

  const subscribers = await readSubscribers()
  const recipients = []
  const seen = new Set()
  for (const item of subscribers) {
    if (!item || item.unsubscribedAt) continue
    if (!item.emailEncrypted) continue
    if (!/^[a-f0-9]{64}$/i.test(String(item.emailHash || ''))) continue
    const email = decryptValue(item.emailEncrypted, encryptionKey).trim().toLowerCase()
    const emailHash = String(item.emailHash).toLowerCase()
    if (!email || seen.has(emailHash)) continue
    seen.add(emailHash)
    recipients.push({ email, emailHash })
  }
  return recipients
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

  output = output.replace(/\[(?:button|btn):([^\]]+)\]\((https?:\/\/[^\s)]+)\)/gi, (_m, label, url) => {
    const safeLabel = escapeHtml(label.trim())
    const safeUrl = escapeHtml(url.trim())
    return stashHtml(`<a class="st-button" href="${safeUrl}">${safeLabel}</a>`)
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
    html.push(`<section class="st-card">${title}${inner}</section>`)
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

function buildHtmlFromMarkdown(markdown) {
  const content = markdownToHtml(markdown)
  return `<!doctype html>
<html lang="fr">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Newsletter Sans Transition</title>
    <style>
      body{margin:0;padding:0;background:#0a0a11;color:#f6f7fb;font-family:Segoe UI,Arial,sans-serif}
      .wrap{padding:24px 10px;background:radial-gradient(circle at 10% 0%,#3f1f73 0%,#0a0a11 48%)}
      .card{max-width:640px;margin:0 auto;background:#141421;border:1px solid #2f3040;border-radius:18px;overflow:hidden}
      .top{padding:11px 16px;background:linear-gradient(90deg,#8c52ff 0%,#ff5aa8 45%,#ff914d 100%);font-size:11px;font-weight:800;letter-spacing:.16em;color:#12131f;text-align:center}
      .content{padding:24px 20px}
      h1,h2,h3{margin:0 0 12px;color:#fff;line-height:1.25}
      h1{font-size:28px} h2{font-size:22px} h3{font-size:18px}
      p{margin:0 0 12px;color:#ced2ea;line-height:1.65;font-size:15px}
      ul{margin:0 0 12px;padding-left:20px}
      li{margin:0 0 8px;color:#ced2ea;line-height:1.6;font-size:15px}
      a{color:#b8beff}
      .st-button{display:inline-block;background:linear-gradient(90deg,#8c52ff 0%,#ff5aa8 45%,#ff914d 100%);color:#11121b !important;text-decoration:none;font-weight:800;border-radius:999px;padding:10px 15px}
      .st-card{margin:0 0 14px;padding:14px;border:1px solid #343752;border-radius:14px;background:#1a1c2b}
      .st-card-title{margin:0 0 10px;color:#ffffff;font-size:18px;line-height:1.3}
      code{font-family:Consolas,Monaco,monospace;background:#1f2030;border:1px solid #343752;padding:1px 5px;border-radius:6px}
      hr{border:none;border-top:1px solid #303246;margin:16px 0}
    </style>
  </head>
  <body>
    <div class="wrap">
      <div class="card">
        <div class="top">SANS TRANSITION</div>
        <div class="content">
${content}
        </div>
      </div>
    </div>
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

async function sendCampaign(campaign, options = {}) {
  const from = readRequiredEnv('MAILING_LIST_FROM')
  const replyTo = readOptionalEnv('MAILING_LIST_REPLY_TO') || from
  const limit = options.limit && Number(options.limit) > 0 ? Number(options.limit) : 0
  const dryRun = Boolean(options.dryRun)

  const allRecipients = await readActiveRecipients()
  const recipients = limit > 0 ? allRecipients.slice(0, limit) : allRecipients

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
    const unsubscribeUrl = buildUnsubscribeUrl(recipient.emailHash)
    const text = renderTemplate(campaign.text, { unsubscribe_url: unsubscribeUrl })
    const html = campaign.html
      ? renderTemplate(campaign.html, { unsubscribe_url: unsubscribeUrl })
      : buildHtmlFromMarkdown(text)

    try {
      await transporter.sendMail({
        from,
        to: recipient.email,
        replyTo,
        subject: campaign.subject,
        text,
        html,
      })
      success += 1
    } catch (error) {
      failed += 1
      const message = error instanceof Error ? error.message : 'Unknown SMTP error'
      console.error(`Failed: ${maskEmail(recipient.email)} -> ${message}`)
    }
  }

  return { dryRun, total: recipients.length, success, failed }
}

async function runStats() {
  const subscribers = await readSubscribers()
  const total = subscribers.length
  const active = subscribers.filter((x) => !x.unsubscribedAt).length
  const inactive = total - active
  console.log(`Subscribers total: ${total}`)
  console.log(`Subscribers active: ${active}`)
  console.log(`Subscribers unsubscribed: ${inactive}`)
}

async function runExport(args) {
  const emails = (await readActiveRecipients()).map((item) => item.email)
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
  })
  console.log(`Campaign done. Sent: ${result.success}. Failed: ${result.failed}. Total: ${result.total}.`)
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
  console.log('  node scripts/mailing-list.js stats')
  console.log('  node scripts/mailing-list.js export [--out data/mailing-list-emails.csv]')
  console.log('  node scripts/mailing-list.js send --subject "..." (--text "..." | --text-file file.txt) [--html-file file.html] [--limit 50] [--dry-run]')
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

  if (!fs.existsSync(STORE_FILE)) {
    throw new Error(`Store file not found: ${STORE_FILE}`)
  }

  if (command === 'stats') {
    await runStats()
    return
  }

  if (command === 'export') {
    await runExport(args)
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
