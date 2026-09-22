import { NextResponse } from 'next/server'
import {
  EMAIL_REGEX,
  MailingListConfigError,
  readRequestMeta,
  subscribeEmail,
} from '@/lib/mailingListSubscribe'
import { verifyTurnstile } from '@/lib/turnstile'

export const runtime = 'nodejs'

const ALLOWED_SOURCES = ['/newsletter', '/liens'] as const
const DEFAULT_SOURCE = '/newsletter'

function readEmail(value: unknown) {
  if (typeof value !== 'string') return ''
  return value.trim().toLowerCase()
}

function readSource(value: unknown) {
  if (typeof value !== 'string') return DEFAULT_SOURCE
  const source = value.trim().toLowerCase()
  return (ALLOWED_SOURCES as readonly string[]).includes(source) ? source : DEFAULT_SOURCE
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as {
      email?: unknown
      source?: unknown
      website?: unknown
      turnstileToken?: unknown
    }
    const email = readEmail(body.email)
    const source = readSource(body.source)

    // Honeypot: acknowledge automated submissions without writing them to storage.
    if (typeof body.website === 'string' && body.website.trim()) {
      return NextResponse.json({ ok: true }, { status: 200 })
    }

    if (!email || email.length > 254 || !EMAIL_REGEX.test(email)) {
      return NextResponse.json({ error: 'Adresse email invalide.' }, { status: 400 })
    }

    const turnstile = await verifyTurnstile({
      request,
      token: body.turnstileToken,
      expectedAction: 'newsletter',
    })
    if (!turnstile.ok) {
      return NextResponse.json({ error: turnstile.error }, { status: turnstile.status })
    }

    const { forwardedFor, userAgent } = readRequestMeta(request)
    const outcome = await subscribeEmail({ email, source, forwardedFor, userAgent })

    if (outcome === 'existing') {
      return NextResponse.json({ ok: true, alreadySubscribed: true }, { status: 200 })
    }
    return NextResponse.json({ ok: true, reactivated: outcome === 'reactivated' }, { status: 200 })
  } catch (error) {
    if (error instanceof MailingListConfigError) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }
    const message = error instanceof Error ? error.message : 'Erreur serveur.'
    return NextResponse.json({ error: message }, { status: 502 })
  }
}
