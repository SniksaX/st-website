/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from 'next/server';
import { upsertSubscription, cancelSubscription } from '@/lib/progressStore';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
export const revalidate = 0;

function bearerOk(req: NextRequest) {
  const token = process.env.HELLOASSO_WEBHOOK_TOKEN;
  if (!token) return true; // if not set, do not block (dev)
  const auth = req.headers.get('authorization') || '';
  const m = auth.match(/^Bearer\s+(.+)/i);
  return !!m && m[1] === token;
}

function normalizeAmountCents(v: unknown): number | undefined {
  if (v === null || v === undefined) return undefined;
  const n = Number(v);
  if (!Number.isFinite(n)) return undefined;
  if (n > 0 && n < 1000) return Math.round(n * 100); // looks like euros
  return Math.round(n);
}

function pick<T = unknown>(obj: any, paths: string[]): T | undefined {
  for (const p of paths) {
    try {
      const parts = p.split('.');
      let cur: any = obj;
      for (const k of parts) cur = cur?.[k];
      if (cur !== undefined && cur !== null) return cur as T;
    } catch {}
  }
  return undefined;
}

export async function POST(req: NextRequest) {
  if (!bearerOk(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body = await req.json().catch(() => ({}));
  const type: string = (body?.eventType || body?.type || '').toString().toLowerCase();
  const data = body?.data || body || {};

  // try to extract subscriptionId / payerId / amount / currency
  const subscriptionId = (pick<string>(data, ['subscriptionId', 'id', 'subscription.id', 'order.id']) || '').toString();
  const payerId = (pick<string>(data, ['payer.id', 'member.id', 'customer.id', 'user.id']) || '').toString();
  const currency = (pick<string>(data, ['amount.currency', 'currency']) || 'EUR').toString();
  const amountCents = normalizeAmountCents(pick<number>(data, ['amount.amount', 'amountCents', 'amount']));
  const statusRaw = (pick<string>(data, ['status', 'state']) || '').toString().toLowerCase();

  // crude status mapping
  const isCancellation = /cancel|revoke|end|stop|terminated/.test(type) || /cancel|revok|suspend|ended/.test(statusRaw);
  const isActivation = /start|create|activate|success/.test(type) || /active|running|success/.test(statusRaw);

  if (!subscriptionId) {
    // Nothing we can reliably use
    return NextResponse.json({ ok: true, ignored: true }, { status: 200 });
  }

  if (isCancellation) {
    cancelSubscription(subscriptionId);
  } else if (isActivation) {
    upsertSubscription({ id: subscriptionId, payerId, status: 'active', amountCents, currency, meta: { type } });
  } else {
    // for recurring payment success without status changes, we still upsert amount/payer
    upsertSubscription({ id: subscriptionId, payerId, amountCents, currency, status: 'active', meta: { type } });
  }

  return NextResponse.json({ ok: true }, { status: 200 });
}
