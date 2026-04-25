'use client'

const WORDS = [
  'Radical', 'Queer', 'Féministe', 'Accessible', 'Militant', 'Indépendant',
  'Pédagogique', 'Sans bullshit', 'Par et pour les minorités',
  'Pas de pubs', 'Pas de milliardaires', 'Association loi 1901',
]

const DOT = (
  <span aria-hidden style={{
    display: 'inline-flex',
    alignItems: 'center',
    alignSelf: 'center',
    color: 'var(--border2)',
    fontSize: 14,
    padding: '0 4px',
  }}>·</span>
)

export default function Ticker() {
  const items = [...WORDS, ...WORDS]

  return (
    <div style={{
      borderTop: '1px solid var(--border)',
      borderBottom: '1px solid var(--border)',
      overflow: 'hidden',
      background: 'var(--bg)',
    }}>
      <div className="ticker-track">
        {items.map((w, i) => (
          <span key={i} style={{ display: 'inline-flex', alignItems: 'center' }}>
            <span style={{
              display: 'inline-block',
              padding: '11px 20px',
              fontFamily: 'var(--font-body)',
              fontSize: 10,
              textTransform: 'uppercase',
              letterSpacing: '0.26em',
              color: 'var(--muted)',
              fontWeight: 400,
            }}>{w}</span>
            {DOT}
          </span>
        ))}
      </div>
    </div>
  )
}
