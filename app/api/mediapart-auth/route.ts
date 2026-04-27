import { NextResponse } from 'next/server'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export async function POST(req: Request) {
  let body: { password?: string }
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 })
  }

  const expected = process.env.MEDIAPART_PAGE_PASSWORD
  if (!expected) {
    return NextResponse.json({ ok: false }, { status: 500 })
  }

  const ok = body.password === expected
  return NextResponse.json({ ok }, { status: ok ? 200 : 401 })
}
