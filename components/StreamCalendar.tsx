'use client'

import React from 'react'

type StreamItem = {
  time: string
  title: string
  desc: string
  people?: string
}

const WEEK = [
  { label: 'Lun', day: 1 },
  { label: 'Mar', day: 2 },
  { label: 'Mer', day: 3 },
  { label: 'Jeu', day: 4 },
  { label: 'Ven', day: 5 },
  { label: 'Sam', day: 6 },
  { label: 'Dim', day: 0 },
] as const

function dayItems(dayIdx: number): StreamItem[] {
  const items: StreamItem[] = []
  if (dayIdx >= 1 && dayIdx <= 5) {
    items.push({ time: '09:00', title: 'La TransMatinale', desc: 'Revue de presse', people: 'avec Hedji' })
  }
  if (dayIdx === 2) {
    items.push({ time: '20:00', title: 'Aktu', people: 'avec Hedji, Amandine & Lucho', desc: 'Réaction à l\'actu' })
  }
  if (dayIdx === 5) {
    items.push({ time: '20:00', title: 'Ekip', desc: 'Live chill, discussions, échanges avec la commu', people: 'avec Hedji & l\'équipe' })
  }
  return items
}

function IcoTwitch() {
  return (
    <svg width={14} height={14} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M11.64 5.93h1.43v4.28h-1.43m3.93-4.28H17v4.28h-1.43M7 2L3.43 5.57v12.86h4.28V22l3.58-3.57h2.85L20.57 12V2m-1.43 9.29-2.85 2.85h-2.86l-2.5 2.5v-2.5H7.71V3.43h11.43z" />
    </svg>
  )
}
function ArrowIcon() {
  return (
    <svg width={12} height={12} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <path d="M3 8h10M9 4l4 4-4 4" />
    </svg>
  )
}

export default function StreamCalendar() {
  const [today, setToday] = React.useState<number>(() => new Date().getDay())

  React.useEffect(() => {
    const id = window.setInterval(() => setToday(new Date().getDay()), 60_000)
    return () => window.clearInterval(id)
  }, [])

  const minutesUntil = (time: string) => {
    const [h, m] = time.split(':').map((x) => parseInt(x, 10))
    const now = new Date()
    const target = new Date()
    target.setHours(h || 0, m || 0, 0, 0)
    return Math.round((target.getTime() - now.getTime()) / 60000)
  }

  return (
    <div>
      {/* Sub-header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
        <p style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.28em', color: 'var(--muted)' }}>
          Calendrier hebdomadaire
        </p>
        <a
          href="https://twitch.tv/sans_transition"
          target="_blank"
          rel="noreferrer"
          className="btn-outline-st"
          style={{ padding: '7px 14px', fontSize: 10 }}
        >
          <IcoTwitch /> Suivre sur Twitch <ArrowIcon />
        </a>
      </div>

      {/* 7-column grid */}
      <div
        className="grid-mosaic"
        style={{ gridTemplateColumns: 'repeat(7, 1fr)' }}
        role="grid"
        aria-label="Calendrier hebdomadaire des lives"
      >
        {WEEK.map(({ label, day }) => {
          const items = dayItems(day)
          const isToday = day === today

          return (
            <div
              key={label}
              role="row"
              className="grid-cell"
              style={{
                padding: 'clamp(12px,1.5vw,20px)',
                borderTop: isToday ? '2px solid transparent' : undefined,
                backgroundImage: isToday
                  ? 'linear-gradient(var(--surface), var(--surface)), var(--grad)'
                  : undefined,
                backgroundOrigin: isToday ? 'border-box' : undefined,
                backgroundClip: isToday ? 'padding-box, border-box' : undefined,
              }}
            >
              {/* Day label */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
                <h3 style={{
                  fontSize: 12,
                  fontWeight: isToday ? 700 : 500,
                  color: isToday ? 'var(--fg)' : 'var(--muted)',
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                }}>
                  {label}
                </h3>
                {isToday && (
                  <span style={{
                    fontSize: 8,
                    letterSpacing: '0.2em',
                    textTransform: 'uppercase',
                    color: 'var(--muted)',
                    border: '1px solid var(--border2)',
                    padding: '2px 5px',
                    borderRadius: 2,
                  }}>
                    Auj.
                  </span>
                )}
              </div>

              {/* Items */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {items.length === 0 ? (
                  <p style={{ fontSize: 11, color: 'var(--border2)' }}>—</p>
                ) : (
                  items.map((it, i) => {
                    const soon = isToday && minutesUntil(it.time) >= 0 && minutesUntil(it.time) <= 60
                    return (
                      <div
                        key={`${label}-${i}`}
                        style={{
                          borderRadius: 2,
                          padding: '8px 10px',
                          background: soon ? 'var(--surface2)' : 'var(--bg)',
                          border: `1px solid ${soon ? 'var(--border2)' : 'var(--border)'}`,
                        }}
                      >
                        <time
                          dateTime={it.time}
                          style={{
                            display: 'inline-block',
                            fontSize: 10,
                            fontWeight: 600,
                            fontVariantNumeric: 'tabular-nums',
                            color: 'var(--fg)',
                            letterSpacing: '0.08em',
                            border: '1px solid var(--border2)',
                            padding: '2px 6px',
                            borderRadius: 2,
                            marginBottom: 6,
                          }}
                        >
                          {it.time}
                        </time>
                        <p style={{ fontSize: 11, fontWeight: 600, color: 'var(--fg)', lineHeight: 1.3 }}>{it.title}</p>
                        {soon && (
                          <span style={{
                            display: 'inline-flex', alignItems: 'center', gap: 4,
                            fontSize: 9, textTransform: 'uppercase', letterSpacing: '0.15em',
                            color: 'var(--muted)', marginTop: 4,
                          }}>
                            <span style={{ width: 5, height: 5, borderRadius: '50%', background: 'var(--grad)', display: 'inline-block' }} />
                            Bientôt
                          </span>
                        )}
                        {it.people && (
                          <p style={{ fontSize: 10, color: 'var(--muted)', marginTop: 4, fontStyle: 'italic' }}>{it.people}</p>
                        )}
                        <p style={{ fontSize: 10, color: 'var(--fg2)', marginTop: 2 }}>{it.desc}</p>
                      </div>
                    )
                  })
                )}
              </div>
            </div>
          )
        })}
      </div>

      <p style={{ marginTop: 12, fontSize: 11, color: 'var(--muted)', lineHeight: 1.65 }}>
        La TransMatinale (lun–ven 09:00) · Aktu (mar 20:00) · Ekip (ven 20:00)
      </p>
    </div>
  )
}
