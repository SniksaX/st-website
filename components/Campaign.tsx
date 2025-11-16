"use client";

import React from "react";
import Link from "next/link";
import Section from "@/components/Section";
import { motion } from "framer-motion";
import { Shield, Users, LockKeyhole, HeartHandshake, ArrowRight } from "lucide-react";
import HelloAssoWidget from "@/components/HelloAssoWidget";
import DonProgress from "@/components/DonProgress";

const DON_URL = "https://www.helloasso.com/associations/sans-transition/formulaires/1";

export default function Campaign() {
  return (
    <Section id="campaign" className="py-16">
      <div className="grid gap-10 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.85fr)_minmax(0,0.85fr)] items-start">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5, ease: [0, 0, 0.2, 1] }}
          className="space-y-6"
        >
          <p className="text-xs sm:text-sm uppercase tracking-[0.25em] text-pink-400/80">
            Campagne de soutien
          </p>
          <h2 className="text-3xl sm:text-[2.6rem] font-extrabold tracking-tight text-white leading-[1.05]">
            La Transition — l&apos;indépendance ou rien.
          </h2>
          <p className="text-base sm:text-lg font-semibold text-pink-300/90 uppercase tracking-[0.2em]">
            1 000 personnes à 2 €/mois = un média qui ne doit rien à personne.
          </p>
          <p className="text-base sm:text-lg leading-relaxed text-neutral-200 max-w-2xl">
            Il y a des médias pour les patrons, d&apos;autres pour les fachos. Sans Transition, c&apos;est un média par
            et pour les minorités — né à Paris en 2025 pour celles et ceux qu&apos;on laisse hors-champ.
          </p>
          <div className="flex flex-wrap gap-2.5 pt-1 text-[13px] text-neutral-100">
            {[
              "Association loi 1901",
              "Financement 100 % citoyen",
              "Pas de pubs, pas de milliardaires",
              "Indépendance par la communauté",
            ].map((label) => (
              <span
                key={label}
                className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-4 py-1.5"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-pink-400" aria-hidden />
                {label}
              </span>
            ))}
          </div>
          <div className="mt-4 space-y-4 text-base sm:text-lg text-neutral-300 max-w-2xl">
            <p>
              En septembre, la monétisation TikTok = <span className="font-semibold text-white">20 €</span>. Vingt euros
              pour un mois de tournages, d&apos;interviews, de montages, de nuits blanches. Ce n&apos;est pas un modèle
              viable.
            </p>
            <p>
              Si ce contenu est gratuit, il n&apos;en est pas moins coûteux. Sans Transition, c&apos;est pas juste un
              média : c&apos;est notre manière de faire de la politique autrement — radicale, queer, féministe,
              accessible.
            </p>
          </div>
          <div className="mt-5 flex flex-wrap items-center gap-3 text-base">
            <motion.a
              href={DON_URL}
              target="_blank"
              rel="noreferrer"
              whileHover={{ y: -2, scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center justify-center rounded-2xl px-6 py-3 text-white font-semibold shadow-lg bg-gradient-to-r from-violet-500 via-fuchsia-500 to-orange-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
            >
              Soutenir (HelloAsso)
              <HeartHandshake className="ml-2 h-5 w-5" />
            </motion.a>
            <Link
              href="/don"
              className="inline-flex items-center gap-2 rounded-2xl border border-white/15 bg-white/5 px-5 py-2.5 text-neutral-100 hover:bg-white/10"
            >
              Faire un don ponctuel
            </Link>
          </div>
          <p className="mt-6 text-sm sm:text-base text-neutral-400 max-w-2xl">
            Soutenir Sans Transition, ce n&apos;est pas « donner » : c&apos;est prendre parti. Chaque euro protège une
            parole libre et permet au contenu de rester en accès libre.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, ease: [0, 0, 0.2, 1] }}
          className="space-y-5"
        >
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 shadow-[0_14px_45px_-28px_rgba(0,0,0,0.9)]">
            <p className="text-xs uppercase tracking-[0.18em] text-neutral-400 mb-2">
              Pourquoi Sans Transition a besoin de toi
            </p>
            <dl className="space-y-4 text-sm sm:text-base text-neutral-100">
              <div className="flex gap-3">
                <div className="mt-1 flex h-9 w-9 items-center justify-center rounded-xl bg-pink-500/15 text-pink-300">
                  <Shield className="h-4 w-4" />
                </div>
                <div>
                  <dt className="font-semibold">Production radicale</dt>
                  <dd className="text-xs sm:text-sm text-neutral-300">
                    Tu finances tournages, montages, reportages, pour raconter les luttes depuis l&apos;intérieur, pas
                    depuis les plateaux télé.
                  </dd>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="mt-1 flex h-9 w-9 items-center justify-center rounded-xl bg-violet-500/15 text-violet-300">
                  <Users className="h-4 w-4" />
                </div>
                <div>
                  <dt className="font-semibold">Communauté organisée</dt>
                  <dd className="text-xs sm:text-sm text-neutral-300">
                    Modération, espaces sûrs, outils pédagogiques, Discord et ressources pour tenir sur la durée. De
                    « merci l&apos;algo » à merci la commu.
                  </dd>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="mt-1 flex h-9 w-9 items-center justify-center rounded-xl bg-orange-500/15 text-orange-300">
                  <LockKeyhole className="h-4 w-4" />
                </div>
                <div>
                  <dt className="font-semibold">Autonomie totale</dt>
                  <dd className="text-xs sm:text-sm text-neutral-300">
                    Salaires dignes, charges, matériel, sécurité numérique. L&apos;indépendance se finance, sinon elle
                    n&apos;existe pas.
                  </dd>
                </div>
              </div>
            </dl>
            <p className="mt-4 text-[12px] text-neutral-400">
              La Transition, c&apos;est le passage collectif de la survie à l&apos;indépendance.{" "}
              <span className="font-semibold text-neutral-100">1 000 personnes à 2 €/mois</span>, et on ne doit rien à
              aucun milliardaire.
            </p>
          </div>
          <div className="rounded-2xl border border-neutral-800 bg-neutral-950/80 px-5 py-5 space-y-3">
            <p className="text-[11px] uppercase tracking-[0.18em] text-neutral-400">
              Rejoindre les 1000
            </p>
            <p className="text-base text-neutral-200">
              On vit une époque où soit tu te tais, soit tu t&apos;organises. Nous, on a choisi : on
              s&apos;organise. Deviens l&apos;une des 1 000 personnes qui feront la différence.
            </p>
            <Link
              href="/don"
              className="inline-flex items-center gap-1 text-sm font-semibold text-neutral-50 link-animated"
              data-text="Voir la page dons complète"
            >
              <span>Voir la page dons complète </span>
              <ArrowRight className="h-4 w-4 inline-block align-middle" />
            </Link>
            <p className="text-[11px] text-neutral-500 italic">
              &quot;Soutenir Sans Transition, ce n&apos;est pas donner : c&apos;est prendre parti. C&apos;était Hedji
              pour ST. Bisous mes vies.&quot;
            </p>
          </div>
          <DonProgress goal={1000} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, ease: [0, 0, 0.2, 1] }}
          className="space-y-5"
        >
          <HelloAssoWidget />
        </motion.div>
      </div>
    </Section>
  );
}
