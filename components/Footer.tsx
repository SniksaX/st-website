'use client';
import React from 'react';
import Section from './Section';
import { eraseConsent } from '@/lib/consent';

export default function Footer() {
  const reopen = () => {
    eraseConsent();
    window.dispatchEvent(new CustomEvent('st:consent:reset'));
  };

  const links = [
    { id: 'about', label: 'À propos' },
    { id: 'liens', label: 'Liens' },
    { id: 'videos-youtube', label: 'YouTube' },
    { id: 'formats', label: 'Formats' },
    { id: 'videos-tiktok', label: 'TikTok' },
    { id: 'founders', label: 'Fondateurs' },
    { id: 'stream', label: 'Agenda' },
    { id: 'campaign', label: 'Campaign' },
  ]

  return (
    <footer className="border-t border-border mt-10">
      <Section className="py-8 text-sm text-muted-foreground flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <p className="font-semibold text-foreground">Sans Transition</p>
          <p className="text-xs">© {new Date().getFullYear()} — média militant, indépendant et engagé.</p>
          <button onClick={reopen} className="underline underline-offset-4 hover:text-foreground text-xs">
            Gérer mes cookies
          </button>
        </div>
        <div className="flex flex-wrap gap-4 text-xs md:text-sm text-muted-foreground">
          {links.map((link) => (
            <a key={link.id} href={`#${link.id}`} className="underline-offset-4 hover:underline">
              {link.label}
            </a>
          ))}
        </div>
        <div className="text-xs text-muted-foreground md:text-right">
          <p>
            Fait par <span className="text-foreground font-semibold">Hedi</span>, et ouais mes vies.
          </p>
          <p>Merci d’être passé·e sur le site :)) Bisous!</p>
        </div>
      </Section>
    </footer>
  );
}
