'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Header from '@/components/Header'
import Hero from '@/components/Hero'
import AboutIntro from '@/components/AboutIntro'
import Formats from '@/components/Formats'
import About from '@/components/About'
import Campaign from '@/components/Campaign'
import Ticker from '@/components/Ticker'
import Footer from '@/components/Footer'

/* ── Section nav config ─────────────────────── */
const NAV_ITEMS = [
  { id: 'about',        label: 'À propos',     n: '01' },
  { id: 'formats',      label: 'Formats',      n: '02' },
  { id: 'equipe',       label: 'Équipe',       n: '03' },
  { id: 'publications', label: 'Publications', n: '04' },
  { id: 'campagne',     label: 'Campagne',     n: '05' },
]

/* ── Sticky section nav ─────────────────────── */
function SectionNav({ active }: { active: string }) {
  return (
    <nav
      style={{
        position: 'sticky',
        top: 'var(--hh)',
        zIndex: 90,
        height: 'var(--nh)',
        background: 'rgba(8,8,14,0.96)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        borderBottom: '1px solid var(--border)',
        display: 'flex',
        alignItems: 'center',
        padding: '0 clamp(16px,4vw,48px)',
        overflowX: 'auto',
      }}
    >
      <div style={{ maxWidth: 1440, width: '100%', margin: '0 auto', display: 'flex', alignItems: 'stretch' }}>
        {NAV_ITEMS.map((item) => {
          const isActive = active === item.id
          return (
            <button
              key={item.id}
              onClick={() => {
                const el = document.getElementById(item.id)
                if (!el) return
                const offset = el.getBoundingClientRect().top + window.scrollY - (56 + 44 + 20)
                window.scrollTo({ top: Math.max(0, offset), behavior: 'smooth' })
              }}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: '0 16px',
                height: 44,
                fontFamily: 'var(--font-body)',
                fontSize: 13,
                fontWeight: isActive ? 600 : 400,
                color: isActive ? 'var(--fg)' : 'var(--muted)',
                letterSpacing: '0.04em',
                position: 'relative',
                whiteSpace: 'nowrap',
                transition: 'color .2s',
                display: 'flex',
                alignItems: 'center',
                gap: 8,
              }}
            >
              <span style={{
                fontSize: 9,
                letterSpacing: '0.2em',
                color: 'var(--border2)',
                fontVariantNumeric: 'tabular-nums',
              }}>
                {item.n}
              </span>
              {item.label}
              {isActive && (
                <span style={{
                  position: 'absolute',
                  bottom: 0, left: 16, right: 16,
                  height: 2,
                  background: 'var(--grad)',
                  borderRadius: '2px 2px 0 0',
                }} />
              )}
            </button>
          )
        })}
      </div>
    </nav>
  )
}

/* ── Section wrapper ────────────────────────── */
function SecWrap({
  id, n, label, title, accentTitle = false, children,
}: {
  id: string
  n: string
  label: string
  title: string
  accentTitle?: boolean
  children: React.ReactNode
}) {
  return (
    <section
      id={id}
      style={{
        padding: 'clamp(56px,7vw,96px) clamp(16px,4vw,48px)',
        borderTop: '1px solid var(--border)',
        scrollMarginTop: 'calc(var(--hh) + var(--nh) + 16px)',
      }}
    >
      <div style={{ maxWidth: 1440, margin: '0 auto' }}>
        <div className="sec-head">
          <div className="sec-eyebrow">
            <span>{n}</span>
            <span>— {label}</span>
          </div>
          <h2 className={accentTitle ? 'sec-title grad-text' : 'sec-title'}>
            {title}
          </h2>
        </div>
        {children}
      </div>
    </section>
  )
}

/* ── Publications teaser ────────────────────── */
function ArrowIcon() {
  return (
    <svg width={11} height={11} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
      <path d="M3 8h10M9 4l4 4-4 4" />
    </svg>
  )
}

function PublicationsTeaser() {
  const CARDS = [
    {
      slug: '/publications#tiktok',
      label: 'TikTok',
      type: 'Vidéos courtes',
      desc: 'Fokus, analyses, éduc pop — le flux complet de nos vidéos TikTok, triées par date.',
      icon: (
        <svg width={20} height={20} viewBox="0 0 256 256" fill="currentColor" aria-hidden>
          <path d="M224 88.4c-23.6 0-42.8-19.2-42.8-42.8V32h-36.6v132.1c0 19.7-16 35.7-35.7 35.7s-35.7-16-35.7-35.7 16-35.7 35.7-35.7c2.4 0 4.7.2 6.9.7V92.6c-2.3-.3-4.6-.5-6.9-.5-39.8 0-72.2 32.4-72.2 72.2s32.4 72.2 72.2 72.2 72.2-32.4 72.2-72.2v-56c12.1 8.7 26.9 13.9 42.8 13.9v-33.8z" />
        </svg>
      ),
    },
    {
      slug: '/publications#youtube',
      label: 'YouTube',
      type: 'Vidéos longues',
      desc: 'Interviews, documentaires, formats longs — toutes nos vidéos YouTube en un endroit.',
      icon: (
        <svg width={22} height={22} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
        </svg>
      ),
    },
    {
      slug: '/collabs',
      label: 'Collabs',
      type: 'Co-productions',
      desc: "Partenariats éditoriaux avec Le Média, Les Comploteurs et d'autres médias engagés.",
      icon: (
        <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden>
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      ),
    },
  ]

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <p className="rv" style={{ fontSize: 'clamp(15px,1.6vw,19px)', color: 'var(--fg2)', fontWeight: 300, lineHeight: 1.6, maxWidth: 600 }}>
        TikTok, YouTube, collabs — toutes les publications de Sans Transition réunies.
      </p>

      <div className="rv" style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: 1,
        background: 'var(--border)',
        border: '1px solid var(--border)',
        borderRadius: 3,
        overflow: 'hidden',
      }}>
        {CARDS.map((c) => (
          <Link
            key={c.slug}
            href={c.slug}
            className="grid-cell"
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 12,
              padding: 'clamp(20px,2.5vw,32px)',
              textDecoration: 'none',
              transition: 'background .15s',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ color: 'var(--muted)' }}>{c.icon}</span>
              <span style={{ color: 'var(--border2)', display: 'flex' }}><ArrowIcon /></span>
            </div>
            <div>
              <p style={{ fontSize: 9, textTransform: 'uppercase', letterSpacing: '0.22em', color: 'var(--muted)', marginBottom: 6 }}>{c.type}</p>
              <p style={{ fontSize: 'clamp(16px,1.8vw,20px)', fontWeight: 700, color: 'var(--fg)', letterSpacing: '-0.02em', marginBottom: 8 }}>{c.label}</p>
              <p style={{ fontSize: 12, color: 'var(--fg2)', lineHeight: 1.6 }}>{c.desc}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

/* ── Page ───────────────────────────────────── */
export default function Page() {
  const [active, setActive] = useState('about')

  // Scroll-spy via IntersectionObserver
  useEffect(() => {
    const ids = NAV_ITEMS.map((n) => n.id)
    const observers = ids.map((id) => {
      const el = document.getElementById(id)
      if (!el) return null
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActive(id) },
        { rootMargin: '-20% 0px -55% 0px' }
      )
      obs.observe(el)
      return obs
    }).filter(Boolean) as IntersectionObserver[]

    return () => observers.forEach((o) => o.disconnect())
  }, [])

  // Reveal-on-scroll for .rv elements
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
      <Ticker />
      <SectionNav active={active} />

      {/* 01 — À propos */}
      <SecWrap id="about" n="01" label="À propos" title="Qu'est-ce que Sans Transition ?">
        <AboutIntro />
      </SecWrap>

      {/* 02 — Formats */}
      <SecWrap id="formats" n="02" label="Formats" title="Galaxie éditoriale">
        <Formats />
      </SecWrap>

      {/* 03 — Équipe */}
      <SecWrap id="equipe" n="03" label="Équipe" title="Personnes & visages">
        <About />
      </SecWrap>

      {/* 04 — Publications */}
      <SecWrap id="publications" n="04" label="Publications" title="Nos vidéos">
        <PublicationsTeaser />
      </SecWrap>

      {/* 05 — Campagne */}
      <section
        id="campagne"
        style={{
          borderTop: '1px solid var(--border)',
          background: 'var(--surface)',
          padding: 'clamp(56px,7vw,96px) clamp(16px,4vw,48px)',
          scrollMarginTop: 'calc(var(--hh) + var(--nh) + 16px)',
        }}
      >
        <div style={{ maxWidth: 1440, margin: '0 auto' }}>
          <div className="sec-head">
            <div className="sec-eyebrow">
              <span>05</span>
              <span>— Campagne de soutien</span>
            </div>
            <h2 className="sec-title grad-text">La Transition</h2>
          </div>
          <Campaign />
        </div>
      </section>

      <Footer />
    </div>
  )
}
