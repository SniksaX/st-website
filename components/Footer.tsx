'use client';
import React from 'react';
import Section from './Section';

export default function Footer() {
  return (
    <footer className="border-t border-neutral-900 mt-10">
      <Section className="py-8 text-sm text-neutral-300">
        <div className="grid md:grid-cols-3 gap-6 items-center">
          <div>
            <p className="font-semibold text-neutral-200">Sans Transition</p>
            <p className="text-xs">© {new Date().getFullYear()} — média indépendant. Tous droits réservés.</p>
          </div>
          <div className="flex gap-4">
            <a href="#formats" className="underline-offset-4 hover:underline">Formats</a>
            <a href="#videos-youtube" className="underline-offset-4 hover:underline">Vidéos YouTube</a>
            <a href="#videos-tiktok" className="underline-offset-4 hover:underline">Vidéos TikTok</a>
            <a href="#liens" className="underline-offset-4 hover:underline">Liens</a>
            <a href="#contact" className="underline-offset-4 hover:underline">Contact</a>
          </div>
          <div className="md:text-right">
            <p className="text-xs">Fait par Hedi, et ouais mes vies.</p>
            <p className="text-xs">Merci d’etre passé sur le site :))) Bisous!</p>
          </div>
        </div>
      </Section>
    </footer>
  );
}
