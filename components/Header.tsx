'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

const NAV = [
  { label: 'Vidéos', href: '/publications' },
  { label: 'Le média', href: '/#media' },
  { label: 'Collabs', href: '/collabs' },
  { label: 'Kit révolutionnaire', href: '/kit-revolutionnaire' },
  { label: 'Contact', href: '/contact' },
]

function ArrowIcon() {
  return (
    <svg width={11} height={11} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
      <path d="M3 8h10M9 4l4 4-4 4" />
    </svg>
  )
}

function BurgerIcon({ open }: { open: boolean }) {
  return (
    <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
      {open ? (
        <>
          <path d="M6 6l12 12" />
          <path d="M18 6L6 18" />
        </>
      ) : (
        <>
          <line x1="3" y1="7" x2="21" y2="7" />
          <line x1="3" y1="12" x2="21" y2="12" />
          <line x1="3" y1="17" x2="21" y2="17" />
        </>
      )}
    </svg>
  )
}

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 8)
    fn()
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false) }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  return (
    <header
      style={{
        position: 'fixed',
        top: 0, left: 0, right: 0,
        zIndex: 100,
        background: scrolled || open ? 'rgba(8,8,14,0.94)' : 'var(--bg)',
        borderBottom: `1px solid ${scrolled || open ? 'var(--border)' : 'transparent'}`,
        backdropFilter: scrolled || open ? 'blur(20px)' : 'none',
        WebkitBackdropFilter: scrolled || open ? 'blur(20px)' : 'none',
        transition: 'background .3s, border-color .3s',
      }}
    >
      <div style={{
        height: 'var(--hh)',
        display: 'flex',
        alignItems: 'center',
        padding: '0 clamp(16px,4vw,48px)',
      }}>
        <div style={{
          maxWidth: 1440,
          width: '100%',
          margin: '0 auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 24,
        }}>
          <Link
            href="/"
            onClick={() => setOpen(false)}
            style={{
              fontWeight: 700,
              fontSize: 16,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: 'var(--fg)',
              textDecoration: 'none',
              flexShrink: 0,
            }}
          >
            Sans Transition
          </Link>

          <nav className="nav-links" style={{ display: 'flex', alignItems: 'center', gap: 4, overflow: 'hidden' }}>
            {NAV.map((item) => (
              <Link key={item.href} href={item.href} className="nav-link">
                {item.label}
              </Link>
            ))}
          </nav>

          <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
            <Link href="/don" className="btn-grad" onClick={() => setOpen(false)}>
              Soutenir <ArrowIcon />
            </Link>
            <button
              type="button"
              className="nav-burger"
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? 'Fermer le menu' : 'Ouvrir le menu'}
              aria-expanded={open}
              style={{
                display: 'none',
                alignItems: 'center',
                justifyContent: 'center',
                width: 38,
                height: 38,
                background: 'none',
                border: '1px solid var(--border2)',
                borderRadius: 2,
                color: 'var(--fg)',
                cursor: 'pointer',
              }}
            >
              <BurgerIcon open={open} />
            </button>
          </div>
        </div>
      </div>

      {open && (
        <nav
          className="nav-panel"
          style={{
            borderTop: '1px solid var(--border)',
            padding: '8px clamp(16px,4vw,48px) 16px',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              style={{
                fontSize: 15,
                color: 'var(--fg2)',
                textDecoration: 'none',
                padding: '12px 0',
                borderBottom: '1px solid var(--border)',
              }}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  )
}
