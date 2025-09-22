"use client";

import React from "react";
import { motion } from "framer-motion";
import Section from "./Section";
import {
  Link as LinkIcon,
  Instagram,
  Youtube,
  Twitter,
  Heart,
  Send,
  FileText,
  Newspaper,
  Mail,
  Download,
  type LucideIcon,
} from "lucide-react";

// Reusable TikTok SVG (same glyph as in Hero)
const TikTokIcon = ({ className = "" }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 256 256"
    className={`fill-current ${className}`}
    aria-hidden="true"
    focusable="false"
  >
    <path d="M224 88.4c-23.6 0-42.8-19.2-42.8-42.8V32h-36.6v132.1c0 19.7-16 35.7-35.7 35.7s-35.7-16-35.7-35.7 16-35.7 35.7-35.7c2.4 0 4.7.2 6.9.7V92.6c-2.3-.3-4.6-.5-6.9-.5-39.8 0-72.2 32.4-72.2 72.2S70.4 236.5 110.2 236.5c39.8 0 72.2-32.4 72.2-72.2v-56c12.1 8.7 26.9 13.9 42.8 13.9v-33.8z" />
  </svg>
);

// type for networks
type Net = { label: string; href: string; icon: React.ComponentType<{ className?: string }> };

export default function Links() {
  const networks: Net[] = [
    { label: "TikTok", href: "https://tiktok.com/@sanstransition", icon: TikTokIcon },
    { label: "Instagram", href: "https://instagram.com/sanstransition__", icon: Instagram },
    { label: "X (Twitter)", href: "https://x.com/sanstransition_", icon: Twitter },
    { label: "YouTube", href: "https://youtube.com/@SansTransitionMedia", icon: Youtube },
  ];

  // Media kit is a dedicated card
  const mediaKit = {
    label: "Kit média (PDF)",
    href: "/Sans Transition – Kit Média Septembre 2025.pdf",
  };

  // Resources without media kit
  const resources = [
    { label: "Mentions légales", href: "/mentions-legales" },
    { label: "CGU", href: "/cgu" },
    { label: "Politique de confidentialité", href: "/confidentialite" },
  ];

  return (
    <Section id="liens" className="py-12">
      <div className="flex items-end justify-between mb-8">
        <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
          Liens utiles
        </h2>
        <span className="text-sm text-neutral-400">réseaux • cagnottes • ressources</span>
      </div>

      {/* === Skeleton layout: big left card, two stacked right bars, 4 small bottom cards === */}
      <div className="grid gap-5 lg:grid-cols-12 items-start">
        {/* BIG LEFT (spans 7 cols): Cagnottes & soutien */}
        <motion.section
          whileHover={{ y: -2 }}
          className="col-span-12 lg:col-span-7 lg:self-stretch rounded-2xl overflow-hidden bg-gradient-to-br from-pink-600 via-fuchsia-600 to-indigo-600 p-[1px] pt-[2px]"
        >
          <div className="h-full w-full rounded-2xl bg-neutral-950/80 backdrop-blur-md border border-white/10 p-5 flex flex-col">
            {/* Titre en tête */}
            <div className="flex items-center gap-3 mb-4">
              <div className="h-9 w-9 grid place-items-center rounded-xl bg-white/10">
                <Heart className="h-4 w-4 text-white" />
              </div>
              <h3 className="text-lg font-bold text-white">Cagnottes & soutien</h3>
            </div>

            {/* Deux cartes internes côte à côte (en bas) */}
            <div className="mt-auto grid grid-cols-1 md:grid-cols-2 gap-4">
              <a
                href="https://gofund.me/6e217b10a"
                target="_blank"
                rel="noreferrer"
                className="group relative rounded-2xl border border-white/10 bg-white/5 p-5  flex items-end hover:bg-white/10 transition-colors"
              >
                <span className="text-lg font-semibold text-white">🚨 Aidez Abood</span>
              </a>

              <a
                href="https://gofund.me/ed90a35c6"
                target="_blank"
                rel="noreferrer"
                className="group relative rounded-2xl border border-white/10 bg-white/5 p-5  flex items-end hover:bg-white/10 transition-colors"
              >
                <span className="text-lg font-semibold text-white">🚨 Aidez Elodie</span>
              </a>
            </div>
          </div>
        </motion.section>

        {/* RIGHT COLUMN (5 cols): two stacked bars */}
        <div className="col-span-12 lg:col-span-5 flex flex-col gap-5">
          {/* Réseaux */}
          <section className="rounded-2xl bg-neutral-950/80 backdrop-blur-md border border-neutral-800 p-5">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-lg font-bold text-white">Réseaux</h3>
              <LinkIcon className="h-4 w-4 text-neutral-400" />
            </div>
            <div className="flex flex-wrap gap-3">
              {networks.map(({ label, href, icon: Icon }) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={label}
                  whileHover={{ scale: 1.05, y: -1 }}
                  className="h-10 w-10 grid place-items-center rounded-full bg-neutral-900 text-white border border-neutral-800 hover:border-pink-500/60"
                >
                  <Icon className="h-5 w-5" />
                </motion.a>
              ))}
            </div>
          </section>

          {/* Contact */}
          <section className="rounded-2xl bg-neutral-950/80 border border-neutral-800 p-4 flex items-center justify-between text-sm">
            <span className="flex items-center gap-2 text-white font-semibold">
              <Mail className="h-4 w-4 text-pink-400" /> Contact
            </span>
            <a href="mailto:contact@sanstransition.fr" className="text-neutral-300 hover:text-pink-400">
              contact@sanstransition.fr
            </a>
          </section>
        </div>

        {/* BOTTOM ROW — four equal small cards across full width */}
        <div className="col-span-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {/* Formulaires */}
          <section className="rounded-2xl bg-neutral-950/80 border border-neutral-800 p-3">
            <h4 className="flex items-center gap-2 font-semibold text-white mb-2 text-sm">
              <Send className="h-4 w-4 text-pink-400" /> Formulaires & témoignages
            </h4>
            <a
              href="https://forms.gle/yoHVL6iKBi6Adz8T9"
              target="_blank"
              rel="noreferrer"
              className="text-xs text-neutral-300 hover:text-pink-400 transition-colors"
            >
              Proposer un témoignage ou un sujet
            </a>
          </section>

          {/* Kit média — compact */}
          <section className="rounded-2xl bg-neutral-950/80 border border-neutral-800 p-3">
            <h4 className="flex items-center gap-2 font-semibold text-white mb-2 text-sm">
              <Download className="h-4 w-4 text-pink-400" /> Kit média
            </h4>
            <a
              href={mediaKit.href}
              download
              className="group inline-flex items-center justify-between w-full rounded-lg border border-neutral-700 px-3 py-2 text-xs text-neutral-200 hover:bg-neutral-800"
            >
              <span>{mediaKit.label}</span>
              <Download className="h-4 w-4 opacity-80 group-hover:opacity-100" />
            </a>
          </section>

          {/* Ressources — compact */}
          <section className="rounded-2xl bg-neutral-950/80 border border-neutral-800 p-3">
            <h4 className="flex items-center gap-2 font-semibold text-white mb-2 text-sm">
              <FileText className="h-4 w-4 text-pink-400" /> Ressources & docs
            </h4>
            <ul className="grid grid-cols-1 gap-1 text-xs text-neutral-300">
              {resources.map((r) => (
                <li key={r.label}>
                  <a href={r.href} className="hover:text-pink-400">
                    {r.label}
                  </a>
                </li>
              ))}
            </ul>
          </section>

          {/* Presse & apparitions */}
          <section className="rounded-2xl bg-neutral-950/80 border border-neutral-800 p-3">
            <h4 className="flex items-center gap-2 font-semibold text-white mb-2 text-sm">
              <Newspaper className="h-4 w-4 text-pink-400" /> Presse & apparitions
            </h4>
            <ul className="space-y-1 text-xs text-neutral-300">
              <li>
                <a
                  href="https://www.youtube.com/watch?v=qabhFKNW2xM"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-pink-400"
                >
                  Oeil de MouMou
                </a>
              </li>
              <li>
                <a
                  href="https://www.youtube.com/watch?v=hUI88ZLf8YI"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-pink-400"
                >
                  Syntaxe Sociale
                </a>
              </li>
            </ul>
          </section>
        </div>
      </div>
    </Section>
  );
}
