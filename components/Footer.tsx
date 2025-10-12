'use client';
import React from 'react';
import Section from './Section';
import { eraseConsent } from '@/lib/consent';

export default function Footer() {
  const reopen = () => {
    eraseConsent();
    window.dispatchEvent(new CustomEvent('st:consent:reset'));
  };

  return (
    <footer className="border-t border-neutral-900 mt-10">
      <Section className="py-8 text-sm text-neutral-300">
        <div className="grid md:grid-cols-3 gap-6 items-center">
          {/* Left — identité */}
          <div>
            <p className="font-semibold text-neutral-200">Sans Transition</p>
            <p className="text-xs">
              © {new Date().getFullYear()} — média militant, indépendant et engagé.
            </p>
            <button
              onClick={reopen}
              className="underline underline-offset-4 hover:text-neutral-200"
            >
              Gérer mes cookies
            </button>
          </div>

         {/* Center — navigation */}
        <div className="mx-auto max-w-5xl flex flex-nowrap justify-center gap-4 text-xs md:text-sm overflow-x-auto whitespace-nowrap no-scrollbar px-4">
          <a href="#liens" className="underline-offset-4 hover:underline">Liens</a>
          <a href="#videos-youtube" className="underline-offset-4 hover:underline">YouTube</a>
          <a href="#formats" className="underline-offset-4 hover:underline">Formats</a>
          <a href="#videos-tiktok" className="underline-offset-4 hover:underline">TikTok</a>
          <a href="#valeurs" className="underline-offset-4 hover:underline">Valeurs</a>
          <a href="#about" className="underline-offset-4 hover:underline">À propos</a>
          <a href="#stream" className="underline-offset-4 hover:underline">Agenda</a>
          <a href="#contact" className="underline-offset-4 hover:underline">Contact</a>
        </div>


          {/* Right — signature */}
          <div className="md:text-right space-y-1">
            <p className="text-xs text-neutral-400">
              Fait par <span className="text-neutral-200 font-semibold">Hedi</span>, et ouais mes vies.
            </p>
            <p className="text-xs text-neutral-400">
              Merci d’être passé·e sur le site :)) Bisous!
            </p>
          </div>
        </div>
      </Section>
    </footer>
  );
}
