'use client'

import React from 'react'

const BOOK_URL = 'https://www.placedeslibraires.fr/livre/9782488666008-les-comploteurs-antton-rouget-ramses-kefi/'
const MEDIAPART_URL = 'https://www.mediapart.fr/journal/france/dossier/saint-etienne-le-maire-la-sextape-et-le-chantage-politique'
const BOOK_SITE_URL = 'https://lescomploteurs.com/'
const YT_URL = 'https://www.youtube.com/watch?v=Jlw544x4T5Q&t=1s'
const YT_THUMB = 'https://img.youtube.com/vi/Jlw544x4T5Q/maxresdefault.jpg'

const QUICK_FACTS = [
  { label: 'Sujet',          value: 'Affaire Perdriau — chantage, homophobie, pouvoir local' },
  { label: 'Parution',       value: '23 janvier 2026' },
  { label: 'Format',         value: 'Broché — 250 pages' },
  { label: 'Prix indicatif', value: '20 €' },
]

const PILLARS = [
  {
    n: '01',
    title: 'Récit chronologique, sources, responsabilités',
    desc: 'Le livre déroule les faits et le contexte : qui fait quoi, qui sait quoi, qui protège qui, et comment la pression se maintient dans le temps.',
  },
  {
    n: '02',
    title: 'Logiques de contrôle dans le pouvoir local',
    desc: 'Caméra cachée, intimidation, intox, mise à l\'écart : une enquête sur des méthodes concrètes de domination politique, au niveau municipal.',
  },
  {
    n: '03',
    title: 'L\'homophobie comme levier',
    desc: 'La menace s\'appuie sur l\'orientation sexuelle supposée : ce n\'est pas un détail de "scandale", c\'est un mécanisme de pouvoir.',
  },
]

const CHIPS = ['Antton Rouget', 'Ramsès Kefi', 'Mediapart', 'Enquête', 'Pouvoir local']

function ArrowIcon() {
  return (
    <svg width={12} height={12} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
      <path d="M3 8h10M9 4l4 4-4 4" />
    </svg>
  )
}
function PlayIcon() {
  return (
    <svg width={24} height={24} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M8 5v14l11-7z" />
    </svg>
  )
}

type VideoSE = {
  tiktok_video_id: string
  title?: string
  create_time?: string
  views?: number
  likes?: number
}

type OEmbed = { thumbnail_url?: string }

export default function LesComploteurs() {
  const [videos, setVideos] = React.useState<VideoSE[]>([])
  const [thumbs, setThumbs] = React.useState<Record<string, OEmbed | null>>({})
  const [loading, setLoading] = React.useState(true)
  const [error, setError] = React.useState<string | null>(null)

  React.useEffect(() => {
    let cancelled = false
    ;(async () => {
      try {
        setLoading(true)
        setError(null)
        const res = await fetch('/videos_se.json', { cache: 'no-store' })
        if (!res.ok) throw new Error(`/videos_se.json -> ${res.status}`)
        const data = (await res.json()) as VideoSE[]
        const sorted = Array.isArray(data)
          ? data.slice().sort((a, b) => {
              const da = a?.create_time ? new Date(a.create_time).getTime() : 0
              const db = b?.create_time ? new Date(b.create_time).getTime() : 0
              return db - da
            })
          : []
        if (!cancelled) setVideos(sorted)
      } catch (e: unknown) {
        if (!cancelled) {
          setError(e instanceof Error ? e.message : String(e))
          setVideos([])
        }
      } finally {
        if (!cancelled) setLoading(false)
      }
    })()
    return () => { cancelled = true }
  }, [])

  React.useEffect(() => {
    let cancelled = false
    const ids = videos.map((v) => v.tiktok_video_id).filter(Boolean)
    if (ids.length === 0) return
    const chunk = <T,>(arr: T[], size: number) =>
      Array.from({ length: Math.ceil(arr.length / size) }, (_, i) => arr.slice(i * size, i * size + size))
    ;(async () => {
      try {
        const maps = await Promise.all(
          chunk(ids, 25).map(async (part) => {
            const r = await fetch(`/api/tiktok-oembed?ids=${encodeURIComponent(part.join(','))}`, { cache: 'no-store' })
            if (!r.ok) return {}
            const j = await r.json()
            return (j?.map || {}) as Record<string, OEmbed | null>
          })
        )
        if (!cancelled) {
          const merged: Record<string, OEmbed | null> = {}
          maps.forEach((m) => Object.assign(merged, m))
          setThumbs(merged)
        }
      } catch { /* silencieux */ }
    })()
    return () => { cancelled = true }
  }, [videos])

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 64 }}>

      {/* Two-col layout */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'minmax(0,1.2fr) minmax(0,0.8fr)',
        gap: 48,
        alignItems: 'start',
      }}>

        {/* LEFT */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
          <p className="rv" style={{ fontSize: 'clamp(15px,1.6vw,19px)', color: 'var(--fg2)', fontWeight: 300, lineHeight: 1.6 }}>
            Cette enquête s&apos;appuie sur des faits, des recoupements et un récit suivi. Elle permet de comprendre comment une affaire locale peut durer des années : par la peur, la pression, et des protections en chaîne.
          </p>

          {/* Pillars */}
          <div className="rv grid-mosaic" style={{ gridTemplateColumns: '1fr' }}>
            {PILLARS.map((p) => (
              <div key={p.n} className="grid-cell" style={{ padding: 'clamp(16px,2vw,24px)' }}>
                <div style={{ fontSize: 9, letterSpacing: '0.2em', color: 'var(--border2)', marginBottom: 10 }}>{p.n}</div>
                <p style={{ fontSize: 12, fontWeight: 700, color: 'var(--fg)', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.1em' }}>{p.title}</p>
                <p style={{ fontSize: 13, color: 'var(--fg2)', lineHeight: 1.6 }}>{p.desc}</p>
              </div>
            ))}
          </div>

          {/* Chips */}
          <div className="rv" style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {CHIPS.map((chip) => (
              <span key={chip} className="tag-pill">{chip}</span>
            ))}
          </div>

          {/* CTAs */}
          <div className="rv" style={{ display: 'flex', flexWrap: 'wrap', gap: 12, alignItems: 'center' }}>
            <a href={BOOK_URL} target="_blank" rel="noreferrer" className="btn-grad" style={{ padding: '13px 24px', fontSize: 12 }}>
              Commander via Place des Libraires <ArrowIcon />
            </a>
            <a href={MEDIAPART_URL} target="_blank" rel="noreferrer" className="btn-outline-st" style={{ padding: '11px 18px', fontSize: 10 }}>
              Contexte Mediapart <ArrowIcon />
            </a>
            <a href={BOOK_SITE_URL} target="_blank" rel="noreferrer" className="btn-outline-st" style={{ padding: '11px 18px', fontSize: 10 }}>
              Site du livre <ArrowIcon />
            </a>
          </div>
        </div>

        {/* RIGHT */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 1, background: 'var(--border)', border: '1px solid var(--border)', borderRadius: 3, overflow: 'hidden' }}>
          {/* Book fiche */}
          <div className="rv grid-cell" style={{ padding: 'clamp(20px,2.5vw,28px)' }}>
            <p style={{ fontSize: 9, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--muted)', marginBottom: 12 }}>Fiche</p>
            <p style={{ fontSize: 20, fontWeight: 700, color: 'var(--fg)', letterSpacing: '-0.01em', marginBottom: 16 }}>Les Comploteurs</p>
            <dl style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <div>
                <dt style={{ fontSize: 9, textTransform: 'uppercase', letterSpacing: '0.2em', color: 'var(--muted)', marginBottom: 2 }}>Auteurs</dt>
                <dd style={{ fontSize: 14, color: 'var(--fg)' }}>Antton Rouget & Ramsès Kefi</dd>
              </div>
              <div>
                <dt style={{ fontSize: 9, textTransform: 'uppercase', letterSpacing: '0.2em', color: 'var(--muted)', marginBottom: 2 }}>Édition</dt>
                <dd style={{ fontSize: 14, color: 'var(--fg)' }}>Collectif éditions / Mediapart</dd>
              </div>
              {QUICK_FACTS.map((f) => (
                <div key={f.label} style={{ display: 'flex', justifyContent: 'space-between', gap: 16 }}>
                  <dt style={{ fontSize: 12, color: 'var(--muted)' }}>{f.label}</dt>
                  <dd style={{ fontSize: 12, color: 'var(--fg2)', textAlign: 'right' }}>{f.value}</dd>
                </div>
              ))}
            </dl>
          </div>

          {/* Interview thumbnail */}
          <div className="rv grid-cell" style={{ padding: 'clamp(20px,2.5vw,28px)' }}>
            <p style={{ fontSize: 9, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--muted)', marginBottom: 8 }}>Sans Transition</p>
            <p style={{ fontSize: 16, fontWeight: 700, color: 'var(--fg)', marginBottom: 12 }}>Interview d&apos;Antton Rouget</p>
            <a
              href={YT_URL}
              target="_blank"
              rel="noreferrer"
              style={{ display: 'block', position: 'relative', borderRadius: 2, overflow: 'hidden' }}
            >
              <img
                src={YT_THUMB}
                alt="Interview Antton Rouget – Sans Transition"
                style={{ width: '100%', aspectRatio: '16/9', objectFit: 'cover', display: 'block' }}
              />
              <div style={{
                position: 'absolute', inset: 0,
                background: 'rgba(0,0,0,0.45)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <span style={{
                  display: 'inline-flex', alignItems: 'center', gap: 10,
                  background: 'rgba(0,0,0,0.7)',
                  padding: '10px 20px',
                  borderRadius: 2,
                  color: '#fff',
                  fontSize: 12,
                  fontWeight: 600,
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase',
                }}>
                  <PlayIcon /> Regarder
                </span>
              </div>
            </a>
          </div>
        </div>
      </div>

      {/* TikTok videos from the series */}
      {(loading || videos.length > 0) && (
        <div>
          <p style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.28em', color: 'var(--muted)', marginBottom: 20 }}>
            Vidéos TikTok de la série
          </p>

          {error && <p style={{ fontSize: 12, color: '#ef4444', marginBottom: 12, wordBreak: 'break-all' }}>{error}</p>}

          <div className="grid-mosaic" style={{ gridTemplateColumns: 'repeat(4, 1fr)' }}>
            {(loading ? Array.from({ length: 4 }).map(() => null) : videos.slice(0, 4)).map((item, idx) => {
              if (item === null) {
                return <div key={`sk-${idx}`} className="grid-cell" style={{ aspectRatio: '9/16' }} />
              }
              const id = item.tiktok_video_id
              const thumb = thumbs[id]?.thumbnail_url
              const dateLabel = item.create_time
                ? new Date(item.create_time).toLocaleDateString('fr-FR', { year: 'numeric', month: 'short', day: 'numeric' })
                : undefined

              return (
                <a
                  key={id}
                  href={`https://www.tiktok.com/@sanstransition/video/${id}`}
                  target="_blank"
                  rel="noreferrer"
                  className="grid-cell"
                  style={{ display: 'flex', flexDirection: 'column', textDecoration: 'none' }}
                >
                  <div style={{ position: 'relative', aspectRatio: '9/16', background: 'var(--surface2)', overflow: 'hidden' }}>
                    {thumb && (
                      <img
                        src={thumb}
                        alt={item.title || 'Vidéo TikTok'}
                        style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                        loading="lazy"
                        decoding="async"
                      />
                    )}
                    <div style={{
                      position: 'absolute', inset: 0,
                      background: 'linear-gradient(to top, rgba(0,0,0,0.65) 0%, transparent 55%)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}>
                      <span style={{ color: 'rgba(255,255,255,0.7)' }}><PlayIcon /></span>
                    </div>
                  </div>
                  <div style={{ padding: '12px 14px', borderTop: '1px solid var(--border)' }}>
                    <p style={{ fontSize: 11, color: 'var(--fg)', lineHeight: 1.4, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                      {item.title || 'Vidéo TikTok'}
                    </p>
                    {dateLabel && (
                      <p style={{ fontSize: 10, color: 'var(--muted)', marginTop: 4 }}>{dateLabel}</p>
                    )}
                  </div>
                </a>
              )
            })}
          </div>
        </div>
      )}

    </div>
  )
}
