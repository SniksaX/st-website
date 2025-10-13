'use client';
import React from 'react';
import Image from 'next/image';
import Section from './Section';
import { Inter } from 'next/font/google';
import { motion, type Variants } from 'framer-motion';

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
});

const DON_URL = 'https://www.helloasso.com/associations/sans-transition/formulaires/1';

export default function Dons() {
  const container: Variants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
  };
  const item: Variants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0, 0, 0.2, 1] } },
  };

  return (
    <Section id="dons" className={`${inter.className} py-20 relative`}>
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 0.5, ease: [0, 0, 0.2, 1] }}
        className="mb-14 text-left"
      >
        <h2 className="text-3xl sm:text-3xl font-bold tracking-[.03em] text-white capitalize">
          Soutenir Sans Transition
        </h2>
        {/* soulignement discret */}
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          whileInView={{ scaleX: 1, opacity: 1 }}
          viewport={{ once: true, amount: 0.8 }}
          transition={{ duration: 0.5, ease: [0, 0, 0.2, 1], delay: 0.1 }}
          className="origin-left mt-2 h-0.5 w-24 bg-pink-500/70"
        />
        <p className="mt-3 text-pink-400 font-semibold text-sm sm:text-base uppercase tracking-[.3em]">
          Média par et pour les minorités
        </p>
      </motion.div>

      {/* Contenu en 1 colonne centrée + reveal */}
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.35 }}
        className="max-w-4xl mx-auto"
      >
        <div className="text-center text-lg md:text-xl leading-loose md:leading-[2.25rem] text-neutral-300 space-y-6 uppercase tracking-[.08em]">
          <motion.p variants={item} className="text-neutral-100 font-medium">
            NOUS SOMMES UN MÉDIA RADICAL, INDÉPENDANT, QUEER & FÉMINISTE.
          </motion.p>

          <motion.p variants={item}>
            <strong className="text-white">OBJECTIF :</strong> RENDRE VISIBLES LES VOIX INVISIBILISÉES ET RECRÉER DU COLLECTIF.
          </motion.p>

          <motion.p variants={item}>
            CHAQUE EURO <span className="font-semibold text-white">PROTÈGE UNE PAROLE LIBRE</span> : VOUS FINANCEZ
            <span className="font-semibold text-white"> TOURNAGE, MONTAGE, DIFFUSION</span>. SANS VOUS, CES VOIX DISPARAISSENT.
          </motion.p>

          <motion.blockquote variants={item} className="text-neutral-100 italic">
            « SOUTENIR ST, CE N’EST PAS “DONNER” : C’EST <span className="font-semibold text-white not-italic">PRENDRE PARTI</span>. SI VOUS
            VOULEZ QUE CETTE PAROLE EXISTE DEMAIN, AIDEZ-NOUS AUJOURD’HUI. »
          </motion.blockquote>
        </div>

        {/* CTA animé */}
        <motion.div variants={item} className="mt-16 max-w-3xl mx-auto">
          <a
            href={DON_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Soutenir Sans Transition"
            className="group relative block w-full rounded-2xl border border-pink-400/40 bg-pink-500/10 hover:bg-pink-500/20 transition-all overflow-hidden shadow-[0_6px_20px_rgba(236,72,153,0.12)] hover:shadow-[0_8px_28px_rgba(236,72,153,0.18)] will-change-transform"
          >
            <Image
              src="/banner.png"
              alt="Soutenir Sans Transition"
              width={2000}
              height={600}
              sizes="(max-width: 1024px) 100vw, 900px"
              priority
              className="w-full h-auto object-contain transition-transform duration-500 ease-out group-hover:scale-[1.02] group-hover:rotate-[.25deg]"
            />
            {/* reflet léger */}
            <span className="shine pointer-events-none absolute inset-0 rounded-2xl" aria-hidden />
            {/* anneau subtil */}
            <span className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-white/10" aria-hidden />
          </a>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ delay: 0.2, duration: 0.4 }}
            className="mt-4 text-center text-neutral-300 text-xs uppercase tracking-[.2em]"
          >
            CHAQUE DON COMPTE — MÊME 2 €
          </motion.p>
        </motion.div>
      </motion.div>

      {/* style reflet (conservé pour le CTA) */}
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
    </Section>
  );
}
