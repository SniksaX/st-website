'use client'

import Link from 'next/link'
import { eraseConsent } from '@/lib/consent'

const SITE_LINKS = [
  { label: 'Publications', href: '/publications' },
  { label: 'Collabs',      href: '/collabs' },
  { label: 'Soutenir',     href: '/don' },
  { label: 'Kit révolutionnaire', href: '/kit-revolutionnaire' },
  { label: 'Kit média',    href: '/kit-media' },
]

const SOCIAL_LINKS = [
  { label: 'TikTok',    href: 'https://www.tiktok.com/@sanstransition' },
  { label: 'Instagram', href: 'https://www.instagram.com/sanstransition__' },
  { label: 'YouTube',   href: 'https://www.youtube.com/@SansTransitionMedia' },
  { label: 'X',         href: 'https://x.com/sanstransition_' },
]

const LEGAL_LINKS = [
  { label: 'Mentions légales', href: '/mentions-legales' },
  { label: 'CGU',              href: '/cgu' },
  { label: 'Confidentialité',  href: '/confidentialite' },
]

const colTitle: React.CSSProperties = {
  fontSize: 11,
  textTransform: 'uppercase',
  letterSpacing: '0.2em',
  color: 'var(--muted)',
}

const linkStyle: React.CSSProperties = {
  fontSize: 13,
  color: 'var(--fg2)',
  textDecoration: 'none',
}

export default function Footer() {
  const reopen = () => {
    eraseConsent()
    window.dispatchEvent(new CustomEvent('st:consent:reset'))
  }

  return (
    <footer style={{
      borderTop: '1px solid var(--border)',
      padding: 'clamp(32px,4vw,56px) clamp(16px,4vw,48px)',
    }}>
      <div style={{
        maxWidth: 1440,
        margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: 32,
        alignItems: 'start',
      }}>
        {/* Marque */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <p style={{ fontWeight: 700, fontSize: 13, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--fg)' }}>
            Sans Transition
          </p>
          <p style={{ fontSize: 13, color: 'var(--muted)' }}>
            © {new Date().getFullYear()} — média militant, indépendant et engagé.
          </p>
          <a href="mailto:contact@sanstransition.fr" style={linkStyle}>contact@sanstransition.fr</a>
        </div>

        {/* Le site */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <p style={colTitle}>Le site</p>
          {SITE_LINKS.map((link) => (
            <Link key={link.href} href={link.href} style={linkStyle}>{link.label}</Link>
          ))}
        </div>

        {/* Nous suivre */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <p style={colTitle}>Nous suivre</p>
          {SOCIAL_LINKS.map((link) => (
            <a key={link.href} href={link.href} target="_blank" rel="noreferrer" style={linkStyle}>
              {link.label}
            </a>
          ))}
        </div>

        {/* Légal */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, alignItems: 'flex-start' }}>
          <p style={colTitle}>Légal</p>
          {LEGAL_LINKS.map((link) => (
            <Link key={link.href} href={link.href} style={linkStyle}>{link.label}</Link>
          ))}
          <button
            onClick={reopen}
            style={{
              ...linkStyle,
              background: 'none',
              border: 'none',
              padding: 0,
              cursor: 'pointer',
              textAlign: 'left',
              fontFamily: 'var(--font-body)',
            }}
          >
            Gérer mes cookies
          </button>
        </div>

        {/* Signature */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          <p style={{ fontSize: 13, color: 'var(--fg2)' }}>
            Fait par <strong style={{ color: 'var(--fg)' }}>Hedi</strong>, et ouais mes vies.
          </p>
          <p style={{ fontSize: 13, color: 'var(--muted)' }}>
            Merci d&apos;être passé·e sur le site :)) Bisous!
          </p>
        </div>
      </div>
    </footer>
  )
}
