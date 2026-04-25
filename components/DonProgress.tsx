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

  const count = Math.max(0, Math.min((data?.monthlyActive ?? 0), goal))
  const pct = Math.round((count / goal) * 100)

  return (
    <div style={{
      border: '1px solid var(--border)',
      borderRadius: 3,
      background: 'var(--surface)',
      padding: 'clamp(16px,2vw,24px)',
    }}>
      <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 16, marginBottom: 16 }}>
        <div>
          <p style={{ fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.24em', color: 'var(--muted)', marginBottom: 4 }}>
            Objectif
          </p>
          <p style={{ fontSize: 24, fontWeight: 700, letterSpacing: '-0.02em', color: 'var(--fg)', fontVariantNumeric: 'tabular-nums' }}>
            {loading ? '…' : `${count} / ${goal}`}
          </p>
        </div>
        {typeof data?.monthlyAmount === 'number' && (
          <div style={{ textAlign: 'right' }}>
            <p style={{ fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.24em', color: 'var(--muted)', marginBottom: 4 }}>
              Par mois
            </p>
            <p style={{ fontSize: 18, fontWeight: 600, color: 'var(--fg)' }}>
              {(data.monthlyAmount / 100).toLocaleString('fr-FR', { style: 'currency', currency: data?.currency || 'EUR' })}
            </p>
          </div>
        )}
      </div>

      {/* Progress bar */}
      <div style={{ height: 3, background: 'var(--border2)', borderRadius: 2, overflow: 'hidden' }}>
        <div
          style={{
            height: '100%',
            width: `${pct}%`,
            background: 'var(--grad)',
            borderRadius: 2,
            transition: 'width 0.7s ease',
          }}
        />
      </div>

      <p style={{ fontSize: 11, color: 'var(--muted)', marginTop: 8 }}>
        {pct}% de l&apos;objectif atteint
      </p>

      {error && (
        <p style={{ marginTop: 8, fontSize: 11, color: '#ef4444', wordBreak: 'break-all' }}>{error}</p>
      )}
    </div>
  )
}
