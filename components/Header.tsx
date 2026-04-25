'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

function ArrowIcon() {
  return (
    <svg width={11} height={11} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M3 8h10M9 4l4 4-4 4" />
    </svg>
  )
}

export default function Header() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 8)
    fn()
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  return (
    <header
      style={{
        position: 'fixed',
        top: 0, left: 0, right: 0,
        zIndex: 100,
        height: 'var(--hh)',
        background: scrolled ? 'rgba(8,8,14,0.94)' : 'var(--bg)',
        borderBottom: `1px solid ${scrolled ? 'var(--border)' : 'transparent'}`,
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(20px)' : 'none',
        transition: 'background .3s, border-color .3s',
        display: 'flex',
        alignItems: 'center',
        padding: '0 clamp(16px,4vw,48px)',
      }}
    >
      <div style={{
        maxWidth: 1440,
        width: '100%',
        margin: '0 auto',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
        <Link href="/" style={{
          fontWeight: 700,
          fontSize: 16,
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          color: 'var(--fg)',
          textDecoration: 'none',
        }}>
          Sans Transition
        </Link>

        <div className="hide-mobile" style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
          <span style={{ fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.28em', color: 'var(--muted)' }}>
            Média militant · pédagogique · engagé
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <Link
            href="/contact"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 6,
              fontSize: 11,
              textTransform: 'uppercase',
              letterSpacing: '0.2em',
              color: 'var(--muted)',
              textDecoration: 'none',
              padding: '9px 16px',
              border: '1px solid transparent',
              borderRadius: 2,
              transition: 'color .15s, border-color .15s',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--fg)'; e.currentTarget.style.borderColor = 'var(--border2)' }}
            onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--muted)'; e.currentTarget.style.borderColor = 'transparent' }}
          >
            Contact
          </Link>
          <a
            href="https://www.helloasso.com/associations/sans-transition/formulaires/1"
            target="_blank"
            rel="noreferrer"
            className="btn-grad"
          >
            Soutenir <ArrowIcon />
          </a>
        </div>
      </div>
    </header>
  )
}
