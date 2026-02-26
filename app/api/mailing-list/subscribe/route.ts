import { NextResponse } from 'next/server'
import nodemailer from 'nodemailer'
import { createUnsubscribeToken, upsertMailingListSubscriber } from '@/lib/mailingListStore'

export const runtime = 'nodejs'

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function readEmail(value: unknown) {
  if (typeof value !== 'string') return ''
  return value.trim().toLowerCase()
}

function readRequiredEnv(key: string) {
  const value = process.env[key]?.trim()
  return value ? value : null
}

function readOptionalEnv(key: string) {
  return process.env[key]?.trim() || null
}

function normalizeHostname(value: string | null) {
  if (!value) return null
  return value.replace(/\.$/, '').toLowerCase()
}

function readPort(value: string | null) {
  if (!value) return 587
  const parsed = Number(value)
  if (!Number.isFinite(parsed) || parsed <= 0) return 587
  return parsed
}

function readSecure(value: string | null, port: number) {
  if (!value) return port === 465
  return ['1', 'true', 'yes'].includes(value.toLowerCase())
}

function readPublicBaseUrl() {
  const url = readOptionalEnv('MAILING_LIST_PUBLIC_BASE_URL')
  if (!url) return null
  return url.replace(/\/+$/, '')
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as { email?: unknown }
    const email = readEmail(body.email)

    if (!email || !EMAIL_REGEX.test(email)) {
      return NextResponse.json({ error: 'Adresse email invalide.' }, { status: 400 })
    }

    const host = normalizeHostname(readRequiredEnv('ZIMBRA_SMTP_HOST'))
    const user = readRequiredEnv('ZIMBRA_SMTP_USER')
    const pass = readRequiredEnv('ZIMBRA_SMTP_PASS')
    const to = readRequiredEnv('MAILING_LIST_TO')
    const from = readRequiredEnv('MAILING_LIST_FROM') ?? user
    const replyTo = readOptionalEnv('MAILING_LIST_REPLY_TO') ?? to
    const confirmSubject =
      readOptionalEnv('MAILING_LIST_CONFIRM_SUBJECT') ?? 'Inscription newsletter confirmee'
    const tlsServername = normalizeHostname(readOptionalEnv('ZIMBRA_SMTP_TLS_SERVERNAME')) ?? host
    const publicBaseUrl = readPublicBaseUrl()
    const port = readPort(readRequiredEnv('ZIMBRA_SMTP_PORT'))
    const secure = readSecure(readRequiredEnv('ZIMBRA_SMTP_SECURE'), port)

    if (!host || !user || !pass || !to || !from) {
      return NextResponse.json(
        { error: 'Variables SMTP/Zimbra manquantes.' },
        { status: 500 }
      )
    }

    const forwardedFor = request.headers.get("x-forwarded-for")?.split(',')[0]?.trim() ?? 'unknown'
    const userAgent = request.headers.get('user-agent') ?? 'unknown'
    const storageResult = await upsertMailingListSubscriber({
      email,
      source: '/00',
      ip: forwardedFor === 'unknown' ? null : forwardedFor,
      userAgent: userAgent === 'unknown' ? null : userAgent,
    })

    if (storageResult.status === 'existing') {
      return NextResponse.json({ ok: true, alreadySubscribed: true }, { status: 200 })
    }

    const transporter = nodemailer.createTransport({
      host,
      port,
      secure,
      auth: { user, pass },
      tls: {
        servername: tlsServername ?? undefined,
      },
    })

    const isReactivated = storageResult.status === 'reactivated'
    const subscribedAt = new Date().toISOString()
    const unsubscribeToken = createUnsubscribeToken(storageResult.emailHash)
    const unsubscribeUrl = publicBaseUrl
      ? `${publicBaseUrl}/api/mailing-list/unsubscribe?token=${encodeURIComponent(unsubscribeToken)}`
      : null

    await Promise.all([
      transporter.sendMail({
        from,
        to,
        replyTo,
        subject: isReactivated
          ? `[Newsletter] Reinscription: ${email}`
          : `[Newsletter] Nouvelle inscription: ${email}`,
        text: [
          isReactivated ? 'Reinscription newsletter' : 'Nouvelle inscription newsletter',
          `Email: ${email}`,
          `Source: /00`,
          `Date: ${subscribedAt}`,
          `IP: ${forwardedFor}`,
          `User-Agent: ${userAgent}`,
          unsubscribeUrl ? `Desinscription: ${unsubscribeUrl}` : null,
        ].join('\n'),
      }),
      transporter.sendMail({
        from,
        to: email,
        replyTo,
        subject: isReactivated ? `Re: ${confirmSubject}` : confirmSubject,
        text: [
          'Bonjour,',
          '',
          "Ton inscription a la newsletter Sans Transition est bien enregistree.",
          '',
          unsubscribeUrl
            ? `Pour te desinscrire: ${unsubscribeUrl}`
            : "Si ce n'etait pas toi, reponds a ce message pour etre retire(e).",
          '',
          'Merci,',
          'Sans Transition',
        ]
          .filter(Boolean)
          .join('\n'),
      }),
    ])

    return NextResponse.json({ ok: true, reactivated: isReactivated }, { status: 200 })
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Erreur serveur.'
    return NextResponse.json({ error: message }, { status: 502 })
  }
}
