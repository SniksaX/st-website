const fs = require('fs');
const path = require('path');

const file = path.join(__dirname, '..', 'app', 'don', 'page.tsx');
let src = fs.readFileSync(file, 'utf8');

// Replace entire metadata block using indices (robust to encoding junk)
{
  const start = src.indexOf('export const metadata');
  if (start !== -1) {
    const end = src.indexOf('};', start);
    if (end !== -1) {
      const block = [
        'export const metadata = {',
        '  title: "Soutenir Sans Transition — Don",',
        '  description:',
        '    "Un média par et pour les minorités. Pas pour les milliardaires. Aidez-nous à devenir stables et indépendants en rejoignant les 1000 personnes qui donnent 2 € / mois.",',
        '};',
      ].join('\n');
      src = src.slice(0, start) + block + src.slice(end + 2);
    }
  }
}

// Targeted replacements within the hero section and trust card
src = src
  .replace(/La Transition\s-\s/g, 'La Transition — ')
  .replace(/l'ind.?pendance ou rien\./g, 'l’indépendance ou rien.')
  .replace(/1 000 personnes[\s\S]*?= un m.?dia libre et stable\./g, '1 000 personnes × 2 €/mois = un média libre et stable.')
  .replace(/Sans Transition est un m.?dia ind.?pendant, construit par et pour les minorit.?s\./g, 'Sans Transition est un média indépendant, construit par et pour les minorités.')
  .replace(/Notre mission\s*:\s*faire exister les voix qu.?on n'.?coute jamais, raconter les luttes/g, 'Notre mission : faire exister les voix qu’on n’écoute jamais, raconter les luttes')
  .replace(/analyses radicalement diff.?rentes\./g, 'analyses radicalement différentes.')
  .replace(/Objectif\s*:\s*<strong className="text-foreground">1000 personnes[\s\S]*?\/ mois<\/strong> pour/g, 'Objectif : <strong className="text-foreground">1000 personnes à 2 € / mois</strong> pour')
  .replace(/financer durablement le m.?dia\./g, 'financer durablement le média.')
  .replace(/et notre d.?veloppement\./g, 'et notre développement.')
  .replace(/pas d.?Tactionnaires/g, 'pas d’actionnaires')
  .replace(/Ind.?pendance par la communaut.?/g, 'Indépendance par la communauté')
  .replace(/p.?dagogiques[\s\S]*?sans pubs,/g, 'pédagogiques — sans pubs,');

// Broader normalizations across the page (safe fallbacks)
src = src
  .replace(/mon.?tisation/g, 'monétisation')
  .replace(/m.?dia/g, 'média')
  .replace(/ind.?pendant/g, 'indépendant')
  .replace(/communaut.?/g, 'communauté')
  .replace(/vid.?o/g, 'vidéo')
  .replace(/r.?sili/g, 'résili')
  .replace(/co.?t/g, 'coût')
  .replace(/gr.?ce/g, 'grâce')
  .replace(/mani.?re/g, 'manière')
  .replace(/acc.?s/g, 'accès')
  .replace(/\?'\?/g, '€');

fs.writeFileSync(file, src, 'utf8');
console.log('Accents normalized in app/don/page.tsx');
