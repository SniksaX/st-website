'use client'

import { type FormEvent, useEffect, useState } from 'react'

export default function ProtectedDocumentGate({ onUnlock }: { onUnlock: () => void }) {
  const [value, setValue] = useState('')
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(false)
  const [checkingSavedAccess, setCheckingSavedAccess] = useState(true)
  const [show, setShow] = useState(false)

  useEffect(() => {
    let cancelled = false

    ;(async () => {
      try {
        const res = await fetch('/api/mediapart-auth', { cache: 'no-store' })
        if (!cancelled && res.ok) onUnlock()
      } finally {
        if (!cancelled) setCheckingSavedAccess(false)
      }
    })()

    return () => {
      cancelled = true
    }
  }, [onUnlock])

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (!value.trim()) return

    setLoading(true)
    setError(false)

    try {
      const res = await fetch('/api/mediapart-auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password: value }),
      })

      if (res.ok) {
        onUnlock()
      } else {
        setError(true)
        setValue('')
      }
    } catch {
      setError(true)
    } finally {
      setLoading(false)
    }
  }

  const GRAD = 'linear-gradient(90deg, oklch(0.72 0.27 290) 0%, oklch(0.78 0.22 330) 48%, oklch(0.85 0.25 40) 100%)'

  if (checkingSavedAccess) {
    return (
      <div style={{ minHeight: '100vh', background: '#08080e', color: '#f0ede8', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24, fontFamily: 'var(--font-body)' }}>
        <span style={{ fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.28em', color: '#5a5a72' }}>Vérification…</span>
      </div>
    )
  }

  return (
    <div style={{ minHeight: '100vh', background: '#08080e', color: '#f0ede8', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24, fontFamily: 'var(--font-body)', position: 'relative', overflow: 'hidden' }}>
      {/* Grid background */}
      <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(#1c1c2c 1px, transparent 1px), linear-gradient(90deg, #1c1c2c 1px, transparent 1px)', backgroundSize: '72px 72px', opacity: 0.09, pointerEvents: 'none' }} />
      {/* Orbs */}
      <div style={{ position: 'absolute', top: '-15%', left: '-10%', width: '70vw', height: '70vw', background: 'radial-gradient(circle, oklch(0.72 0.27 290 / 0.09) 0%, transparent 60%)', filter: 'blur(100px)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: '-15%', right: '-10%', width: '60vw', height: '60vw', background: 'radial-gradient(circle, oklch(0.85 0.25 40 / 0.07) 0%, transparent 60%)', filter: 'blur(100px)', pointerEvents: 'none' }} />

      <div style={{ position: 'relative', width: '100%', maxWidth: 380 }}>
        {/* Wordmark */}
        <div style={{ marginBottom: 52, textAlign: 'center' }}>
          <div style={{ fontSize: 'clamp(36px, 7vw, 56px)', fontWeight: 700, letterSpacing: '-0.04em', lineHeight: 0.92, background: 'var(--fg, #f0ede8)', WebkitBackgroundClip: 'text' }}>
            SANS<br />
            <span style={{ background: GRAD, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>TRANSITION</span>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 24, justifyContent: 'center' }}>
          <span style={{ display: 'inline-block', width: 24, height: 2, background: GRAD, flexShrink: 0 }} />
          <span style={{ fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.28em', color: '#5a5a72' }}>Document confidentiel</span>
        </div>

        <p style={{ fontSize: 13, color: '#a8a4b0', marginBottom: 32, lineHeight: 1.65, textAlign: 'center' }}>
          Ce document est réservé à son destinataire.
        </p>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div style={{ position: 'relative' }}>
            <input
              autoFocus
              type={show ? 'text' : 'password'}
              value={value}
              onChange={(e) => { setValue(e.target.value); setError(false) }}
              placeholder="Mot de passe"
              disabled={loading}
              style={{ width: '100%', boxSizing: 'border-box', padding: '14px 48px 14px 18px', background: '#0d0d18', border: `1px solid ${error ? '#ef4444' : '#282840'}`, borderRadius: 1, fontSize: 14, color: '#f0ede8', outline: 'none', fontFamily: 'inherit', transition: 'border-color 0.2s' }}
            />
            <button type="button" onClick={() => setShow((s) => !s)} style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: '#5a5a72', padding: 4, display: 'flex', alignItems: 'center' }}>
              {show ? (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
                  <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
                  <line x1="1" y1="1" x2="23" y2="23" />
                </svg>
              ) : (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
              )}
            </button>
          </div>

          {error && <p style={{ fontSize: 11, color: '#ef4444' }}>Mot de passe incorrect.</p>}

          <button
            type="submit"
            disabled={loading || !value.trim()}
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, background: GRAD, color: '#fff', fontFamily: 'inherit', fontWeight: 600, fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.24em', padding: '14px 22px', borderRadius: 1, border: 'none', cursor: loading || !value.trim() ? 'not-allowed' : 'pointer', opacity: loading || !value.trim() ? 0.6 : 1, marginTop: 4, transition: 'opacity 0.2s' }}
          >
            {loading ? 'Vérification…' : 'Accéder au dossier'}
          </button>
        </form>
      </div>
    </div>
  )
}
