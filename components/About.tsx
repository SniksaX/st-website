'use client';

import Image from 'next/image';
import { HoverLift } from "@/components/HoverLift";
import { Instagram } from "lucide-react";
import GLI from "@/components/GradientLinkIcon";

// ---- Halo externe (radial gradient), dépasse la carte, couleurs par membre ----
function Halo({
  c1, c2, c3,
}: { c1: string; c2: string; c3: string }) {
  return (
    <div
      className="pointer-events-none absolute -top-16 -left-16 h-64 w-64 opacity-55 blur-3xl mix-blend-plus-lighter z-0"
      style={{
        // halo multi-couleurs qui part du coin haut-gauche
        background: `radial-gradient( circle at 20% 20%,
          ${c1} 0%, ${c1} 38%,
          ${c2} 39%, ${c2} 68%,
          ${c3} 69%, transparent 100%
        )`,
      }}
      aria-hidden
    />
  );
}

// TikTok icon (compatible GLI)
function TikTokIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 256 256" className={className} aria-hidden="true">
      <path
        fill="currentColor"
        d="M224 88.4c-23.6 0-42.8-19.2-42.8-42.8V32h-36.6v132.1c0 19.7-16 35.7-35.7 35.7s-35.7-16-35.7-35.7 16-35.7 35.7-35.7c2.4 0 4.7.2 6.9.7V92.6c-2.3-.3-4.6-.5-6.9-.5-39.8 0-72.2 32.4-72.2 72.2s32.4 72.2 72.2 72.2 72.2-32.4 72.2-72.2v-56c12.1 8.7 26.9 13.9 42.8 13.9v-33.8z"
      />
    </svg>
  );
}

type Member = {
  name: string;
  role: string;
  img: string;
  alt?: string;
  bio?: string;
  tiktok?: string;
  instagram?: string;
  // couleurs du halo (oklch pour rester propre avec ta palette)
  halo: { c1: string; c2: string; c3: string };
};

const team: Member[] = [
  {
    name: 'Hedi',
    role: 'Fondateur · Présentation',
    img: '/hedi.png',
    alt: 'Portrait de Hedi',
    bio: "Créateur de Sans Transition. Ligne claire : radical, pédagogique, zéro bullshit.",
    tiktok: 'hedjient',
    instagram: 'hedjient',
    halo: {
      c1: 'oklch(0.88 0.15 55)',   // orange clair
      c2: 'oklch(0.82 0.17 55)',   // orange medium (centre, ton existant)
      c3: 'oklch(0.72 0.20 55)',   // orange plus foncé
    },
  },
  {
    name: 'Amandine',
    role: 'Chroniqueuse · Féminisme',
    img: '/amandine.png',
    alt: 'Portrait d’Amandine',
    bio: "Regard féministe sur l’actu. Analyses qui claquent, ancrées dans le réel.",
    tiktok: 'carpedine',
    instagram: 'amandine_chbd',
    halo: {
      c1: 'oklch(0.78 0.25 315)',  // violet clair
      c2: 'oklch(0.72 0.27 315)',  // violet medium (centre, ton existant)
      c3: 'oklch(0.62 0.28 315)',  // violet plus foncé
    },
  },
  {
    name: 'Louis',
    role: 'Chroniqueur · Histoire politique',
    img: '/louis.png',
    alt: 'Portrait de Louis',
    bio: "Remet les faits dans le temps long pour comprendre le présent.",
    tiktok: 'louis_bnh',
    instagram: 'louis_bnh',
    halo: {
      c1: 'oklch(0.80 0.16 250)',  // bleu clair
      c2: 'oklch(0.72 0.18 250)',  // bleu medium (centre, ton existant)
      c3: 'oklch(0.62 0.20 250)',  // bleu plus foncé
    },
  },
];



export default function About() {
  return (
    <section
      id="about"
      className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 md:py-16"
    >
      {/* Header */}
      <div className="mb-8">
        <p className="text-[11px] uppercase tracking-[0.18em] text-neutral-400">L’équipe</p>
        <h2 className="mt-1 text-3xl sm:text-4xl font-extrabold tracking-tight leading-tight text-white">
          À propos
        </h2>
        <p className="mt-3 text-neutral-300 max-w-prose leading-tight">
          Sans Transition, c’est une équipe qui mélange exigence éditoriale et sens du beau.
        </p>
      </div>

      {/* Grid */}
      <div className="grid gap-6 items-start sm:grid-cols-2 lg:grid-cols-3">
        {team.map((m) => (
          <HoverLift key={m.name} lift={-3}>
            {/* overflow-visible pour laisser le halo déborder */}
            <article className="relative overflow-visible rounded-2xl border border-neutral-800 bg-neutral-900 p-5 transition-shadow hover:shadow-lg/10">
              {/* HALO EXTERNE : en arrière-plan du contenu de la carte */}
              <Halo c1={m.halo.c1} c2={m.halo.c2} c3={m.halo.c3} />

              {/* Image (au-dessus du halo) */}
              <div className="relative z-10 aspect-[4/5] w-full overflow-hidden rounded-xl border border-neutral-800 bg-black">
                <Image
                  src={m.img}
                  alt={m.alt ?? m.name}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover"
                  priority
                />
              </div>

              {/* Infos */}
              <div className="mt-4 z-10 relative">
                {/* Nom + logos à droite */}
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold tracking-tight text-white">{m.name}</h3>
                  <div className="flex items-center gap-2">
                    {m.tiktok && (
                      <a
                        href={`https://tiktok.com/@${m.tiktok}`}
                        target="_blank"
                        rel="noreferrer"
                        aria-label={`Profil TikTok de ${m.name} (@${m.tiktok})`}
                        className="hover:opacity-90"
                      >
                        <GLI icon={TikTokIcon} className="h-5 w-5" />
                      </a>
                    )}
                    {m.instagram && (
                      <a
                        href={`https://instagram.com/${m.instagram}`}
                        target="_blank"
                        rel="noreferrer"
                        aria-label={`Profil Instagram de ${m.name} (@${m.instagram})`}
                        className="hover:opacity-90"
                      >
                        <GLI icon={Instagram} className="h-5 w-5" />
                      </a>
                    )}
                  </div>
                </div>

                <p className="text-sm text-neutral-400">{m.role}</p>

                {m.bio && (
                  <p className="mt-3 text-sm text-neutral-300 leading-tight max-w-prose">
                    {m.bio}
                  </p>
                )}
              </div>
            </article>
          </HoverLift>
        ))}
      </div>
    </section>
  );
}
