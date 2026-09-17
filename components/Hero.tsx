'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import { useSocialStats } from '@/hooks/useSocialStats'

/* ── Repli si StatsST ne répond pas (relevé du 16 sept. 2026) ── */
const FALLBACK = { tiktok: 57835, instagram: 21075 }

/* Démographie : pas d'API, relevé manuel des back-offices */
const AUDIENCE = [
  { value: '81,4 %', label: 'de 18-34 ans' },
  { value: '75 %',   label: 'de femmes' },
]

const TEAM = [
  { name: 'Hedi',     img: '/hedi.png' },
  { name: 'Amandine', img: '/amandine.png' },
  { name: 'Louis',    img: '/louis.png' },
  { name: 'Diego',    img: '/diego.png' },
  { name: 'Gappy',    img: '/gappy.png' },
  { name: 'Iss',      img: '/iss.png' },
]

const nf = new Intl.NumberFormat('fr-FR')

function ArrowIcon() {
  return (
    <svg width={12} height={12} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
      <path d="M3 8h10M9 4l4 4-4 4" />
    </svg>
  )
}

export default function Hero() {
  const rvRef = useRef<HTMLDivElement>(null)
  const socialStats = useSocialStats()

  const followers = new Map(
    socialStats?.accounts.map((account) => [account.platform, account.followers]) ?? [],
  )
  const tiktok = followers.get('tiktok') ?? FALLBACK.tiktok
  const instagram = followers.get('instagram') ?? FALLBACK.instagram
  const total = Math.floor((tiktok + instagram) / 1000) * 1000

  useEffect(() => {
    const els = rvRef.current?.querySelectorAll('.rv') ?? []
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add('on') }),
      { threshold: 0.08 }
    )
    els.forEach((el) => obs.observe(el))
    return () => obs.disconnect()
  }, [])

  return (
    <section
      ref={rvRef}
      id="top"
      style={{
        position: 'relative',
        overflow: 'hidden',
        borderBottom: '1px solid var(--border)',
        paddingTop: 'var(--hh)',
      }}
    >
      {/* Halos et grille */}
      <div aria-hidden style={{ position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none' }}>
        <div style={{
          position: 'absolute', top: '-10%', left: '-10%',
          width: '60vw', height: '60vw',
          background: 'radial-gradient(circle, oklch(0.72 0.27 290 / 0.10) 0%, transparent 65%)',
          filter: 'blur(60px)',
          animation: 'glow-pulse-a 7s ease-in-out infinite',
        }} />
        <div style={{
          position: 'absolute', bottom: '-20%', right: '-10%',
          width: '45vw', height: '45vw',
          background: 'radial-gradient(circle, oklch(0.85 0.25 40 / 0.08) 0%, transparent 65%)',
          filter: 'blur(60px)',
        }} />
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px)',
          backgroundSize: '80px 80px',
          opacity: 0.18,
        }} />
      </div>

      <div style={{
        position: 'relative',
        zIndex: 1,
        maxWidth: 1440,
        margin: '0 auto',
        padding: 'clamp(40px,5vw,72px) clamp(16px,4vw,48px) 0',
      }}>
        {/* Situation */}
        <div className="rv" style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 28 }}>
          <span className="grad-line" />
          <span style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.24em', color: 'var(--muted)' }}>
            Paris · Association loi 1901 · depuis fév. 2025
          </span>
        </div>

        {/* Wordmark */}
        <div style={{ lineHeight: 0.88, marginBottom: 24 }}>
          <span
            className="rv flicker-title"
            style={{
              display: 'block',
              fontFamily: 'var(--font-barbra)',
              fontWeight: 400,
              fontSize: 'clamp(56px, 9vw, 124px)',
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
              fontSize: 'clamp(56px, 9vw, 124px)',
              letterSpacing: '-0.01em',
              animationDelay: '0.15s',
              animationDuration: '7.5s',
            }}
          >
            Transition
          </span>
        </div>

        {/* Chapô */}
        <p className="rv rv-d2" style={{
          fontSize: 'clamp(17px,2vw,24px)',
          lineHeight: 1.45,
          color: 'var(--fg)',
          maxWidth: 620,
          letterSpacing: '-0.01em',
          marginBottom: 16,
          textWrap: 'pretty',
        }}>
          Média radical, indépendant et associatif, par et pour les minorités. On raconte l&apos;actualité depuis les premiers et premières concerné·es.
        </p>
        <p className="rv rv-d2" style={{ fontSize: 15, lineHeight: 1.65, color: 'var(--fg2)', maxWidth: 560, marginBottom: 32 }}>
          Fokus, Hédito, interviews, terrain : en vidéo courte, là où vit la génération qui se politise. {nf.format(total)} abonné·es, zéro pub, zéro actionnaire.
        </p>

        {/* CTA */}
        <div className="rv rv-d3" style={{ display: 'flex', gap: 12, flexWrap: 'wrap', paddingBottom: 20 }}>
          <a href="#videos" className="btn-grad" style={{ padding: '15px 26px', fontSize: 12 }}>
            Voir les vidéos <ArrowIcon />
          </a>
          <a href="#pro" className="btn-outline-st" style={{ padding: '15px 26px', fontSize: 12 }}>
            Travailler avec nous
          </a>
        </div>

        {/* Visages */}
        <div className="rv rv-d3" style={{ display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap', paddingBottom: 36 }}>
          <div style={{ display: 'flex', alignItems: 'center', paddingLeft: 12 }}>
            {TEAM.map((member) => (
              <a
                key={member.name}
                href="#equipe"
                title={member.name}
                style={{
                  position: 'relative',
                  width: 44,
                  height: 44,
                  borderRadius: '50%',
                  overflow: 'hidden',
                  border: '1.5px solid var(--bg)',
                  marginLeft: -12,
                  background: 'var(--surface2)',
                  display: 'block',
                  flexShrink: 0,
                }}
              >
                <Image src={member.img} alt={member.name} fill sizes="44px" style={{ objectFit: 'cover' }} />
              </a>
            ))}
          </div>
          <a href="#equipe" style={{ fontSize: 13, color: 'var(--fg2)', textDecoration: 'none' }}>
            Six personnes derrière Sans Transition
          </a>
        </div>
      </div>

      {/* Chiffres */}
      <div style={{
        position: 'relative',
        zIndex: 1,
        borderTop: '1px solid var(--border)',
        padding: '20px clamp(16px,4vw,48px)',
      }}>
        <div style={{
          maxWidth: 1440,
          margin: '0 auto',
          display: 'flex',
          flexWrap: 'wrap',
          gap: 'clamp(20px,4vw,56px)',
          alignItems: 'baseline',
        }}>
          {[
            { value: nf.format(tiktok), label: 'abonné·es TikTok' },
            { value: nf.format(instagram), label: 'Instagram' },
            ...AUDIENCE,
          ].map((stat) => (
            <div key={stat.label} style={{ display: 'flex', alignItems: 'baseline', gap: 10 }}>
              <span style={{ fontSize: 22, fontWeight: 700, letterSpacing: '-0.02em', color: 'var(--fg)', fontVariantNumeric: 'tabular-nums' }}>
                {stat.value}
              </span>
              <span style={{ fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.16em', color: 'var(--muted)' }}>
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
