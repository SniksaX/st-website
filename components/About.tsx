'use client';

import Image from 'next/image';

type Member = {
  name: string;
  role: string;
  img: string; // path in /public
  alt?: string;
  bio?: string;
};

const team: Member[] = [
  {
    name: 'Hedi',
    role: 'Fondateur · Présentation',
    img: '/hedi.png',
    alt: 'Portrait de Hedi',
    bio: "Créateur de Sans Transition. Ligne claire : radical, pédagogique, zéro bullshit.",
  },
  {
    name: 'Amandine',
    role: 'Chroniqueuse · Féminisme',
    img: '/amandine.png',
    alt: 'Portrait d’Amandine',
    bio: "Regard féministe sur l’actu. Analyses qui claquent, ancrées dans le réel.",
  },
  {
    name: 'Louis',
    role: 'Chroniqueur · Histoire politique',
    img: '/louis.png',
    alt: 'Portrait de Louis',
    bio: "Remet les faits dans le temps long pour comprendre le présent.",
  },
];

export default function About() {
  return (
    <section id="about" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 md:py-16">
      {/* Label + title */}
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
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {team.map((m) => (
          <article
            key={m.name}
            className="rounded-2xl border border-neutral-800 bg-neutral-900 p-5 transition"
          >
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-xl border border-neutral-800 bg-black">
              <Image
                src={m.img}
                alt={m.alt ?? m.name}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover"
                priority
              />
            </div>

            <div className="mt-4">
              <h3 className="text-xl font-bold tracking-tight text-white">{m.name}</h3>
              <p className="text-sm text-neutral-400">{m.role}</p>
              {m.bio && (
                <p className="mt-3 text-sm text-neutral-300 leading-tight max-w-prose">{m.bio}</p>
              )}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
