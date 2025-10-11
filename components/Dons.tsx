'use client';
import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Section from './Section';

export default function Dons() {
  return (
    <Section id="dons" className="py-14 relative">
      {/* HEADER */}
      <div className="flex items-end justify-between mb-8">
        <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
          Soutenir Sans Transition
        </h2>
        <span className="text-xs text-neutral-300">
          indépendance • luttes • émotions
        </span>
      </div>

      {/* === BLOC PRINCIPAL === */}
      <motion.section
        whileHover={{ y: -2 }}
        className="
          col-span-12 
          rounded-2xl overflow-hidden 
          bg-gradient-to-br from-pink-600 via-fuchsia-600 to-indigo-600 
          p-[1px] pt-[2px]
        "
      >
        <div
          className="
            relative 
            rounded-2xl 
            bg-neutral-950/80 
            backdrop-blur-md 
            border border-white/10 
            p-5 sm:p-6
          "
        >
          {/* === TEXTE === */}
          <div className="space-y-3 text-sm leading-relaxed text-neutral-300">
            <div>
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-1">
                Sans Transition
              </h3>
              <p className="text-pink-400 font-semibold text-sm uppercase tracking-wide">
                Média par et pour les minorités
              </p>
            </div>

            <p>
        <strong>Sans Transition</strong>, c’est un média radical, indépendant et vivant,
        né en 2025 d’un besoin simple : reprendre la parole.
        Ici, on parle politique, luttes sociales et engagement — sans filtre, sans hiérarchie, sans bullshit.
        Notre but est clair : donner de la force à celles et ceux qu’on invisibilise,
        rendre la politique concrète, et recréer du collectif dans une époque qui nous apprend à nous taire.
      </p>

      <p>
        À travers nos formats vidéos (<strong>Fokus</strong>, <strong>L’Œil de Lucho</strong>,
        <strong> L’Œil d’Amandine</strong>, <strong>Hédito</strong>, <strong>Portraits</strong>…),
        on vulgarise les enjeux politiques et sociaux sans perdre l’émotion ni la rage.
        On bosse avec pédagogie, esthétique et sincérité — parce qu’on croit qu’on peut être à la fois
        exigeant·es, beaux et en colère.
      </p>

      <p>
        <strong>Sans Transition</strong>, c’est une équipe jeune, queer, féministe et déterminée
        à faire bouger les lignes, loin du buzz, loin du cynisme, proche des gens et de leurs réalités.
      </p>

      <p className="text-neutral-200 font-medium">
        Soutenir <strong>Sans Transition</strong>, c’est pas juste donner à un média :
        c’est investir dans une parole libre, collective et ancrée dans les luttes.
        C’est refuser le silence, et choisir de construire, ensemble,
        une autre manière de raconter le monde.
      </p>
          </div>

          {/* === BANNIÈRE / BOUTON === */}
          <div className="mt-8">
            <a
              href="https://www.helloasso.com/associations/sans-transition/formulaires/1"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Faire un don à Sans Transition"
              className="
                group relative block w-full
                rounded-2xl border border-white/10 bg-white/5
                hover:bg-white/10 transition-colors
                shadow-[inset_0_1px_0_rgba(255,255,255,.06)]
                overflow-hidden
              "
            >
              <Image
                src="/banner.png"
                alt="Soutenez Sans Transition"
                width={1080}
                height={120}
                className="w-full h-auto object-contain transition-transform duration-500 ease-out group-hover:scale-[1.02]"
                priority
              />
              <span className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-white/5"></span>
            </a>
          </div>

          {/* === HALO D’AMBIANCE === */}
          <div
            aria-hidden
            className="pointer-events-none absolute -inset-8 opacity-[0.08] blur-3xl"
            style={{
              background:
                'radial-gradient(60% 60% at 30% 30%, rgba(255,77,216,.6), rgba(138,123,255,.35) 50%, transparent 70%)',
              mixBlendMode: 'screen',
            }}
          />
        </div>
      </motion.section>
    </Section>
  );
}
