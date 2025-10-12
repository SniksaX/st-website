'use client';
import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { ArrowDownRight, Quote } from 'lucide-react';
import Section from './Section';

const DON_URL = 'https://www.helloasso.com/associations/sans-transition/formulaires/1';

export default function Dons() {
  return (
    <Section id="dons" className="py-16 relative">
      {/* HEADER */}
      <div className="flex items-end justify-between mb-10  ">
        <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
          Soutenir Sans Transition
        </h2>
        <a
          href={DON_URL}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-3 h-9 text-sm text-white hover:bg-white/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" className="h-4 w-4">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 
                    7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 
                    19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 
                    11.54L12 21.35z" />
          </svg>
          <span>Donner à ST</span>
        </a>
      </div>

      {/* CARD HERO DONS */}
      <motion.section
        whileHover={{ y: -1 }}
        className="relative rounded-3xl overflow-hidden p-[1px] shadow-xl"
        style={{
          background:
            'linear-gradient(180deg, rgba(255, 255, 255, 0), rgba(255,255,255,.04))',
        }}
      >
        <div className="relative rounded-3xl bg-neutral-950/90 border border-white/10 p-6 sm:p-8">
          {/* BG FX */}
          <span
            aria-hidden
            className="pointer-events-none absolute -top-24 -left-24 h-72 w-72 rounded-full blur-3xl opacity-25"
            style={{
              background:
                'radial-gradient(closest-side, rgba(255,77,216,.65), transparent 70%)',
              mixBlendMode: 'screen',
            }}
          />
          <span
            aria-hidden
            className="pointer-events-none absolute -bottom-20 -right-20 h-80 w-80 rounded-full blur-3xl opacity-25"
            style={{
              background:
                'radial-gradient(closest-side, rgba(138,123,255,.55), transparent 70%)',
              mixBlendMode: 'screen',
            }}
          />

          {/* HEADER TEXTUEL */}
          <div className="mb-6">
            <div className="inline-flex items-center gap-2">
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                Sans Transition
              </h3>
            </div>
            <div className="mt-2 inline-flex items-center gap-2">
              <span className="text-pink-400 font-semibold text-[11px] sm:text-xs uppercase tracking-[.2em]">
                Média par et pour les minorités
              </span>
              <span className="h-[1px] w-16 bg-pink-400/60 rounded-full" />
            </div>
          </div>

          {/* STRIP D’INFOS */}
          <div className="mb-5 flex flex-wrap gap-2">
            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-neutral-200">
              Radical
            </span>
            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-neutral-200">
              Indépendant
            </span>
            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-neutral-200">
              Queer & féministe
            </span>
            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-neutral-200">
              Association loi 1901
            </span>
          </div>

          {/* TEXTE SYNTHÉTIQUE — largeur élargie + typographie lisible */}
          <div className="text-[16px] md:text-[17px] leading-7 md:leading-8 text-neutral-300 max-w-[95ch] lg:max-w-[110ch]">
            <div className="space-y-4">
              <p className="whitespace-normal break-words hyphens-auto">
                Objectif :{' '}
                <span className="text-white font-semibold">
                  rendre visibles les voix invisibilisées
                </span>{' '}
                et recréer du collectif.
              </p>

              <p className="whitespace-normal break-words hyphens-auto">
                Loin du buzz, proche des réalités — on ne cherche pas l’algorithme,{' '}
                <span className="text-white font-semibold">
                  on fait exister des voix qu’on n’entend jamais
                </span>
                .
              </p>

              <p className="whitespace-normal break-words hyphens-auto">
                Chaque euro{' '}
                <span className="font-semibold text-white">protège une parole libre</span> :
                vous financez{' '}
                <span className="font-semibold text-white">enquête, montage, diffusion</span>.
              </p>

              {/* Appel + flèche — carte “quote” avec icône à gauche */}
              <figure className="rounded-xl border border-white/10 bg-white/[0.04] p-4 sm:p-5">
                <div className="flex items-start gap-3 sm:gap-4">
                  {/* Icône quotes dans un cercle */}
                  <span
                    aria-hidden
                    className="inline-flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/80"
                  >
                    <Quote className="h-2 w-2 sm:h-3 sm:w-3" />
                  </span>

                  <blockquote className="flex-1 text-neutral-100">
                    <p className="flex items-center">
                      <span>
                        « Soutenir ST, ce n’est pas “donner” : c’est{' '}
                        <span className="font-semibold text-white">prendre parti</span>. Si vous
                        voulez que cette parole existe demain, aidez-nous aujourd’hui. »
                      </span>
                      <ArrowDownRight className="w-5 h-5 text-white ml-2 flex-shrink-0" />
                    </p>
                  </blockquote>
                </div>
              </figure>


            </div>
          </div>


          {/* BANNIÈRE CTA */}
          <motion.div
            className="mt-8"
            whileHover={{ scale: 1.01, rotateX: 1.5, rotateY: -1.5 }}
            transition={{ type: 'spring', stiffness: 180, damping: 18 }}
          >
            <a
              href={DON_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Soutenir Sans Transition"
              className="group relative block w-full rounded-2xl border border-pink-400/40 bg-pink-500/20 hover:bg-pink-500/25 transition-colors overflow-hidden"
            >
              <Image
                src="/banner.png"
                alt="Soutenez Sans Transition"
                width={1400}
                height={220}
                sizes="(max-width: 640px) 100vw, 1200px"
                priority
                className="w-full h-auto object-contain transition-transform duration-500 ease-out group-hover:scale-[1.012]"
              />
              {/* Reflet animé */}
              <span className="shine pointer-events-none absolute inset-0 rounded-2xl" aria-hidden />
              <span className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-white/10" aria-hidden />
            </a>
          </motion.div>

          {/* STYLE REFLET */}
          <style jsx>{`
            .shine {
              overflow: hidden;
              mix-blend-mode: screen;
            }
            .shine::before {
              content: '';
              position: absolute;
              top: -30%;
              bottom: -30%;
              left: -30%;
              width: 80%;
              background: linear-gradient(
                115deg,
                rgba(255, 255, 255, 0) 0%,
                rgba(255, 255, 255, 0.08) 35%,
                rgba(255, 255, 255, 0.35) 50%,
                rgba(255, 255, 255, 0.08) 65%,
                rgba(255, 255, 255, 0) 100%
              );
              transform: skewX(-20deg) translateX(-250%);
              animation: sweep 3.5s linear infinite;
              will-change: transform;
            }
            @keyframes sweep {
              0% {
                transform: skewX(-20deg) translateX(-250%);
              }
              100% {
                transform: skewX(-20deg) translateX(250%);
              }
            }
            @media (prefers-reduced-motion: reduce) {
              .shine::before {
                animation: none;
                opacity: 0.2;
              }
            }
          `}</style>
        </div>
      </motion.section>
    </Section>
  );
}
