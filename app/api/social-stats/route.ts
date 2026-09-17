import { NextResponse } from 'next/server'
import { getStatsStSocialData } from '@/lib/statsst'

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
