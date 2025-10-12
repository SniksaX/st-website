'use client';
import React from 'react';
import Image from 'next/image';
import Section from './Section';

const DON_URL = 'https://www.helloasso.com/associations/sans-transition/formulaires/1';

export default function Dons() {
  return (
    <Section id="dons" className="py-16 relative">
      {/* Header */}
      <div className="mb-10">
        <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
          Soutenir Sans Transition
        </h2>
        <p className="mt-2 text-pink-400 font-semibold text-xs sm:text-sm uppercase tracking-[.2em]">
          Média par et pour les minorités
        </p>
      </div>

      {/* ==== CARD GLOBALE ==== */}
      <div className="rounded-[1.5rem] border border-white/10 bg-neutral-950/90 p-6 sm:p-8 relative overflow-hidden">
        {/* micro décor très léger (facultatif, reste discret) */}
        <span
          aria-hidden
          className="pointer-events-none absolute -top-24 -left-24 h-72 w-72 rounded-full blur-3xl opacity-[.18]"
          style={{ background: 'radial-gradient(closest-side, rgba(255,77,216,.55), transparent 70%)', mixBlendMode: 'screen' }}
        />
        <span
          aria-hidden
          className="pointer-events-none absolute -bottom-24 -right-24 h-80 w-80 rounded-full blur-3xl opacity-[.16]"
          style={{ background: 'radial-gradient(closest-side, rgba(138,123,255,.5), transparent 70%)', mixBlendMode: 'screen' }}
        />

        {/* Contenu en 2 colonnes */}
        <div className="relative grid lg:grid-cols-12 gap-8 items-start">
          {/* Colonne texte */}
          <div className="lg:col-span-7">
            {/* Pills identité (discrètes) */}
            <div className="mb-5 flex flex-wrap gap-2 text-neutral-200">
              {['Radical', 'Indépendant', 'Queer & féministe', 'Association loi 1901'].map((t) => (
                <span key={t} className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs">
                  {t}
                </span>
              ))}
            </div>

            {/* Texte simple */}
            <div className="text-[17px] md:text-[18px] leading-8 md:leading-9 text-neutral-300 max-w-[95ch] space-y-4">
              <p>
                <strong className="text-white">Objectif :</strong> rendre visibles les voix invisibilisées et recréer du collectif.
              </p>

              <p>
                Loin du buzz, proche des réalités — on ne cherche pas l’algorithme, on fait exister des voix qu’on n’entend jamais.
              </p>

              <p>
                Chaque euro <span className="font-semibold text-white">protège une parole libre</span> : vous financez
                <span className="font-semibold text-white"> enquête, montage, diffusion</span>. Sans vous, ces voix disparaissent.
              </p>

              <blockquote className="text-neutral-100">
                « Soutenir ST, ce n’est pas “donner” : c’est <span className="font-semibold text-white">prendre parti</span>. Si vous
                voulez que cette parole existe demain, aidez-nous aujourd’hui. »
              </blockquote>
            </div>
          </div>

          {/* Colonne CTA image (soutenir.png) */}
          <div className="lg:col-span-5">
            <a
              href={DON_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Soutenir Sans Transition"
              className="group relative block w-full rounded-2xl border border-pink-400/40 bg-pink-500/20 hover:bg-pink-500/25 transition-colors overflow-hidden"
            >
              <Image
                src="/soutenir.png"
                alt="Soutenir Sans Transition"
                width={1200}
                height={260}
                sizes="(max-width: 1024px) 100vw, 40vw"
                priority
                className="w-full h-auto object-contain transition-transform duration-500 ease-out group-hover:scale-[1.01]"
              />
              {/* reflet léger */}
              <span className="shine pointer-events-none absolute inset-0 rounded-2xl" aria-hidden />
              {/* anneau subtil */}
              <span className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-white/10" aria-hidden />
            </a>
          </div>
        </div>

        {/* style reflet */}
        <style jsx>{`
          .shine { overflow: hidden; mix-blend-mode: screen; }
          .shine::before {
            content: '';
            position: absolute; top: -30%; bottom: -30%; left: -30%;
            width: 80%;
            background: linear-gradient(
              115deg,
              rgba(255,255,255,0) 0%,
              rgba(255,255,255,0.08) 35%,
              rgba(255,255,255,0.35) 50%,
              rgba(255,255,255,0.08) 65%,
              rgba(255,255,255,0) 100%
            );
            transform: skewX(-20deg) translateX(-250%);
            animation: sweep 3.5s linear infinite;
            will-change: transform;
          }
          @keyframes sweep { 0% { transform: skewX(-20deg) translateX(-250%); } 100% { transform: skewX(-20deg) translateX(250%); } }
          @media (prefers-reduced-motion: reduce) { .shine::before { animation: none; opacity: .2; } }
        `}</style>
      </div>
    </Section>
  );
}
