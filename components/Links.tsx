"use client";

import React from "react";
import { motion } from "framer-motion";
import Section from "./Section";
import {
  Link as LinkIcon,
  Instagram,
  Youtube,
  Twitter,
  Globe,
  Heart,
  Send,
  FileText,
  Newspaper,
  Mail,
  Download,
} from "lucide-react";

export default function Links() {
  const networks = [
    { label: "TikTok", href: "https://tiktok.com/@sanstransition", icon: Globe },
    { label: "Instagram", href: "https://instagram.com/sanstransition__", icon: Instagram },
    { label: "X (Twitter)", href: "https://x.com/sanstransition_", icon: Twitter },
    { label: "YouTube", href: "https://youtube.com/@SansTransitionMedia", icon: Youtube },
  ];

  const resources = [
    {
      label: "Kit média (PDF)",
      href: "/Sans Transition – Kit Média Septembre 2025.pdf",
      download: true,
    },
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

      <div className="grid grid-cols-12 gap-4 items-start">
        {/* Cagnottes & soutien */}
        <motion.aside
          whileHover={{ y: -2 }}
          className="col-span-12 lg:col-span-4 rounded-2xl overflow-hidden bg-gradient-to-br from-pink-600 via-fuchsia-600 to-indigo-600 p-[1px]"
        >
          <div className="h-full w-full rounded-2xl bg-neutral-950/80 backdrop-blur-md border border-white/10 p-5">
            <div className="flex items-center gap-3 mb-3">
              <div className="h-9 w-9 grid place-items-center rounded-xl bg-white/10">
                <Heart className="h-4 w-4 text-white" />
              </div>
              <h3 className="text-lg font-bold text-white">Cagnottes & soutien</h3>
            </div>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="https://gofund.me/6e217b10a"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg bg-white/10 px-3 py-2 text-white hover:bg-white/20 transition-colors"
                >
                  🚨 Aidez Abood
                </a>
              </li>
              <li>
                <a
                  href="https://gofund.me/ed90a35c6"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg bg-white/10 px-3 py-2 text-white hover:bg-white/20 transition-colors"
                >
                  🚨 Aidez Elodie
                </a>
              </li>
            </ul>
          </div>
        </motion.aside>

        {/* Réseaux */}
        <div className="col-span-12 lg:col-span-8 space-y-4">
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

          {/* Contact sous Réseaux */}
          <section className="rounded-2xl bg-neutral-950/80 border border-neutral-800 p-4 flex items-center justify-between text-sm">
            <span className="flex items-center gap-2 text-white font-semibold">
              <Mail className="h-4 w-4 text-pink-400" /> Contact
            </span>
            <a
              href="mailto:contact@sanstransition.fr"
              className="text-neutral-300 hover:text-pink-400"
            >
              contact@sanstransition.fr
            </a>
          </section>
        </div>

        {/* Formulaires */}
        <section className="col-span-12 md:col-span-4 rounded-2xl bg-neutral-950/80 border border-neutral-800 p-4 mt-0">
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

        {/* Ressources */}
        <section className="col-span-12 md:col-span-4 rounded-2xl bg-neutral-950/80 border border-neutral-800 p-4 mt-0">
          <h4 className="flex items-center gap-2 font-semibold text-white mb-2 text-sm">
            <FileText className="h-4 w-4 text-pink-400" /> Ressources & docs
          </h4>
          <ul className="grid grid-cols-2 gap-1 text-xs text-neutral-300">
            {resources.map((r) => (
              <li key={r.label}>
                <a
                  href={r.href}
                  {...(r.download ? { download: true } : {})}
                  className="hover:text-pink-400"
                >
                  {r.label}
                </a>
              </li>
            ))}
          </ul>
        </section>

        {/* Presse */}
        <section className="col-span-12 md:col-span-4 rounded-2xl bg-neutral-950/80 border border-neutral-800 p-4 mt-0">
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
    </Section>
  );
}