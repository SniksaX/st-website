'use client'

import React from 'react'

type ProgressData = {
  monthlyActive: number
  monthlyAmount?: number
  goal?: number
  currency?: string
}

export default function DonProgress({ goal = 1000 }: { goal?: number }) {
  const [data, setData] = React.useState<ProgressData | null>(null)
  const [error, setError] = React.useState<string | null>(null)
  const [loading, setLoading] = React.useState(true)

  React.useEffect(() => {
    let cancelled = false
    ;(async () => {
      try {
        setLoading(true)
        const res = await fetch('/api/don-progress', { cache: 'no-store' })
        if (!res.ok) throw new Error(`/api/don-progress ${res.status}`)
        const j = (await res.json()) as ProgressData
        if (!cancelled) setData(j)
      } catch (e: unknown) {
        if (!cancelled) setError(e instanceof Error ? e.message : String(e))
      } finally {
        if (!cancelled) setLoading(false)
      }
    })()
    return () => { cancelled = true }
  }, [])

  const count = Math.max(0, Math.min(data?.monthlyActive ?? 0, goal))
  const pct = Math.round((count / goal) * 100)
  const nf = new Intl.NumberFormat('fr-FR')

  return (
    <div style={{
      border: '1px solid var(--border)',
      borderRadius: 3,
      background: 'var(--bg)',
      padding: 'clamp(20px,2.5vw,28px)',
    }}>
      <div style={{
        display: 'flex',
        alignItems: 'baseline',
        justifyContent: 'space-between',
        gap: 12,
        marginBottom: 12,
        flexWrap: 'wrap',
      }}>
        <span style={{ fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.2em', color: 'var(--muted)' }}>
          Objectif
        </span>
        <span style={{ fontSize: 14, color: 'var(--fg2)', fontVariantNumeric: 'tabular-nums' }}>
          <strong style={{ color: 'var(--fg)', fontSize: 20 }}>{loading ? '…' : nf.format(count)}</strong>
          {' '}/ {nf.format(goal)} donateur·ices
        </span>
      </div>

      <div style={{ height: 8, borderRadius: 4, background: 'var(--surface2)', overflow: 'hidden' }}>
        <div style={{
          width: `${pct}%`,
          height: '100%',
          background: 'var(--grad)',
          transition: 'width 0.7s ease',
        }} />
      </div>

      {typeof data?.monthlyAmount === 'number' && data.monthlyAmount > 0 && (
        <p style={{ fontSize: 13, color: 'var(--fg2)', marginTop: 12, fontVariantNumeric: 'tabular-nums' }}>
          {(data.monthlyAmount / 100).toLocaleString('fr-FR', { style: 'currency', currency: data.currency || 'EUR' })} de dons récurrents chaque mois.
        </p>
      )}

      <p style={{ fontSize: 13, color: 'var(--muted)', marginTop: 12, lineHeight: 1.55 }}>
        Un don de 2 €/mois vous revient à <strong style={{ color: 'var(--fg)' }}>0,68 € réels</strong> après réduction d&apos;impôt de 66 %.
      </p>

      {error && (
        <p style={{ marginTop: 8, fontSize: 11, color: '#ef4444', wordBreak: 'break-all' }}>{error}</p>
      )}
    </div>
  )
}
