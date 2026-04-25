'use client'

import type { SVGProps } from 'react'

function IcoTikTok(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 256 256" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M224 88.4c-23.6 0-42.8-19.2-42.8-42.8V32h-36.6v132.1c0 19.7-16 35.7-35.7 35.7s-35.7-16-35.7-35.7 16-35.7 35.7-35.7c2.4 0 4.7.2 6.9.7V92.6c-2.3-.3-4.6-.5-6.9-.5-39.8 0-72.2 32.4-72.2 72.2s32.4 72.2 72.2 72.2 72.2-32.4 72.2-72.2v-56c12.1 8.7 26.9 13.9 42.8 13.9v-33.8z" />
    </svg>
  )
}
function IcoIG(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true" {...props}>
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <circle cx="12" cy="12" r="4.5" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  )
}
function IcoYT(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.5A3 3 0 0 0 .5 6.2C0 8.1 0 12 0 12s0 3.9.5 5.8a3 3 0 0 0 2.1 2.1c1.9.5 9.4.5 9.4.5s7.5 0 9.4-.5a3 3 0 0 0 2.1-2.1C24 15.9 24 12 24 12s0-3.9-.5-5.8zM9.7 15.5v-7l6.3 3.5-6.3 3.5z" />
    </svg>
  )
}
function IcoX(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M23 4.5c-.8.4-1.7.6-2.6.8a4.3 4.3 0 0 0 1.9-2.4 8.6 8.6 0 0 1-2.7 1 4.3 4.3 0 0 0-7.5 2.9c0 .3 0 .7.1 1A12.3 12.3 0 0 1 3 3.6a4.4 4.4 0 0 0 1.3 5.7c-.7 0-1.3-.2-2-.5v.1a4.3 4.3 0 0 0 3.5 4.2c-.4.1-.9.2-1.3.2-.3 0-.6 0-.9-.1a4.3 4.3 0 0 0 4 3 8.7 8.7 0 0 1-5.3 1.8H1a12.2 12.2 0 0 0 6.6 1.9c8 0 12.3-6.6 12.3-12.3v-.6A8.6 8.6 0 0 0 23 4.5z" />
    </svg>
  )
}

const PILLARS = [
  {
    n: '01',
    title: 'Radical et indépendant',
    desc: 'Association loi 1901 née en février 2025 à Paris, financée par la communauté, sans pubs ni actionnaires.',
  },
  {
    n: '02',
    title: 'Politiser sans bullshit',
    desc: 'Rendre l\'actu lisible depuis les premiers et premières concerné·es, avec un langage direct et accessible.',
  },
  {
    n: '03',
    title: 'Par et pour les minorités',
    desc: 'On parle des luttes féministes, antiracistes et sociales en donnant des outils à notre camp.',
  },
]

const PLATFORMS = [
  { name: 'TikTok', followers: '40k+', url: 'https://www.tiktok.com/@sanstransition', Icon: IcoTikTok },
  { name: 'Instagram', followers: '3k+', url: 'https://www.instagram.com/sanstransition__', Icon: IcoIG },
  { name: 'YouTube', followers: '1k+', url: 'https://www.youtube.com/@SansTransitionMedia', Icon: IcoYT },
  { name: 'X', followers: '400+', url: 'https://x.com/sanstransition_', Icon: IcoX },
]

export default function AboutIntro() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 48 }}>

      {/* Intro text */}
      <div style={{ maxWidth: 760 }}>
        <p className="rv" style={{ fontSize: 'clamp(17px, 2vw, 22px)', lineHeight: 1.6, color: 'var(--fg2)', fontWeight: 300 }}>
          Sans Transition est un média radical, indépendant, par et pour les minorités — lancé en février 2025 par une jeune équipe francilienne. Notre mission : politiser sans bullshit.
        </p>
        <p className="rv" style={{ fontSize: 15, lineHeight: 1.65, color: 'var(--muted)', marginTop: 20 }}>
          On raconte l&apos;actualité depuis les premiers et premières concerné·es, avec un ton direct, engagé et accessible. On parle d&apos;abord à la génération Z et aux jeunes adultes qui se politisent, en assumant nos émotions, nos colères et nos joies.
        </p>
      </div>

      {/* 3 pillars — grid mosaic */}
      <div
        className="rv grid-mosaic"
        style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}
      >
        {PILLARS.map((p) => (
          <div key={p.n} className="grid-cell" style={{ padding: 'clamp(20px,3vw,32px)' }}>
            <div style={{
              fontSize: 9,
              letterSpacing: '0.2em',
              color: 'var(--border2)',
              fontVariantNumeric: 'tabular-nums',
              marginBottom: 16,
            }}>
              {p.n}
            </div>
            <h3 style={{
              fontSize: 'clamp(15px,1.5vw,18px)',
              fontWeight: 700,
              color: 'var(--fg)',
              letterSpacing: '-0.01em',
              marginBottom: 10,
            }}>
              {p.title}
            </h3>
            <p style={{ fontSize: 13, color: 'var(--fg2)', lineHeight: 1.65 }}>{p.desc}</p>
          </div>
        ))}
      </div>

      {/* Platforms */}
      <div className="rv">
        <p style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.28em', color: 'var(--muted)', marginBottom: 16 }}>
          Présence sur les réseaux
        </p>
        <div
          className="grid-mosaic"
          style={{ gridTemplateColumns: 'repeat(4, 1fr)' }}
        >
          {PLATFORMS.map(({ name, followers, url, Icon }) => (
            <a
              key={name}
              href={url}
              target="_blank"
              rel="noreferrer"
              className="grid-cell"
              style={{
                padding: 'clamp(16px,2.5vw,28px)',
                display: 'flex',
                flexDirection: 'column',
                gap: 12,
                textDecoration: 'none',
              }}
            >
              <Icon style={{ width: 20, height: 20, color: 'var(--muted)' }} />
              <div>
                <div style={{ fontSize: 'clamp(20px,2.5vw,28px)', fontWeight: 700, letterSpacing: '-0.02em', color: 'var(--fg)' }}>
                  {followers}
                </div>
                <div style={{ fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.2em', color: 'var(--muted)', marginTop: 4 }}>
                  {name}
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>

    </div>
  )
}
