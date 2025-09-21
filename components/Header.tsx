'use client';
import React from 'react';
import Section from './Section';
import { Button } from '@/components/ui/button';

export default function Header() {
  return (
    <header className="sticky top-0 z-50 backdrop-blur supports-[backdrop-filter]:bg-neutral-950/70 border-b border-neutral-800">
      <Section className="flex items-center justify-between py-3">
        <div className="flex items-center gap-3">
          <div className="leading-tight">
            <div className="text-lg font-extrabold text-white" style={{ fontFamily: 'var(--font-barbra)' }}>
              SANS TRANSITION
            </div>
            <div className="text-xs text-neutral-300 -mt-0.5">média radical • pédagogique • slay</div>
          </div>
        </div>

        {/* nav mis à jour: plus de podcast/newsletter, ajout youtube/tiktok */}
        <nav className="hidden md:flex items-center gap-6 text-sm text-neutral-200">
          <a href="#liens" className="hover:text-white">Liens</a>
          <a href="#videos-youtube" className="hover:text-white">Vidéos YouTube</a>
          <a href="#formats" className="hover:text-white">Formats</a>
          <a href="#videos-tiktok" className="hover:text-white">Vidéos TikTok</a>
        </nav>

        <Button
          asChild
          className="rounded-2xl font-bold text-neutral-950 shadow-sm hover:shadow-md
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
