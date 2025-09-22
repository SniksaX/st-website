'use client';

import React from 'react';
import Section from './Section';
import { Button } from '@/components/ui/button';

export default function Header() {
  return (
    <header className="sticky top-0 z-50 backdrop-blur supports-[backdrop-filter]:bg-neutral-950/70 border-b border-neutral-800 group">
      {/* 3 colonnes : left (logo), center (nav/welcome), right (CTA) */}
      <Section className="grid grid-cols-[auto_minmax(0,1fr)_auto] items-center py-3">
        {/* Left — branding */}
        <div className="flex items-center gap-3">
          <div className="leading-tight">
            <div
              className="text-lg font-extrabold text-white"
              style={{ fontFamily: 'var(--font-barbra)' }}
            >
              SANS TRANSITION
            </div>
            <div className="text-xs text-neutral-300 -mt-0.5">
              média militant • pédagogique • engagé
            </div>
          </div>
        </div>

        {/* Center — wrapper toujours centré */}
        <div className="justify-self-center relative flex items-center justify-center min-h-[48px]">
          {/* Nav — n’apparaît qu’au hover/focus (desktop), anim smooth */}
          <nav
              className="
                hidden md:flex items-center gap-6 text-sm text-neutral-200
                opacity-0 translate-y-1 pointer-events-none
                transition-opacity transition-transform duration-150 ease-out transform-gpu
                md:group-hover:opacity-100 md:group-hover:translate-y-0 md:group-hover:pointer-events-auto
                md:group-focus-within:opacity-100 md:group-focus-within:translate-y-0 md:group-focus-within:pointer-events-auto
                motion-reduce:transition-none motion-reduce:transform-none
                relative z-0
              "
            >
            <nav className="hidden md:flex items-center gap-6 text-sm text-neutral-200">
              <a href="#liens"          className="link-animated" data-text="Liens">Liens</a>
              <a href="#videos-youtube" className="link-animated" data-text="Vidéos YouTube">Vidéos YouTube</a>
              <a href="#formats"        className="link-animated" data-text="Formats">Formats</a>
              <a href="#videos-tiktok"  className="link-animated" data-text="Vidéos TikTok">Vidéos TikTok</a>
              <a href="#about"          className="link-animated" data-text="À propos">À propos</a>
            </nav>



          </nav>

          {/* Message — visible par défaut, se fade/slide quand la nav apparaît */}
          <div
            className="
              absolute inset-0 z-10 flex items-center justify-center
              transition-opacity transition-transform duration-150 ease-out transform-gpu
              md:group-hover:opacity-0 md:group-hover:translate-y-1 md:group-hover:pointer-events-none
              md:group-focus-within:opacity-0 md:group-focus-within:translate-y-1 md:group-focus-within:pointer-events-none
              motion-reduce:transition-none motion-reduce:transform-none
            "
          >
            <span className="font-extrabold tracking-tight text-white text-base sm:text-lg md:text-xl lg:text-2xl">
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

        {/* Right — CTA */}
        <Button
          asChild
          className="justify-self-end rounded-2xl font-bold text-white shadow-sm hover:shadow-md
                     focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80
                     focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-950
                     [background:var(--grad-1)]"
        >
          <a href="https://youtube.com/@SansTransitionMedia" target="_blank" rel="noreferrer">
            S’abonner
          </a>
        </Button>
      </Section>
    </header>
  );
}
