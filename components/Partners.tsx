'use client'

import Image from 'next/image'
import Link from 'next/link'

const PARTNERS = [
  { name: 'Mediapart', logo: '/mediapart.png' },
  { name: 'Le Média' },
  { name: 'Carapace' },
]

function ArrowIcon() {
  return (
    <svg width={10} height={10} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
      <path d="M3 8h10M9 4l4 4-4 4" />
    </svg>
  )
}

export default function Partners() {
  return (
    <section
      id="collabs"
      style={{
        borderBottom: '1px solid var(--border)',
        padding: '14px clamp(16px,4vw,48px)',
      }}
    >
      <div style={{
        maxWidth: 1440,
        margin: '0 auto',
        display: 'flex',
        alignItems: 'center',
        gap: 'clamp(16px,3vw,32px)',
        flexWrap: 'wrap',
      }}>
        <span style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.2em', color: 'var(--muted)', flexShrink: 0 }}>
          Collabs
        </span>

        <div style={{ display: 'flex', alignItems: 'center', gap: 'clamp(16px,3vw,32px)', flexWrap: 'wrap', flex: 1 }}>
          {PARTNERS.map((partner) =>
            partner.logo ? (
              <Image
                key={partner.name}
                src={partner.logo}
                alt={partner.name}
                width={120}
                height={16}
                style={{ height: 16, width: 'auto', opacity: 0.55 }}
              />
            ) : (
              <span key={partner.name} style={{ fontSize: 13, fontWeight: 500, color: 'var(--muted)' }}>
                {partner.name}
              </span>
            )
          )}
        </div>

        <Link
          href="/collabs"
          style={{
            fontSize: 11,
            textTransform: 'uppercase',
            letterSpacing: '0.16em',
            color: 'var(--muted)',
            textDecoration: 'none',
            display: 'inline-flex',
            alignItems: 'center',
            gap: 7,
            flexShrink: 0,
          }}
        >
          Voir les collabs <ArrowIcon />
        </Link>
      </div>
    </section>
  )
}
