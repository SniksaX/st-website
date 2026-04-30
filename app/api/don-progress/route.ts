/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from 'next/server';
import { getProgress } from '@/lib/progressStore';

type HAProgress = { monthlyActive: number; monthlyAmount?: number; currency?: string };

async function fetchHelloAssoProgress(): Promise<HAProgress | null> {
  const clientId = process.env.HELLOASSO_CLIENT_ID;
  const clientSecret = process.env.HELLOASSO_CLIENT_SECRET;
  const org = process.env.HELLOASSO_ORG_SLUG;
  if (!clientId || !clientSecret || !org) return null;

  const API_BASE = process.env.HELLOASSO_API_BASE || 'https://api.helloasso.com';
  const formType = process.env.HELLOASSO_FORM_TYPE || 'Donation';
  const formSlug = process.env.HELLOASSO_FORM_SLUG || '1';

  // Les montants HelloAsso v5 sont en centimes (ex: 200 = 2€)
  const toCents = (v: unknown): number | undefined => {
    if (v === null || v === undefined) return undefined;
    const n = Number(v);
    return Number.isFinite(n) ? Math.round(n) : undefined;
  };

  // 1) Token OAuth2
  const tokenRes = await fetch(`${API_BASE}/oauth2/token`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({ grant_type: 'client_credentials', client_id: clientId, client_secret: clientSecret }),
    cache: 'no-store',
    next: { revalidate: 0 },
  });
  if (!tokenRes.ok) return null;
  const tokenJson: any = await tokenRes.json().catch(() => ({}));
  const accessToken: string | undefined = tokenJson?.access_token || tokenJson?.accessToken;
  if (!accessToken) return null;

  // 2) Scan de tous les orders du formulaire de don via continuationToken.
  //    items[].type === 'MonthlyDonation' && items[].state === 'Processed' → abonné actif
  //    items[].type === 'MonthlyDonation' && items[].state === 'Canceled'  → résilié → exclu
  let monthlyActive = 0;
  let monthlyAmount = 0;
  let continuationToken: string | undefined;
  let pages = 0;
  while (pages < 20) {
    const params = new URLSearchParams({ pageSize: '100', sort: 'DateDesc' });
    if (continuationToken) params.set('continuationToken', continuationToken);
    const url = `${API_BASE}/v5/organizations/${encodeURIComponent(org)}/forms/${formType}/${formSlug}/orders?${params}`;
    const res = await fetch(url, {
      headers: { Authorization: `Bearer ${accessToken}` },
      cache: 'no-store',
      next: { revalidate: 0 },
    });
    if (!res.ok) break;
    const j: any = await res.json().catch(() => ({}));
    const orders: any[] = Array.isArray(j?.data) ? j.data : Array.isArray(j) ? j : [];
    for (const order of orders) {
      const its: any[] = Array.isArray(order?.items) ? order.items : [];
      const monthlyItem = its.find((x: any) => x?.type === 'MonthlyDonation' && x?.state === 'Processed');
      if (!monthlyItem) continue;
      monthlyActive += 1;
      const a = toCents(monthlyItem.amount);
      if (typeof a === 'number') monthlyAmount += a;
    }
    const nextToken: string | undefined = j?.pagination?.continuationToken;
    if (!nextToken || orders.length < 100) break;
    continuationToken = nextToken;
    pages += 1;
  }

  if (monthlyActive === 0) return { monthlyActive: 0 };
  return { monthlyActive, monthlyAmount, currency: 'EUR' };
}

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
export const revalidate = 0;

// Cache mémoire 5 min (configurable via DON_PROGRESS_CACHE_MS)
let __cacheAt = 0;
let __cacheData: any | null = null;
const CACHE_TTL_MS = Number(process.env.DON_PROGRESS_CACHE_MS || 300000);

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const refresh = url.searchParams.get('refresh');
    const now = Date.now();
    if (!refresh && __cacheData && now - __cacheAt < CACHE_TTL_MS) {
      return NextResponse.json(__cacheData, { headers: { 'Cache-Control': 'no-store, no-cache, must-revalidate' } });
    }
  } catch {}

  const goal = Number(process.env.DON_PROGRESS_GOAL || 1000);
  const fromAPI = await fetchHelloAssoProgress().catch(() => null);
  const fromStore = getProgress();
  let monthlyActive = fromAPI?.monthlyActive ?? fromStore.monthlyActive;
  let monthlyAmount = fromAPI?.monthlyAmount ?? fromStore.monthlyAmount;
  let currency = fromAPI?.currency || fromStore.currency || 'EUR';

  if (!monthlyActive && process.env.DON_PROGRESS_ACTIVE) monthlyActive = Number(process.env.DON_PROGRESS_ACTIVE);
  if (!monthlyAmount && process.env.DON_PROGRESS_AMOUNT) monthlyAmount = Number(process.env.DON_PROGRESS_AMOUNT);
  if (process.env.DON_PROGRESS_CURRENCY) currency = process.env.DON_PROGRESS_CURRENCY;

  const payload = { monthlyActive, monthlyAmount, goal, currency } as const;
  __cacheData = payload;
  __cacheAt = Date.now();
  return NextResponse.json(payload, { headers: { 'Cache-Control': 'no-store, no-cache, must-revalidate' } });
}
