'use client'

import { useEffect } from 'react'
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
    <svg width={12} height={12} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
      <path d="M3 8h10M9 4l4 4-4 4" />
    </svg>
  )
}

const COLLABS = [
  {
    slug: '/collabs/LeMedia',
    n: '01',
    partner: 'Le Média',
    type: 'Fokus hebdomadaire',
    description: 'Chaque semaine, Hedji, Lucho & Amandine font un Fokus sur un sujet d\'actualité politique en co-production avec Le Média — radical, sourcé, sans compromis.',
    tags: ['TikTok', 'Fokus', 'Politique'],
    count: '11 épisodes',
    since: 'fév. 2026',
    url: 'https://www.lemediatv.fr',
    urlLabel: 'lemediatv.fr',
  },
  {
    slug: '/collabs/LesComploteurs',
    n: '02',
    partner: 'Les Comploteurs',
    type: 'Livre-enquête',
    description: 'Un livre-enquête sur l\'affaire Perdriau : chantage, homophobie, méthodes de contrôle politique. Sans Transition a reçu Antton Rouget pour une interview longue format.',
    tags: ['Interview', 'Enquête', 'Pouvoir local'],
    count: 'Livre + Interview',
    since: 'jan. 2026',
    url: 'https://lescomploteurs.com',
    urlLabel: 'lescomploteurs.com',
  },
]

export default function CollabsPage() {
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
          <span style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.2em', color: 'var(--fg2)' }}>Collabs</span>
        </div>

        {/* Title */}
        <div style={{
          paddingBottom: 24,
          marginBottom: 0,
          borderBottom: '1px solid var(--border)',
        }}>
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 24 }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
                <span className="grad-line" />
                <span style={{ fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.28em', color: 'var(--muted)' }}>
                  Collaborations
                </span>
              </div>
              <h1 style={{ fontSize: 'clamp(32px,5vw,64px)', fontWeight: 700, letterSpacing: '-0.03em', lineHeight: 0.95 }}>
                <span style={{ WebkitTextStroke: '1.5px var(--fg)', WebkitTextFillColor: 'transparent', display: 'block' }}>Nos</span>
                <span className="grad-text" style={{ display: 'block' }}>Collabs</span>
              </h1>
            </div>
            <p style={{ fontSize: 14, color: 'var(--fg2)', maxWidth: 360, lineHeight: 1.6, textAlign: 'right' }}>
              Partenariats éditoriaux, co-productions et formats croisés — Sans Transition avec d&apos;autres médias et auteurs engagés.
            </p>
          </div>
        </div>
      </div>

      {/* Collab cards */}
      <section style={{ padding: 'clamp(48px,6vw,80px) clamp(16px,4vw,48px)' }}>
        <div style={{ maxWidth: 1440, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 1, background: 'var(--border)', border: '1px solid var(--border)', borderRadius: 3, overflow: 'hidden' }}>
          {COLLABS.map((c) => (
            <Link
              key={c.slug}
              href={c.slug}
              className="rv grid-cell"
              style={{
                display: 'grid',
                gridTemplateColumns: '64px 1fr auto',
                gap: 32,
                alignItems: 'start',
                padding: 'clamp(28px,3.5vw,48px) clamp(20px,3vw,40px)',
                textDecoration: 'none',
                transition: 'background .15s',
              }}
            >
              {/* Number */}
              <div>
                <span style={{
                  fontSize: 'clamp(28px,3vw,40px)',
                  fontWeight: 700,
                  letterSpacing: '-0.03em',
                  WebkitTextStroke: '1px var(--border2)',
                  WebkitTextFillColor: 'transparent',
                  fontVariantNumeric: 'tabular-nums',
                  lineHeight: 1,
                }}>
                  {c.n}
                </span>
              </div>

              {/* Main content */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
                    <span style={{ fontSize: 9, textTransform: 'uppercase', letterSpacing: '0.2em', color: 'var(--muted)' }}>
                      {c.type}
                    </span>
                    <span style={{ width: 1, height: 10, background: 'var(--border2)' }} />
                    <span style={{ fontSize: 9, textTransform: 'uppercase', letterSpacing: '0.2em', color: 'var(--muted)' }}>
                      depuis {c.since}
                    </span>
                  </div>
                  <h2 style={{ fontSize: 'clamp(20px,2.5vw,32px)', fontWeight: 700, letterSpacing: '-0.02em', color: 'var(--fg)', marginBottom: 12 }}>
                    {c.partner}
                  </h2>
                  <p style={{ fontSize: 14, color: 'var(--fg2)', lineHeight: 1.65, maxWidth: 600 }}>
                    {c.description}
                  </p>
                </div>

                {/* Tags + stats */}
                <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 8 }}>
                  {c.tags.map((t) => (
                    <span key={t} className="tag-pill">{t}</span>
                  ))}
                  <span style={{ width: 1, height: 10, background: 'var(--border2)' }} />
                  <span style={{ fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.16em', color: 'var(--muted)' }}>
                    {c.count}
                  </span>
                </div>

                {/* External link */}
                <a
                  href={c.url}
                  target="_blank"
                  rel="noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  style={{ fontSize: 11, color: 'var(--muted)', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 6, width: 'fit-content' }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--fg)')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--muted)')}
                >
                  ↗ {c.urlLabel}
                </a>
              </div>

              {/* CTA arrow */}
              <div style={{ display: 'flex', alignItems: 'center', alignSelf: 'center', paddingTop: 4 }}>
                <span style={{
                  display: 'inline-flex', alignItems: 'center', gap: 8,
                  fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.16em',
                  color: 'var(--muted)', fontWeight: 500,
                }}>
                  Voir <ArrowIcon />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  )
}
