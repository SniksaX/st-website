'use client'

import { useState, type FormEvent } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import HelloAssoWidget from '@/components/HelloAssoWidget'

/* ── Icons ─────────────────────────────────────────────── */

function IcoTikTok() {
  return (
    <svg width={18} height={18} viewBox="0 0 256 256" fill="currentColor" aria-hidden>
      <path d="M224 88.4c-23.6 0-42.8-19.2-42.8-42.8V32h-36.6v132.1c0 19.7-16 35.7-35.7 35.7s-35.7-16-35.7-35.7 16-35.7 35.7-35.7c2.4 0 4.7.2 6.9.7V92.6c-2.3-.3-4.6-.5-6.9-.5-39.8 0-72.2 32.4-72.2 72.2s32.4 72.2 72.2 72.2 72.2-32.4 72.2-72.2v-56c12.1 8.7 26.9 13.9 42.8 13.9v-33.8z" />
    </svg>
  )
}
function IcoIG() {
  return (
    <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  )
}
function IcoX() {
  return (
    <svg width={16} height={16} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.742l7.73-8.835L1.254 2.25H8.08l4.259 5.63 5.905-5.63zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  )
}
function IcoYT() {
  return (
    <svg width={20} height={20} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  )
}
function IcoGlobe() {
  return (
    <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden>
      <circle cx="12" cy="12" r="10" /><line x1="2" y1="12" x2="22" y2="12" /><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  )
}
function IcoYTSmall() {
  return (
    <svg width={16} height={16} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  )
}
function IcoHeart() {
  return (
    <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden>
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  )
}
function IcoMail() {
  return (
    <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden>
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" />
    </svg>
  )
}
function IcoMsg() {
  return (
    <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden>
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  )
}
function IcoBell() {
  return (
    <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden>
      <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" /><path d="M13.73 21a2 2 0 0 1-3.46 0" />
    </svg>
  )
}
function IcoBook() {
  return (
    <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden>
      <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" /><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
    </svg>
  )
}
function IcoArrow() {
  return (
    <svg width={12} height={12} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
      <path d="M3 8h10M9 4l4 4-4 4" />
    </svg>
  )
}
function IcoChevDown() {
  return (
    <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
      <polyline points="6 9 12 15 18 9" />
    </svg>
  )
}
function IcoClose() {
  return (
    <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
      <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  )
}
function IcoCheck() {
  return (
    <svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <polyline points="20 6 9 17 4 12" />
    </svg>
  )
}
function IcoSend() {
  return (
    <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
      <line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" />
    </svg>
  )
}

/* ── Newsletter modal ───────────────────────────────────── */

type FormState = 'idle' | 'loading' | 'success' | 'error' | 'existing'

function NewsletterModal({ onClose }: { onClose: () => void }) {
  const [email, setEmail] = useState('')
  const [state, setState] = useState<FormState>('idle')
  const [message, setMessage] = useState('')

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    if (!email.trim()) { setMessage('Entre une adresse email.'); setState('error'); return }
    setState('loading')
    try {
      const res = await fetch('/api/mailing-list/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
      const data = await res.json()
      if (!res.ok) { setState('error'); setMessage(data.error ?? 'Une erreur est survenue.'); return }
      if (data.alreadySubscribed) { setState('existing'); setMessage('Tu es déjà inscrit·e !'); return }
      setState('success')
      setMessage('Tu es inscrit·e à la newsletter.')
    } catch {
      setState('error')
      setMessage('Impossible de contacter le serveur.')
    }
  }

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 200,
      display: 'flex', alignItems: 'flex-end', justifyContent: 'center',
    }}>
      {/* Overlay */}
      <div
        onClick={onClose}
        style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(6px)' }}
      />
      {/* Panel */}
      <div style={{
        position: 'relative', zIndex: 1,
        width: '100%', maxWidth: 440,
        background: 'var(--surface)',
        border: '1px solid var(--border)',
        borderBottom: 'none',
        borderRadius: '3px 3px 0 0',
        padding: 'clamp(20px,3vw,32px)',
      }}>
        <button
          onClick={onClose}
          style={{ position: 'absolute', top: 16, right: 16, background: 'none', border: 'none', cursor: 'pointer', color: 'var(--muted)', display: 'flex' }}
          aria-label="Fermer"
        >
          <IcoClose />
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
          <span style={{ color: 'var(--muted)' }}><IcoBell /></span>
          <div>
            <p style={{ fontSize: 14, fontWeight: 700, color: 'var(--fg)' }}>Newsletter Sans Transition</p>
            <p style={{ fontSize: 11, color: 'var(--muted)' }}>Reçois nos prochaines infos directement.</p>
          </div>
        </div>

        {state === 'success' || state === 'existing' ? (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12, padding: '16px 0', textAlign: 'center' }}>
            <span style={{ color: 'var(--fg)', display: 'flex' }}><IcoCheck /></span>
            <p style={{ fontSize: 13, color: 'var(--fg)' }}>{message}</p>
            <button onClick={onClose} style={{ marginTop: 4, background: 'none', border: '1px solid var(--border)', borderRadius: 2, cursor: 'pointer', fontSize: 11, color: 'var(--muted)', padding: '6px 16px' }}>
              Fermer
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="email@exemple.com"
              aria-label="Adresse email"
              disabled={state === 'loading'}
              style={{
                width: '100%',
                boxSizing: 'border-box',
                padding: '10px 14px',
                background: 'var(--bg)',
                border: '1px solid var(--border)',
                borderRadius: 2,
                fontSize: 13,
                color: 'var(--fg)',
                outline: 'none',
              }}
            />
            {state === 'error' && (
              <p style={{ fontSize: 11, color: '#ef4444' }}>{message}</p>
            )}
            <button
              type="submit"
              disabled={state === 'loading'}
              className="btn-grad"
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}
            >
              {state === 'loading'
                ? <span style={{ width: 14, height: 14, border: '2px solid rgba(255,255,255,0.3)', borderTopColor: '#fff', borderRadius: '50%', animation: 'spin 0.8s linear infinite', display: 'inline-block' }} />
                : <IcoSend />
              }
              {state === 'loading' ? 'Envoi…' : "S'inscrire"}
            </button>
            <p style={{ fontSize: 10, color: 'var(--muted)', textAlign: 'center' }}>Pas de spam. Désinscription en un clic.</p>
          </form>
        )}
      </div>
    </div>
  )
}

/* ── Main component ─────────────────────────────────────── */

const SOCIALS = [
  { label: 'TikTok',    href: 'https://tiktok.com/@sanstransition',        icon: <IcoTikTok /> },
  { label: 'Instagram', href: 'https://instagram.com/sanstransition__',    icon: <IcoIG /> },
  { label: 'X',         href: 'https://x.com/sanstransition_',             icon: <IcoX /> },
  { label: 'YouTube',   href: 'https://youtube.com/@SansTransitionMedia',  icon: <IcoYT /> },
]

export default function LiensClient() {
  const [showNewsletter, setShowNewsletter] = useState(false)
  const [donOpen, setDonOpen] = useState(false)

  return (
    <>
      <div style={{
        minHeight: '100vh',
        background: 'var(--bg)',
        color: 'var(--fg)',
        display: 'flex',
        justifyContent: 'center',
        padding: 'clamp(40px,6vw,80px) clamp(16px,4vw,32px)',
      }}>
        <div style={{ width: '100%', maxWidth: 480, display: 'flex', flexDirection: 'column', gap: 12 }}>

          {/* Logo */}
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 8 }}>
            <div style={{ position: 'relative', width: 160, height: 88 }}>
              <Image src="/logo-flat.png" alt="Sans Transition" fill sizes="160px" style={{ objectFit: 'cover', objectPosition: 'center' }} />
            </div>
          </div>

          {/* Title row */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16, marginBottom: 4 }}>
            <div>
              <h1 style={{ fontSize: 'clamp(22px,4vw,28px)', fontWeight: 700, letterSpacing: '-0.02em' }}>Liens rapides</h1>
              <p style={{ fontSize: 12, color: 'var(--muted)', marginTop: 2 }}>Tout l&apos;essentiel, en un tap.</p>
            </div>
            <Link
              href="/don"
              className="btn-grad"
              style={{ whiteSpace: 'nowrap', flexShrink: 0 }}
            >
              Soutenir <IcoArrow />
            </Link>
          </div>

          {/* Site */}
          <LienRow href="/" internal icon={<IcoGlobe />} label="sanstransition.fr" />

          {/* Dernière vidéo YT */}
          <LienRow href="https://www.youtube.com/watch?v=3-pBA4tpqVE" icon={<IcoYTSmall />} label="Regarder notre dernière vidéo" />

          {/* Kit du Révolutionnaire */}
          <LienRow href="/kit-revolutionnaire" internal icon={<IcoBook />} label="Kit du Révolutionnaire" />

          {/* Socials grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: 1,
            background: 'var(--border)',
            border: '1px solid var(--border)',
            borderRadius: 3,
            overflow: 'hidden',
          }}>
            {SOCIALS.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                aria-label={s.label}
                className="grid-cell"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '14px 0',
                  color: 'var(--muted)',
                  textDecoration: 'none',
                  transition: 'color .15s',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--fg)')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--muted)')}
              >
                {s.icon}
              </a>
            ))}
          </div>

          {/* Aider */}
          <div style={{
            display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 1,
            background: 'var(--border)', border: '1px solid var(--border)', borderRadius: 3, overflow: 'hidden',
          }}>
            <LienCell href="https://gofund.me/6e217b10a" icon={<IcoHeart />} label="Aider Abood" />
            <LienCell href="https://gofund.me/ed90a35c6" icon={<IcoHeart />} label="Aider Elodie" />
          </div>

          {/* Proposer un sujet */}
          <LienRow href="https://forms.gle/yoHVL6iKBi6Adz8T9" icon={<IcoMsg />} label="Proposer un sujet ou témoigner" />

          {/* Newsletter */}
          {process.env.NEXT_PUBLIC_NEWSLETTER_ENABLED === 'true' && (
            <button
              onClick={() => setShowNewsletter(true)}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '14px 18px',
                background: 'var(--surface)',
                border: '1px solid var(--border)',
                borderRadius: 3,
                cursor: 'pointer',
                color: 'var(--fg)',
                width: '100%',
                transition: 'background .15s',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--surface2)')}
              onMouseLeave={(e) => (e.currentTarget.style.background = 'var(--surface)')}
            >
              <span style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 13 }}>
                <span style={{ color: 'var(--muted)' }}><IcoBell /></span>
                S&apos;inscrire à la newsletter
              </span>
              <span style={{ color: 'var(--muted)' }}><IcoArrow /></span>
            </button>
          )}

          {/* Mail */}
          <LienRow href="mailto:contact@sanstransition.fr" icon={<IcoMail />} label="contact@sanstransition.fr" />

          {/* Soutenir accordion */}
          <div style={{ border: '1px solid var(--border)', borderRadius: 3, overflow: 'hidden' }}>
            <button
              onClick={() => setDonOpen((v) => !v)}
              className="btn-grad"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                width: '100%',
                borderRadius: 0,
              }}
            >
              <span>Soutenir Sans Transition</span>
              <span style={{ transform: donOpen ? 'rotate(180deg)' : 'none', transition: 'transform .2s', display: 'flex' }}>
                <IcoChevDown />
              </span>
            </button>
            {donOpen && (
              <div style={{ padding: 'clamp(12px,2vw,20px)', background: 'var(--surface)' }}>
                <HelloAssoWidget />
                <p style={{ marginTop: 10, fontSize: 11, color: 'var(--muted)', textAlign: 'center' }}>
                  Paiement sécurisé via HelloAsso.
                </p>
              </div>
            )}
          </div>

        </div>
      </div>

      {showNewsletter && <NewsletterModal onClose={() => setShowNewsletter(false)} />}

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>
    </>
  )
}

/* ── Sub-components ─────────────────────────────────────── */

function LienRow({ href, icon, label, internal }: { href: string; icon: React.ReactNode; label: string; internal?: boolean }) {
  const style: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '14px 18px',
    background: 'var(--surface)',
    border: '1px solid var(--border)',
    borderRadius: 3,
    textDecoration: 'none',
    color: 'var(--fg)',
    fontSize: 13,
    transition: 'background .15s',
  }
  const inner = (
    <>
      <span style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <span style={{ color: 'var(--muted)' }}>{icon}</span>
        {label}
      </span>
      <span style={{ color: 'var(--muted)', display: 'flex' }}><IcoArrow /></span>
    </>
  )
  const hoverIn = (e: React.MouseEvent<HTMLAnchorElement>) => (e.currentTarget.style.background = 'var(--surface2)')
  const hoverOut = (e: React.MouseEvent<HTMLAnchorElement>) => (e.currentTarget.style.background = 'var(--surface)')

  if (internal) {
    return (
      <Link href={href} style={style} onMouseEnter={hoverIn} onMouseLeave={hoverOut}>
        {inner}
      </Link>
    )
  }
  return (
    <a href={href} target="_blank" rel="noreferrer" style={style} onMouseEnter={hoverIn} onMouseLeave={hoverOut}>
      {inner}
    </a>
  )
}

function LienCell({ href, icon, label }: { href: string; icon: React.ReactNode; label: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="grid-cell"
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '14px 18px',
        textDecoration: 'none',
        color: 'var(--fg)',
        fontSize: 13,
        transition: 'background .15s',
      }}
    >
      <span style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <span style={{ color: 'var(--muted)' }}>{icon}</span>
        {label}
      </span>
      <span style={{ color: 'var(--muted)', display: 'flex' }}><IcoArrow /></span>
    </a>
  )
}
