'use client'

import React from 'react'

type YtItem = { id: string; title?: string; publishedAt?: string }
type Item = { kind: 'video'; v: YtItem } | { kind: 'more' }
type ApiVideo = { id?: string; title?: string; publishedAt?: string; views?: number }
type ApiResponse = { videos?: ApiVideo[] }

function isApiResponse(x: unknown): x is ApiResponse {
  return !!x && typeof x === 'object' && 'videos' in (x as Record<string, unknown>)
}

function normalizeId(raw: string) {
  const m =
    raw.match(/[?&]v=([A-Za-z0-9_-]{11})/) ||
    raw.match(/youtu\.be\/([A-Za-z0-9_-]{11})/) ||
    raw.match(/embed\/([A-Za-z0-9_-]{11})/) ||
    raw.match(/^([A-Za-z0-9_-]{11})$/)
  return m ? m[1] : raw
}

function IcoYT() {
  return (
    <svg width={14} height={14} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.5A3 3 0 0 0 .5 6.2C0 8.1 0 12 0 12s0 3.9.5 5.8a3 3 0 0 0 2.1 2.1c1.9.5 9.4.5 9.4.5s7.5 0 9.4-.5a3 3 0 0 0 2.1-2.1C24 15.9 24 12 24 12s0-3.9-.5-5.8zM9.7 15.5v-7l6.3 3.5-6.3 3.5z" />
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

export default function VideosYouTube() {
  const [videos, setVideos] = React.useState<YtItem[]>([])
  const [loading, setLoading] = React.useState(true)
  const [error, setError] = React.useState<string | null>(null)

  React.useEffect(() => {
    let cancelled = false
    ;(async () => {
      try {
        setLoading(true)
        setError(null)
        const base = process.env.NEXT_PUBLIC_BASE_PATH ?? ''
        const res = await fetch(`${base}/api/youtube-latest?max=10`, { cache: 'no-store' })
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        const data: unknown = await res.json().catch(() => ({}))
        const arr: ApiVideo[] = isApiResponse(data) && Array.isArray(data.videos) ? data.videos : []
        const mapped: YtItem[] = arr
          .map((v) => ({
            id: normalizeId(String(v.id ?? '')),
            title: typeof v.title === 'string' ? v.title : undefined,
            publishedAt: typeof v.publishedAt === 'string' ? v.publishedAt : undefined,
          }))
          .filter((v) => v.id && v.id.length === 11)
          .slice(0, 10)
        if (!cancelled) setVideos(mapped)
      } catch (e) {
        if (!cancelled) {
          const msg = e instanceof Error ? e.message : String(e)
          setError(msg)
          setVideos([
            { id: '6S5YPk-GIng', title: 'Vidéo Sans Transition' },
            { id: 'V7d_6ePKy6E', title: 'Vidéo Sans Transition' },
          ])
        }
      } finally {
        if (!cancelled) setLoading(false)
      }
    })()
    return () => { cancelled = true }
  }, [])

  const items: Item[] = [...videos.map((v) => ({ kind: 'video', v } as const)), { kind: 'more' }]
  const placeholders = Array.from({ length: 4 })

  return (
    <div>
      {/* Sub-header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
        <p style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.28em', color: 'var(--muted)' }}>
          YouTube
        </p>
        <a
          href="https://youtube.com/@SansTransitionMedia"
          target="_blank"
          rel="noreferrer"
          className="btn-outline-st"
          style={{ padding: '7px 14px', fontSize: 10 }}
        >
          <IcoYT /> Suivre <ArrowIcon />
        </a>
      </div>

      {error && (
        <p style={{ fontSize: 12, color: '#f59e0b', marginBottom: 16, wordBreak: 'break-all' }}>{error}</p>
      )}

      <div
        className="grid-mosaic"
        style={{ gridTemplateColumns: 'repeat(4, 1fr)' }}
      >
        {loading ? (
          placeholders.map((_, idx) => (
            <div
              key={`sk-${idx}`}
              className="grid-cell"
              style={{ aspectRatio: '16/9' }}
            />
          ))
        ) : (
          items.map((item, k) =>
            item.kind === 'video' ? (
              <div
                key={`${item.v.id}-${k}`}
                className="grid-cell"
                style={{ position: 'relative', aspectRatio: '16/9' }}
              >
                <iframe
                  style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', border: 'none' }}
                  src={`https://www.youtube.com/embed/${item.v.id}?rel=0&modestbranding=1&playsinline=1`}
                  title={item.v.title ?? 'Lecture YouTube'}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              </div>
            ) : (
              <a
                key={`more-${k}`}
                href="https://youtube.com/@SansTransitionMedia/videos"
                target="_blank"
                rel="noopener noreferrer"
                className="grid-cell"
                style={{
                  aspectRatio: '16/9',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  textDecoration: 'none',
                  gap: 8,
                }}
                aria-label="Voir plus sur YouTube"
              >
                <span style={{ fontSize: 22, fontWeight: 700, letterSpacing: '-0.02em', color: 'var(--fg)' }}>Voir +</span>
                <ArrowIcon />
              </a>
            )
          )
        )}
      </div>
    </div>
  )
}
