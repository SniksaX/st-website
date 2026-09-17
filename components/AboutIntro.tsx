'use client'

const PILLARS = [
  {
    n: '01',
    title: 'Radical et indépendant',
    desc: 'Association loi 1901 née en février 2025 à Paris, financée par la communauté, sans pubs ni actionnaires.',
  },
  {
    n: '02',
    title: 'Politiser sans bullshit',
    desc: "Rendre l'actu lisible depuis les premiers et premières concerné·es, avec un langage direct et accessible.",
  },
  {
    n: '03',
    title: 'Par et pour les minorités',
    desc: 'On parle des luttes féministes, antiracistes et sociales en donnant des outils à notre camp.',
  },
]

export default function AboutIntro() {
  return (
    <div
      className="rv grid-mosaic"
      style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))' }}
    >
      {PILLARS.map((p) => (
        <div key={p.n} className="grid-cell" style={{ padding: 'clamp(20px,3vw,32px)' }}>
          <div style={{
            fontSize: 11,
            letterSpacing: '0.18em',
            color: 'var(--border2)',
            fontVariantNumeric: 'tabular-nums',
            marginBottom: 16,
          }}>
            {p.n}
          </div>
          <h3 style={{
            fontSize: 'clamp(16px,1.6vw,19px)',
            fontWeight: 700,
            color: 'var(--fg)',
            letterSpacing: '-0.01em',
            marginBottom: 10,
          }}>
            {p.title}
          </h3>
          <p style={{ fontSize: 14, color: 'var(--fg2)', lineHeight: 1.6 }}>{p.desc}</p>
        </div>
      ))}
    </div>
  )
}
