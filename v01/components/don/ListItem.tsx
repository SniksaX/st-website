'use client';
import { CheckCircle2 } from 'lucide-react';
import type React from 'react';

export default function ListItem({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex gap-3">
      <CheckCircle2 className="h-5 w-5 mt-0.5 text-fuchsia-400 flex-shrink-0" />
      <span className="text-muted-foreground leading-relaxed">{children}</span>
    </li>
  );
}

