import { NextResponse } from 'next/server'
import nodemailer from 'nodemailer'
import { verifyTurnstile } from '@/lib/turnstile'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

function escapeHtml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}

export async function POST(req: Request) {
  let body: {
    subject?: string
    name?: string
    email?: string
    message?: string
    website?: string
    turnstileToken?: string
  }
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Corps de requête invalide.' }, { status: 400 })
  }

  const { subject, name, email, message } = body

  // Honeypot: bots commonly fill every field. Return success without sending mail.
  if (body.website?.trim()) return NextResponse.json({ ok: true })

  if (!email?.trim() || !message?.trim()) {
    return NextResponse.json({ error: 'Email et message requis.' }, { status: 400 })
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
    return NextResponse.json({ error: 'Email invalide.' }, { status: 400 })
  }
  if (email.length > 254 || (name?.length ?? 0) > 120 || (subject?.length ?? 0) > 160 || message.length > 5000) {
    return NextResponse.json({ error: 'Un ou plusieurs champs sont trop longs.' }, { status: 400 })
  }

  const turnstile = await verifyTurnstile({
    request: req,
    token: body.turnstileToken,
    expectedAction: 'contact',
  })
  if (!turnstile.ok) {
    return NextResponse.json({ error: turnstile.error }, { status: turnstile.status })
  }

  const smtpHost   = process.env.ZIMBRA_SMTP_HOST
  const smtpPort   = parseInt(process.env.ZIMBRA_SMTP_PORT || '587', 10)
  const smtpSecure = process.env.ZIMBRA_SMTP_SECURE === 'true'
  const smtpUser   = process.env.ZIMBRA_SMTP_USER
  const smtpPass   = process.env.ZIMBRA_SMTP_PASS
  const toAddress  = process.env.CONTACT_TO || 'contact@sanstransition.fr'

  if (!smtpHost || !smtpUser || !smtpPass) {
    return NextResponse.json({ error: 'SMTP non configuré.' }, { status: 500 })
  }

  const transporter = nodemailer.createTransport({
    host: smtpHost,
    port: smtpPort,
    secure: smtpSecure,
    auth: { user: smtpUser, pass: smtpPass },
    tls: { servername: process.env.ZIMBRA_SMTP_TLS_SERVERNAME || smtpHost },
  })

  const cleanSubject = subject?.trim() || 'Message'
  const cleanName = name?.trim() || '—'
  const cleanEmail = email.trim()
  const cleanMessage = message.trim()
  const subjectLine = `[Contact ST] ${cleanSubject} — ${cleanName === '—' ? cleanEmail : cleanName}`
  const textBody = [
    `Sujet : ${cleanSubject}`,
    `Nom : ${cleanName}`,
    `Email : ${cleanEmail}`,
    '',
    cleanMessage,
    '',
    '---',
    'Envoyé depuis sanstransition.fr/contact',
  ].join('\n')

  const htmlBody = `
    <div style="font-family:sans-serif;max-width:600px;color:#1a1a1a">
      <h2 style="font-size:18px;margin-bottom:16px">${escapeHtml(subjectLine)}</h2>
      <table style="border-collapse:collapse;width:100%;margin-bottom:20px">
        <tr><td style="padding:6px 12px 6px 0;color:#666;font-size:12px;white-space:nowrap">Sujet</td><td style="padding:6px 0;font-size:13px">${escapeHtml(cleanSubject)}</td></tr>
        <tr><td style="padding:6px 12px 6px 0;color:#666;font-size:12px;white-space:nowrap">Nom</td><td style="padding:6px 0;font-size:13px">${escapeHtml(cleanName)}</td></tr>
        <tr><td style="padding:6px 12px 6px 0;color:#666;font-size:12px;white-space:nowrap">Email</td><td style="padding:6px 0;font-size:13px"><a href="mailto:${escapeHtml(cleanEmail)}">${escapeHtml(cleanEmail)}</a></td></tr>
      </table>
      <div style="background:#f5f5f5;padding:16px 20px;border-radius:4px;font-size:14px;line-height:1.6;white-space:pre-wrap">${escapeHtml(cleanMessage)}</div>
      <p style="margin-top:16px;font-size:11px;color:#999">Envoyé depuis sanstransition.fr/contact</p>
    </div>
  `

  try {
    await transporter.sendMail({
      from: `"Sans Transition Contact" <${smtpUser}>`,
      to: toAddress,
      replyTo: cleanEmail,
      subject: subjectLine,
      text: textBody,
      html: htmlBody,
    })
    return NextResponse.json({ ok: true })
  } catch (err: unknown) {
    console.error('[contact] SMTP error', err)
    return NextResponse.json({ error: 'Échec de l\'envoi SMTP.' }, { status: 502 })
  }
}
