'use client'

import { useEffect, useState } from 'react'

export type SocialVideo = {
  video_id: string
  platform: 'tiktok' | 'instagram'
  title: string | null
  description: string | null
  create_time: string
  share_url: string | null
  cover_url: string | null
  latest_snapshot: {
    view_count: number | null
    like_count: number | null
    comment_count: number | null
    share_count: number | null
  } | null
  metrics: { engagement_rate: number | null }
}

type SocialStats = {
  accounts: Array<{
    platform: 'tiktok' | 'instagram'
    followers: number | null
    capturedAt: string | null
  }>
  videos: { tiktok: SocialVideo[]; instagram: SocialVideo[] }
  lastCollectionAt: string | null
  lastCollectionStatus: 'ok' | 'partial' | 'error' | null
}

let request: Promise<SocialStats | null> | null = null

async function load() {
  const response = await fetch('/api/social-stats', { cache: 'no-store' })
  if (!response.ok) return null
  return response.json() as Promise<SocialStats>
}

export function useSocialStats() {
  const [stats, setStats] = useState<SocialStats | null>(null)

  useEffect(() => {
    request ??= load()
    request.then(setStats).catch(() => setStats(null))
  }, [])

  return stats
}
