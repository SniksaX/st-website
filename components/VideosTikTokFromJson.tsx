'use client'

import React from 'react'

/* ── Types ─────────────────────────────────────────────── */

type JsonItem = {
  tiktok_video_id: string
  title?: string
  create_time?: string
  views?: number
  likes?: number
  comments?: number
  shares?: number
  viewsGained?: number
  likesGained?: number
  velocity?: number
  engagement_rate?: number
}

type OEmbed = { thumbnail_url?: string; title?: string }

const DEFAULT_SRC = '/json.txt'

/* ── Icons ─────────────────────────────────────────────── */

function IcoTikTok() {
  return (
    <svg width={14} height={14} viewBox="0 0 256 256" fill="currentColor" aria-hidden>
      <path d="M224 88.4c-23.6 0-42.8-19.2-42.8-42.8V32h-36.6v132.1c0 19.7-16 35.7-35.7 35.7s-35.7-16-35.7-35.7 16-35.7 35.7-35.7c2.4 0 4.7.2 6.9.7V92.6c-2.3-.3-4.6-.5-6.9-.5-39.8 0-72.2 32.4-72.2 72.2s32.4 72.2 72.2 72.2 72.2-32.4 72.2-72.2v-56c12.1 8.7 26.9 13.9 42.8 13.9v-33.8z" />
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
function ChevLeft() {
  return (
    <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
      <path d="M15 6l-6 6 6 6" />
    </svg>
  )
}
function ChevRight() {
  return (
    <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
      <path d="M9 6l6 6-6 6" />
    </svg>
  )
}
function PlayIcon() {
  return (
    <svg width={36} height={36} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M8 5v14l11-7z" />
    </svg>
  )
}

/* ── Helpers ───────────────────────────────────────────── */

const nfCompact = new Intl.NumberFormat('fr-FR', { notation: 'compact', compactDisplay: 'short' })

function fmt(n: number | undefined) {
  return n != null && n > 0 ? nfCompact.format(n) : '—'
}

/* ── Component ─────────────────────────────────────────── */

export default function VideosTikTok({ src = DEFAULT_SRC }: { src?: string }) {
  const railRef = React.useRef<HTMLDivElement | null>(null)

  const [items,   setItems]   = React.useState<JsonItem[]>([])
  const [thumbs,  setThumbs]  = React.useState<Record<string, OEmbed | null>>({})
  const [openId,  setOpenId]  = React.useState<string | null>(null)
  const [loading, setLoading] = React.useState(true)
  const [error,   setError]   = React.useState<string | null>(null)

  /* 1 — Load JSON */
  React.useEffect(() => {
    let cancelled = false
    setItems([])
    setThumbs({})
    ;(async () => {
      try {
        setLoading(true)
        setError(null)
        const res = await fetch(src, { cache: 'no-store' })
        if (!res.ok) throw new Error(`${src} → ${res.status}`)
        const text = await res.text()
        const data = JSON.parse(text.trim()) as JsonItem[]
        if (!Array.isArray(data)) throw new Error('Tableau JSON invalide')

        const sorted = data
          .filter((it) => !!it?.tiktok_video_id)
          .sort((a, b) => {
            const da = a.create_time ? new Date(a.create_time).getTime() : 0
            const db = b.create_time ? new Date(b.create_time).getTime() : 0
            return db - da
          })

        if (!cancelled) setItems(sorted)
      } catch (e: unknown) {
        if (!cancelled) {
          setError(e instanceof Error ? e.message : String(e))
          setItems([])
        }
      } finally {
        if (!cancelled) setLoading(false)
      }
    })()
    return () => { cancelled = true }
  }, [])

  /* 2 — oEmbed thumbnails */
  React.useEffect(() => {
    let cancelled = false
    const ids = items.map((it) => it.tiktok_video_id)
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
  }, [items, src])

  const scroll = (dir: 'left' | 'right') => {
    const rail = railRef.current
    if (!rail) return
    rail.scrollBy({ left: Math.round(rail.clientWidth * 0.85) * (dir === 'left' ? -1 : 1), behavior: 'smooth' })
  }

  /* Render list: real items + "see more" card at end */
  const renderList = loading
    ? (Array.from({ length: 8 }, () => null) as null[])
    : [...items, '__MORE__' as const]

  return (
    <div>
      {/* Sub-header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
        <p style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.28em', color: 'var(--muted)' }}>
          TikTok · {loading ? '…' : `${items.length} vidéos`}
        </p>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <a
            href="https://www.tiktok.com/@sanstransition"
            target="_blank"
            rel="noreferrer"
            className="btn-outline-st"
            style={{ padding: '7px 14px', fontSize: 10 }}
          >
            <IcoTikTok /> Suivre <ArrowIcon />
          </a>
          {(['left', 'right'] as const).map((dir) => (
            <button
              key={dir}
              onClick={() => scroll(dir)}
              aria-label={dir === 'left' ? 'Défiler à gauche' : 'Défiler à droite'}
              style={{
                background: 'none',
                border: '1px solid var(--border2)',
                borderRadius: 2,
                padding: 6,
                cursor: 'pointer',
                color: 'var(--muted)',
                display: 'flex',
                alignItems: 'center',
              }}
            >
              {dir === 'left' ? <ChevLeft /> : <ChevRight />}
            </button>
          ))}
        </div>
      </div>

      {error && (
        <p style={{ fontSize: 12, color: '#ef4444', marginBottom: 16, wordBreak: 'break-all' }}>{error}</p>
      )}

      {/* Scrollable rail */}
      <div
        ref={railRef}
        style={{
          display: 'flex',
          gap: 1,
          overflowX: 'auto',
          scrollSnapType: 'x mandatory',
          scrollBehavior: 'smooth',
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
          background: 'var(--border)',
          border: '1px solid var(--border)',
          borderRadius: 3,
        }}
      >
        {renderList.map((item, i) => {
          /* skeleton */
          if (item === null) {
            return (
              <div
                key={`sk-${i}`}
                style={{
                  flexShrink: 0,
                  width: 200,
                  scrollSnapAlign: 'start',
                  background: 'var(--surface)',
                  aspectRatio: '9/16',
                }}
              />
            )
          }

          /* see-more */
          if (item === '__MORE__') {
            return (
              <a
                key="more"
                href="https://www.tiktok.com/@sanstransition"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  flexShrink: 0,
                  width: 200,
                  scrollSnapAlign: 'start',
                  background: 'var(--surface)',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  textDecoration: 'none',
                  gap: 8,
                  aspectRatio: '9/16',
                }}
              >
                <span style={{ fontSize: 22, fontWeight: 700, color: 'var(--fg)' }}>Voir +</span>
                <ArrowIcon />
              </a>
            )
          }

          /* video card */
          const id    = item.tiktok_video_id
          const thumb = thumbs[id]?.thumbnail_url
          const title = item.title || thumbs[id]?.title || 'Vidéo TikTok'
          const dateLabel = item.create_time
            ? new Date(item.create_time).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' })
            : undefined

          return (
            <div
              key={id}
              style={{
                flexShrink: 0,
                width: 200,
                scrollSnapAlign: 'start',
                background: 'var(--bg)',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              {/* Thumbnail */}
              <button
                onClick={() => setOpenId(id)}
                style={{
                  display: 'block',
                  width: '100%',
                  aspectRatio: '9/16',
                  position: 'relative',
                  background: 'var(--surface2)',
                  border: 'none',
                  cursor: 'pointer',
                  padding: 0,
                  overflow: 'hidden',
                }}
              >
                {thumb && (
                  <img
                    src={thumb}
                    alt={title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                    loading="lazy"
                    decoding="async"
                  />
                )}
                <div style={{
                  position: 'absolute', inset: 0,
                  background: 'linear-gradient(to top, rgba(0,0,0,0.72) 0%, transparent 55%)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <span style={{ color: 'rgba(255,255,255,0.65)' }}><PlayIcon /></span>
                </div>
              </button>

              {/* Meta */}
              <div style={{ padding: '10px 12px', borderTop: '1px solid var(--border)', flex: 1, display: 'flex', flexDirection: 'column', gap: 6 }}>
                <p style={{
                  fontSize: 11,
                  color: 'var(--fg)',
                  lineHeight: 1.4,
                  display: '-webkit-box',
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden',
                }}>
                  {title}
                </p>

                {/* Stats row */}
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  fontSize: 10,
                  color: 'var(--muted)',
                  fontVariantNumeric: 'tabular-nums',
                  marginTop: 'auto',
                }}>
                  <span title="Vues">{fmt(item.views)} vues</span>
                  <span title="Taux d'engagement">{item.engagement_rate != null ? `${item.engagement_rate.toFixed(1)}% ER` : '—'}</span>
                </div>

                {dateLabel && (
                  <p style={{ fontSize: 9, color: 'var(--border2)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                    {dateLabel}
                  </p>
                )}
              </div>
            </div>
          )
        })}
      </div>

      {/* Modal */}
      {openId && (
        <div
          onClick={() => setOpenId(null)}
          style={{
            position: 'fixed', inset: 0, zIndex: 50,
            background: 'rgba(0,0,0,0.75)',
            backdropFilter: 'blur(8px)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              position: 'relative',
              width: 'min(92vw, 400px)',
              borderRadius: 3,
              overflow: 'hidden',
              border: '1px solid var(--border)',
              background: 'var(--bg)',
            }}
          >
            <iframe
              src={`https://www.tiktok.com/embed/v2/${openId}?autoplay=1&muted=1`}
              allow="autoplay; fullscreen; encrypted-media; picture-in-picture; clipboard-write"
              allowFullScreen
              style={{ width: '100%', aspectRatio: '9/16', maxHeight: '80vh', border: 'none', display: 'block' }}
            />
            <button
              onClick={() => setOpenId(null)}
              style={{
                position: 'absolute', top: 8, right: 8,
                background: 'rgba(0,0,0,0.65)',
                border: '1px solid var(--border)',
                borderRadius: 2,
                color: 'var(--fg)',
                cursor: 'pointer',
                fontSize: 18,
                lineHeight: 1,
                padding: '2px 8px',
              }}
              aria-label="Fermer"
            >
              ×
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
