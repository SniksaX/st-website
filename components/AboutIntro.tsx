"use client";

import Section from "@/components/Section";
import SectionHeading from "@/components/SectionHeading";
import { Sparkles, Target, ShieldCheck } from "lucide-react";

const pillars = [
  {
    title: "Radical et independant",
    desc: "Association loi 1901 nee en fevrier 2025 a Paris, financee par la communaute, sans pubs ni actionnaires.",
    icon: ShieldCheck,
  },
  {
    title: "Politiser sans bullshit",
    desc: "Rendre l'actu lisible depuis les premiers et premieres concernees, avec un langage direct et accessible.",
    icon: Target,
  },
  {
    title: "Par et pour les minorites",
    desc: "On parle des luttes feministes, antiracistes et sociales en donnant des outils a notre camp.",
    icon: Sparkles,
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
              kicker="A propos"
              title="Qu&apos;est-ce que Sans Transition ?"
              description="Sans Transition est un media radical, independant, par et pour les minorites, lance en fevrier 2025 par une jeune equipe parisienne."
            />
            <div className="space-y-5 text-base sm:text-lg text-muted-foreground leading-relaxed">
              <p>
                <span className="font-semibold text-foreground">Notre mission est simple : politiser sans bullshit.</span>{' '}
                On raconte l&apos;actualite depuis les premiers et premieres concernees, avec un ton direct, engage et accessible.
                On parle d&apos;abord a la generation Z et aux jeunes adultes qui se politisent, en assumant nos emotions, nos coleres
                et nos joies.
              </p>
              <p>
                On produit des formats courts et percutants : <em>Fokus</em> pour decrypter lois, institutions, lobbies et finance
                en montrant leur impact concret ; <em>L&apos;Oeil d&apos;Amandine</em> pour les analyses feministes ; <em>L&apos;Oeil de Lucho</em> pour la memoire
                des luttes ; <strong>Hedito</strong> pour les editos incarnes par Hedi ; Interviews longues avec les mouvements sociaux ; <em>Mikro</em>
                pour les micro-trottoirs et reportages terrain.
              </p>
              <p>
                Sans Transition se construit d&apos;abord sur <strong>TikTok</strong>, avec une presence renforcee sur YouTube, Instagram et X.
                Objectif : <em>donner des outils</em> a celles et ceux qui se reconnaissent dans les combats feministes, antiracistes
                et de justice sociale, et installer une voix claire, radicale et independante au service des minorites.
              </p>
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
          </div>
        </div>
      </div>
    </Section>
  );
}
