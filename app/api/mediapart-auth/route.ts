import { NextResponse } from 'next/server'
import { createHash } from 'node:crypto'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const COOKIE_NAME = 'st_protected_document_auth'
const COOKIE_MAX_AGE = 60 * 60 * 24 * 30

function getSessionValue(password: string) {
  return createHash('sha256').update(`st-protected-document:${password}`).digest('hex')
}

export async function GET(req: Request) {
  const expected = process.env.MEDIAPART_PAGE_PASSWORD
  if (!expected) {
    return NextResponse.json({ ok: false }, { status: 500 })
  }

  const cookie = req.headers
    .get('cookie')
    ?.split(';')
    .map((part) => part.trim())
    .find((part) => part.startsWith(`${COOKIE_NAME}=`))

  const value = cookie ? decodeURIComponent(cookie.slice(COOKIE_NAME.length + 1)) : ''
  const ok = value === getSessionValue(expected)

  return NextResponse.json({ ok }, { status: ok ? 200 : 401 })
}

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
  const res = NextResponse.json({ ok }, { status: ok ? 200 : 401 })

  if (ok) {
    res.cookies.set({
      name: COOKIE_NAME,
      value: getSessionValue(expected),
      httpOnly: true,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
      maxAge: COOKIE_MAX_AGE,
      path: '/',
    })
  }

  return res
}
