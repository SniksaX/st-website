// Transactional emails of the mailing list, with the same design as the newsletter template
// (scripts/mailing-list.js). All styles are inline so they survive clients that strip <style>.

const FONT = "'Space Grotesk','Helvetica Neue',Helvetica,Arial,sans-serif"
const GRADIENT = 'linear-gradient(90deg,#7c5af0 0%,#e05fb0 48%,#f97316 100%)'

function escapeHtml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

function paragraph(html: string, color = '#cfcad4') {
  return `<p style="margin:0 0 18px;font-family:${FONT};font-size:15px;line-height:1.65;color:${color}">${html}</p>`
}

function button(label: string, url: string) {
  return `<p style="margin:8px 0 26px"><a href="${escapeHtml(url)}" target="_blank" style="display:inline-block;padding:14px 26px;background-color:#c2569b;background-image:${GRADIENT};border-radius:2px;font-family:${FONT};font-size:11px;font-weight:600;letter-spacing:.2em;line-height:1.2;text-transform:uppercase;color:#ffffff !important;text-decoration:none !important"><span style="color:#ffffff">${escapeHtml(label)}</span></a></p>`
}

function layout(preheader: string, content: string, unsubscribeUrl: string | null) {
  const unsubscribe = unsubscribeUrl
    ? `<p style="margin:0 0 8px;font-family:${FONT};font-size:11px;line-height:1.7;color:#8f8b9c">Tu ne veux plus recevoir la newsletter ? <a href="${escapeHtml(unsubscribeUrl)}" style="color:#a8a4b0;text-decoration:underline">Se désinscrire</a></p>`
    : ''
  return `<!doctype html>
<html lang="fr">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="color-scheme" content="dark" />
    <meta name="supported-color-schemes" content="dark" />
    <title>Sans Transition</title>
  </head>
  <body style="margin:0;padding:0;background-color:#08080e">
    <div style="display:none;max-height:0;overflow:hidden;font-size:1px;line-height:1px;color:#08080e">${escapeHtml(preheader)}</div>
    <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="background-color:#08080e">
      <tr><td align="center" style="padding:24px 12px 40px">
        <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="600" style="width:600px;max-width:100%;background-color:#08080e;border:1px solid #1c1c2c;border-radius:3px">
          <tr><td style="padding:22px 28px;border-bottom:1px solid #1c1c2c">
            <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%"><tr>
              <td align="left" valign="middle"><a href="https://sanstransition.fr" style="text-decoration:none"><img src="https://sanstransition.fr/logo-flat.png" width="150" alt="Sans Transition" style="display:block;width:150px;max-width:100%;height:auto;border:0" /></a></td>
              <td align="right" valign="middle" style="font-family:${FONT};font-size:10px;text-transform:uppercase;letter-spacing:.24em;color:#8f8b9c;line-height:1.5">La newsletter</td>
            </tr></table>
          </td></tr>
          <tr><td height="3" bgcolor="#c2569b" style="height:3px;line-height:3px;font-size:0;background-color:#c2569b;background-image:${GRADIENT}">&nbsp;</td></tr>
          <tr><td style="padding:36px 28px 12px">
${content}
          </td></tr>
          <tr><td style="padding:24px 28px 28px;border-top:1px solid #1c1c2c">
            <p style="margin:0 0 12px;font-family:${FONT};font-size:11px;line-height:1.6;letter-spacing:.04em;color:#8f8b9c">
              <a href="https://www.tiktok.com/@sanstransition" style="color:#a8a4b0;text-decoration:none">TikTok</a>&nbsp;·&nbsp;
              <a href="https://www.instagram.com/sanstransition__" style="color:#a8a4b0;text-decoration:none">Instagram</a>&nbsp;·&nbsp;
              <a href="https://www.youtube.com/@SansTransitionMedia" style="color:#a8a4b0;text-decoration:none">YouTube</a>&nbsp;·&nbsp;
              <a href="https://sanstransition.fr" style="color:#a8a4b0;text-decoration:none">sanstransition.fr</a>
            </p>
            ${unsubscribe}
            <p style="margin:0;font-family:${FONT};font-size:11px;line-height:1.7;color:#8f8b9c">Sans Transition, association loi 1901. Média par et pour les minorités.</p>
          </td></tr>
        </table>
      </td></tr>
    </table>
  </body>
</html>`
}

export function buildConfirmationEmail(input: { reactivated: boolean; unsubscribeUrl: string | null }) {
  const { reactivated, unsubscribeUrl } = input
  const title = reactivated ? 'Content de te revoir' : 'Bienvenue dans la newsletter'
  const intro = reactivated
    ? 'Ta réinscription à la newsletter Sans Transition est bien enregistrée.'
    : 'Ton inscription à la newsletter Sans Transition est bien enregistrée. Merci de nous suivre.'
  const siteUrl = 'https://sanstransition.fr'

  const content = [
    `<h1 style="margin:0 0 18px;font-family:${FONT};font-size:30px;line-height:1.18;font-weight:700;letter-spacing:-.03em;color:#f0ede8">${title}</h1>`,
    paragraph(intro),
    paragraph(
      'Tous les dimanches, tu recevras le récap des vidéos de la semaine, directement dans ta boîte mail, sans algo qui choisit à ta place.'
    ),
    paragraph('En attendant la prochaine, tu peux retrouver toutes nos vidéos sur le site.'),
    button('Voir nos vidéos', siteUrl),
    paragraph('À dimanche,<br />Sans Transition', '#f0ede8'),
  ].join('\n')

  const html = layout(`${title} : le récap des vidéos, tous les dimanches.`, content, unsubscribeUrl)

  const text = [
    `${title} !`,
    '',
    intro,
    '',
    'Tous les dimanches, tu recevras le récap des vidéos de la semaine, directement dans ta boîte mail, sans algo qui choisit à ta place.',
    '',
    `Toutes nos vidéos : ${siteUrl}`,
    '',
    'À dimanche,',
    'Sans Transition',
    '',
    unsubscribeUrl
      ? `Pour te désinscrire : ${unsubscribeUrl}`
      : "Si ce n'était pas toi, réponds à ce message pour être retiré·e.",
  ].join('\n')

  return { html, text }
}
