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
    { id: 'campaign', label: 'Campagne' },
  ];

  return (
    <footer className="border-t border-border mt-8">
      <Section className="py-4 text-xs md:text-sm text-muted-foreground">
        <div className="grid gap-4 md:grid-cols-3 md:items-center">
          {/* Colonne gauche : brand + copyright + cookies */}
          <div className="flex flex-col gap-1">
            <p className="font-semibold text-foreground">Sans Transition</p>
            <p>© {new Date().getFullYear()} — média militant, indépendant et engagé.</p>
            <button
              onClick={reopen}
              className="underline underline-offset-4 hover:text-foreground w-fit"
            >
              Gérer mes cookies
            </button>
          </div>

          {/* Colonne centre : liens centrés */}
          <div className="flex flex-wrap justify-center gap-x-4 gap-y-1 text-center">
            {links.map((link) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                className="underline-offset-4 hover:underline"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Colonne droite : phrases perso l'une sous l'autre */}
          <div className="flex flex-col gap-1 text-right text-xs md:text-sm">
            <p>
              Fait par <span className="text-foreground font-semibold">Hedi</span>, et ouais mes vies.
            </p>
            <p>Merci d’être passé·e sur le site :)) Bisous!</p>
          </div>
        </div>
      </Section>
    </footer>
  );
}
