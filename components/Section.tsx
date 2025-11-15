'use client';

import React from 'react';

type SectionProps = { id?: string; className?: string; children: React.ReactNode };

export default function Section({ id, className = '', children }: SectionProps) {
  return (
    <section id={id} className={`w-full px-4 sm:px-6 lg:px-12 ${className}`}>
      {children}
    </section>
  );
}
