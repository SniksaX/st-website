'use client'

import { useEffect, useRef, useState } from 'react'

/* ── Icons ─────────────────────────────────── */
function IcoTikTok({ s = 16 }: { s?: number }) {
  return (
    <svg width={s} height={s} viewBox="0 0 256 256" fill="currentColor">
      <path d="M224 88.4c-23.6 0-42.8-19.2-42.8-42.8V32h-36.6v132.1c0 19.7-16 35.7-35.7 35.7s-35.7-16-35.7-35.7 16-35.7 35.7-35.7c2.4 0 4.7.2 6.9.7V92.6c-2.3-.3-4.6-.5-6.9-.5-39.8 0-72.2 32.4-72.2 72.2s32.4 72.2 72.2 72.2 72.2-32.4 72.2-72.2v-56c12.1 8.7 26.9 13.9 42.8 13.9v-33.8z" />
    </svg>
  )
}
function IcoIG({ s = 16 }: { s?: number }) {
  return (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <circle cx="12" cy="12" r="4.5" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  )
}
function IcoYT({ s = 16 }: { s?: number }) {
  return (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="currentColor">
      <path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.5A3 3 0 0 0 .5 6.2C0 8.1 0 12 0 12s0 3.9.5 5.8a3 3 0 0 0 2.1 2.1c1.9.5 9.4.5 9.4.5s7.5 0 9.4-.5a3 3 0 0 0 2.1-2.1C24 15.9 24 12 24 12s0-3.9-.5-5.8zM9.7 15.5v-7l6.3 3.5-6.3 3.5z" />
    </svg>
  )
}
function ArrowIcon() {
  return (
    <svg width={12} height={12} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M3 8h10M9 4l4 4-4 4" />
    </svg>
  )
}

/* ── Animated counter ───────────────────────── */
function AnimatedCount({ target, suffix }: { target: number; suffix: string }) {
  const [val, setVal] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return
      obs.disconnect()
      const start = performance.now()
      const duration = 1200
      const tick = (now: number) => {
        const p = Math.min((now - start) / duration, 1)
        const ease = 1 - Math.pow(1 - p, 3)
        setVal(Math.round(ease * target))
        if (p < 1) requestAnimationFrame(tick)
      }
      requestAnimationFrame(tick)
    }, { threshold: 0.5 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [target])

  return <span ref={ref}>{val}{suffix}</span>
}

/* ── Stats config ───────────────────────────── */
const STATS = [
  { icon: <IcoTikTok s={13} />, animated: true,  target: 40, suffix: 'k+', label: 'TikTok' },
  { icon: <IcoIG s={13} />,     animated: true,  target: 3,  suffix: 'k+', label: 'Instagram' },
  { icon: <IcoYT s={13} />,     animated: true,  target: 1,  suffix: 'k+', label: 'YouTube' },
  { icon: null,                  animated: false, val: 'fév. 2025',       label: 'Depuis' },
  { icon: null,                  animated: false, val: 'Asso. loi 1901',  label: 'Statut' },
]

/* ── Hero ───────────────────────────────────── */
export default function Hero() {
  const rvRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const els = rvRef.current?.querySelectorAll('.rv') ?? []
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add('on') }),
      { threshold: 0.08 }
    )
    els.forEach((el) => obs.observe(el))
    return () => obs.disconnect()
  }, [])

  const scrollToAbout = () => {
    const el = document.getElementById('about')
    if (!el) return
    const offset = el.getBoundingClientRect().top + window.scrollY - (56 + 44 + 20)
    window.scrollTo({ top: Math.max(0, offset), behavior: 'smooth' })
  }

  return (
    <section
      ref={rvRef}
      style={{
        minHeight: '100vh',
        paddingTop: 'var(--hh)',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Ambient glows */}
      <div aria-hidden style={{ position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none' }}>
        <div style={{
          position: 'absolute', top: '5%', left: '-10%',
          width: '60vw', height: '60vw',
          background: 'radial-gradient(circle, oklch(0.72 0.27 290 / 0.09) 0%, transparent 65%)',
          filter: 'blur(60px)',
          animation: 'glow-pulse-a 7s ease-in-out infinite',
        }} />
        <div style={{
          position: 'absolute', bottom: 0, right: '-10%',
          width: '45vw', height: '45vw',
          background: 'radial-gradient(circle, oklch(0.85 0.25 40 / 0.07) 0%, transparent 65%)',
          filter: 'blur(60px)',
          animation: 'glow-pulse-b 9s ease-in-out infinite',
        }} />
        {/* Subtle grid */}
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px)',
          backgroundSize: '80px 80px',
          opacity: 0.18,
        }} />
      </div>

      {/* Main content */}
      <div style={{
        flex: 1, zIndex: 1,
        maxWidth: 1440, width: '100%', margin: '0 auto',
        padding: 'clamp(48px,7vw,96px) clamp(16px,4vw,48px) 0',
        display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 40,
      }}>
        <div style={{ flex: 1, minWidth: 0 }}>
          {/* Location label */}
          <div className="rv" style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 40 }}>
            <span className="grad-line" />
            <span style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.32em', color: 'var(--muted)' }}>
              Paris · Depuis fév. 2025
            </span>
          </div>

          {/* Wordmark */}
          <div style={{ lineHeight: 0.9, marginBottom: 40 }}>
            <span
              className="rv flicker-title"
              style={{
                display: 'block',
                fontFamily: 'var(--font-barbra)',
                fontWeight: 400,
                fontSize: 'clamp(72px, 13.5vw, 196px)',
                letterSpacing: '-0.01em',
                WebkitTextStroke: '1.5px var(--fg)',
                WebkitTextFillColor: 'transparent',
                animationDuration: '6s',
              }}
            >
              Sans
            </span>
            <span
              className="rv rv-d1 grad-text flicker-title"
              style={{
                display: 'block',
                fontFamily: 'var(--font-barbra)',
                fontWeight: 400,
                fontSize: 'clamp(72px, 13.5vw, 196px)',
                letterSpacing: '-0.01em',
                animationDelay: '0.15s',
                animationDuration: '7.5s',
              }}
            >
              Transition
            </span>
          </div>

          {/* Pull quote */}
          <p
            className="rv rv-d2 quote"
            style={{
              fontSize: 'clamp(15px, 1.8vw, 21px)',
              maxWidth: 520,
              marginBottom: 40,
            }}
          >
            &ldquo;Politiser sans bullshit. On raconte l&apos;actualité depuis les premiers et premières concerné·es — radical, queer, féministe, accessible.&rdquo;
          </p>

          {/* CTAs */}
          <div className="rv rv-d3" style={{ display: 'flex', gap: 12, flexWrap: 'wrap', paddingBottom: 48 }}>
            <a
              href="https://www.helloasso.com/associations/sans-transition/formulaires/1"
              target="_blank"
              rel="noreferrer"
              className="btn-grad"
              style={{ padding: '14px 28px', fontSize: 12 }}
            >
              Soutenir le média <ArrowIcon />
            </a>
            <button
              onClick={scrollToAbout}
              className="btn-outline-st"
              style={{ padding: '14px 28px', fontSize: 12 }}
            >
              Découvrir
            </button>
          </div>
        </div>
      </div>

      {/* Stats strip */}
      <div style={{
        zIndex: 1,
        borderTop: '1px solid var(--border)',
        padding: '18px clamp(16px,4vw,48px)',
      }}>
        <div style={{ maxWidth: 1440, margin: '0 auto' }}>
          <div style={{ display: 'flex', gap: 40, alignItems: 'center', overflowX: 'auto', flexWrap: 'wrap' }}>
            {STATS.map((st, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
                {i > 0 && <span style={{ color: 'var(--border2)', fontSize: 18, lineHeight: 1 }}>·</span>}
                {st.icon && <span style={{ color: 'var(--muted)' }}>{st.icon}</span>}
                <span style={{ fontSize: 18, fontWeight: 700, letterSpacing: '-0.02em', color: 'var(--fg)' }}>
                  {st.animated
                    ? <AnimatedCount target={st.target!} suffix={st.suffix!} />
                    : st.val
                  }
                </span>
                <span style={{ fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.18em', color: 'var(--muted)' }}>{st.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}