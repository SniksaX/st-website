import { NextResponse } from 'next/server'
import { revalidatePath, revalidateTag } from 'next/cache'
import {
  getStatsStSocialData,
  isSocialStatsData,
  isValidPushToken,
  savePushedSnapshot,
  STATSST_CACHE_TAG,
} from '@/lib/statsst'

export const revalidate = 300

export async function GET() {
  try {
    return NextResponse.json(await getStatsStSocialData())
  } catch {
    return NextResponse.json(
      { error: 'Les données sociales ne sont pas disponibles.' },
      { status: 503, headers: { 'Cache-Control': 'no-store' } },
    )
  }
}

/**
 * POST /api/social-stats
 * Appelé par le bouton Actualiser de StatsST, avec le jeton STATSST_PUSH_TOKEN.
 * Enregistre l'instantané reçu et vide le cache pour que le site l'affiche tout de suite.
 */
export async function POST(request: Request) {
  if (!isValidPushToken(request.headers.get('authorization'))) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  let body: unknown
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'JSON invalide.' }, { status: 400 })
  }
  if (!isSocialStatsData(body)) {
    return NextResponse.json({ error: 'Format de données inattendu.' }, { status: 400 })
  }

  try {
    await savePushedSnapshot(body)
  } catch (error) {
    console.error('[social-stats] Enregistrement impossible :', error)
    return NextResponse.json({ error: 'Enregistrement impossible.' }, { status: 500 })
  }

  revalidateTag(STATSST_CACHE_TAG)
  revalidatePath('/api/social-stats')

  return NextResponse.json({ ok: true, receivedAt: new Date().toISOString() })
}
