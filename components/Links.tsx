'use client';

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link as LinkIcon } from "lucide-react";
import Section from "./Section";

export default function Links() {
  const categories = [
    {
      category: "Réseaux",
      links: [
        { label: "TikTok", href: "https://tiktok.com/@sanstransition" },
        { label: "Instagram", href: "https://instagram.com/sanstransition__" },
        { label: "X (Twitter)", href: "https://x.com/sanstransition_" },
        { label: "YouTube", href: "https://youtube.com/@SansTransitionMedia" },
      ],
    },
    {
      category: "Cagnottes & soutien",
      links: [
        //{ label: "Faire un don (HelloAsso)", href: "#" },
        { label: "Aidez Abood", href: "https://gofund.me/6e217b10a" },
        { label: "Aidez Elodie", href: "https://gofund.me/ed90a35c6" },
      ],
    },
    {
      category: "Formulaires & témoignages",
      links: [
        { label: "Proposer un témoignage ou un sujet", href: "https://forms.gle/yoHVL6iKBi6Adz8T9" },
        //{ label: "Contact presse", href: "#contact" },
      ],
    },
    {
      category: "Ressources & docs",
      links: [
        //{ label: "Manifeste éditorial", href: "#" },
        { label: "Kit média (PDF)",
          href: "/Sans Transition – Kit Média Septembre 2025.pdf",
          download: true, },
        //{ label: "Mentions légales & CGU", href: "#" },
      ],
    },
    {
      category: "Presse & apparitions",
      links: [
        //{ label: "Dossier de presse (PDF)", href: "#" },
        { label: "Oeil de MouMou", href: "https://www.youtube.com/watch?v=qabhFKNW2xM" },
        { label: "Syntaxe Sociale", href: "https://www.youtube.com/watch?v=hUI88ZLf8YI" },
        //{ label: "Contacts presse", href: "#" },
      ],
    },
    {
      category: "Contacts utiles",
      links: [
        { label: "contact@sanstransition.fr", href: "mailto:contact@sanstransition.fr" },
        //{ label: "Signalements / droits d'auteur", href: "#" },
        //{ label: "Partenariats éditoriaux", href: "#" },
      ],
    },
  ];

  return (
    <Section id="liens" className="py-14">
      <div className="flex items-end justify-between mb-8">
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">Liens utiles</h2>
        <span className="text-xs text-neutral-300">réseaux • cagnottes • ressources</span>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map(({ category, links }) => (
          <Card key={category} className="bg-neutral-950 border-neutral-900 rounded-3xl">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="h-9 w-9 grid place-items-center rounded-2xl bg-neutral-900">
                  <LinkIcon className="h-4 w-4 text-white" />
                </div>
                <CardTitle className="tracking-tight text-white">{category}</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm">
                {links.map(({ label, href }) => (
                  <li key={label}>
                    <a
                      href={href}
                      target="_blank"
                      rel="noreferrer"
                      className="text-white hover:underline"
                    >
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>
    </Section>
  );
}
