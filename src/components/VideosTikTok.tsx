'use client';

import React from "react";
import Section from "./Section";
import videos from "@/data/tiktok.json";
import { ChevronLeft, ChevronRight, Play, Eye, Heart, Percent } from "lucide-react";

type OEmbed = { thumbnail_url?: string; title?: string; author_name?: string };

export default function VideosTikTok() {
  const railRef = React.useRef<HTMLDivElement | null>(null);
  const [thumbs, setThumbs] = React.useState<Record<string, OEmbed>>({});
  const [openId, setOpenId] = React.useState<string | null>(null);

  const nf = React.useMemo(
    () => new Intl.NumberFormat("fr-FR", { notation: "compact", compactDisplay: "short" }),
    []
  );

  // fetch thumbnails
  React.useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const results = await Promise.all(
          videos.map(async (v) => {
            const url = `https://www.tiktok.com/oembed?url=https://www.tiktok.com/@sanstransition/video/${v.id}`;
            const res = await fetch(url, { cache: "no-store" });
            const data = (await res.json()) as OEmbed;
            return [v.id, data] as const;
          })
        );
        if (!cancelled) {
          const map: Record<string, OEmbed> = {};
          results.forEach(([id, data]) => (map[id] = data));
          setThumbs(map);
        }
      } catch {/* ignore */}
    })();
    return () => { cancelled = true; };
  }, []);

  const scrollByCards = (dir: "left" | "right") => {
    const rail = railRef.current;
    if (!rail) return;
    const delta = Math.round(rail.clientWidth * 0.9) * (dir === "left" ? -1 : 1);
    rail.scrollBy({ left: delta, behavior: "smooth" });
  };

  return (
    <Section id="videos-tiktok" className="py-14">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
          Toutes les vidéos TikTok
        </h2>
        <div className="hidden sm:flex gap-2">
          <button onClick={() => scrollByCards("left")} className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white">
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button onClick={() => scrollByCards("right")} className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white">
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Rail avec scrollbar masquée */}
      <div className="relative">
        <div
          ref={railRef}
          className="flex gap-4 overflow-x-auto pb-2 snap-x snap-mandatory scroll-smooth
                     [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']"
        >
          {videos.map((video) => {
            const meta = thumbs[video.id];
            return (
              <div key={video.id} className="flex-shrink-0 w-[250px] md:w-[280px] lg:w-[320px] snap-start">
                <button
                  onClick={() => setOpenId(video.id)}
                  className="group relative block aspect-[9/16] w-full rounded-2xl overflow-hidden border border-neutral-800 bg-neutral-900"
                >
                  {meta?.thumbnail_url ? (
                    <img
                      src={meta.thumbnail_url}
                      alt={meta?.title || video.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full animate-pulse bg-neutral-800" />
                  )}

                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <Play className="h-12 w-12 text-white/80 group-hover:text-white transition" />
                  </div>
                </button>

                {/* Zone texte + stats */}
                <div className="mt-2 rounded-xl border border-neutral-800 bg-neutral-900/60 p-3">
                  <p className="text-[13px] leading-snug text-white line-clamp-2">{video.title}</p>
                  <div className="mt-2 flex items-center justify-between text-[11px] text-white/85">
                    <span className="inline-flex items-center gap-1.5"><Eye className="h-3.5 w-3.5" />{nf.format(video.views)}</span>
                    <span className="inline-flex items-center gap-1.5"><Heart className="h-3.5 w-3.5" />{nf.format(video.likes)}</span>
                    <span className="inline-flex items-center gap-1.5"><Percent className="h-3.5 w-3.5" />{video.engagementRate.toFixed(1)}%</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Modal TikTok */}
      {openId && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center"
          onClick={() => setOpenId(null)}
        >
          <div
            className="relative w-[min(92vw,420px)] max-h-[88vh] rounded-3xl overflow-hidden border border-neutral-800 bg-black"
            onClick={(e) => e.stopPropagation()}
          >
            <iframe
              src={`https://www.tiktok.com/embed/${openId}?autoplay=1&muted=1`}
              allow="autoplay; fullscreen; encrypted-media; picture-in-picture; clipboard-write"
              allowFullScreen
              className="w-full h-[min(80vh,720px)] aspect-[9/16] bg-black"
            />
            <button
              onClick={() => setOpenId(null)}
              className="absolute top-3 right-3 text-white/80 hover:text-white text-2xl"
              aria-label="Fermer"
            >
              ×
            </button>
          </div>
        </div>
      )}
    </Section>
  );
}
