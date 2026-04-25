'use client'

import Image from 'next/image'

function IcoTikTok() {
  return (
    <svg width={14} height={14} viewBox="0 0 256 256" fill="currentColor" aria-hidden="true">
      <path d="M224 88.4c-23.6 0-42.8-19.2-42.8-42.8V32h-36.6v132.1c0 19.7-16 35.7-35.7 35.7s-35.7-16-35.7-35.7 16-35.7 35.7-35.7c2.4 0 4.7.2 6.9.7V92.6c-2.3-.3-4.6-.5-6.9-.5-39.8 0-72.2 32.4-72.2 72.2s32.4 72.2 72.2 72.2 72.2-32.4 72.2-72.2v-56c12.1 8.7 26.9 13.9 42.8 13.9v-33.8z" />
    </svg>
  )
}
function IcoIG() {
  return (
    <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <circle cx="12" cy="12" r="4.5" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  )
}

type Member = {
  name: string
  role: string
  img: string
  alt?: string
  bio?: string
  tiktok?: string
  instagram?: string
  initials: string
}

const team: Member[] = [
  {
    name: 'Hedi',
    role: 'Fondateur · Rédac Chef',
    img: '/hedi.png',
    alt: 'Portrait de Hedi',
    bio: 'Créateur de Sans Transition. Ligne claire : radical, pédagogique, zéro bullshit.',
    tiktok: 'hedjient',
    instagram: 'hedjient',
    initials: 'H',
  },
  {
    name: 'Amandine',
    role: 'Chroniqueuse · Féminisme',
    img: '/amandine.png',
    alt: 'Portrait d\'Amandine',
    bio: 'Regard féministe sur l\'actu. Analyses qui claquent, ancrées dans le réel.',
    tiktok: 'carpedine',
    instagram: 'amandine_chbd',
    initials: 'A',
  },
  {
    name: 'Louis',
    role: 'Chroniqueur · Histoire politique',
    img: '/louis.png',
    alt: 'Portrait de Louis',
    bio: 'Remet les faits dans le temps pour comprendre le présent.',
    tiktok: 'louis_bnh',
    instagram: 'louis_bnh',
    initials: 'L',
  },
  {
    name: 'Diego',
    role: 'Chroniqueur',
    img: '/diego.png',
    alt: 'Portrait de Diego',
    bio: 'Amérique latine, sociologie.',
    initials: 'D',
  },
  {
    name: 'Gappy',
    role: 'Monteur Vidéo',
    img: '/gappy.png',
    alt: 'Portrait de Gappy',
    bio: 'Sait s\'adapter aux différentes plateformes.',
    initials: 'G',
  },
]

export default function About() {
  return (
    <div
      className="team-grid"
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(5, 1fr)',
        gap: 1,
        background: 'var(--border)',
        border: '1px solid var(--border)',
        borderRadius: 3,
        overflow: 'hidden',
      }}
    >
      {team.map((m, idx) => (
        <article
          key={m.name}
          className="rv grid-cell"
          style={{
            padding: 'clamp(16px,2vw,24px)',
            display: 'flex',
            flexDirection: 'column',
            gap: 16,
          }}
        >
          {/* Photo */}
          <div style={{
            position: 'relative',
            width: '100%',
            aspectRatio: '3/4',
            background: 'var(--surface2)',
            borderRadius: 2,
            overflow: 'hidden',
          }}>
            <Image
              src={m.img}
              alt={m.alt ?? m.name}
              fill
              sizes="(max-width: 860px) 50vw, 20vw"
              style={{ objectFit: 'cover' }}
              priority={idx === 0}
              loading={idx === 0 ? 'eager' : 'lazy'}
              onError={() => {}} // silently fall back
            />
          </div>

          {/* Info */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 4 }}>
              <h3 style={{ fontSize: 16, fontWeight: 700, color: 'var(--fg)', letterSpacing: '-0.01em' }}>
                {m.name}
              </h3>
              {(m.tiktok || m.instagram) && (
                <div style={{ display: 'flex', gap: 8 }}>
                  {m.tiktok && (
                    <a
                      href={`https://tiktok.com/@${m.tiktok}`}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={`TikTok de ${m.name}`}
                      style={{ color: 'var(--muted)', textDecoration: 'none', display: 'flex', alignItems: 'center' }}
                    >
                      <IcoTikTok />
                    </a>
                  )}
                  {m.instagram && (
                    <a
                      href={`https://instagram.com/${m.instagram}`}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={`Instagram de ${m.name}`}
                      style={{ color: 'var(--muted)', textDecoration: 'none', display: 'flex', alignItems: 'center' }}
                    >
                      <IcoIG />
                    </a>
                  )}
                </div>
              )}
            </div>
            <p style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.16em', color: 'var(--muted)', marginBottom: 8 }}>
              {m.role}
            </p>
            {m.bio && (
              <p style={{ fontSize: 13, color: 'var(--fg2)', lineHeight: 1.55 }}>{m.bio}</p>
            )}
          </div>
        </article>
      ))}
    </div>
  )
}
