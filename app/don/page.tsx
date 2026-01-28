// ✅ Version corrigée et complète avec accents UTF-8



// ✅ Version corrigée et complète avec accents UTF-8

import type React from "react";
import Section from "@/components/Section";
import BoutonSoutenir from "@/components/BoutonSoutenir";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ArrowRight, Sparkles, Users } from "lucide-react";
import { MotionDiv } from "@/components/ClientMotion";
import FacesMosaic from "@/components/FacesMosaic";
import DonHeader from "@/components/don/DonHeader";
import DonGradientBG from "@/components/don/GradientBG";
import DonTrustBadge from "@/components/don/TrustBadge";
import DonTextBlock from "@/components/don/TextBlock";
import HelloAssoWidget from "@/components/HelloAssoWidget";

// Local alias to keep existing JSX unchanged
const TrustBadge = DonTrustBadge;
const TextBlock = DonTextBlock;

export const metadata = {
  title: "Soutenir Sans Transition — Don",
  description:
    "Un média par et pour les minorités. Pas pour les milliardaires. Aidez-nous à devenir stables et indépendants en rejoignant les 1000 personnes qui donnent 2 € / mois.",
};

const HELLOASSO_URL =
  "https://www.helloasso.com/beta/associations/sans-transition/formulaires/1";
const HELLOASSO_ONE_TIME_URL = HELLOASSO_URL; // TODO: remplacer par le lien don ponctuel dédié si différent

export default function DonPage() {
  return (
    <main id="don" className="relative z-10 min-h-screen bg-background text-foreground overflow-x-clip">
      <DonGradientBG />
      <DonHeader helloassoUrl={HELLOASSO_URL} />

      {/* Page-wide grid with sticky sidebar */}
      <div className="relative isolate">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-8">
          <div className="grid lg:grid-cols-[1fr_380px] gap-12">
            {/* Left: Main Content Column */}
            <div className="min-w-0">
              {/* HERO — dark remix - Full width background */}
              <section className="relative">
                {/* Hero content */}
                <div className="relative z-10 pt-32 pb-20 min-w-0">
                  <MotionDiv
                    initial={{ opacity: 0, scale: 0.92 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.05 }}
                  >
                    <div className="inline-flex items-center gap-2 rounded-full border border-fuchsia-500/20 bg-fuchsia-500/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-fuchsia-700 dark:text-fuchsia-200 mb-6">
                      <Sparkles className="h-3.5 w-3.5" /> Campagne de soutien
                    </div>
                  </MotionDiv>

                  <MotionDiv
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.2 }}
                  >
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-[1.02] mb-4">
                      <span className="text-foreground">La Transition — </span>
                      <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-white to-neutral-100 dark:from-white dark:via-white dark:to-neutral-100 drop-shadow-[0_2px_10px_rgba(0,0,0,0.35)]">
                        l’indépendance ou rien.
                      </span>
                    </h1>
                  </MotionDiv>

                  <MotionDiv
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                  >
                    <p className="text-lg sm:text-xl text-foreground/95 leading-relaxed max-w-xl mb-8">
                      1 000 personnes × 2 €/mois = un média libre et stable. Sans Transition est un média
                      indépendant, construit par et pour les minorités. Notre mission : faire exister
                      les voix qu’on n’écoute jamais, raconter les luttes avec justesse et proposer des
                      analyses radicalement différentes.
                    </p>
                  </MotionDiv>

                  <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-5">
                    {[
                      { icon: "shield" as const, text: "Association loi 1901", delay: 0.5 },
                      { icon: "euro" as const, text: "Financement 100 % citoyen", delay: 0.6 },
                      { icon: "heartHandshake" as const, text: "Pas de pubs, pas d'actionnaires", delay: 0.7 },
                      { icon: "target" as const, text: "Indépendance par la communauté", delay: 0.8 },
                    ].map((badge) => (
                      <MotionDiv
                        key={badge.text}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: badge.delay }}
                      >
                        <TrustBadge icon={badge.icon} text={badge.text} />
                      </MotionDiv>
                    ))}
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4 mt-8">
                    <MotionDiv
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.9 }}
                      whileHover={{ y: -2, scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full sm:w-auto"
                    >
                      <Button
                        asChild
                        size="lg"
                        className="rounded-2xl bg-gradient-to-r from-fuchsia-600 to-orange-500 hover:from-fuchsia-500 hover:to-orange-400 text-white font-semibold h-14 px-10 text-base shadow-[0_16px_36px_rgba(168,85,247,0.35)]"
                      >
                        <a href={HELLOASSO_URL} target="_blank" rel="noreferrer">
                          Je rejoins la Transition <ArrowRight className="ml-2 h-5 w-5" />
                        </a>
                      </Button>
                    </MotionDiv>
                    <MotionDiv
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 1 }}
                      whileHover={{ y: -2, scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full sm:w-auto"
                    >
                      <Button
                        asChild
                        variant="outline"
                        size="lg"
                        className="rounded-2xl border-border/60 bg-card/70 hover:bg-muted text-foreground h-14 px-8 text-base"
                      >
                        <a href={HELLOASSO_ONE_TIME_URL} target="_blank" rel="noreferrer">
                          Faire un don ponctuel
                        </a>
                      </Button>
                    </MotionDiv>
                  </div>
                </div>
              </section>

              {/* Pourquoi La Transition ? */}
              <Section className="py-20 relative">
                <div className="max-w-5xl mx-auto">
                  <MotionDiv
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-12"
                  >
                    <div className="inline-flex items-center gap-2 rounded-full border border-fuchsia-500/20 bg-fuchsia-500/10 px-4 py-1.5 text-xs font-medium uppercase tracking-wider text-fuchsia-700 dark:text-fuchsia-200 mb-4">
                      <Sparkles className="h-3.5 w-3.5" /> Pourquoi maintenant
                    </div>
                    <h2 className="text-4xl sm:text-6xl font-extrabold leading-tight mb-4">
                      <span className="text-foreground">Pourquoi </span>
                      <span className="bg-clip-text text-transparent bg-gradient-to-r from-fuchsia-400 via-pink-300 to-orange-300">La Transition ?</span>
                    </h2>
                    <div className="mx-auto h-1 w-24 bg-gradient-to-r from-fuchsia-500 to-orange-500 rounded-full" />
                    <p className="mt-6 text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">
                      Parce qu’on ne peut pas être libres sans moyens.
                    </p>
                  </MotionDiv>

                  {/* bandeau de valeurs (auto-scroll) - Enhanced with animations */}
                  <MotionDiv
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7, delay: 0.8 }}
                  >
                    <div className="relative overflow-hidden rounded-2xl border border-border/50 bg-card/30 backdrop-blur-sm p-2">
                      <div className="flex gap-8 min-w-max py-3 px-6 text-sm sm:text-base font-semibold tracking-wide text-foreground/90 whitespace-nowrap animate-scroll-x">
                        {/* DUPLICATED CONTENT FOR INFINITE LOOP */}
                        {[
                          "INDÉPENDANCE",
                          "COMMUNAUTÉ",
                          "JUSTICE SOCIALE",
                          "FÉMINISME",
                          "ANTIRACISME",
                          "ACCESSIBILITÉ",
                          "ÉDUC POP",
                          "INDÉPENDANCE",
                          "COMMUNAUTÉ",
                          "JUSTICE SOCIALE",
                          "FÉMINISME",
                          "ANTIRACISME",
                          "ACCESSIBILITÉ",
                          "ÉDUC POP",
                          // loop copy
                          "INDÉPENDANCE",
                          "COMMUNAUTÉ",
                          "JUSTICE SOCIALE",
                          "FÉMINISME",
                          "ANTIRACISME",
                          "ACCESSIBILITÉ",
                          "ÉDUC POP",
                          "INDÉPENDANCE",
                          "COMMUNAUTÉ",
                          "JUSTICE SOCIALE",
                          "FÉMINISME",
                          "ANTIRACISME",
                          "ACCESSIBILITÉ",
                          "ÉDUC POP",
                        ].map((txt, i) => (
                          <span
                            key={i}
                            className={
                              txt === "INDÉPENDANCE"
                                ? "text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-400 to-pink-400 font-extrabold"
                                : ""
                            }
                          >
                            {txt}
                          </span>
                        ))}
                      </div>
                    </div>
                  </MotionDiv>

                </div>
              </Section>

              {/* Pourquoi on existe */}
              <Section className="py-20">
                <div className="max-w-5xl mx-auto">
                  <MotionDiv
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-14"
                  >
                    <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-5">Pourquoi on existe</h2>
                    <div className="w-20 h-1 bg-gradient-to-r from-fuchsia-500 to-orange-500 mx-auto rounded-full" />
                  </MotionDiv>

                  <div className="grid md:grid-cols-2 gap-10">
                    <TextBlock delay={0.05}>
                      Sans Transition, c’est des invité·es, des analyses féministes, anticoloniales, historiques.
                      C’est du terrain, des micros tendus à celles et ceux qu’on n’écoute jamais. C’est un média
                      qui relie la rage et la tendresse, la lutte et la réflexion.
                    </TextBlock>
                    <TextBlock delay={0.1}>
                      En 2026, on veut aller plus loin :{" "}
                      <strong className="text-foreground">
                        lancer un grand projet de reportages, libres et populaires, avec des associations et des
                        figures de la gauche
                      </strong>
                      , pour raconter les luttes de l’intérieur et montrer les nouvelles formes d’organisation
                      politique dans les quartiers populaires.
                    </TextBlock>
                  </div>
                </div>
              </Section>

              {/* Pourquoi on a besoin de vous */}
              <Section className="py-20">
                <div className="max-w-3xl mx-auto">
                  <MotionDiv
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                  >
                    <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-8">Pourquoi on a besoin de vous</h2>

                    <div className="prose prose-lg max-w-none space-y-6">
                      <p className="text-muted-foreground leading-relaxed">
                        En septembre, avec la monétisation TikTok, on a gagné <strong className="text-foreground">20 €</strong>.
                        Vingt euros pour un mois de tournages, d’interviews, de montages, de nuits blanches. Ce n’est pas
                        assez pour vivre. Pas assez pour continuer.
                      </p>
                      <p className="text-muted-foreground leading-relaxed">
                        Au centre de ce média, il y a moi, Hedji. Si ce contenu est gratuit, il n’en est pas moins coûteux.
                        Et pourtant je continue. Parce que j’y crois. Parce que Sans Transition, ce n’est pas juste un média :
                        c’est une manière de faire de la politique autrement.
                      </p>
                    </div>

                  </MotionDiv>
                </div>
              </Section>

              <div className="max-w-5xl mx-auto px-6 lg:px-8">
                <Separator className="bg-border" />
              </div>

              {/* Invitation */}
              <Section className="py-20">
                <div className="max-w-3xl mx-auto text-center">
                  <MotionDiv
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                  >
                    <div className="inline-flex items-center gap-2 rounded-full border border-orange-500/20 bg-orange-500/10 px-4 py-1.5 text-xs font-medium uppercase tracking-wider text-orange-700 dark:text-orange-200 mb-6">
                      <Users className="h-3.5 w-3.5" /> Rejoignez la communauté
                    </div>

                    <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-6">
                      L’Invitation à coconstruire
                    </h2>

                    <div className="prose prose-lg max-w-none mx-auto space-y-6 mb-10">
                      <p className="text-muted-foreground leading-relaxed">
                        Parce que Sans Transition, ce n’est pas « mon » média. C’est le nôtre. Chaque don, chaque partage,
                        chaque geste fait partie d’un projet collectif. Notre travail restera en accès libre. À vous de voir
                        s’il mérite salaire.
                      </p>
                      <p className="text-foreground font-semibold text-xl leading-relaxed">
                        Devenez l’une des 1000 personnes qui feront la différence. Soutenez notre développement, investissez
                        dans Sans Transition maintenant.
                      </p>
                      <p className="text-muted-foreground leading-relaxed">
                        Rejoignez la communauté qui construit activement l’avenir du média sur{" "}
                        <strong className="text-foreground">sanstransition.fr</strong>.
                      </p>
                    </div>

                    <p className="text-muted-foreground text-sm mt-8 italic">
                      Toi aussi, transitionne. C’était Hedji pour ST. Bisous mes vies.
                    </p>
                  </MotionDiv>
                </div>
              </Section>

              {/* FAQ (déplacée en fin de page pour conclure) */}
              <Section className="py-20">
                <div className="max-w-4xl mx-auto">
                  <MotionDiv
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-10"
                  >
                    <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">FAQ</h2>
                    <p className="text-muted-foreground">Sécurité, RGPD, résiliation</p>
                  </MotionDiv>

                  <div className="space-y-6 text-muted-foreground">
                    <div>
                      <p className="text-foreground font-semibold mb-1">Paiement sécurisé ?</p>
                      <p>Les dons sont traités par HelloAsso (HTTPS, 3-D Secure). Nous ne stockons pas vos données bancaires.</p>
                    </div>
                    <div>
                      <p className="text-foreground font-semibold mb-1">RGPD et données personnelles</p>
                      <p>Nous collectons le minimum nécessaire pour les reçus fiscaux et la gestion des dons, conformément au RGPD.</p>
                    </div>
                    <div>
                      <p className="text-foreground font-semibold mb-1">Résilier un don mensuel</p>
                      <p>Vous pouvez modifier ou arrêter votre soutien à tout moment via votre espace HelloAsso.</p>
                    </div>
                  </div>
                </div>
              </Section>

              {/* Les visages de ST — mosaïque de vidéos */}
              <Section className="py-20">
                <div className="max-w-5xl mx-auto">
                  <MotionDiv
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-10"
                  >
                    <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">Les visages de ST</h2>
                    <p className="text-muted-foreground">Extraits vidéo depuis notre TikTok</p>
                  </MotionDiv>

                  <MotionDiv
                    initial={{ opacity: 0, scale: 0.9, rotateY: -15 }}
                    whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{
                      duration: 1,
                      type: "spring",
                      stiffness: 50
                    }}
                    whileHover={{
                      scale: 1.02,
                      rotateY: 2,
                      transition: { duration: 0.3 }
                    }}
                    style={{ perspective: 1200 }}
                  >
                    <FacesMosaic fileUrl="/json_don.txt" variant="static" />
                  </MotionDiv>
                </div>
              </Section>

            </div>
            {/* Close: Left Main Content Column */}

            {/* Right: Sticky Sidebar - Persists through entire page */}
            <MotionDiv
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="hidden lg:block relative z-10"
            >
              <div className="sticky top-28 h-fit pt-0">
                <div className="w-full rounded-2xl border border-border bg-card/80 backdrop-blur-md p-4 shadow-2xl ring-1 ring-border">
                  <HelloAssoWidget className="mx-auto" />
                  <p className="mt-4 text-xs text-center text-muted-foreground">
                    Paiement sécurisé via HelloAsso. Aucune donnée bancaire stockée par Sans Transition.
                  </p>
                </div>
              </div>
            </MotionDiv>
          </div>
          {/* Close: grid */}
        </div>
        {/* Close: max-w container */}
      </div >
      {/* Close: page-wide wrapper */}

    </main >
  );
}
