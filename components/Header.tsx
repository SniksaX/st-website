'use client';
import React from 'react';
import Section from './Section';
import { Button } from '@/components/ui/button';

export default function Header() {
  return (
    <header className="sticky top-0 z-50 backdrop-blur supports-[backdrop-filter]:bg-neutral-950/70 border-b border-neutral-800">
      <Section className="flex items-center justify-between py-3">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-2xl bg-neutral-100 text-neutral-900 grid place-items-center font-black">ST</div>
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

        <a href="https://youtube.com/@SansTransitionMedia" target="_blank" rel="noreferrer">
          <Button variant="secondary" className="rounded-2xl text-neutral-900 font-bold">S&apos;abonner</Button>
        </a>
      </Section>
    </header>
  );
}
