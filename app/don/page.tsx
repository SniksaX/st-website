import type React from "react";
import Link from "next/link";
import Section from "@/components/Section";
import ThemeToggle from "@/components/ThemeToggle";
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
import FacesMosaic from "@/components/FacesMosaic";
import DonProgress from "@/components/DonProgress";

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
    <main id="don" className="relative z-10 min-h-screen bg-background text-foreground">
      <GradientBG />
      <DonHeader />

      {/* HERO — dark remix */}
      <section className="relative border-b border-border backdrop-blur">
        {/* Mosaïque en arrière-plan */}
        <div aria-hidden className="absolute inset-0 z-0 pointer-events-none">
          <div className="absolute left-0 right-0 top-36 md:top-1/2 md:-translate-y-1/2">
            <div className="mx-auto max-w-6xl opacity-30">
              <FacesMosaic fileUrl="/json_don.txt" variant="background" />
            </div>
          </div>
          {/* masques pour garder la lisibilité du Hero */}
          <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background" />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-transparent to-background" />
        </div>

        <Section className="relative z-10 pt-28 pb-18">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left: Main message */}
            <MotionDiv
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 rounded-full border border-fuchsia-500/20 bg-fuchsia-500/10 px-4 py-1.5 text-xs font-medium uppercase tracking-wider text-fuchsia-700 dark:text-fuchsia-200 mb-6">
                <Sparkles className="h-3.5 w-3.5" /> Campagne de soutien
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-[1.05] mb-4">
                <span className="text-foreground">La Transition — </span>
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-white to-neutral-100 dark:from-white dark:via-white dark:to-neutral-100 drop-shadow-[0_2px_10px_rgba(0,0,0,0.35)]">
                  l’indépendance ou rien.
                </span>
              </h1>

              <p className="text-base sm:text-lg text-foreground/95 leading-relaxed max-w-xl mb-6 italic">
                « 1 000 personnes à 2 €/mois = un média libre et stable. »
              </p>

              <p className="text-base sm:text-lg text-foreground/90 leading-relaxed max-w-xl mb-8">
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
                    Je rejoins la Transition <ArrowRight className="ml-2 h-5 w-5" />
                  </a>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="rounded-2xl border-border bg-card hover:bg-muted text-foreground h-14 px-8 text-base"
                >
                  <a href={HELLOASSO_ONE_TIME_URL} target="_blank" rel="noreferrer">
                    Faire un don ponctuel
                  </a>
                </Button>
              </div>

              <p className="text-sm text-muted-foreground mb-2">
                Objectif : <strong className="text-foreground">1000 personnes à 2 € / mois</strong> pour
                financer durablement le média.
              </p>

              <p className="mt-4 text-xs text-muted-foreground">
                Sans Transition est une <strong>association loi 1901</strong>. Vos dons financent directement nos contenus
                et notre développement.
              </p>
            </MotionDiv>

            {/* Right: Trust Card */}
            <MotionDiv
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
            >
              <Card className="rounded-3xl border border-border bg-card/70 ring-1 ring-border shadow-2xl">
                <CardHeader className="pb-4">
                  <CardTitle className="text-2xl font-bold text-foreground">Pourquoi nous soutenir ?</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-muted-foreground">
                  <TrustBadge icon={ShieldCheck} text="Association loi 1901" />
                  <TrustBadge icon={Euro} text="Financement 100 % citoyen" />
                  <TrustBadge icon={HeartHandshake} text="Pas de pubs, pas d’actionnaires" />
                  <TrustBadge icon={Target} text="Indépendance par la communauté" />
                  <div className="pt-4 border-t border-border">
                    <p className="text-xs text-muted-foreground leading-relaxed">
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

      

      

      {/* Sections ajoutées — structure demandée */}
      {/* Pourquoi La Transition ? */}
      <Section className="py-16">
        <div className="max-w-5xl mx-auto">
          <MotionDiv
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-10"
          >
            <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">Pourquoi La Transition ?</h2>
            <p className="text-lg text-muted-foreground">
              Parce qu’on ne peut pas être libres sans moyens.
            </p>
          </MotionDiv>
        </div>
      </Section>

      {/* Les paliers */}
      <Section className="py-16">
        <div className="max-w-5xl mx-auto">
          <MotionDiv
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-10"
          >
            <h2 className="text-4xl font-bold text-foreground mb-4">Les paliers</h2>
            <p className="text-muted-foreground">Écho • Signal • Fracture • Transition</p>
          </MotionDiv>

          <div className="grid md:grid-cols-4 gap-6">
            {[
              {
                name: "Écho",
                amount: "2 €/mois",
                desc: "Tu fais entendre nos voix. Le début du mouvement.",
              },
              {
                name: "Signal",
                amount: "5 €/mois",
                desc: "Tu amplifies le signal. Tu fais vibrer les luttes.",
              },
              {
                name: "Fracture",
                amount: "10 €/mois",
                desc: "Tu casses le cadre médiatique dominant.",
              },
              {
                name: "Transition",
                amount: "20 €/mois",
                desc: "Tu rends possible la bascule. L’indépendance ou rien.",
              },
            ].map((p) => (
              <Card key={p.name} className="rounded-3xl border border-border bg-card/70 ring-1 ring-border h-full">
                <CardHeader className="pb-2">
                  <CardTitle className="text-xl font-bold text-foreground">{p.name}</CardTitle>
                  <p className="text-sm text-muted-foreground mt-1">{p.amount}</p>
                </CardHeader>
                <CardContent className="text-muted-foreground">{p.desc}</CardContent>
              </Card>
            ))}
          </div>

          {/* Progression vers l'objectif */}
          <DonProgress goal={1000} />

          <div className="text-center mt-8">
            <Button
              asChild
              size="lg"
              className="rounded-2xl bg-gradient-to-r from-fuchsia-600 to-orange-500 hover:from-fuchsia-500 hover:to-orange-400 text-white font-semibold h-14 px-8 text-base shadow-[0_10px_30px_rgba(168,85,247,0.25)]"
            >
              <a href={HELLOASSO_URL} target="_blank" rel="noreferrer">
                Je rejoins la Transition
              </a>
            </Button>
          </div>
        </div>
      </Section>

      {/* Transparence */}
      <Section className="py-16">
        <div className="max-w-5xl mx-auto">
          <MotionDiv
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-10 text-center"
          >
            <h2 className="text-4xl font-bold text-foreground mb-4">Transparence</h2>
            <p className="text-muted-foreground text-lg">Budgets socle et ambition, gouvernance et indépendance.</p>
          </MotionDiv>

          <div className="grid md:grid-cols-2 gap-6">
            <Card className="rounded-3xl border border-border bg-card/70 ring-1 ring-border">
              <CardHeader className="pb-3">
                <CardTitle className="text-2xl font-bold text-foreground">Budget socle</CardTitle>
              </CardHeader>
              <CardContent className="text-muted-foreground space-y-3">
                <p>Salaires dignes, frais de tournage, hébergement, outils.</p>
                <p>Objectif: stabiliser la production et l’équipe.</p>
              </CardContent>
            </Card>
            <Card className="rounded-3xl border border-border bg-card/70 ring-1 ring-border">
              <CardHeader className="pb-3">
                <CardTitle className="text-2xl font-bold text-foreground">Budget ambition</CardTitle>
              </CardHeader>
              <CardContent className="text-muted-foreground space-y-3">
                <p>Grandes enquêtes, formats pédagogiques, documentation et événements.</p>
                <p>Objectif: accélérer l’impact et l’accessibilité.</p>
              </CardContent>
            </Card>
          </div>

          <div className="text-center mt-8">
            <Button asChild variant="outline" className="rounded-full">
              <Link href="#finances">Voir « Finances & indépendance »</Link>
            </Button>
          </div>
        </div>
      </Section>

      {/* Les visages de ST — mosaïque de vidéos */}
      <Section className="py-16">
        <div className="max-w-5xl mx-auto">
          <MotionDiv
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-10"
          >
            <h2 className="text-4xl font-bold text-foreground mb-4">Les visages de ST</h2>
            <p className="text-muted-foreground">Extraits vidéo depuis notre TikTok</p>
          </MotionDiv>

          <FacesMosaic fileUrl="/json_don.txt" variant="static" />
        </div>
      </Section>

      

      {/* Ancre interne pour Transparence */}
      <Section id="finances" className="py-12">
        <div className="max-w-4xl mx-auto">
          <MotionDiv
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="text-2xl font-bold text-foreground mb-3">Finances & indépendance</h3>
            <p className="text-muted-foreground">
              Nous publierons ici un suivi synthétique de nos budgets (socle/ambition), sources de financement et
              principes d’indépendance. En attendant, vos questions sont les bienvenues.
            </p>
          </MotionDiv>
        </div>
      </Section>

      {/* FAQ (déplacée en fin de page pour conclure) */}
      <Section className="py-16">
        <div className="max-w-4xl mx-auto">
          <MotionDiv
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-10"
          >
            <h2 className="text-4xl font-bold text-foreground mb-4">FAQ</h2>
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
            <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-5">Pourquoi on existe</h2>
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

      {/* Indépendance */}
      <Section className="py-20">
        <div className="max-w-3xl mx-auto">
          <MotionDiv
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Card className="relative rounded-3xl border border-border bg-card/70 ring-1 ring-border shadow-xl overflow-hidden">
              <div className="absolute -top-10 -right-10 h-64 w-64 bg-fuchsia-500/10 rounded-full blur-3xl" />
              <div className="absolute -bottom-16 -left-12 h-64 w-64 bg-orange-500/10 rounded-full blur-3xl" />

              <CardHeader className="relative pb-6">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-3 rounded-2xl bg-gradient-to-br from-fuchsia-500/15 to-orange-500/15 ring-1 ring-border">
                    <HandHeart className="h-6 w-6 text-fuchsia-300" />
                  </div>
                  <CardTitle className="text-3xl font-bold text-foreground">L’indépendance ou rien</CardTitle>
                </div>
              </CardHeader>

              <CardContent className="relative space-y-6 text-muted-foreground">
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
            <h2 className="text-4xl font-bold text-foreground mb-4">Votre impact concret</h2>
            <p className="text-muted-foreground text-lg">Chaque euro compte et finance directement notre travail</p>
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
        <Separator className="bg-border" />
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
            <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-8">Pourquoi on a besoin de vous</h2>

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
              {/* Bouton Retour à l’accueil supprimé */}
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

            <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-6">
              L’Invitation à Coconstruire
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

            <Button
              asChild
              size="lg"
              className="rounded-2xl bg-gradient-to-r from-fuchsia-600 to-orange-500 hover:from-fuchsia-500 hover:to-orange-400 text-white font-bold h-16 px-12 text-lg shadow-[0_12px_36px_rgba(249,115,22,0.35)]"
            >
              <a href={HELLOASSO_URL} target="_blank" rel="noreferrer">
                Faire un don maintenant
              </a>
            </Button>

            <p className="text-muted-foreground text-sm mt-8 italic">
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
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex items-center justify-between px-8 lg:px-12 py-4 w-full max-w-7xl">
        <Link href="/" className="flex items-center gap-3 group">
          <span
            className="text-xl font-extrabold tracking-tight text-foreground uppercase"
            style={{ fontFamily: 'var(--font-barbra)' }}
          >
            SANS TRANSITION
          </span>
        </Link>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Button
            asChild
            size="sm"
            className="whitespace-nowrap rounded-full bg-gradient-to-r from-fuchsia-600 to-orange-500 hover:from-fuchsia-500 hover:to-orange-400 text-white font-semibold px-3 sm:px-4 h-9 text-xs sm:text-sm shadow-[0_8px_20px_rgba(168,85,247,0.25)]"
          >
            <Link href={HELLOASSO_URL} target="_blank" rel="noreferrer">
              Rejoindre la Transition
            </Link>
          </Button>
        </div>
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
      <div className="relative flex items-center gap-3 p-3 rounded-2xl bg-card/60 border border-border overflow-hidden">
        {/* Glow overlay on hover */}
        <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-r from-fuchsia-500/10 via-transparent to-orange-500/10" />

        <div className="relative p-2 bg-card rounded-xl border border-border group-hover:border-border transition-colors">
          <Icon className="h-5 w-5 text-fuchsia-300" />
        </div>
        <span className="relative text-sm text-muted-foreground">{text}</span>
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
      <Card className="group h-full rounded-3xl border border-border bg-card/70 hover:border-fuchsia-500/30 hover:shadow-[0_12px_36px_rgba(168,85,247,0.15)] transition-all duration-300">
        <CardHeader className="pb-4">
          <div className="p-3 bg-fuchsia-500/15 rounded-2xl w-fit mb-3 group-hover:bg-fuchsia-500/25 transition-colors">
            <Target className="h-6 w-6 text-fuchsia-300" />
          </div>
          <CardTitle className="text-xl font-bold text-foreground">{amount}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground leading-relaxed">{desc}</p>
        </CardContent>
      </Card>
    </MotionDiv>
  );
}

function ListItem({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex gap-3">
      <CheckCircle2 className="h-5 w-5 mt-0.5 text-fuchsia-400 flex-shrink-0" />
      <span className="text-muted-foreground leading-relaxed">{children}</span>
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
      <div className="prose max-w-none text-muted-foreground leading-relaxed">{children}</div>
    </MotionDiv>
  );
}

function GradientBG() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0 select-none overflow-hidden"
    >
      {/* motif discret — inversé en light mode */}
      <div className="absolute inset-0 bg-[radial-gradient(transparent_1px,rgba(255,255,255,0.4)_1px)] dark:bg-[radial-gradient(transparent_1px,rgba(0,0,0,0.4)_1px)] [background-size:16px_16px] opacity-[0.12]" />

      {/* halo fuchsia */}
      <div className="absolute top-[-10rem] left-[-10rem] h-[55rem] w-[55rem] rounded-full bg-fuchsia-500/15 blur-[140px]" />

      {/* halo orange */}
      <div className="absolute bottom-[-10rem] right-[-10rem] h-[50rem] w-[50rem] rounded-full bg-orange-500/15 blur-[140px]" />

      {/* léger fondu noir */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-neutral-950 to-transparent" />
    </div>
  );
}
