/* eslint-disable @next/next/no-img-element */
'use client'

import React from 'react'
import { useSocialStats, type SocialVideo } from '@/hooks/useSocialStats'

const COUNT = 5

const nf = new Intl.NumberFormat('fr-FR')
const df = new Intl.DateTimeFormat('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' })

/* ── Badge de format, déduit du titre ──────────────────── */
const FORMATS: Array<{ label: string; test: RegExp; accent?: boolean }> = [
  { label: 'Fokus',      test: /#?fokus/i },
  { label: 'Hédito',     test: /#?h[ée]dito/i },
  { label: 'Mikro',      test: /#?mikro/i },
  { label: "L'Œil",      test: /l['’]?\s?(œil|oeil)/i },
  { label: 'Interview',  test: /interview|entretien/i },
  { label: 'Terrain',    test: /manif|f[êe]te de l['’]humanit[ée]|lyc[ée]e|gr[èe]ve|rassemblement/i, accent: true },
]

function formatOf(title: string) {
  return FORMATS.find((f) => f.test.test(title)) ?? null
}

/* Nettoie hashtags, mentions et espaces multiples */
function cleanTitle(raw: string | null) {
  if (!raw) return 'Vidéo Sans Transition'
  const cleaned = raw
    .replace(/#[\p{L}\p{N}_]+/gu, ' ')
    .replace(/@/g, '')
    .replace(/\s+/g, ' ')
    .replace(/\s+([.,;:!?])/g, '$1')
    .trim()
    .replace(/[.\s]+$/, '')
  return cleaned.length > 2 ? cleaned : 'Vidéo Sans Transition'
}

export default function LatestVideos() {
  const socialStats = useSocialStats()
  const [thumbs, setThumbs] = React.useState<Record<string, string | null>>({})

  const videos: SocialVideo[] = React.useMemo(() => {
    const list = socialStats?.videos.tiktok ?? []
    return [...list]
      .sort((a, b) => new Date(b.create_time).getTime() - new Date(a.create_time).getTime())
      .slice(0, COUNT)
  }, [socialStats])

  /* Vignettes manquantes via oEmbed */
  React.useEffect(() => {
    const ids = videos.filter((v) => !v.cover_url).map((v) => v.video_id)
    if (ids.length === 0) return
    let cancelled = false
    ;(async () => {
      try {
        const res = await fetch(`/api/tiktok-oembed?ids=${encodeURIComponent(ids.join(','))}`, { cache: 'no-store' })
        if (!res.ok) return
        const json = await res.json()
        const map = (json?.map ?? {}) as Record<string, { thumbnail_url?: string } | null>
        if (cancelled) return
        setThumbs(Object.fromEntries(Object.entries(map).map(([id, v]) => [id, v?.thumbnail_url ?? null])))
      } catch { /* silencieux */ }
    })()
    return () => { cancelled = true }
  }, [videos])

  const cells: Array<SocialVideo | null> = videos.length > 0 ? videos : Array.from({ length: COUNT }, () => null)

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(190px,1fr))', gap: 16 }}>
      {cells.map((video, i) => {
        if (!video) {
          return (
            <div key={`skeleton-${i}`} style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <div style={{
                aspectRatio: '9/16',
                borderRadius: 3,
                border: '1px solid var(--border)',
                background: 'repeating-linear-gradient(135deg,var(--surface2) 0 8px,var(--surface) 8px 16px)',
              }} />
              <div style={{ height: 12, width: '80%', background: 'var(--surface2)', borderRadius: 2 }} />
              <div style={{ height: 10, width: '45%', background: 'var(--surface2)', borderRadius: 2 }} />
            </div>
          )
        }

        const title = cleanTitle(video.title ?? video.description)
        const badge = formatOf(video.title ?? '')
        const cover = video.cover_url ?? thumbs[video.video_id] ?? null
        const views = video.latest_snapshot?.view_count ?? null

        return (
          <a
            key={video.video_id}
            href={video.share_url ?? 'https://www.tiktok.com/@sanstransition'}
            target="_blank"
            rel="noreferrer"
            style={{ display: 'flex', flexDirection: 'column', gap: 10, textDecoration: 'none' }}
          >
            <div style={{
              position: 'relative',
              aspectRatio: '9/16',
              borderRadius: 3,
              overflow: 'hidden',
              border: '1px solid var(--border)',
              background: 'repeating-linear-gradient(135deg,var(--surface2) 0 8px,var(--surface) 8px 16px)',
            }}>
              {cover && (
                <img
                  src={cover}
                  alt=""
                  loading="lazy"
                  style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
                />
              )}
              {badge && (
                <span style={{
                  position: 'absolute', top: 10, left: 10,
                  fontSize: 11, fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase',
                  color: '#fff',
                  background: badge.accent ? 'var(--grad)' : 'rgba(8,8,14,0.8)',
                  padding: '4px 8px',
                  borderRadius: 2,
                }}>
                  {badge.label}
                </span>
              )}
              {views != null && (
                <span style={{
                  position: 'absolute', bottom: 10, left: 10,
                  fontSize: 12, fontWeight: 700, color: '#fff',
                  background: 'rgba(8,8,14,0.8)',
                  padding: '4px 8px',
                  borderRadius: 2,
                  fontVariantNumeric: 'tabular-nums',
                }}>
                  {nf.format(views)} vues
                </span>
              )}
            </div>
            <p style={{ fontSize: 14, lineHeight: 1.45, color: 'var(--fg)', textWrap: 'pretty' }}>{title}</p>
            <p style={{ fontSize: 12, color: 'var(--muted)', fontVariantNumeric: 'tabular-nums' }}>
              {df.format(new Date(video.create_time))} · TikTok
            </p>
          </a>
        )
      })}
    </div>
  )
}
