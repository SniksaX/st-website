import { NextResponse } from 'next/server'
import { unsubscribeMailingListSubscriber, verifyUnsubscribeToken } from '@/lib/mailingListStore'

function htmlPage(title: string, message: string, status = 200) {
  return new NextResponse(
    `<!doctype html>
<html lang="fr">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>${title}</title>
    <style>
      body{margin:0;padding:24px;background:#0b0b12;color:#f7f7ff;font-family:Segoe UI,Arial,sans-serif}
      .card{max-width:560px;margin:40px auto;border:1px solid #2a2a3a;border-radius:18px;padding:24px;background:#141422}
      h1{margin:0 0 10px;font-size:24px}
      p{margin:0;color:#d1d1e3;line-height:1.55}
      .a{display:inline-block;margin-top:18px;color:#0f1021;text-decoration:none;font-weight:700;padding:10px 16px;border-radius:999px;background:linear-gradient(90deg,#8c52ff 0%,#ff5aa8 45%,#ff914d 100%)}
    </style>
  </head>
  <body>
    <main class="card">
      <h1>${title}</h1>
      <p>${message}</p>
      <a class="a" href="https://sanstransition.fr">Retour au site</a>
    </main>
  </body>
</html>`,
    {
      status,
      headers: { 'Content-Type': 'text/html; charset=utf-8' },
    }
  )
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const token = searchParams.get('token')
  if (!token) {
    return htmlPage('Lien invalide', "Le lien de desinscription est incomplet.", 400)
  }

  try {
    const emailHash = verifyUnsubscribeToken(token)
    if (!emailHash) {
      return htmlPage('Lien invalide', 'Le lien de desinscription est invalide ou expire.', 400)
    }

    const result = await unsubscribeMailingListSubscriber(emailHash)
    if (result === 'not_found') {
      return htmlPage(
        'Desinscription prise en compte',
        "Si l'adresse etait presente dans la liste, elle ne recevra plus d'emails.",
        200
      )
    }
    if (result === 'already_unsubscribed') {
      return htmlPage('Deja desinscrit(e)', "Cette adresse etait deja retiree de la newsletter.", 200)
    }

    return htmlPage('Desinscription confirmee', 'Tu ne recevras plus nos newsletters.', 200)
  } catch {
    return htmlPage('Erreur', "Impossible de traiter la desinscription pour l'instant.", 500)
  }
}
