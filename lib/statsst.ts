import { createHash, timingSafeEqual } from 'crypto'
import latestSnapshot from '@/data/statsst-latest.json'

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

export type SocialStatsData = {
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

export const STATSST_CACHE_TAG = 'statsst'

const staticSnapshot = latestSnapshot as SocialStatsData

/* ── Source 1 : instantané poussé par StatsST (bouton Actualiser) ───────── */

const SANITY_API_VERSION = '2024-01-01'
const SNAPSHOT_DOC_ID = 'statsstSnapshot'

function sanityConfig() {
  const projectId = process.env.SANITY_PROJECT_ID?.trim()
  const dataset = process.env.SANITY_DATASET?.trim() || 'production'
  const token = process.env.SANITY_API_TOKEN?.trim()
  if (!projectId || !token) return null
  return { projectId, dataset, token }
}

async function readPushedSnapshot(): Promise<SocialStatsData | null> {
  const config = sanityConfig()
  if (!config) return null

  const query = encodeURIComponent(`*[_id == "${SNAPSHOT_DOC_ID}"][0]{payload}`)
  const response = await fetch(
    `https://${config.projectId}.api.sanity.io/v${SANITY_API_VERSION}/data/query/${config.dataset}?query=${query}`,
    {
      headers: { Authorization: `Bearer ${config.token}` },
      next: { revalidate: 300, tags: [STATSST_CACHE_TAG] },
      signal: AbortSignal.timeout(8_000),
    },
  )
  if (!response.ok) throw new Error(`Sanity a répondu ${response.status}`)
  const { result } = await response.json() as { result: { payload?: string } | null }
  if (!result?.payload) return null
  const parsed = JSON.parse(result.payload) as unknown
  return isSocialStatsData(parsed) ? parsed : null
}

export async function savePushedSnapshot(data: SocialStatsData): Promise<void> {
  const config = sanityConfig()
  if (!config) throw new Error('Sanity n’est pas configuré')

  const response = await fetch(
    `https://${config.projectId}.api.sanity.io/v${SANITY_API_VERSION}/data/mutate/${config.dataset}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${config.token}` },
      body: JSON.stringify({
        mutations: [{
          createOrReplace: {
            _id: SNAPSHOT_DOC_ID,
            _type: 'statsstSnapshot',
            receivedAt: new Date().toISOString(),
            lastCollectionAt: data.lastCollectionAt,
            // Stocké en texte : le site relit l'objet tel quel, sans schéma Sanity.
            payload: JSON.stringify(data),
          },
        }],
      }),
      cache: 'no-store',
      signal: AbortSignal.timeout(15_000),
    },
  )
  if (!response.ok) {
    const text = await response.text().catch(() => response.statusText)
    throw new Error(`Enregistrement Sanity refusé (${response.status}) : ${text}`)
  }
}

export function isSocialStatsData(value: unknown): value is SocialStatsData {
  if (!value || typeof value !== 'object') return false
  const data = value as Partial<SocialStatsData>
  return (
    Array.isArray(data.accounts)
    && data.accounts.every((account) => account && (account.platform === 'tiktok' || account.platform === 'instagram'))
    && !!data.videos
    && Array.isArray(data.videos.tiktok)
    && Array.isArray(data.videos.instagram)
  )
}

/** Vérifie le jeton envoyé par StatsST, sans fuite par le temps de réponse. */
export function isValidPushToken(header: string | null): boolean {
  const expected = process.env.STATSST_PUSH_TOKEN?.trim()
  if (!expected || !header?.startsWith('Bearer ')) return false
  const given = header.slice('Bearer '.length).trim()
  const digest = (value: string) => createHash('sha256').update(value).digest()
  return timingSafeEqual(digest(given), digest(expected))
}

/* ── Source 2 : lecture directe de StatsST (si STATSST_API_URL est en ligne) ── */

function statsBaseUrl() {
  const value = process.env.STATSST_API_URL?.trim()
  if (!value) return null
  return value.replace(/\/$/, '')
}

async function getJson<T>(path: string): Promise<T> {
  const baseUrl = statsBaseUrl()
  if (!baseUrl) throw new Error('StatsST n’est pas configuré')

  const response = await fetch(`${baseUrl}${path}`, {
    // Évite la page d'avertissement des tunnels ngrok gratuits.
    headers: { 'ngrok-skip-browser-warning': '1' },
    next: { revalidate: 300, tags: [STATSST_CACHE_TAG] },
    signal: AbortSignal.timeout(8_000),
  })
  if (!response.ok) throw new Error(`StatsST a répondu ${response.status}`)
  return response.json() as Promise<T>
}

function settled<T>(result: PromiseSettledResult<T>): T | null {
  return result.status === 'fulfilled' ? result.value : null
}

async function readLiveStatsSt(): Promise<SocialStatsData | null> {
  if (!statsBaseUrl()) return null

  // Une plateforme en panne ne doit pas faire tomber l'autre.
  const results = await Promise.allSettled([
    getJson<StatsStAccount>('/api/account?platform=tiktok'),
    getJson<StatsStAccount>('/api/account?platform=instagram'),
    getJson<{ videos: StatsStVideo[] }>('/api/videos?platform=tiktok&limit=50'),
    getJson<{ videos: StatsStVideo[] }>('/api/videos?platform=instagram&limit=50'),
    getJson<StatsStHealth>('/api/health'),
  ])
  const tiktok = settled(results[0])
  const instagram = settled(results[1])
  const tiktokVideos = settled(results[2])
  const instagramVideos = settled(results[3])
  const health = settled(results[4])

  const accounts = [tiktok, instagram].filter((account): account is StatsStAccount => !!account)
  if (accounts.length === 0) return null

  return {
    accounts: accounts.map((account) => ({
      platform: account.platform,
      followers: account.current_stats?.follower_count ?? null,
      capturedAt: account.current_stats?.captured_at ?? null,
    })),
    videos: {
      tiktok: tiktokVideos?.videos ?? [],
      instagram: instagramVideos?.videos ?? [],
    },
    lastCollectionAt: health?.last_run?.finished_at ?? null,
    lastCollectionStatus: health?.last_run?.status ?? null,
  }
}

/* ── Choix de la source la plus récente ─────────────────────────────────── */

function freshness(data: SocialStatsData): number {
  const dates = [data.lastCollectionAt, ...data.accounts.map((account) => account.capturedAt)]
    .map((value) => (value ? Date.parse(value) : NaN))
    .filter((value) => Number.isFinite(value))
  return dates.length ? Math.max(...dates) : 0
}

export async function getStatsStSocialData(): Promise<SocialStatsData> {
  const [pushedResult, liveResult] = await Promise.allSettled([readPushedSnapshot(), readLiveStatsSt()])
  const pushed = settled(pushedResult)
  const live = settled(liveResult)

  const candidates = [pushed, live, staticSnapshot].filter((data): data is SocialStatsData => !!data)
  return candidates.reduce((best, data) => (freshness(data) > freshness(best) ? data : best))
}
