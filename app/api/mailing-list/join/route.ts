import { NextResponse } from 'next/server'
import { verifyInviteToken } from '@/lib/mailingListStore'
import { readRequestMeta, subscribeEmail } from '@/lib/mailingListSubscribe'

export const runtime = 'nodejs'

const SOURCE = 'invitation-email'

function escapeHtml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

function htmlPage(title: string, body: string, status = 200) {
  return new NextResponse(
    `<!doctype html>
<html lang="fr">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="robots" content="noindex" />
    <title>${escapeHtml(title)}</title>
    <style>
      body{margin:0;padding:24px;background:#0b0b12;color:#f7f7ff;font-family:Segoe UI,Arial,sans-serif}
      .card{max-width:560px;margin:40px auto;border:1px solid #2a2a3a;border-radius:18px;padding:24px;background:#141422}
      h1{margin:0 0 10px;font-size:24px}
      p{margin:0 0 12px;color:#d1d1e3;line-height:1.55}
      .a{display:inline-block;margin-top:8px;border:0;cursor:pointer;color:#0f1021;text-decoration:none;font-weight:700;font-size:16px;padding:12px 20px;border-radius:999px;background:linear-gradient(90deg,#8c52ff 0%,#ff5aa8 45%,#ff914d 100%)}
      .muted{font-size:13px;color:#9a9ab0}
    </style>
  </head>
  <body>
    <main class="card">
      <h1>${escapeHtml(title)}</h1>
      ${body}
    </main>
  </body>
</html>`,
    { status, headers: { 'Content-Type': 'text/html; charset=utf-8', 'Cache-Control': 'no-store' } }
  )
}

const backLink = '<a class="a" href="https://sanstransition.fr">Retour au site</a>'

function invalidLink() {
  return htmlPage(
    'Lien invalide',
    `<p>Ce lien d'inscription est invalide ou a expiré. Tu peux t'inscrire directement sur le site.</p>
     <a class="a" href="https://sanstransition.fr/00">S'inscrire à la newsletter</a>`,
    400
  )
}

// GET only shows a confirmation page: link scanners in mail clients open links
// automatically, so the actual subscription happens on the POST below.
export async function GET(request: Request) {
  const token = new URL(request.url).searchParams.get('token') ?? ''
  const email = token ? verifyInviteToken(token) : null
  if (!email) return invalidLink()

  return htmlPage(
    'Rejoindre la newsletter',
    `<p>Tous les dimanches, le récap des vidéos de Sans Transition, sans algo qui choisit à ta place.</p>
     <p>Adresse : <strong>${escapeHtml(email)}</strong></p>
     <form method="post" action="/api/mailing-list/join">
       <input type="hidden" name="token" value="${escapeHtml(token)}" />
       <button class="a" type="submit">Confirmer mon inscription</button>
     </form>
     <p class="muted" style="margin-top:16px">Tu pourras te désinscrire à tout moment depuis chaque newsletter.</p>`
  )
}

export async function POST(request: Request) {
  let token = ''
  try {
    const form = await request.formData()
    token = String(form.get('token') ?? '')
  } catch {
    return invalidLink()
  }

  const email = token ? verifyInviteToken(token) : null
  if (!email) return invalidLink()

  try {
    const { forwardedFor, userAgent } = readRequestMeta(request)
    const outcome = await subscribeEmail({ email, source: SOURCE, forwardedFor, userAgent })
    if (outcome === 'existing') {
      return htmlPage('Déjà inscrit·e', `<p>Cette adresse reçoit déjà la newsletter. Merci !</p>${backLink}`)
    }
    return htmlPage(
      'Inscription confirmée',
      `<p>C'est fait, tu recevras la newsletter tous les dimanches. Un mail de confirmation vient de partir.</p>${backLink}`
    )
  } catch (error) {
    console.error('[join] subscribe failed:', error)
    return htmlPage('Erreur', "<p>Impossible d'enregistrer l'inscription pour l'instant. Réessaie dans quelques minutes.</p>", 500)
  }
}
