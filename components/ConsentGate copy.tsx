'use client';
import { useEffect, useState } from 'react';
import { readConsent } from '@/lib/consent';

export default function ConsentGate({
  category, children,
}: { category: 'analytics' | 'marketing'; children: React.ReactNode }) {
  const [ok, setOk] = useState(false);
  useEffect(() => {
    const c = readConsent();
    setOk(!!c && c[category] === 'granted');
  }, [category]);
  if (!ok) return null;
  return <>{children}</>;
}
