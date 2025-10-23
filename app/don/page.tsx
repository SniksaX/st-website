import type React from "react";
import Link from "next/link";
import Section from "@/components/Section";
import BoutonSoutenir from "@/components/BoutonSoutenir";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  HeartHandshake,
  ArrowRight,
  CheckCircle2,
  ShieldCheck,
  Target,
  Sparkles,
  HandHeart,
  Euro,
  Users,
} from "lucide-react";
import { MotionDiv } from "@/components/ClientMotion";

export const metadata = {
  title: "Soutenir Sans Transition — Don",
  description:
    "Un média par et pour les minorités. Pas pour les milliardaires. Aidez-nous à devenir stables et indépendants en rejoignant les 1000 personnes qui donnent 2 € / mois.",
};

const HELLOASSO_URL =
  "https://www.helloasso.com/beta/associations/sans-transition/formulaires/1";

export default function DonPage() {
  return (
    <main id="don" className="relative z-10 min-h-screen bg-neutral-950 text-neutral-50">
      <GradientBG />
      <DonHeader />

      {/* HERO — dark remix */}
      <section className="relative border-b border-neutral-900 backdrop-blur">
        <Section className="relative pt-28 pb-18">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left: Main message */}
            <MotionDiv
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 rounded-full border border-fuchsia-500/20 bg-fuchsia-500/10 px-4 py-1.5 text-xs font-medium uppercase tracking-wider text-fuchsia-200 mb-6">
                <Sparkles className="h-3.5 w-3.5" /> Campagne de soutien
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-[1.05] mb-5">
                <span className="bg-clip-text text-transparent bg-gradient-to-br from-white to-neutral-300">
                  Un média pour les minorités.
                </span>{" "}
                <span className="text-neutral-400">Pas pour les milliardaires.</span>
              </h1>

              <p className="text-base sm:text-lg text-neutral-300 leading-relaxed max-w-xl mb-8">
                Sans Transition est un média indépendant, construit par et pour les minorités.
                Notre mission : faire exister les voix qu’on n’écoute jamais, raconter les luttes
                avec justesse et proposer des analyses radicalement différentes.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <Button
                  asChild
                  size="lg"
                  className="rounded-2xl bg-gradient-to-r from-fuchsia-600 to-orange-500 hover:from-fuchsia-500 hover:to-orange-400 text-white font-semibold h-14 px-8 text-base shadow-[0_10px_30px_rgba(168,85,247,0.25)]"
                >
                  <a href={HELLOASSO_URL} target="_blank" rel="noreferrer">
                    Donner 2 € / mois <ArrowRight className="ml-2 h-5 w-5" />
                  </a>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="rounded-2xl border border-neutral-700 bg-neutral-900/40 hover:bg-neutral-900/70 h-14 px-8 text-base font-semibold"
                >
                  <a href={HELLOASSO_URL} target="_blank" rel="noreferrer">
                    Don ponctuel
                  </a>
                </Button>
              </div>

              <p className="text-sm text-neutral-400 mb-2">
                Objectif : <strong className="text-neutral-200">1000 personnes à 2 € / mois</strong> pour
                financer durablement le média.
              </p>

              <p className="mt-4 text-xs text-neutral-500">
                Sans Transition est une <strong>association loi 1901</strong>. Si vous êtes imposable en
                France, vos dons peuvent ouvrir droit à une <strong>réduction d’impôt de 66&nbsp;%</strong>
                (art. 200 du CGI), dans la limite de 20&nbsp;% du revenu imposable. Un reçu fiscal vous est délivré.
              </p>
            </MotionDiv>

            {/* Right: Trust Card */}
            <MotionDiv
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
            >
              <Card className="rounded-3xl border border-neutral-800 bg-neutral-900/70 ring-1 ring-white/10 shadow-2xl">
                <CardHeader className="pb-4">
                  <CardTitle className="text-2xl font-bold text-white">Pourquoi nous soutenir ?</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-neutral-300">
                  <TrustBadge icon={ShieldCheck} text="Association loi 1901" />
                  <TrustBadge icon={Euro} text="Dons déductibles des impôts à 66 %" />
                  <TrustBadge icon={HeartHandshake} text="Pas de pubs, pas d’actionnaires" />
                  <TrustBadge icon={Target} text="Indépendance par la communauté" />
                  <div className="pt-4 border-t border-neutral-800">
                    <p className="text-xs text-neutral-500 leading-relaxed">
                      Vos dons financent directement nos reportages, analyses et formats pédagogiques — sans pubs,
                      sans actionnaires, sans compromis.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </MotionDiv>
          </div>
        </Section>
      </section>

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
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-5">Pourquoi on existe</h2>
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
              <strong className="text-white">
                lancer un grand projet de reportages, libres et populaires, avec des associations et des
                figures de la gauche
              </strong>
              , pour raconter les luttes de l’intérieur et montrer les nouvelles formes d’organisation
              politique dans les quartiers populaires.
            </TextBlock>
          </div>
        </div>
      </Section>

      {/* Indépendance */}
      <Section className="py-20">
        <div className="max-w-3xl mx-auto">
          <MotionDiv
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Card className="relative rounded-3xl border border-neutral-800 bg-neutral-900/70 ring-1 ring-white/10 shadow-xl overflow-hidden">
              <div className="absolute -top-10 -right-10 h-64 w-64 bg-fuchsia-500/10 rounded-full blur-3xl" />
              <div className="absolute -bottom-16 -left-12 h-64 w-64 bg-orange-500/10 rounded-full blur-3xl" />

              <CardHeader className="relative pb-6">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-3 rounded-2xl bg-gradient-to-br from-fuchsia-500/15 to-orange-500/15 ring-1 ring-white/10">
                    <HandHeart className="h-6 w-6 text-fuchsia-300" />
                  </div>
                  <CardTitle className="text-3xl font-bold text-white">L’indépendance ou rien</CardTitle>
                </div>
              </CardHeader>

              <CardContent className="relative space-y-6 text-neutral-300">
                <p className="leading-relaxed text-lg">
                  Construire un média radicalement indépendant dans un paysage hostile, ça a un coût.
                  Notre précarité n’est pas une honte : c’est la preuve de notre intégrité. On ne veut pas
                  de pubs, pas d’actionnaires, pas de milliardaires. On veut tenir grâce à vous.
                </p>

                <ul className="space-y-3">
                  <ListItem>
                    Si <strong>1000 personnes donnent 2 € par mois</strong>, on devient indépendants.
                  </ListItem>
                  <ListItem>
                    Une communauté qui finance <em>son</em> média : juste nous, ensemble.
                  </ListItem>
                </ul>

                <div className="pt-2">
                  <Button
                    asChild
                    size="lg"
                    className="w-full rounded-2xl bg-gradient-to-r from-fuchsia-600 to-orange-500 hover:from-fuchsia-500 hover:to-orange-400 text-white font-semibold h-14 text-base shadow-[0_10px_30px_rgba(249,115,22,0.25)]"
                  >
                    <a href={HELLOASSO_URL} target="_blank" rel="noreferrer">
                      Je soutiens maintenant
                    </a>
                  </Button>
                </div>

                <p className="text-xs text-neutral-500 pt-1">
                  Exemple : un don de 10&nbsp;€ revient à 3,40&nbsp;€ après impôts.
                </p>
              </CardContent>
            </Card>
          </MotionDiv>
        </div>
      </Section>

      {/* Impact */}
      <Section className="py-20">
        <div className="max-w-5xl mx-auto">
          <MotionDiv
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-white mb-4">Votre impact concret</h2>
            <p className="text-neutral-400 text-lg">Chaque euro compte et finance directement notre travail</p>
          </MotionDiv>

          <div className="grid md:grid-cols-3 gap-6">
            <Impact amount="10 dons de 5 €" desc="financent une journée de reportage sur le terrain." delay={0.1} />
            <Impact
              amount="Chaque 100 €"
              desc="permet de produire une analyse vidéo approfondie sous un angle minoritaire."
              delay={0.2}
            />
            <Impact
              amount="Avec 2000 €"
              desc="on lance un nouveau format d’enquête ou on invite des figures engagées."
              delay={0.3}
            />
          </div>
        </div>
      </Section>

      <div className="max-w-5xl mx-auto px-6 lg:px-8">
        <Separator className="bg-neutral-900" />
      </div>

      {/* Pourquoi on a besoin de vous */}
      <Section className="py-20">
        <div className="max-w-3xl mx-auto">
          <MotionDiv
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-8">Pourquoi on a besoin de vous</h2>

            <div className="prose prose-invert prose-lg max-w-none space-y-6">
              <p className="text-neutral-300 leading-relaxed">
                En septembre, avec la monétisation TikTok, on a gagné <strong className="text-white">20 €</strong>.
                Vingt euros pour un mois de tournages, d’interviews, de montages, de nuits blanches. Ce n’est pas
                assez pour vivre. Pas assez pour continuer.
              </p>
              <p className="text-neutral-300 leading-relaxed">
                Au centre de ce média, il y a moi, Hedji. Si ce contenu est gratuit, il n’en est pas moins coûteux.
                Et pourtant je continue. Parce que j’y crois. Parce que Sans Transition, ce n’est pas juste un média :
                c’est une manière de faire de la politique autrement.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 mt-10">
              <Button
                asChild
                size="lg"
                className="rounded-2xl bg-gradient-to-r from-fuchsia-600 to-orange-500 hover:from-fuchsia-500 hover:to-orange-400 text-white font-semibold h-14 px-8 text-base shadow-[0_10px_30px_rgba(168,85,247,0.25)]"
              >
                <a href={HELLOASSO_URL} target="_blank" rel="noreferrer">
                  Rejoindre les 1000 <ArrowRight className="ml-2 h-5 w-5" />
                </a>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="rounded-2xl border border-neutral-700 bg-neutral-900/40 hover:bg-neutral-900/70 h-14 px-8 text-base font-semibold"
              >
                <Link href="/">
                  Retour à l’accueil
                </Link>
              </Button>
            </div>
          </MotionDiv>
        </div>
      </Section>

      <div className="max-w-5xl mx-auto px-6 lg:px-8">
        <Separator className="bg-neutral-900" />
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
            <div className="inline-flex items-center gap-2 rounded-full border border-orange-500/20 bg-orange-500/10 px-4 py-1.5 text-xs font-medium uppercase tracking-wider text-orange-200 mb-6">
              <Users className="h-3.5 w-3.5" /> Rejoignez la communauté
            </div>

            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
              L’Invitation à Coconstruire
            </h2>

            <div className="prose prose-invert prose-lg max-w-none mx-auto space-y-6 mb-10">
              <p className="text-neutral-300 leading-relaxed">
                Parce que Sans Transition, ce n’est pas « mon » média. C’est le nôtre. Chaque don, chaque partage,
                chaque geste fait partie d’un projet collectif. Notre travail restera en accès libre. À vous de voir
                s’il mérite salaire.
              </p>
              <p className="text-white font-semibold text-xl leading-relaxed">
                Devenez l’une des 1000 personnes qui feront la différence. Soutenez notre développement, investissez
                dans Sans Transition maintenant.
              </p>
              <p className="text-neutral-300 leading-relaxed">
                Rejoignez la communauté qui construit activement l’avenir du média sur{" "}
                <strong className="text-white">sanstransition.fr</strong>.
              </p>
            </div>

            <Button
              asChild
              size="lg"
              className="rounded-2xl bg-gradient-to-r from-fuchsia-600 to-orange-500 hover:from-fuchsia-500 hover:to-orange-400 text-white font-bold h-16 px-12 text-lg shadow-[0_12px_36px_rgba(249,115,22,0.35)]"
            >
              <a href={HELLOASSO_URL} target="_blank" rel="noreferrer">
                Faire un don maintenant
              </a>
            </Button>

            <p className="text-neutral-500 text-sm mt-8 italic">
              Toi aussi, transitionne. C’était Hedji pour ST. Bisous mes vies.
            </p>
          </MotionDiv>
        </div>
      </Section>

      {/* CTA bannière */}
      <Section className="py-8">
        <div className="max-w-3xl mx-auto">
          <BoutonSoutenir />
        </div>
      </Section>

    </main>
  );
}

/* ---------- Header spécial /don ---------- */
function DonHeader() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-neutral-800/60 bg-neutral-950/80 backdrop-blur-xl">
      <div className="mx-auto flex items-center justify-between px-8 lg:px-12 py-4 w-full max-w-7xl">
        <Link href="/" className="flex items-center gap-3 group">
          <span
            className="text-xl font-extrabold tracking-tight text-white uppercase"
            style={{ fontFamily: 'var(--font-barbra)' }}
          >
            SANS TRANSITION
          </span>
        </Link>
        <Button
          asChild
          variant="outline"
          size="sm"
          className="rounded-full border border-neutral-700 bg-neutral-900/40 hover:bg-neutral-900/70 text-white"
        >
          <Link href="/">
            Aller sur le site
          </Link>
        </Button>
      </div>
    </header>
  );
}

/* ---------- Small building blocks ---------- */
function TrustBadge({ icon: Icon, text }: { icon: React.ElementType; text: string }) {
  return (
    <MotionDiv
      whileHover={{ y: -2, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 500, damping: 28, mass: 0.6 }}
      className="group"
    >
      <div className="relative flex items-center gap-3 p-3 rounded-2xl bg-neutral-900/60 border border-neutral-800 overflow-hidden">
        {/* Glow overlay on hover */}
        <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-r from-fuchsia-500/10 via-transparent to-orange-500/10" />

        <div className="relative p-2 bg-neutral-950 rounded-xl border border-neutral-800 group-hover:border-neutral-700 transition-colors">
          <Icon className="h-5 w-5 text-fuchsia-300" />
        </div>
        <span className="relative text-sm text-neutral-200">{text}</span>
      </div>
    </MotionDiv>
  );
}

function Impact({ amount, desc, delay }: { amount: string; desc: string; delay: number }) {
  return (
    <MotionDiv
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
    >
      <Card className="group h-full rounded-3xl border border-neutral-800 bg-neutral-900/70 hover:border-fuchsia-500/30 hover:shadow-[0_12px_36px_rgba(168,85,247,0.15)] transition-all duration-300">
        <CardHeader className="pb-4">
          <div className="p-3 bg-fuchsia-500/15 rounded-2xl w-fit mb-3 group-hover:bg-fuchsia-500/25 transition-colors">
            <Target className="h-6 w-6 text-fuchsia-300" />
          </div>
          <CardTitle className="text-xl font-bold text-white">{amount}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-neutral-300 leading-relaxed">{desc}</p>
        </CardContent>
      </Card>
    </MotionDiv>
  );
}

function ListItem({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex gap-3">
      <CheckCircle2 className="h-5 w-5 mt-0.5 text-fuchsia-400 flex-shrink-0" />
      <span className="text-neutral-300 leading-relaxed">{children}</span>
    </li>
  );
}

function TextBlock({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  return (
    <MotionDiv
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
    >
      <div className="prose prose-invert max-w-none text-neutral-300 leading-relaxed">{children}</div>
    </MotionDiv>
  );
}

function GradientBG() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0 select-none overflow-hidden"
    >
      {/* motif discret */}
      <div className="absolute inset-0 bg-[radial-gradient(transparent_1px,rgba(0,0,0,0.4)_1px)] [background-size:16px_16px] opacity-[0.12]" />

      {/* halo fuchsia */}
      <div className="absolute top-[-10rem] left-[-10rem] h-[55rem] w-[55rem] rounded-full bg-fuchsia-500/15 blur-[140px]" />

      {/* halo orange */}
      <div className="absolute bottom-[-10rem] right-[-10rem] h-[50rem] w-[50rem] rounded-full bg-orange-500/15 blur-[140px]" />

      {/* léger fondu noir */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-neutral-950 to-transparent" />
    </div>
  );
}
