'use client'

import { useEffect, useState, type FormEvent } from 'react'
import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

function BackIcon() {
  return (
    <svg width={12} height={12} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
      <path d="M13 8H3M7 4l-4 4 4 4" />
    </svg>
  )
}
function ArrowIcon() {
  return (
    <svg width={11} height={11} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
      <path d="M3 8h10M9 4l4 4-4 4" />
    </svg>
  )
}
function IcoMail() {
  return (
    <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden>
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
      <polyline points="22,6 12,13 2,6" />
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
function IcoTikTok() {
  return (
    <svg width={16} height={16} viewBox="0 0 256 256" fill="currentColor" aria-hidden>
      <path d="M224 88.4c-23.6 0-42.8-19.2-42.8-42.8V32h-36.6v132.1c0 19.7-16 35.7-35.7 35.7s-35.7-16-35.7-35.7 16-35.7 35.7-35.7c2.4 0 4.7.2 6.9.7V92.6c-2.3-.3-4.6-.5-6.9-.5-39.8 0-72.2 32.4-72.2 72.2s32.4 72.2 72.2 72.2 72.2-32.4 72.2-72.2v-56c12.1 8.7 26.9 13.9 42.8 13.9v-33.8z" />
    </svg>
  )
}
function IcoIG() {
  return (
    <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden>
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <circle cx="12" cy="12" r="4.5" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  )
}
function IcoCheck() {
  return (
    <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <polyline points="20 6 9 17 4 12" />
    </svg>
  )
}

type FormState = 'idle' | 'loading' | 'success' | 'error'

const SUBJECTS = [
  'Proposition de sujet / témoignage',
  'Partenariat / collaboration',
  'Demande presse',
  'Soutien / don',
  'Autre',
]

const SOCIALS = [
  { label: 'TikTok',    href: 'https://tiktok.com/@sanstransition',       icon: <IcoTikTok /> },
  { label: 'Instagram', href: 'https://instagram.com/sanstransition__',   icon: <IcoIG /> },
]

export default function ContactPage() {
  const [subject, setSubject] = useState(SUBJECTS[0])
  const [name, setName]       = useState('')
  const [email, setEmail]     = useState('')
  const [message, setMessage] = useState('')
  const [state, setState]     = useState<FormState>('idle')
  const [error, setError]     = useState('')

  useEffect(() => {
    const els = document.querySelectorAll('.rv')
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add('on') }),
      { threshold: 0.08 }
    )
    els.forEach((el) => obs.observe(el))
    return () => obs.disconnect()
  }, [])

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    if (!email.trim() || !message.trim()) {
      setError('Email et message requis.')
      setState('error')
      return
    }
    setState('loading')
    setError('')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ subject, name, email, message }),
      })
      if (!res.ok) throw new Error(await res.text())
      setState('success')
    } catch {
      setState('error')
      setError('Impossible d\'envoyer le message. Réessaie ou écris directement à contact@sanstransition.fr')
    }
  }

  const inputStyle = {
    width: '100%',
    boxSizing: 'border-box' as const,
    padding: '11px 14px',
    background: 'var(--bg)',
    border: '1px solid var(--border)',
    borderRadius: 2,
    fontSize: 13,
    color: 'var(--fg)',
    outline: 'none',
    fontFamily: 'var(--font-body)',
    transition: 'border-color .15s',
  }

  return (
    <div style={{ background: 'var(--bg)', color: 'var(--fg)', minHeight: '100vh' }}>
      <Header />

      {/* Page header */}
      <div style={{
        padding: 'calc(var(--hh) + clamp(40px,6vw,80px)) clamp(16px,4vw,48px) 0',
        maxWidth: 1440,
        margin: '0 auto',
      }}>
        {/* Breadcrumb */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 32 }}>
          <Link href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.2em', color: 'var(--muted)', textDecoration: 'none' }}>
            <BackIcon /> Accueil
          </Link>
          <span style={{ fontSize: 11, color: 'var(--border2)' }}>/</span>
          <span style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.2em', color: 'var(--fg2)' }}>Contact</span>
        </div>

        {/* Title block */}
        <div style={{
          paddingBottom: 24,
          borderBottom: '1px solid var(--border)',
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'space-between',
          gap: 24,
          flexWrap: 'wrap',
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
              <span className="grad-line" />
              <span style={{ fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.28em', color: 'var(--muted)' }}>
                Nous écrire
              </span>
            </div>
            <h1 style={{ fontSize: 'clamp(32px,5vw,64px)', fontWeight: 700, letterSpacing: '-0.03em', lineHeight: 0.95 }}>
              <span style={{ WebkitTextStroke: '1.5px var(--fg)', WebkitTextFillColor: 'transparent', display: 'block' }}>Nous</span>
              <span className="grad-text" style={{ display: 'block' }}>contacter</span>
            </h1>
          </div>
          <p style={{ fontSize: 14, color: 'var(--fg2)', maxWidth: 360, lineHeight: 1.65, textAlign: 'right' }}>
            Pour un sujet, une collaboration, une demande presse ou juste pour dire bonjour — on lit tout.
          </p>
        </div>
      </div>

      {/* Two-col layout */}
      <div style={{
        maxWidth: 1440,
        margin: '0 auto',
        padding: 'clamp(48px,6vw,80px) clamp(16px,4vw,48px)',
        display: 'grid',
        gridTemplateColumns: 'minmax(0,1fr) 320px',
        gap: 'clamp(32px,5vw,80px)',
        alignItems: 'start',
      }}
        className="contact-grid"
      >

        {/* Form */}
        <div className="rv">
          {state === 'success' ? (
            <div style={{
              border: '1px solid var(--border)',
              borderRadius: 3,
              background: 'var(--surface)',
              padding: 'clamp(32px,4vw,56px)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 16,
              textAlign: 'center',
            }}>
              <span style={{ color: 'var(--fg)', display: 'flex' }}><IcoCheck /></span>
              <p style={{ fontSize: 18, fontWeight: 700, color: 'var(--fg)' }}>Message envoyé !</p>
              <p style={{ fontSize: 13, color: 'var(--fg2)', lineHeight: 1.65, maxWidth: 360 }}>
                On essaie de répondre sous 48h. En attendant, tu peux nous suivre sur les réseaux.
              </p>
              <button
                onClick={() => { setState('idle'); setMessage(''); setName(''); setEmail('') }}
                className="btn-outline-st"
                style={{ marginTop: 8 }}
              >
                Envoyer un autre message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 1 }}>

              {/* Sujet */}
              <div style={{ background: 'var(--border)', borderRadius: 3, overflow: 'hidden' }}>
                <div style={{ background: 'var(--surface)', padding: '20px 24px' }}>
                  <label style={{ display: 'block', fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.22em', color: 'var(--muted)', marginBottom: 10 }}>
                    Sujet
                  </label>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                    {SUBJECTS.map((s) => (
                      <button
                        key={s}
                        type="button"
                        onClick={() => setSubject(s)}
                        style={{
                          padding: '5px 12px',
                          fontSize: 11,
                          letterSpacing: '0.06em',
                          borderRadius: 2,
                          border: `1px solid ${subject === s ? 'transparent' : 'var(--border2)'}`,
                          background: subject === s ? 'var(--grad)' : 'none',
                          color: subject === s ? '#fff' : 'var(--muted)',
                          cursor: 'pointer',
                          fontFamily: 'var(--font-body)',
                          transition: 'all .15s',
                        }}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Nom + Email */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: 1,
                background: 'var(--border)',
                borderRadius: 3,
                overflow: 'hidden',
              }}
                className="form-row"
              >
                <div style={{ background: 'var(--surface)', padding: '20px 24px' }}>
                  <label style={{ display: 'block', fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.22em', color: 'var(--muted)', marginBottom: 10 }}>
                    Prénom / pseudo
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Hedji"
                    style={inputStyle}
                    onFocus={(e) => (e.target.style.borderColor = 'var(--border2)')}
                    onBlur={(e) => (e.target.style.borderColor = 'var(--border)')}
                  />
                </div>
                <div style={{ background: 'var(--surface)', padding: '20px 24px' }}>
                  <label style={{ display: 'block', fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.22em', color: 'var(--muted)', marginBottom: 10 }}>
                    Email <span style={{ color: 'var(--muted)' }}>*</span>
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="toi@exemple.com"
                    required
                    style={inputStyle}
                    onFocus={(e) => (e.target.style.borderColor = 'var(--border2)')}
                    onBlur={(e) => (e.target.style.borderColor = 'var(--border)')}
                  />
                </div>
              </div>

              {/* Message */}
              <div style={{ background: 'var(--surface)', borderRadius: 3, padding: '20px 24px', border: '1px solid var(--border)' }}>
                <label style={{ display: 'block', fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.22em', color: 'var(--muted)', marginBottom: 10 }}>
                  Message <span style={{ color: 'var(--muted)' }}>*</span>
                </label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Votre message..."
                  required
                  rows={6}
                  style={{
                    ...inputStyle,
                    resize: 'vertical',
                    minHeight: 120,
                  }}
                  onFocus={(e) => (e.target.style.borderColor = 'var(--border2)')}
                  onBlur={(e) => (e.target.style.borderColor = 'var(--border)')}
                />
              </div>

              {error && (
                <p style={{ fontSize: 12, color: '#ef4444', padding: '8px 0' }}>{error}</p>
              )}

              {/* Submit */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginTop: 4 }}>
                <button
                  type="submit"
                  disabled={state === 'loading'}
                  className="btn-grad"
                  style={{ padding: '13px 28px', fontSize: 12, opacity: state === 'loading' ? 0.6 : 1 }}
                >
                  {state === 'loading' ? (
                    <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <span style={{ width: 12, height: 12, border: '2px solid rgba(255,255,255,0.3)', borderTopColor: '#fff', borderRadius: '50%', animation: 'spin 0.8s linear infinite', display: 'inline-block' }} />
                      Envoi…
                    </span>
                  ) : (
                    <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      Envoyer <ArrowIcon />
                    </span>
                  )}
                </button>
                <p style={{ fontSize: 11, color: 'var(--muted)' }}>
                  Réponse sous 48h
                </p>
              </div>

            </form>
          )}
        </div>

        {/* Sidebar */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 1 }} className="rv rv-d1">

          {/* Email direct */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 1,
            background: 'var(--border)',
            borderRadius: 3,
            overflow: 'hidden',
            marginBottom: 16,
          }}>
            <div className="grid-cell" style={{ padding: '20px 24px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
                <span style={{ color: 'var(--muted)' }}><IcoMail /></span>
                <span style={{ fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.22em', color: 'var(--muted)' }}>Email direct</span>
              </div>
              <a
                href="mailto:contact@sanstransition.fr"
                style={{ fontSize: 13, color: 'var(--fg)', textDecoration: 'none', wordBreak: 'break-all', transition: 'color .15s' }}
                onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--muted)')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--fg)')}
              >
                contact@sanstransition.fr
              </a>
            </div>

            <div className="grid-cell" style={{ padding: '20px 24px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
                <span style={{ color: 'var(--muted)' }}><IcoMsg /></span>
                <span style={{ fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.22em', color: 'var(--muted)' }}>Proposer un sujet</span>
              </div>
              <a
                href="https://forms.gle/yoHVL6iKBi6Adz8T9"
                target="_blank"
                rel="noreferrer"
                style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 12, color: 'var(--fg2)', textDecoration: 'none', transition: 'color .15s' }}
                onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--fg)')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--fg2)')}
              >
                Formulaire Google <ArrowIcon />
              </a>
            </div>
          </div>

          {/* Réseaux */}
          <div style={{
            border: '1px solid var(--border)',
            borderRadius: 3,
            background: 'var(--surface)',
            padding: '20px 24px',
          }}>
            <p style={{ fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.22em', color: 'var(--muted)', marginBottom: 14 }}>
              Sur les réseaux
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {SOCIALS.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 10,
                    fontSize: 12,
                    color: 'var(--fg2)',
                    textDecoration: 'none',
                    transition: 'color .15s',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--fg)')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--fg2)')}
                >
                  <span style={{ color: 'var(--muted)' }}>{s.icon}</span>
                  {s.label}
                  <span style={{ marginLeft: 'auto', color: 'var(--border2)' }}><ArrowIcon /></span>
                </a>
              ))}
            </div>
          </div>

          {/* Note */}
          <p style={{ fontSize: 11, color: 'var(--muted)', lineHeight: 1.6, marginTop: 16, padding: '0 4px' }}>
            On est une petite équipe bénévole — on lit tout mais on ne peut pas toujours répondre à tout. Merci de votre compréhension.
          </p>

        </div>
      </div>

      <Footer />

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        @media (max-width: 860px) {
          .contact-grid { grid-template-columns: 1fr !important; }
          .form-row { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  )
}
