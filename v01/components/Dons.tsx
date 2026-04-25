'use client';
import React from 'react';
import Image from 'next/image';
import Section from './Section';
import SectionHeading from '@/components/SectionHeading';
import { Inter } from 'next/font/google';
import { motion, type Variants } from 'framer-motion';
import HelloAssoWidget from '@/components/HelloAssoWidget';

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
        className="mb-14 text-left space-y-3"
      >
        <SectionHeading
          kicker="Soutien"
          title="Soutenir Sans Transition"
          description="Média par et pour les minorités — association loi 1901 — 100 % indépendant."
        />
        {/* soulignement discret */}
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          whileInView={{ scaleX: 1, opacity: 1 }}
          viewport={{ once: true, amount: 0.8 }}
          transition={{ duration: 0.5, ease: [0, 0, 0.2, 1], delay: 0.1 }}
          className="origin-left h-0.5 w-24 bg-pink-500/70"
        />
      </motion.div>

      {/* Contenu en 1 colonne centrée + reveal */}
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.35 }}
        className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-8 items-start"
      >
        <motion.div
          variants={container}
          className="text-center lg:text-left text-lg md:text-xl leading-loose md:leading-[2.25rem] text-muted-foreground space-y-6 uppercase tracking-[.08em]"
        >
          <motion.p variants={item} className="text-foreground font-medium">
            NOUS SOMMES UN MÉDIA RADICAL, INDÉPENDANT, QUEER & FÉMINISTE.
          </motion.p>

          <motion.p variants={item}>
            <strong className="text-foreground">OBJECTIF :</strong> RENDRE VISIBLES LES VOIX INVISIBILISÉES ET RECRÉER DU COLLECTIF.
          </motion.p>

          <motion.p variants={item}>
            CHAQUE EURO <span className="font-semibold text-foreground">PROTÈGE UNE PAROLE LIBRE</span> : VOUS FINANCEZ
            <span className="font-semibold text-foreground"> TOURNAGE, MONTAGE, DIFFUSION</span>. SANS VOUS, CES VOIX DISPARAISSENT.
          </motion.p>

          <motion.blockquote variants={item} className="text-foreground italic">
            « SOUTENIR ST, CE N&apos;EST PAS &quot;DONNER&quot; : C&apos;EST 
            <span className="font-semibold text-foreground not-italic"> PRENDRE PARTI</span>.
            SI VOUS VOULEZ QUE CETTE PAROLE EXISTE DEMAIN, AIDEZ-NOUS AUJOURD&apos;HUI. »
          </motion.blockquote>

          {/* Slogan sous le texte */}
          <motion.p variants={item} className="pt-2 text-muted-foreground text-xs uppercase tracking-[.2em]">
            CHAQUE DON COMPTE - MÊME 2 €
          </motion.p>
        </motion.div>
        <motion.div variants={item} className="w-full max-w-md mx-auto lg:mx-0 lg:justify-self-end">
          <div className="w-full rounded-2xl border border-border bg-card/70 p-4 shadow-md">
            <HelloAssoWidget />
            <p className="mt-3 text-xs text-muted-foreground">Paiement sécurisé via HelloAsso. Aucune donnée bancaire stockée par Sans Transition.</p>
          </div>
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

