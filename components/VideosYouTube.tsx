'use client';
import React from 'react';
import Section from './Section';

export default function VideosYouTube() {
  return (
    // ↑ on force la section au-dessus du halo (z-10) et on crée un stacking context (isolate)
    <Section id="videos-youtube" className="py-14 relative z-10 isolate">
      <div className="flex items-end justify-between mb-8">
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">Vidéos YouTube</h2>
        <a
          href="https://youtube.com/@SansTransitionMedia/videos"
          target="_blank"
          rel="noreferrer"
          className="text-sm text-neutral-300 hover:text-white"
        >
          Tout voir
        </a>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {[
          'https://www.youtube.com/embed/6S5YPk-GIng?si=3xTIzIKRmtY8HZUK',
          'https://www.youtube.com/embed/V7d_6ePKy6E?si=NEjPueXjDNgO0GAZ',
        ].map((src, i) => (
          // bg-black + position relative pour un z correct au sein de la section
          <div key={i} className="relative z-10 aspect-video rounded-3xl overflow-hidden border border-neutral-900 bg-black">
            <iframe
              className="absolute inset-0 h-full w-full"
              src={src}
              title={`ST videos ${i + 1}`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </div>
        ))}
      </div>
    </Section>
  );
}
