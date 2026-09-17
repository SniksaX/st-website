type StatsStAccount = {
  platform: 'tiktok' | 'instagram'
  current_stats: {
    captured_at: string
    follower_count: number | null
  } | null
}

type StatsStVideo = {
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
  metrics: {
    engagement_rate: number | null
  }
}

type StatsStHealth = {
  last_run: {
    finished_at: string | null
    status: 'ok' | 'partial' | 'error'
  } | null
}

type SocialStatsData = {
  accounts: Array<{
    platform: 'tiktok' | 'instagram'
    followers: number | null
    capturedAt: string | null
  }>
  videos: {
    tiktok: StatsStVideo[]
    instagram: StatsStVideo[]
  }
  lastCollectionAt: string | null
  lastCollectionStatus: 'ok' | 'partial' | 'error' | null
}

const staticSnapshot = latestSnapshot as SocialStatsData

function statsBaseUrl() {
  const value = process.env.STATSST_API_URL?.trim()
  if (!value) return null
  return value.replace(/\/$/, '')
}

async function getJson<T>(path: string): Promise<T> {
  const baseUrl = statsBaseUrl()
  if (!baseUrl) throw new Error('StatsST n’est pas configuré')

  const response = await fetch(`${baseUrl}${path}`, {
    next: { revalidate: 300 },
    signal: AbortSignal.timeout(8_000),
  })
  if (!response.ok) throw new Error(`StatsST a répondu ${response.status}`)
  return response.json() as Promise<T>
}

export async function getStatsStSocialData(): Promise<SocialStatsData> {
  if (!statsBaseUrl()) return staticSnapshot

  try {
    const [tiktok, instagram, tiktokVideos, instagramVideos, health] = await Promise.all([
      getJson<StatsStAccount>('/api/account?platform=tiktok'),
      getJson<StatsStAccount>('/api/account?platform=instagram'),
      getJson<{ videos: StatsStVideo[] }>('/api/videos?platform=tiktok&limit=50'),
      getJson<{ videos: StatsStVideo[] }>('/api/videos?platform=instagram&limit=50'),
      getJson<StatsStHealth>('/api/health'),
    ])

    return {
      accounts: [tiktok, instagram].map((account) => ({
        platform: account.platform,
        followers: account.current_stats?.follower_count ?? null,
        capturedAt: account.current_stats?.captured_at ?? null,
      })),
      videos: {
        tiktok: tiktokVideos.videos,
        instagram: instagramVideos.videos,
      },
      lastCollectionAt: health.last_run?.finished_at ?? null,
      lastCollectionStatus: health.last_run?.status ?? null,
    }
  } catch {
    return staticSnapshot
  }
}
import latestSnapshot from '@/data/statsst-latest.json'
