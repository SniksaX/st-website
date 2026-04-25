'use client'

import { useEffect } from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import VideosYouTube from '@/components/VideosYouTube'
import VideosTikTok from '@/components/VideosTikTokFromJson'
import Link from 'next/link'

function BackIcon() {
  return (
    <svg width={12} height={12} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
      <path d="M13 8H3M7 4l-4 4 4 4" />
    </svg>
  )
}

export default function PublicationsPage() {
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
        paddingTop: 'calc(var(--hh) + clamp(40px,6vw,80px))',
        padding: 'calc(var(--hh) + clamp(40px,6vw,80px)) clamp(16px,4vw,48px) 0',
        maxWidth: 1440,
        margin: '0 auto',
      }}>
        <Link
          href="/"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
            fontSize: 11,
            textTransform: 'uppercase',
            letterSpacing: '0.2em',
            color: 'var(--muted)',
            textDecoration: 'none',
            marginBottom: 32,
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--fg)')}
          onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--muted)')}
        >
          <BackIcon /> Accueil
        </Link>

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
                04 — Publications
              </span>
            </div>
            <h1 style={{
              fontSize: 'clamp(32px,5vw,64px)',
              fontWeight: 700,
              letterSpacing: '-0.03em',
              lineHeight: 0.95,
            }}>
              <span style={{ WebkitTextStroke: '1.5px var(--fg)', WebkitTextFillColor: 'transparent', display: 'block' }}>
                Nos
              </span>
              <span style={{ display: 'block', color: 'var(--fg)', WebkitTextFillColor: 'var(--fg)', background: 'none' }}>
                Vidéos
              </span>
            </h1>
          </div>
          <p style={{ fontSize: 14, color: 'var(--fg2)', maxWidth: 360, lineHeight: 1.6, textAlign: 'right' }}>
            Toutes les publications YouTube et TikTok de Sans Transition — radical, queer, féministe, accessible.
          </p>
        </div>
      </div>

      {/* YouTube section */}
      <section style={{
        padding: 'clamp(48px,6vw,80px) clamp(16px,4vw,48px)',
        borderTop: '1px solid var(--border)',
      }}>
        <div style={{ maxWidth: 1440, margin: '0 auto' }}>
          <div className="sec-head">
            <div className="sec-eyebrow">
              <span>01</span>
              <span>— YouTube</span>
            </div>
            <h2 className="sec-title">Dernières vidéos</h2>
          </div>
          <VideosYouTube />
        </div>
      </section>

      {/* TikTok section */}
      <section style={{
        padding: 'clamp(48px,6vw,80px) clamp(16px,4vw,48px)',
        borderTop: '1px solid var(--border)',
      }}>
        <div style={{ maxWidth: 1440, margin: '0 auto' }}>
          <div className="sec-head">
            <div className="sec-eyebrow">
              <span>02</span>
              <span>— TikTok</span>
            </div>
            <h2 className="sec-title">Toutes les vidéos</h2>
          </div>
          <VideosTikTok />
        </div>
      </section>

      <Footer />
    </div>
  )
}
