'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import Header from '@/components/Header'
import Hero from '@/components/Hero'
import LatestVideos from '@/components/LatestVideos'
import TwoDoors from '@/components/TwoDoors'
import AboutIntro from '@/components/AboutIntro'
import Formats from '@/components/Formats'
import About from '@/components/About'
import Campaign from '@/components/Campaign'
import Ticker from '@/components/Ticker'
import Footer from '@/components/Footer'

const sectionStyle: React.CSSProperties = {
  padding: 'clamp(48px,6vw,88px) clamp(16px,4vw,48px)',
  borderBottom: '1px solid var(--border)',
  scrollMarginTop: 'calc(var(--hh) + 16px)',
}

function ArrowIcon() {
  return (
    <svg width={11} height={11} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
      <path d="M3 8h10M9 4l4 4-4 4" />
    </svg>
  )
}

function Eyebrow({ n, label }: { n: string; label: string }) {
  return (
    <div className="sec-eyebrow" style={{ marginBottom: 12 }}>
      <span>{n}</span>
      <span>— {label}</span>
    </div>
  )
}

export default function Page() {
  // Apparition au scroll des éléments .rv
  useEffect(() => {
    const els = document.querySelectorAll('.rv')
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add('on') }),
      { threshold: 0.1 }
    )
    els.forEach((el) => obs.observe(el))
    return () => obs.disconnect()
  }, [])

  return (
    <div style={{ background: 'var(--bg)', color: 'var(--fg)', minHeight: '100vh' }}>
      <Header />
      <Hero />

      {/* 01 — Dernières vidéos */}
      <section id="videos" style={sectionStyle}>
        <div style={{ maxWidth: 1440, margin: '0 auto' }}>
          <div className="sec-head-row">
            <div>
              <Eyebrow n="01" label="Dernières vidéos" />
              <h2 className="sec-title-display">Ce qu&apos;on publie</h2>
            </div>
            <Link href="/publications" className="btn-outline-st" style={{ padding: '12px 20px', fontSize: 12 }}>
              Toutes les publications <ArrowIcon />
            </Link>
          </div>
          <LatestVideos />
        </div>
      </section>

      {/* 02 — Deux façons d'entrer */}
      <section id="pro" style={{ ...sectionStyle, background: 'var(--surface)' }}>
        <div style={{ maxWidth: 1440, margin: '0 auto' }}>
          <Eyebrow n="02" label="Deux façons d'entrer" />
          <div style={{ marginTop: 20 }}>
            <TwoDoors />
          </div>
        </div>
      </section>

      {/* 03 — Le média */}
      <section id="media" style={sectionStyle}>
        <div style={{ maxWidth: 1440, margin: '0 auto' }}>
          <div className="sec-head-row" style={{ marginBottom: 36 }}>
            <div>
              <Eyebrow n="03" label="Le média" />
              <h2 className="sec-title-display">Politiser sans bullshit</h2>
            </div>
            <p style={{ fontSize: 15, color: 'var(--fg2)', maxWidth: 420, lineHeight: 1.6, textWrap: 'pretty' }}>
              Lancé en février 2025 par une jeune équipe francilienne. Financé par la communauté, sans pubs ni actionnaires.
            </p>
          </div>

          <div style={{ marginBottom: 56 }}>
            <AboutIntro />
          </div>

          <Formats />
        </div>
      </section>

      {/* 04 — Équipe */}
      <section id="equipe" style={sectionStyle}>
        <div style={{ maxWidth: 1440, margin: '0 auto' }}>
          <Eyebrow n="04" label="Équipe" />
          <h2
            className="sec-title-display"
            style={{ paddingBottom: 20, marginBottom: 32, borderBottom: '1px solid var(--border)' }}
          >
            Personnes &amp; visages
          </h2>
          <About />
        </div>
      </section>

      {/* 05 — Campagne de soutien */}
      <section id="soutenir" style={{ ...sectionStyle, background: 'var(--surface)' }}>
        <div style={{ maxWidth: 1440, margin: '0 auto' }}>
          <Eyebrow n="05" label="Campagne de soutien" />
          <h2
            className="sec-title-display grad-text"
            style={{ paddingBottom: 20, marginBottom: 36, borderBottom: '1px solid var(--border)' }}
          >
            La Transition
          </h2>
          <Campaign />
        </div>
      </section>

      <Ticker />
      <Footer />
    </div>
  )
}
