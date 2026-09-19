import { NextResponse } from 'next/server'
import {
  EMAIL_REGEX,
  MailingListConfigError,
  readRequestMeta,
  subscribeEmail,
} from '@/lib/mailingListSubscribe'

export const runtime = 'nodejs'

function readEmail(value: unknown) {
  if (typeof value !== 'string') return ''
  return value.trim().toLowerCase()
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as { email?: unknown }
    const email = readEmail(body.email)

    if (!email || !EMAIL_REGEX.test(email)) {
      return NextResponse.json({ error: 'Adresse email invalide.' }, { status: 400 })
    }

    const { forwardedFor, userAgent } = readRequestMeta(request)
    const outcome = await subscribeEmail({ email, source: '/00', forwardedFor, userAgent })

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
