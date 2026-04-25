'use client'

import Link from 'next/link'
import { eraseConsent } from '@/lib/consent'

const NAV_LINKS = [
  { id: 'about',        label: 'À propos',       href: '/#about' },
  { id: 'formats',      label: 'Formats',         href: '/#formats' },
  { id: 'equipe',       label: 'Équipe',           href: '/#equipe' },
  { id: 'publications', label: 'Publications',    href: '/publications' },
  { id: 'campagne',     label: 'Campagne',        href: '/#campagne' },
  { id: 'collabs',      label: 'Collabs',          href: '/collabs' },
]

export default function Footer() {
  const reopen = () => {
    eraseConsent()
    window.dispatchEvent(new CustomEvent('st:consent:reset'))
  }

  return (
    <footer style={{
      borderTop: '1px solid var(--border)',
      padding: 'clamp(24px,3vw,40px) clamp(16px,4vw,48px)',
    }}>
      <div style={{
        maxWidth: 1440,
        margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: '1fr 1fr 1fr',
        gap: 24,
        alignItems: 'start',
      }}>

        {/* Left */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          <p style={{ fontWeight: 700, fontSize: 13, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--fg)' }}>
            Sans Transition
          </p>
          <p style={{ fontSize: 12, color: 'var(--muted)' }}>
            © {new Date().getFullYear()} — média militant, indépendant et engagé.
          </p>
          <button
            onClick={reopen}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              fontSize: 12,
              color: 'var(--muted)',
              textAlign: 'left',
              padding: 0,
              textDecoration: 'underline',
              textUnderlineOffset: 3,
              width: 'fit-content',
            }}
          >
            Gérer mes cookies
          </button>
        </div>

        {/* Center: nav links */}
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '4px 16px' }}>
          {NAV_LINKS.map((link) => (
            <Link
              key={link.id}
              href={link.href}
              style={{
                fontSize: 12,
                color: 'var(--muted)',
                textDecoration: 'none',
                letterSpacing: '0.04em',
                transition: 'color .15s',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--fg)')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--muted)')}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Right */}
        <div style={{ textAlign: 'right', display: 'flex', flexDirection: 'column', gap: 4 }}>
          <p style={{ fontSize: 12, color: 'var(--fg2)' }}>
            Fait par <span style={{ fontWeight: 700, color: 'var(--fg)' }}>Hedi</span>, et ouais mes vies.
          </p>
          <p style={{ fontSize: 12, color: 'var(--muted)' }}>
            Merci d&apos;être passé·e sur le site :)) Bisous!
          </p>
        </div>

      </div>
    </footer>
  )
}
