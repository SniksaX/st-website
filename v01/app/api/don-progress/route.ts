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

  // HelloAsso amounts are integers in cents in v5 responses (e.g., 200 = €2)
  const toCents = (v: unknown): number | undefined => {
    if (v === null || v === undefined) return undefined;
    const n = Number(v);
    if (!Number.isFinite(n)) return undefined;
    return Math.round(n);
  };

  const pick = <T = unknown>(obj: any, paths: string[]): T | undefined => {
    for (const p of paths) {
      try {
        const parts = p.split('.');
        let cur: any = obj;
        for (const k of parts) cur = cur?.[k];
        if (cur !== undefined && cur !== null) return cur as T;
      } catch {}
    }
    return undefined;
  };

  // 1) Token
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

  // 2) Try a direct subscriptions endpoint first
  try {
    let pageIndex = 1;
    const pageSize = 100;
    let subs: any[] = [];
    while (pageIndex <= 20) {
      const url = `${API_BASE}/v5/organizations/${encodeURIComponent(org)}/subscriptions?state=Active&pageIndex=${pageIndex}&pageSize=${pageSize}`;
      const res = await fetch(url, {
        headers: { Authorization: `Bearer ${accessToken}` },
        cache: 'no-store',
        next: { revalidate: 0 },
      });
      if (!res.ok) break;
      const j: any = await res.json().catch(() => ({}));
      const items: any[] = Array.isArray(j?.data) ? j.data : Array.isArray(j) ? j : [];
      subs = subs.concat(items);
      if (!Array.isArray(j?.data) || items.length < pageSize) break;
      pageIndex += 1;
    }
    if (subs.length > 0) {
      let amountCents = 0;
      let currency: string | undefined;
      for (const it of subs) {
        const c = it?.amount?.currency || it?.currency;
        if (!currency && c) currency = String(c);
        const a = toCents(it?.amount?.amount ?? it?.amountCents ?? it?.amount);
        if (typeof a === 'number') amountCents += a;
      }
      return { monthlyActive: subs.length, monthlyAmount: amountCents, currency };
    }
  } catch {}

  // 3) Try active mandates (recurring authorization) if available
  try {
    let pageIndex = 1;
    const pageSize = 100;
    let mandates: any[] = [];
    while (pageIndex <= 20) {
      const url = `${API_BASE}/v5/organizations/${encodeURIComponent(org)}/mandates?state=Active&pageIndex=${pageIndex}&pageSize=${pageSize}`;
      const res = await fetch(url, {
        headers: { Authorization: `Bearer ${accessToken}` },
        cache: 'no-store',
        next: { revalidate: 0 },
      });
      if (!res.ok) break;
      const j: any = await res.json().catch(() => ({}));
      const items: any[] = Array.isArray(j?.data) ? j.data : Array.isArray(j) ? j : [];
      mandates = mandates.concat(items);
      if (!Array.isArray(j?.data) || items.length < pageSize) break;
      pageIndex += 1;
    }
    if (mandates.length > 0) {
      let amountCents = 0;
      let currency: string | undefined;
      for (const it of mandates) {
        const c = it?.amount?.currency || it?.currency;
        if (!currency && c) currency = String(c);
        const a = toCents(it?.amount?.amount ?? it?.amountCents ?? it?.amount);
        if (typeof a === 'number') amountCents += a;
      }
      return { monthlyActive: mandates.length, monthlyAmount: amountCents, currency };
    }
  } catch {}

  // 4) Fallback: scan payments and infer subscriptions by subscriptionId or recurrence
  const pageIndex = 1;
  const pageSize = 100;
  const mapBySub: Record<string, { amountCents?: number; currency?: string }> = {};
  // Only scan the most recent page to avoid counting historical months as multiple active donors
  while (pageIndex <= 1) {
    const url = `${API_BASE}/v5/organizations/${encodeURIComponent(org)}/payments?pageIndex=${pageIndex}&pageSize=${pageSize}&sort=DateDesc`;
    const res = await fetch(url, {
      headers: { Authorization: `Bearer ${accessToken}` },
      cache: 'no-store',
      next: { revalidate: 0 },
    });
    if (!res.ok) break;
    const j: any = await res.json().catch(() => ({}));
    const items: any[] = Array.isArray(j?.data) ? j.data : Array.isArray(j) ? j : [];
    for (const it of items) {
      const subId = (pick<string>(it, ['subscriptionId', 'subscription.id', 'order.subscriptionId', 'order.subscription.id']) || '').toString();
      const orderId = (pick<string>(it, ['order.id']) || '').toString();
      const itemsArr: any[] = Array.isArray(it?.items) ? it.items : [];
      const hasMonthlyItem = itemsArr.some((x) => String(x?.type || '').toLowerCase() === 'monthlydonation'.toLowerCase());
      const isRecurring = hasMonthlyItem || !!pick(it, ['isRecurring', 'recurrence', 'schedule', 'subscription']);
      // Only consider payments that are clearly recurring (monthly donation)
      if (!isRecurring) continue;

      const currency = (pick<string>(it, ['amount.currency', 'currency']) || 'EUR').toString();
      // Prefer monthly item amount if present
      let a = toCents(pick<number>(it, ['amount.amount', 'amountCents', 'amount', 'details.unitAmount']));
      const monthlyItem = itemsArr.find((x) => String(x?.type || '').toLowerCase() === 'monthlydonation'.toLowerCase());
      if (monthlyItem && typeof monthlyItem?.amount !== 'undefined') {
        const ai = toCents(monthlyItem.amount);
        if (typeof ai === 'number') a = ai;
      }

      // Build a key: subscriptionId preferred; otherwise use order.id (good enough per current month page)
      const key = subId || orderId || `recurring-${pageIndex}-${Math.random().toString(36).slice(2, 9)}`;
      if (!mapBySub[key]) mapBySub[key] = {};
      if (typeof a === 'number') mapBySub[key].amountCents = a; // last seen
      mapBySub[key].currency = currency;
    }
    // Do not paginate further in payments fallback to avoid overcounting across months
    break;
  }
  const subs = Object.entries(mapBySub);
  if (subs.length === 0) return { monthlyActive: 0 };
  const monthlyAmount = subs.reduce((acc, [, v]) => acc + (v.amountCents || 0), 0);
  const currency = subs.find(([, v]) => v.currency)?.[1].currency;
  return { monthlyActive: subs.length, monthlyAmount, currency };
}

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
export const revalidate = 0;

// Simple in-memory cache (5 minutes by default). For serverless, consider KV/DB cache.
let __cacheAt = 0;
let __cacheData: any | null = null;
const CACHE_TTL_MS = Number(process.env.DON_PROGRESS_CACHE_MS || 300000);

export async function GET(req: Request) {
  // Serve cached unless refresh requested
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

  // fallback to env if store empty
  if (!monthlyActive && process.env.DON_PROGRESS_ACTIVE) {
    monthlyActive = Number(process.env.DON_PROGRESS_ACTIVE || 0);
  }
  if (!monthlyAmount && process.env.DON_PROGRESS_AMOUNT) {
    monthlyAmount = Number(process.env.DON_PROGRESS_AMOUNT);
  }
  if (process.env.DON_PROGRESS_CURRENCY) {
    currency = process.env.DON_PROGRESS_CURRENCY;
  }

  const payload = { monthlyActive, monthlyAmount, goal, currency } as const;
  __cacheData = payload;
  __cacheAt = Date.now();
  return NextResponse.json(payload, { headers: { 'Cache-Control': 'no-store, no-cache, must-revalidate' } });
}
