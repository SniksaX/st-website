'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import VideosTikTok from '@/components/VideosTikTokFromJson'

function BackIcon() {
  return (
    <svg width={12} height={12} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
      <path d="M13 8H3M7 4l-4 4 4 4" />
    </svg>
  )
}
function ArrowIcon() {
  return (
    <svg width={12} height={12} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
      <path d="M3 8h10M9 4l4 4-4 4" />
    </svg>
  )
}

export default function LeMediaPage() {
  useEffect(() => {
    const els = document.querySelectorAll('.rv')
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add('on') }),
      { threshold: 0.08 }
    )
    els.forEach((el) => obs.observe(el))
    return () => obs.disconnect()
  }, [])

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
          <span style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.2em', color: 'var(--border2)' }}>Collabs</span>
          <span style={{ fontSize: 11, color: 'var(--border2)' }}>/</span>
          <span style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.2em', color: 'var(--fg2)' }}>Le Média</span>
        </div>

        {/* Title block */}
        <div style={{
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'space-between',
          gap: 24,
          paddingBottom: 24,
          marginBottom: 48,
          borderBottom: '1px solid var(--border)',
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
              <span className="grad-line" />
              <span style={{ fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.28em', color: 'var(--muted)' }}>
                Collabs — Fokus
              </span>
            </div>
            <h1 style={{ fontSize: 'clamp(32px,5vw,64px)', fontWeight: 700, letterSpacing: '-0.03em', lineHeight: 0.95 }}>
              <span style={{ WebkitTextStroke: '1.5px var(--fg)', WebkitTextFillColor: 'transparent', display: 'block' }}>Le</span>
              <span className="grad-text" style={{ display: 'block' }}>Média</span>
            </h1>
          </div>

          <div style={{ maxWidth: 400, display: 'flex', flexDirection: 'column', gap: 16, alignItems: 'flex-end' }}>
            <p style={{ fontSize: 14, color: 'var(--fg2)', lineHeight: 1.6, textAlign: 'right' }}>
              Chaque semaine, Hedji, Lucho & Amandine font un Fokus sur un sujet d&apos;actualité politique — en collaboration avec Le Média.
            </p>
            <a
              href="https://www.lemediatv.fr"
              target="_blank"
              rel="noreferrer"
              className="btn-outline-st"
              style={{ padding: '9px 18px', fontSize: 10 }}
            >
              lemediatv.fr <ArrowIcon />
            </a>
          </div>
        </div>
      </div>

      {/* Context strip */}
      <div style={{ borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)', background: 'var(--surface)' }}>
        <div style={{ maxWidth: 1440, margin: '0 auto', padding: '20px clamp(16px,4vw,48px)', display: 'flex', gap: 1, flexWrap: 'wrap' }}>
          {[
            { n: 'Format', v: 'Fokus hebdomadaire' },
            { n: 'Partenaire', v: 'Le Média' },
            { n: 'Équipe', v: 'Hedji · Lucho · Amandine' },
            { n: 'Plateforme', v: 'TikTok' },
          ].map((s) => (
            <div key={s.n} style={{ paddingRight: 40 }}>
              <p style={{ fontSize: 9, textTransform: 'uppercase', letterSpacing: '0.2em', color: 'var(--muted)', marginBottom: 4 }}>{s.n}</p>
              <p style={{ fontSize: 13, fontWeight: 600, color: 'var(--fg)' }}>{s.v}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Videos */}
      <section style={{ padding: 'clamp(48px,6vw,80px) clamp(16px,4vw,48px)' }}>
        <div style={{ maxWidth: 1440, margin: '0 auto' }}>
          <VideosTikTok src="/videos_lemedia.json" />
        </div>
      </section>

      <Footer />
    </div>
  )
}
