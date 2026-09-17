/* eslint-disable @next/next/no-img-element */
'use client'

import { useRef } from 'react'
import { useSocialStats } from '@/hooks/useSocialStats'

const nfCompact = new Intl.NumberFormat('fr-FR', { notation: 'compact', compactDisplay: 'short' })

function fmt(value: number | null | undefined) {
  return value == null ? '—' : nfCompact.format(value)
}
function IcoInstagram() {
  return (
    <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden>
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <circle cx="12" cy="12" r="4.5" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  )
}

function ArrowIcon() {
  return <svg width={12} height={12} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden><path d="M3 8h10M9 4l4 4-4 4" /></svg>
}

function Chev({ direction }: { direction: 'left' | 'right' }) {
  return <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden><path d={direction === 'left' ? 'M15 6l-6 6 6 6' : 'M9 6l6 6-6 6'} /></svg>
}

export default function VideosInstagram() {
  const railRef = useRef<HTMLDivElement | null>(null)
  const stats = useSocialStats()
  const videos = stats?.videos.instagram ?? []

  const scroll = (direction: 'left' | 'right') => {
    const rail = railRef.current
    if (!rail) return
    rail.scrollBy({ left: Math.round(rail.clientWidth * 0.85) * (direction === 'left' ? -1 : 1), behavior: 'smooth' })
  }

  const items = stats ? [...videos, '__MORE__' as const] : Array.from({ length: 8 }, () => null)

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
        <p style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.28em', color: 'var(--muted)' }}>
          Instagram · {stats ? videos.length + ' publications' : '…'}
        </p>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <a href="https://www.instagram.com/sanstransition__/" target="_blank" rel="noreferrer" className="btn-outline-st" style={{ padding: '7px 14px', fontSize: 10 }}>
            <IcoInstagram /> Suivre <ArrowIcon />
          </a>
          {(['left', 'right'] as const).map((direction) => (
            <button key={direction} onClick={() => scroll(direction)} aria-label={direction === 'left' ? 'Défiler à gauche' : 'Défiler à droite'} style={{ background: 'none', border: '1px solid var(--border2)', borderRadius: 2, padding: 6, cursor: 'pointer', color: 'var(--muted)', display: 'flex', alignItems: 'center' }}>
              <Chev direction={direction} />
            </button>
          ))}
        </div>
      </div>

      <div ref={railRef} style={{ display: 'flex', gap: 1, overflowX: 'auto', scrollSnapType: 'x mandatory', scrollBehavior: 'smooth', scrollbarWidth: 'none', msOverflowStyle: 'none', background: 'var(--border)', border: '1px solid var(--border)', borderRadius: 3 }}>
        {items.map((item, index) => {
          if (item === null) return <div key={'sk-' + index} style={{ flexShrink: 0, width: 200, scrollSnapAlign: 'start', background: 'var(--surface)', aspectRatio: '9/16' }} />
          if (item === '__MORE__') return <a key="more" href="https://www.instagram.com/sanstransition__/" target="_blank" rel="noreferrer" style={{ flexShrink: 0, width: 200, scrollSnapAlign: 'start', background: 'var(--surface)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textDecoration: 'none', gap: 8, aspectRatio: '9/16', color: 'var(--fg)' }}><span style={{ fontSize: 22, fontWeight: 700 }}>Voir +</span><ArrowIcon /></a>

          const title = item.title || item.description || 'Publication Instagram'
          const dateLabel = new Date(item.create_time).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' })
          const href = item.share_url ?? 'https://www.instagram.com/sanstransition__/'

          return (
            <div key={item.video_id} style={{ flexShrink: 0, width: 200, scrollSnapAlign: 'start', background: 'var(--bg)', display: 'flex', flexDirection: 'column' }}>
              <a href={href} target="_blank" rel="noreferrer" style={{ display: 'block', width: '100%', aspectRatio: '9/16', position: 'relative', background: 'var(--surface2)', overflow: 'hidden' }}>
                {item.cover_url && <img src={item.cover_url} alt={title} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} loading="lazy" decoding="async" />}
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.72) 0%, transparent 55%)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'rgba(255,255,255,0.75)', fontSize: 24 }}>↗</div>
              </a>
              <div style={{ padding: '10px 12px', borderTop: '1px solid var(--border)', flex: 1, display: 'flex', flexDirection: 'column', gap: 6 }}>
                <p style={{ fontSize: 11, color: 'var(--fg)', lineHeight: 1.4, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{title}</p>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 10, color: 'var(--muted)', fontVariantNumeric: 'tabular-nums', marginTop: 'auto' }}>
                  <span>{fmt(item.latest_snapshot?.view_count)} vues</span>
                  <span>{item.metrics.engagement_rate != null ? item.metrics.engagement_rate.toFixed(1) + '% ER' : '—'}</span>
                </div>
                <p style={{ fontSize: 9, color: 'var(--border2)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>{dateLabel}</p>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
