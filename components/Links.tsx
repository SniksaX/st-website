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
  ArrowUpRight,
} from "lucide-react";
import Image from "next/image";

// Gradient token — used sparingly (borders/accents only)
const GRADIENT = "var(--grad-1, linear-gradient(90deg,#ff4dd8 0%,#8a7bff 50%,#ff4dd8 100%))";

// Minimal gradient border wrapper (no inner pills)
const Button = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <span className={`block rounded-lg p-[1px] ${className}`} style={{ backgroundImage: GRADIENT }}>
    <span className="block rounded-[7px] bg-card/70 border border-border">{children}</span>
  </span>
);

// TikTok SVG (same glyph as in Hero)
const TikTokIcon = ({ className = "" }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" className={`fill-current ${className}`} aria-hidden="true" focusable="false">
    <path d="M224 88.4c-23.6 0-42.8-19.2-42.8-42.8V32h-36.6v132.1c0 19.7-16 35.7-35.7 35.7s-35.7-16-35.7-35.7 16-35.7 35.7-35.7c2.4 0 4.7.2 6.9.7V92.6c-2.3-.3-4.6-.5-6.9-.5-39.8 0-72.2 32.4-72.2 72.2S70.4 236.5 110.2 236.5c39.8 0 72.2-32.4 72.2-72.2v-56c12.1 8.7 26.9 13.9 42.8 13.9v-33.8z" />
  </svg>
);

const DiscordIcon = ({ className = "" }: { className?: string }) => (
  <Image src="/discord.png" alt="Discord" width={20} height={20} className={`block object-contain ${className}`} priority={false} />
);

// Twitch icon outlined, in Lucide-like style
const TwitchIcon = ({ className = "" }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className={`block ${className}`} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 3h16v10l-4 4h-4l-3 3v-3H4V3z" />
    <path d="M14 7v5M10 7v5" />
  </svg>
);

type Net = { label: string; href: string; icon: React.ComponentType<{ className?: string }>; iconClass?: string };

export default function Links() {
  const networks: Net[] = [
    { label: "TikTok", href: "https://tiktok.com/@sanstransition", icon: TikTokIcon },
    { label: "Instagram", href: "https://instagram.com/sanstransition__", icon: Instagram },
    { label: "X (Twitter)", href: "https://x.com/sanstransition_", icon: Twitter },
    { label: "YouTube", href: "https://youtube.com/@SansTransitionMedia", icon: Youtube },
    { label: "Discord", href: "https://discord.gg/VSgzuhSCnT", icon: DiscordIcon },
    { label: "Twitch", href: "https://www.twitch.tv/sans_transition", icon: TwitchIcon },
  ];

  const resources = [
    { label: "Mentions légales", href: "/mentions-legales" },
    { label: "CGU", href: "/cgu" },
    { label: "Politique de confidentialité", href: "/confidentialite" },
  ];

  return (
    <Section id="liens" className="py-12">
      <div className="flex items-end justify-between mb-8">
        <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground">Liens utiles</h2>
        <span className="text-sm text-muted-foreground">réseaux • cagnottes • ressources</span>
      </div>

      <div className="grid gap-5 lg:grid-cols-12 items-start">
        {/* LEFT — Cagnottes & soutien */}
        <motion.section whileHover={{ y: -2 }} className="col-span-12 lg:col-span-7 lg:self-stretch rounded-2xl overflow-hidden p-[1px]" style={{ backgroundImage: GRADIENT }}>
          <div className="h-full w-full rounded-2xl bg-card/80 backdrop-blur-md border border-border p-5 flex flex-col">
            <div className="flex items-center gap-3 mb-4">
              <Heart className="h-4 w-4 text-foreground" />
              <h3 className="text-lg font-bold text-foreground">Cagnottes & soutien</h3>
            </div>
            <div className="mt-auto grid grid-cols-1 md:grid-cols-2 gap-4">
              <a href="https://gofund.me/6e217b10a" target="_blank" rel="noreferrer" className="group relative rounded-2xl border border-border bg-muted p-5 flex items-end hover:bg-muted/80 transition-colors">
                <span className="text-lg font-semibold text-foreground">🚨 Aidez Abood</span>
              </a>
              <a href="https://gofund.me/ed90a35c6" target="_blank" rel="noreferrer" className="group relative rounded-2xl border border-border bg-muted p-5 flex items-end hover:bg-muted/80 transition-colors">
                <span className="text-lg font-semibold text-foreground">🚨 Aidez Elodie</span>
              </a>
            </div>
          </div>
        </motion.section>

        {/* RIGHT — Réseaux + Contact */}
        <div className="col-span-12 lg:col-span-5 flex flex-col gap-5">
          <section className="rounded-2xl bg-card border border-border p-5">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-lg font-bold text-foreground">Réseaux</h3>
              <LinkIcon className="h-4 w-4 text-muted-foreground" />
            </div>
            <div className="flex flex-wrap gap-3">
              {networks.map(({ label, href, icon: Icon, iconClass }) => (
                <motion.a key={label} href={href} target="_blank" rel="noreferrer" aria-label={label} whileHover={{ scale: 1.05, y: -1 }} className="h-10 w-10 grid place-items-center rounded-full bg-card text-foreground border border-border hover:bg-muted">
                  <Icon className={`h-5 w-5 ${iconClass ?? ""}`} />
                </motion.a>
              ))}
            </div>
          </section>

          <section className="rounded-2xl bg-card border border-border p-4 flex items-center justify-between text-sm">
            <span className="flex items-center gap-2 text-foreground font-semibold">
              <Mail className="h-4 w-4 text-muted-foreground" />
              Contact
            </span>
            <a href="mailto:contact@sanstransition.fr" className="text-neutral-300 hover:underline">contact@sanstransition.fr</a>
          </section>
        </div>

        {/* BOTTOM ROW */}
        <div className="col-span-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {/* Formulaires */}
          <section className="rounded-2xl bg-card border border-border p-3">
            <h4 className="flex items-center gap-2 font-semibold text-foreground mb-2 text-sm">
              <Send className="h-4 w-4 text-muted-foreground" />
              Formulaires & témoignages
            </h4>
            <a
              href="https://forms.gle/yoHVL6iKBi6Adz8T9"
              target="_blank"
              rel="noreferrer"
              className="group inline-flex items-center justify-between w-full rounded-lg border border-border bg-transparent px-3 py-2 text-xs text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
            >
              <span>Proposer un témoignage ou un sujet</span>
            </a>



          </section>

          {/* Kit média */}
          <section className="rounded-2xl bg-card border border-border p-3">
            <h4 className="flex items-center gap-2 font-semibold text-foreground mb-2 text-sm">
              <ArrowUpRight className="h-4 w-4 text-muted-foreground" />
              Kit média
            </h4>
            <a
              href="https://sanstransition.fr/kit-media"
              target="_blank"
              rel="noreferrer"
              className="group inline-flex items-center justify-between w-full rounded-lg border border-border bg-transparent px-3 py-2 text-xs text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
            >
              <span>Voir le kit média</span>
            </a>

          </section>

          {/* Ressources */}
          <section className="rounded-2xl bg-card border border-border p-3">
            <h4 className="flex items-center gap-2 font-semibold text-foreground mb-2 text-sm">
              <FileText className="h-4 w-4 text-muted-foreground" />
              Ressources & docs
            </h4>
            <ul className="grid grid-cols-1 gap-1 text-xs text-muted-foreground">
              {resources.map((r) => (
                <li key={r.label}>
                  <a href={r.href} className="hover:underline">{r.label}</a>
                </li>
              ))}
            </ul>
          </section>

          {/* Presse & apparitions */}
          <section className="rounded-2xl bg-card border border-border p-3">
            <h4 className="flex items-center gap-2 font-semibold text-foreground mb-2 text-sm">
              <Newspaper className="h-4 w-4 text-muted-foreground" />
              Presse & apparitions
            </h4>
            <ul className="space-y-1 text-xs text-muted-foreground">
              <li>
                <a href="https://www.youtube.com/watch?v=qabhFKNW2xM" target="_blank" rel="noreferrer" className="hover:underline">Oeil de MouMou</a>
              </li>
              <li>
                <a href="https://www.youtube.com/watch?v=hUI88ZLf8YI" target="_blank" rel="noreferrer" className="hover:underline">Syntaxe Sociale</a>
              </li>
            </ul>
          </section>
        </div>

        {/* DON CTA — gradient background in light mode, card in dark */}
        <motion.section whileHover={{ y: -2 }} className="relative col-span-12 rounded-2xl overflow-hidden p-[1px]" style={{ backgroundImage: GRADIENT }}>
          <a href="https://www.helloasso.com/associations/sans-transition/formulaires/1" target="_blank" rel="noopener noreferrer" aria-label="Faire un don à Sans Transition" className={`group relative block rounded-2xl overflow-hidden shadow-[0_0_25px_rgba(255,255,255,0.06)] transition-transform duration-500 ease-out hover:scale-[1.02]`}>
            <div className="relative flex items-center justify-center py-4 sm:py-6 [background:var(--grad-1)] text-primary-foreground">
              <span aria-hidden className="pointer-events-none absolute inset-0 z-0 bg-white/60 dark:bg-black/50 backdrop-blur-sm" />
              <Image src="/banner.png" alt="Soutenez Sans Transition" width={1080} height={220} className="relative z-10 w-auto max-h-[160px] object-contain invert dark:invert-0" priority />
            </div>
            <span className="shine pointer-events-none absolute inset-0 rounded-2xl" aria-hidden />
            <span className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-border" aria-hidden />
          </a>

          <style jsx>{`
            .shine { overflow: hidden; mix-blend-mode: screen; }
            .shine::before {
              content: ""; position: absolute; top: -30%; bottom: -30%; left: -25%; width: 80%;
              background: linear-gradient(115deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.12) 35%, rgba(255,255,255,0.45) 50%, rgba(255,255,255,0.12) 65%, rgba(255,255,255,0) 100%);
              transform: skewX(-20deg) translateX(-250%); animation: sweep 3s linear infinite; will-change: transform;
            }
            @keyframes sweep { 0% { transform: skewX(-20deg) translateX(-250%); } 100% { transform: skewX(-20deg) translateX(250%); } }
            @media (prefers-reduced-motion: reduce) { .shine::before { animation-duration: 6s; opacity: 0.2; } }
          `}</style>
        </motion.section>
      </div>
    </Section>
  );
}
