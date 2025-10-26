'use client'

import React from 'react'
import Section from './Section'
import { Button } from '@/components/ui/button'
import ThemeToggle from '@/components/ThemeToggle'

export default function Header() {
  return (
    <header className="sticky top-0 z-50 backdrop-blur supports-[backdrop-filter]:bg-background/70 border-b border-border group">
      {/* 3 colonnes : left (logo), center (nav/welcome), right (CTA) */}
      <Section className="grid grid-cols-[auto_minmax(0,1fr)_auto] items-center py-3">
        {/* Left — branding */}
        <div className="flex items-center gap-3">
          <div className="leading-tight">
            <div
              className="text-lg font-extrabold text-foreground"
              style={{ fontFamily: 'var(--font-barbra)' }}
            >
              SANS TRANSITION
            </div>
            <div className="text-xs text-muted-foreground -mt-0.5">
              média militant · pédagogique · engagé
            </div>
          </div>
        </div>

        {/* Center — wrapper toujours centré */}
        <div className="justify-self-center relative flex items-center justify-center min-h-[52px]">
          {/* NAV — version QuickNav (pill) visible au hover/focus (desktop) */}
          <nav
            aria-label="Navigation principale"
            className="hidden md:flex absolute inset-0 z-10 items-center justify-center opacity-0 translate-y-1 pointer-events-none transition-opacity transition-transform duration-150 ease-out transform-gpu md:group-hover:opacity-100 md:group-hover:translate-y-0 md:group-hover:pointer-events-auto md:group-focus-within:opacity-100 md:group-focus-within:translate-y-0 md:group-focus-within:pointer-events-auto motion-reduce:transition-none motion-reduce:transform-none"
          >
            <div className="mx-2 inline-flex rounded-2xl bg-muted/60 px-2 py-1.5 shadow-lg ring-1 ring-border backdrop-blur">
              <ul className="flex items-center justify-center gap-2 flex-row whitespace-nowrap">
              {(
                [
                  { id: "liens", label: "Liens" },
                  { id: "videos-youtube", label: "YouTube" },
                  { id: "formats", label: "Formats" },
                  { id: "videos-tiktok", label: "TikTok" },
                  { id: "valeurs", label: "Valeurs" },
                  { id: "about", label: "À propos" },
                  { id: "stream", label: "Agenda" },
                  { id: "dons", label: "Dons" },
                ] as const
              ).map((s) => (
                <li key={s.id}>
                  <a
                    href={`#${s.id}`}
                    className="inline-block rounded-xl px-3 py-1.5 text-xs text-foreground/80 transition hover:bg-muted focus:bg-muted focus:outline-none focus-visible:ring-2 focus-visible:ring-ring/50"
                  >
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>

            </div>
          </nav>

          {/* WELCOME — visible par défaut, disparaît au hover/focus pour laisser place au QuickNav */}
          <div
            className="hidden md:flex absolute inset-0 z-0 items-center justify-center transition-opacity transition-transform duration-150 ease-out transform-gpu md:group-hover:opacity-0 md:group-hover:translate-y-1 md:group-hover:pointer-events-none md:group-focus-within:opacity-0 md:group-focus-within:translate-y-1 md:group-focus-within:pointer-events-none motion-reduce:transition-none motion-reduce:transform-none"
          >
            <span className="font-extrabold tracking-tight text-foreground leading-none whitespace-nowrap text-2xl sm:text-3xl md:text-2xl lg:text-2xl">
              Bienvenue sur{' '}
              <span
                className="text-transparent [background:var(--grad-1)]"
                style={{ WebkitBackgroundClip: 'text', backgroundClip: 'text', WebkitTextFillColor: 'transparent' }}
              >
                Sans Transition
              </span>
              .
            </span>
          </div>
        </div>

        {/* Right — Theme toggle + CTA */}
        <div className="justify-self-end flex items-center gap-2">
          <ThemeToggle />
          <Button
            asChild
            className="rounded-2xl font-bold text-white shadow-sm hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background [background:var(--grad-1)]"
          >
            <a
              href="https://www.helloasso.com/associations/sans-transition/formulaires/1"
              target="_blank"
              rel="noreferrer"
            >
              Soutenir
            </a>
          </Button>
        </div>
      </Section>

      {/* Mobile — on garde simple : afficher directement une mini QuickNav scrollable */}
      <div className="md:hidden border-t border-border bg-background/70 backdrop-blur">
        <nav aria-label="Navigation mobile" className="mx-auto max-w-screen-xl overflow-x-auto px-4 py-2">
          <ul className="flex items-center justify-center gap-2 flex-row whitespace-nowrap">
            {[
              { id: 'liens', label: 'Liens' },
              { id: 'videos-youtube', label: 'YouTube' },
              { id: 'formats', label: 'Formats' },
              { id: 'videos-tiktok', label: 'TikTok' },
              { id: 'about', label: 'À propos' },
              { id: 'stream', label: 'Agenda' },
            ].map((s) => (
              <li key={s.id} className="shrink-0">
                <a
                  href={`#${s.id}`}
                  className="inline-block rounded-xl bg-muted/60 px-3 py-1.5 text-xs text-foreground ring-1 ring-border transition hover:bg-muted focus:bg-muted focus:outline-none focus-visible:ring-2 focus-visible:ring-ring/50"
                >
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  )
}
