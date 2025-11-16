"use client";

import Section from "@/components/Section";
import SectionHeading from "@/components/SectionHeading";
import { Sparkles, Target, ShieldCheck, Instagram, Youtube } from "lucide-react";
import type { ComponentType, SVGProps } from "react";

const TikTokLogo = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 256 256" aria-hidden="true" {...props}>
    <path
      fill="currentColor"
      d="M224 88.4c-23.6 0-42.8-19.2-42.8-42.8V32h-36.6v132.1c0 19.7-16 35.7-35.7 35.7s-35.7-16-35.7-35.7 16-35.7 35.7-35.7c2.4 0 4.7.2 6.9.7V92.6c-2.3-.3-4.6-.5-6.9-.5-39.8 0-72.2 32.4-72.2 72.2s32.4 72.2 72.2 72.2 72.2-32.4 72.2-72.2v-56c12.1 8.7 26.9 13.9 42.8 13.9v-33.8z"
    />
  </svg>
);

const InstagramLogo = (props: SVGProps<SVGSVGElement>) => (
  <Instagram strokeWidth={1.6} aria-hidden="true" {...props} />
);

const YoutubeLogo = (props: SVGProps<SVGSVGElement>) => (
  <Youtube strokeWidth={1.6} aria-hidden="true" {...props} />
);

const TwitterLogo = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
    <path d="M23 4.5c-.8.4-1.7.6-2.6.8a4.3 4.3 0 0 0 1.9-2.4 8.6 8.6 0 0 1-2.7 1 4.3 4.3 0 0 0-7.5 2.9c0 .3 0 .7.1 1A12.3 12.3 0 0 1 3 3.6a4.4 4.4 0 0 0 1.3 5.7c-.7 0-1.3-.2-2-.5v.1a4.3 4.3 0 0 0 3.5 4.2c-.4.1-.9.2-1.3.2-.3 0-.6 0-.9-.1a4.3 4.3 0 0 0 4 3 8.7 8.7 0 0 1-5.3 1.8H1a12.2 12.2 0 0 0 6.6 1.9c8 0 12.3-6.6 12.3-12.3v-.6A8.6 8.6 0 0 0 23 4.5z" />
  </svg>
);

const pillars = [
  {
    title: "Radical et indépendant",
    desc: "Association loi 1901 née en février 2025 à Paris, financée par la communauté, sans pubs ni actionnaires.",
    icon: ShieldCheck,
  },
  {
    title: "Politiser sans bullshit",
    desc: "Rendre l'actu lisible depuis les premiers et premières concerné·es, avec un langage direct et accessible.",
    icon: Target,
  },
  {
    title: "Par et pour les minorités",
    desc: "On parle des luttes féministes, antiracistes et sociales en donnant des outils à notre camp.",
    icon: Sparkles,
  },
];

type Format = {
  title: string;
  desc: string;
  badge?: string;
};

const formats: Format[] = [
  {
    title: "Fokus",
    desc: "Pour décrypter l'actu.",
  },
  {
    title: "L'Oeil d'Amandine",
    desc: "Pour les analyses féministes.",
    badge: "02",
  },
  {
    title: "L'Oeil de Lucho",
    desc: "Pour la mémoire des luttes.",
    badge: "02",
  },
  {
    title: "Hedito",
    desc: "Pour les éditos incarnés par Hedji.",
  },
  {
    title: "Interviews longues",
    desc: "Avec des figures de la gauche.",
  },
  {
    title: "Mikro",
    desc: "Pour les micro-trottoirs et les reportages terrain.",
  },
];

type Platform = {
  name: string;
  followers: string;
  url: string;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
};

const platforms: Platform[] = [
  {
    name: "TikTok",
    followers: "40k+",
    url: "https://www.tiktok.com/@sanstransition",
    icon: TikTokLogo,
  },
  {
    name: "Instagram",
    followers: "2.5k+",
    url: "https://www.instagram.com/sanstransition__",
    icon: InstagramLogo,
  },
  {
    name: "YouTube",
    followers: "300+",
    url: "https://www.youtube.com/@SansTransitionMedia",
    icon: YoutubeLogo,
  },
  {
    name: "X",
    followers: "400+",
    url: "https://x.com/sanstransition_",
    icon: TwitterLogo,
  },
];

export default function AboutIntro() {
  return (
    <Section id="about" className="py-16">
      <div className="relative rounded-[2.5rem] border border-border/60 bg-background px-6 py-10 sm:px-10 lg:px-14 lg:py-14 overflow-visible">
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <div className="absolute -left-24 top-6 h-52 w-52 rounded-full bg-fuchsia-500/15 blur-3xl" />
          <div className="absolute right-0 bottom-0 h-64 w-64 rounded-full bg-orange-400/15 blur-[120px]" />
        </div>

        <div className="relative grid gap-10 lg:grid-cols-2 items-start">
          <div className="space-y-6">
            <SectionHeading
              kicker="À propos"
              title="Qu&apos;est-ce que Sans Transition ?"
              description="Sans Transition est un média radical, indépendant, par et pour les minorités, lancé en février 2025 par une jeune équipe francilienne."
            />
            <div className="space-y-5 text-base sm:text-lg text-muted-foreground leading-relaxed">
              <p>
                <span className="font-semibold text-foreground">
                  Notre mission est simple : politiser sans bullshit.
                </span>{" "}
                On raconte l&apos;actualité depuis les premiers et premières concerné·es, avec un ton direct, engagé et
                accessible. On parle d&apos;abord à la génération Z et aux jeunes adultes qui se politisent, en assumant
                nos émotions, nos colères et nos joies.
              </p>

              <div className="space-y-3">
                <p>On produit des formats courts et percutants :</p>
                <div className="grid gap-3 sm:grid-cols-2">
                  {formats.map((format, idx) => {
                    const badgeLabel = format.badge ?? String(idx + 1).padStart(2, "0");
                    return (
                    <div
                      key={format.title}
                      className="group relative overflow-hidden rounded-2xl border border-border/40 bg-card/40 p-4 shadow-[0_6px_20px_rgba(0,0,0,0.25)] transition hover:border-border/60 hover:shadow-[0_10px_30px_rgba(0,0,0,0.35)]"
                    >
                      <div
                        aria-hidden
                        className="pointer-events-none absolute inset-0 bg-gradient-to-br from-fuchsia-500/5 via-transparent to-orange-400/10 opacity-0 transition group-hover:opacity-100"
                      />
                      <div className="relative flex items-start gap-3">
                        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-fuchsia-600/30 to-orange-400/15 text-xs font-semibold text-foreground">
                          {badgeLabel}
                        </div>
                        <div>
                          <p className="font-semibold text-sm text-foreground">{format.title}</p>
                          <p className="text-sm text-muted-foreground">{format.desc}</p>
                        </div>
                      </div>
                    </div>
                  )})}
                </div>
                <div className="space-y-5 pt-3 rounded-2xl border border-border/40 bg-card/30 p-5 shadow-[0_8px_30px_rgba(0,0,0,0.25)]">
                  <div className="text-base uppercase tracking-[0.4em] text-pink-400">
                    La Transition — l&rsquo;indépendance ou rien
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    On lance <strong className="text-foreground">la Transition</strong> : 1 000 personnes à 2 €/mois pour
                    financer un média radical, sans pubs, sans actionnaires, juste la commu. On veut passer d&rsquo;une
                    économie de survie (monétisation TikTok = 20 €) à une base solide qui paye les tournages, la
                    modération, la sécu numérique et des salaires dignes.
                  </p>
                  <div className="flex flex-wrap gap-2 text-[11px] uppercase tracking-[0.25em] text-muted-foreground">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-muted/20 px-4 py-1.5">
                      <span className="h-1.5 w-1.5 rounded-full bg-pink-400" aria-hidden />
                      1 000 × 2 €/mois
                    </span>
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-muted/20 px-4 py-1.5">
                      <span className="h-1.5 w-1.5 rounded-full bg-blue-400" aria-hidden />
                      tournages / modération / sécu numérique
                    </span>
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-muted/20 px-4 py-1.5">
                      <span className="h-1.5 w-1.5 rounded-full bg-orange-400" aria-hidden />
                      100 % indépendant
                    </span>
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-muted/20 px-4 py-1.5">
                      <span className="h-1.5 w-1.5 rounded-full bg-fuchsia-400" aria-hidden />
                      reportages / formats
                    </span>
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-muted/20 px-4 py-1.5">
                      <span className="h-1.5 w-1.5 rounded-full bg-violet-400" aria-hidden />
                      ressources / outils
                    </span>
                  </div>
                  <div className="flex flex-wrap items-center gap-3">
                    <a
                      href="#campaign"
                      className="inline-flex items-center justify-center rounded-2xl bg-gradient-to-r from-pink-500 via-fuchsia-500 to-orange-400 px-6 py-2.5 text-sm font-semibold text-white shadow-lg shadow-pink-500/25 transition hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-pink-400/60"
                    >
                      Rejoindre la Transition
                    </a>
                    <p className="text-xs text-muted-foreground max-w-[16rem]">
                      Rejoindre = financer l&apos;autonomie (charges, matériel, sécurité) et garantir que Sans Transition
                      ne doit rien à un milliardaire.
                    </p>
                  </div>
                </div>
              </div>

            </div>
          </div>

          <div className="flex flex-col gap-6">
            {pillars.map((pillar) => {
              const Icon = pillar.icon;
              return (
                <div
                  key={pillar.title}
                  className="rounded-3xl border border-border/50 bg-card/30 p-6 shadow-[0_16px_50px_rgba(0,0,0,0.35)] transition hover:translate-y-[-4px] hover:shadow-[0_20px_60px_rgba(0,0,0,0.5)]"
                >
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-border/60 bg-background/80 text-foreground">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="text-xl font-semibold text-foreground">{pillar.title}</h3>
                  </div>
                  <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{pillar.desc}</p>
                </div>
              );
            })}

            <div className="space-y-4">
              <p>
                Sans Transition se construit d&apos;abord sur les réseaux sociaux, avec un ancrage fort sur{" "}
                <strong>TikTok</strong> et une présence renforcée sur YouTube, Instagram et X.
              </p>

              {/* VRAI bento grid réseaux */}
              <div className="grid gap-4 grid-cols-2 sm:grid-cols-6 auto-rows-[120px] sm:auto-rows-[90px]">
                {platforms.map((platform) => {
                  const Logo = platform.icon;
                  const layoutClasses =
                    platform.name === "TikTok"
                      ? "sm:col-span-4 sm:row-span-2 sm:col-start-1 sm:row-start-1"
                      : platform.name === "Instagram"
                      ? "sm:col-span-2 sm:row-span-3 sm:col-start-5 sm:row-start-1"
                      : platform.name === "YouTube"
                      ? "sm:col-span-2 sm:row-span-1 sm:col-start-1 sm:row-start-3"
                      : "sm:col-span-2 sm:row-span-1 sm:col-start-3 sm:row-start-3"; // X

                  return (
                    <a
                      key={platform.name}
                      href={platform.url}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={`${platform.name} (${platform.followers})`}
                      className={`group relative block h-full w-full col-span-2 row-span-1 ${layoutClasses}`}
                    >
                      <div
                        className="relative flex h-full w-full items-center justify-center rounded-3xl border border-border/60 bg-card/40 px-4 py-4 shadow-[0_14px_40px_rgba(0,0,0,0.4)] overflow-hidden transition group-hover:translate-y-[-3px] group-hover:shadow-[0_18px_55px_rgba(0,0,0,0.55)]"
                      >
                        <div aria-hidden className="pointer-events-none absolute inset-0">
                          <div className="absolute -top-6 -right-6 h-20 w-20 rounded-full bg-fuchsia-500/10 blur-2xl" />
                        </div>

                        {/* Contenu centré */}
                        <div className="relative flex flex-col items-center gap-2 text-center">
                          <Logo className="h-8 w-8 text-foreground" />
                          <p className="text-2xl font-semibold text-foreground">
                            {platform.followers}
                          </p>
                        </div>
                      </div>
                    </a>
                  );
                })}
              </div>

              <p>
                Objectif : <em>donner des outils</em> à celles et ceux qui se reconnaissent dans les combats féministes,
                antiracistes et de justice sociale, et installer une voix claire, radicale et indépendante au service des
                minorités.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
