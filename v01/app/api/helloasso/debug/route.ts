/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from 'next/server'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'
export const revalidate = 0

function bearerOk(req: NextRequest) {
  const token = process.env.HELLOASSO_DEBUG_TOKEN
  if (!token) return false
  const auth = req.headers.get('authorization') || ''
  const m = auth.match(/^Bearer\s+(.+)/i)
  return !!m && m[1] === token
}

async function getAccessToken(apiBase: string, clientId?: string, clientSecret?: string) {
  if (!clientId || !clientSecret) return null
  const r = await fetch(`${apiBase}/oauth2/token`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({ grant_type: 'client_credentials', client_id: clientId, client_secret: clientSecret }),
    cache: 'no-store',
  })
  if (!r.ok) return null
  const j = await r.json().catch(() => ({} as any))
  return j?.access_token || j?.accessToken || null
}

function sanitize(obj: any): any {
  if (obj === null || obj === undefined) return obj
  if (Array.isArray(obj)) return obj.slice(0, 5).map(sanitize) // limit size
  if (typeof obj === 'object') {
    const out: any = {}
    for (const [k, v] of Object.entries(obj)) {
      // remove typical pii keys
      if (/email|phone|address|name|payer|billing|customer/i.test(k)) continue
      out[k] = sanitize(v)
    }
    return out
  }
  return obj
}

export async function GET(req: NextRequest) {
  if (!bearerOk(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const apiBase = process.env.HELLOASSO_API_BASE || 'https://api.helloasso.com'
  const org = process.env.HELLOASSO_ORG_SLUG
  const clientId = process.env.HELLOASSO_CLIENT_ID
  const clientSecret = process.env.HELLOASSO_CLIENT_SECRET
  if (!org || !clientId || !clientSecret) {
    return NextResponse.json({ error: 'Missing env: HELLOASSO_ORG_SLUG/CLIENT_ID/CLIENT_SECRET' }, { status: 400 })
  }

  const token = await getAccessToken(apiBase, clientId, clientSecret)
  if (!token) return NextResponse.json({ error: 'OAuth failed' }, { status: 502 })

  const what = new URL(req.url).searchParams.get('what') || 'all'

  async function fetchJson(url: string) {
    const r = await fetch(url, { headers: { Authorization: `Bearer ${token}` }, cache: 'no-store' })
    const text = await r.text()
    let j: any
    try { j = JSON.parse(text) } catch { j = { raw: text } }
    return { ok: r.ok, status: r.status, url, data: j }
  }

  const out: any = {}
  if (what === 'subscriptions' || what === 'all') {
    out.subscriptions = await fetchJson(`${apiBase}/v5/organizations/${encodeURIComponent(org)}/subscriptions?state=Active&pageIndex=1&pageSize=20`)
  }
  if (what === 'mandates' || what === 'all') {
    out.mandates = await fetchJson(`${apiBase}/v5/organizations/${encodeURIComponent(org)}/mandates?state=Active&pageIndex=1&pageSize=20`)
  }
  if (what === 'payments' || what === 'all') {
    out.payments = await fetchJson(`${apiBase}/v5/organizations/${encodeURIComponent(org)}/payments?pageIndex=1&pageSize=20&sort=DateDesc`)
  }

  return NextResponse.json(sanitize(out), { headers: { 'Cache-Control': 'no-store' } })
}
