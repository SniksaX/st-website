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
    <title>${escapeHtml(title)} | Sans Transition</title>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&display=swap" rel="stylesheet" />
    <style>
      *{box-sizing:border-box}
      html,body{margin:0;padding:0;background:#08080e;color:#f0ede8}
      body{min-height:100vh;display:flex;align-items:center;justify-content:center;padding:24px 16px;font-family:'Space Grotesk','Helvetica Neue',Helvetica,Arial,sans-serif;-webkit-font-smoothing:antialiased}
      .wrap{width:100%;max-width:520px;border:1px solid #1c1c2c;border-radius:3px;background:#08080e}
      .head{display:flex;align-items:center;justify-content:space-between;gap:16px;padding:22px 28px;border-bottom:1px solid #1c1c2c}
      .head img{display:block;width:150px;height:auto}
      .meta{font-size:10px;letter-spacing:.24em;text-transform:uppercase;color:#8f8b9c}
      .rule{height:3px;background:linear-gradient(90deg,#7c5af0 0%,#e05fb0 48%,#f97316 100%)}
      .body{padding:36px 28px 32px}
      .kicker{margin:0 0 10px;font-size:11px;font-weight:500;letter-spacing:.2em;text-transform:uppercase;color:#8f8b9c}
      h1{margin:0 0 16px;font-size:30px;line-height:1.15;font-weight:700;letter-spacing:-.03em;color:#f0ede8}
      p{margin:0 0 16px;font-size:15px;line-height:1.65;color:#cfcad4}
      .email{margin:22px 0 24px;padding:14px 16px;border:1px solid #1c1c2c;border-radius:3px;background:#0d0d18;font-size:15px;color:#f0ede8;word-break:break-all}
      .email span{display:block;margin-bottom:4px;font-size:10px;letter-spacing:.2em;text-transform:uppercase;color:#8f8b9c}
      form{margin:0}
      .btn{display:block;width:100%;padding:16px 24px;border:0;border-radius:2px;cursor:pointer;text-align:center;text-decoration:none;font-family:inherit;font-size:12px;font-weight:600;letter-spacing:.2em;text-transform:uppercase;color:#fff;background:linear-gradient(90deg,#7c5af0 0%,#e05fb0 48%,#f97316 100%);transition:filter .15s,transform .15s}
      .btn:hover{filter:brightness(1.08)}
      .btn:active{transform:translateY(1px)}
      .btn:focus-visible{outline:2px solid #f0ede8;outline-offset:3px}
      .btn.ghost{background:transparent;border:1px solid #2a2a3e;color:#f0ede8}
      .btn.ghost:hover{border-color:#8f8b9c}
      .note{margin:18px 0 0;font-size:12px;line-height:1.55;color:#8f8b9c}
      .foot{padding:18px 28px;border-top:1px solid #1c1c2c;font-size:11px;color:#6f6b7c}
      .foot a{color:#8f8b9c;text-decoration:none}
      .foot a:hover{color:#f0ede8}
      @media (max-width:480px){.head,.body,.foot{padding-left:20px;padding-right:20px}.body{padding-top:28px}h1{font-size:26px}.head img{width:130px}}
    </style>
  </head>
  <body>
    <main class="wrap">
      <header class="head">
        <a href="https://sanstransition.fr"><img src="/logo-flat.png" alt="Sans Transition" width="150" /></a>
        <span class="meta">La newsletter</span>
      </header>
      <div class="rule"></div>
      <section class="body">
        <h1>${escapeHtml(title)}</h1>
        ${body}
      </section>
      <footer class="foot"><a href="https://sanstransition.fr">sanstransition.fr</a> &middot; Média par et pour les minorités</footer>
    </main>
  </body>
</html>`,
    { status, headers: { 'Content-Type': 'text/html; charset=utf-8', 'Cache-Control': 'no-store' } }
  )
}

const backLink = '<a class="btn ghost" href="https://sanstransition.fr">Retour au site</a>'

function invalidLink() {
  return htmlPage(
    'Lien invalide',
    `<p>Ce lien d'inscription est invalide ou a expiré. Tu peux t'inscrire directement sur le site.</p>
     <a class="btn" href="https://sanstransition.fr/newsletter">S'inscrire sur le site</a>`,
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
    `<p>Tous les dimanches, le récap des vidéos de la semaine, sans algo qui choisit à ta place.</p>
     <div class="email"><span>Ton adresse</span>${escapeHtml(email)}</div>
     <form method="post" action="/api/mailing-list/join">
       <input type="hidden" name="token" value="${escapeHtml(token)}" />
       <button class="btn" type="submit">Confirmer mon inscription</button>
     </form>
     <p class="note">Désinscription en un clic depuis chaque newsletter.</p>`
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
      return htmlPage('Déjà inscrit·e', `<p>Cette adresse reçoit déjà la newsletter. Rendez-vous dimanche !</p>${backLink}`)
    }
    return htmlPage(
      'Inscription confirmée',
      `<p>C'est fait. Tu recevras la newsletter tous les dimanches, et un mail de confirmation vient de partir.</p><p>Merci pour ton soutien.</p>${backLink}`
    )
  } catch (error) {
    console.error('[join] subscribe failed:', error)
    return htmlPage('Erreur', "<p>Impossible d'enregistrer l'inscription pour l'instant. Réessaie dans quelques minutes.</p>", 500)
  }
}
