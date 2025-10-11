'use client';

import React from 'react';
import Section from '@/components/Section';
import { Shield, Sparkles, Users, BookOpen } from 'lucide-react';

type ValueItem = {
  title: string;
  desc: string;
  icon: React.ComponentType<{ className?: string }>;
};

const values: ValueItem[] = [
  {
    title: 'Indépendance',
    desc: "Aucune concession sur nos choix éditoriaux et nos sujets.",
    icon: Shield,
  },
  {
    title: 'Clarté',
    desc: "Aller à l’essentiel : formats courts, pédagogiques, zéro jargon.",
    icon: Sparkles,
  },
  {
    title: 'Humanité',
    desc: "Mettre les personnes au centre, écouter, respecter, amplifier.",
    icon: Users,
  },
  {
    title: 'Rigueur',
    desc: "Vérifier, sourcer, contextualiser : la base de tout le reste.",
    icon: BookOpen,
  },
];

export default function Values() {
  return (
    <Section id="valeurs" className="py-12">
      <header className="mb-8">
        <p className="text-[11px] uppercase tracking-[0.18em] text-neutral-400">Notre boussole</p>
        <h2 className="mt-1 text-3xl sm:text-4xl font-extrabold tracking-tight text-white">Nos valeurs</h2>
        <p className="mt-3 text-neutral-300 max-w-prose">
          Ce qui guide Sans Transition au quotidien : une ligne claire, utile et fidèle à nos engagements.
        </p>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {values.map(({ title, desc, icon: Icon }) => (
          <article
            key={title}
            className="relative rounded-2xl bg-transparent border border-neutral-800 p-5 shadow-[inset_0_1px_0_rgba(255,255,255,.04)]"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="h-9 w-9 grid place-items-center rounded-xl bg-white/10 text-white">
                <Icon className="h-4 w-4" />
              </div>
              <h3 className="text-lg font-bold text-white">{title}</h3>
            </div>
            <p className="text-sm leading-snug text-neutral-300">{desc}</p>
            <span className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-white/5" aria-hidden="true" />
          </article>
        ))}
      </div>
    </Section>
  );
}
