const fs = require('fs');
const p = 'app/don/page.tsx';
let s = fs.readFileSync(p, 'utf8');

// Normalize the badges block to use double quotes
s = s.replace(
  /<div className='mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3'>[\s\S]*?<\/div>\s*\r?\n\s*<div className=/,
  `
              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
                <TrustBadge icon="shield" text="Association loi 1901" />
                <TrustBadge icon="euro" text="Financement 100 % citoyen" />
                <TrustBadge icon="heartHandshake" text="Pas de pubs, pas d’actionnaires" />
                <TrustBadge icon="target" text="Indépendance par la communauté" />
              </div>

              <div className=
`
);

fs.writeFileSync(p, s, 'utf8');
console.log('Fixed badges block.');

