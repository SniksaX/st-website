'use client';

import React from 'react';
import { MotionDiv } from '@/components/ClientMotion';

type ProgressData = {
  monthlyActive: number;
  monthlyAmount?: number;
  goal?: number;
  currency?: string;
};

export default function DonProgress({ goal = 1000 }: { goal?: number }) {
  const [data, setData] = React.useState<ProgressData | null>(null);
  const [error, setError] = React.useState<string | null>(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        setLoading(true);
        const res = await fetch('/api/don-progress', { cache: 'no-store' });
        if (!res.ok) throw new Error(`/api/don-progress ${res.status}`);
        const j = (await res.json()) as ProgressData;
        if (!cancelled) setData(j);
      } catch (e: unknown) {
        if (!cancelled) setError(e instanceof Error ? e.message : String(e));
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const count = Math.max(0, Math.min((data?.monthlyActive ?? 0), goal));
  const pct = Math.round((count / goal) * 100);

  return (
    <MotionDiv
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="mt-10"
    >
      <div className="rounded-2xl border border-border bg-card/70 p-5">
        <div className="flex items-end justify-between gap-4 mb-3">
          <div>
            <p className="text-sm text-muted-foreground">Objectif</p>
            <p className="text-2xl font-bold text-foreground">
              {loading ? '…' : `${count} / ${goal}`}
            </p>
          </div>
          {typeof data?.monthlyAmount === 'number' && (
            <div className="text-right">
              <p className="text-sm text-muted-foreground">Par mois</p>
              <p className="text-lg font-semibold text-foreground">
                {(data.monthlyAmount / 100).toLocaleString('fr-FR', { style: 'currency', currency: data?.currency || 'EUR' })}
              </p>
            </div>
          )}
        </div>

        <div className="h-3 rounded-full bg-muted overflow-hidden">
          <div
            className="h-full rounded-full bg-gradient-to-r from-fuchsia-600 to-orange-500 transition-[width] duration-700"
            style={{ width: `${pct}%` }}
          />
        </div>

        {error && (
          <p className="mt-3 text-xs text-red-500 break-all">{error}</p>
        )}
      </div>
    </MotionDiv>
  );
}

