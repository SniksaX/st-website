import fs from 'fs';
import path from 'path';

type Subscription = {
  id: string;
  payerId?: string;
  status: 'active' | 'cancelled';
  amountCents?: number;
  currency?: string;
  meta?: Record<string, unknown>;
};

type Store = {
  updatedAt: string;
  subscriptions: Record<string, Subscription>;
};

const DEFAULT_STORE: Store = { updatedAt: new Date(0).toISOString(), subscriptions: {} };

export function getStorePath() {
  const dir = path.join(process.cwd(), 'data');
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  return path.join(dir, 'donors.json');
}

export function readStore(): Store {
  try {
    const file = getStorePath();
    if (!fs.existsSync(file)) return { ...DEFAULT_STORE };
    const raw = fs.readFileSync(file, 'utf-8');
    const j = JSON.parse(raw) as Store;
    if (!j || typeof j !== 'object') return { ...DEFAULT_STORE };
    if (!j.subscriptions) j.subscriptions = {};
    return j;
  } catch {
    return { ...DEFAULT_STORE };
  }
}

export function writeStore(next: Store) {
  const file = getStorePath();
  const tmp = file + '.tmp';
  fs.writeFileSync(tmp, JSON.stringify(next, null, 2));
  fs.renameSync(tmp, file);
}

export function upsertSubscription(partial: Partial<Subscription> & { id: string }) {
  const store = readStore();
  const prev = store.subscriptions[partial.id];
  const merged: Subscription = {
    ...prev,
    ...partial,
    id: partial.id,
    status: 'active',
  };
  store.subscriptions[merged.id] = merged;
  store.updatedAt = new Date().toISOString();
  writeStore(store);
}

export function cancelSubscription(id: string) {
  const store = readStore();
  const prev = store.subscriptions[id];
  if (!prev) return;
  store.subscriptions[id] = { ...prev, status: 'cancelled' };
  store.updatedAt = new Date().toISOString();
  writeStore(store);
}

export function getProgress() {
  const store = readStore();
  const actives = Object.values(store.subscriptions).filter((s) => s.status === 'active');
  const monthlyActive = actives.length;
  const monthlyAmount = actives.reduce((acc, s) => acc + (s.amountCents || 0), 0);
  const anyCurrency = actives.find((s) => s.currency)?.currency || 'EUR';
  return { monthlyActive, monthlyAmount, currency: anyCurrency };
}
