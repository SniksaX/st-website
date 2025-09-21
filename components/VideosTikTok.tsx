'use client';

import React from "react";
import Section from "./Section";
import videos from "@/data/tiktok.json";
import { ChevronLeft, ChevronRight, Play, Eye, Heart, Percent, ArrowUpRight } from "lucide-react";

type OEmbed = { thumbnail_url?: string; title?: string; author_name?: string };

type VideoStatsLocal = {
  id: string;
  title: string;
  views: number;
  likes: number;
  engagementRate: number; // %
};

type TikTokApiItem = {
  tiktok_video_id: string;
  title?: string;
  views?: number | string;
  likes?: number | string;
  comments?: number | string;
  shares?: number | string;
  create_time?: string;
};

const localStatsById: Record<string, VideoStatsLocal> = (videos as VideoStatsLocal[]).reduce((acc, v) => {
  acc[v.id] = v;
  return acc;
}, {} as Record<string, VideoStatsLocal>);

const toNum = (v: unknown) => (v === null || v === undefined || v === "" ? undefined : Number(v));

// normalise un id (retire espaces, garde le plus long groupe de chiffres)
const normalizeId = (v: unknown) => {
  const s = typeof v === "string" ? v : String(v ?? "");
  const m = s.match(/\d{5,}/);
  return (m ? m[0] : s).trim();
};

const uniqNormalize = (arr: unknown[]) => {
  const seen = new Set<string>();
  const out: string[] = [];
  for (const raw of arr) {
    const id = normalizeId(raw);
    if (!id || seen.has(id)) continue;
    seen.add(id);
    out.push(id);
  }
  return out;
};

const erTikTok = (likes?: number, comments?: number, shares?: number, views?: number) => {
  const L = Number(likes ?? 0), C = Number(comments ?? 0), S = Number(shares ?? 0), V = Number(views ?? 0);
  if (!Number.isFinite(V) || V <= 0) return 0;
  return ((L + C + S) / V) * 100;
};

export default function VideosTikTok() {
  const railRef = React.useRef<HTMLDivElement | null>(null);

  const [idList, setIdList] = React.useState<string[]>([]);
  const [thumbs, setThumbs] = React.useState<Record<string, OEmbed | null>>({});
  const [apiStats, setApiStats] = React.useState<
    Record<string, { title?: string; views?: number; likes?: number; comments?: number; shares?: number }>
  >({});
  const [openId, setOpenId] = React.useState<string | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  const nf = React.useMemo(() => new Intl.NumberFormat("fr-FR", { notation: "compact", compactDisplay: "short" }), []);

  // IDs + stats serveur (avec normalisation + déduplication)
  React.useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        setLoading(true);
        const res = await fetch("/api/tiktok-ids", { cache: "no-store" });
        if (!res.ok) throw new Error(`/api/tiktok-ids -> ${res.status}`);
        const data = await res.json();

        const serverStats: Record<string, { title?: string; views?: number; likes?: number; comments?: number; shares?: number }> = {};
        let rawIds: string[] = [];

        if (Array.isArray(data?.ids)) {
          if (typeof data.ids[0] === "string") {
            rawIds = data.ids as string[];
          } else {
            (data.ids as TikTokApiItem[]).forEach((it) => {
              const nid = normalizeId(it.tiktok_video_id);
              if (!nid) return;
              rawIds.push(nid);
              serverStats[nid] = {
                title: it.title,
                views: toNum(it.views),
                likes: toNum(it.likes),
                comments: toNum(it.comments),
                shares: toNum(it.shares),
              };
            });
          }
        }

        const uniq = uniqNormalize(rawIds);
        if (!cancelled) {
          if (!uniq.length) {
            const fallback = uniqNormalize((videos as VideoStatsLocal[]).map((v) => v.id));
            setIdList(fallback);
          } else {
            setIdList(uniq);
          }
          setApiStats(serverStats);
        }
      } catch (e: unknown) {
        if (!cancelled) {
              const msg = e instanceof Error ? e.message : String(e);
          console.error(e);
           setError("");
          setIdList(uniqNormalize((videos as VideoStatsLocal[]).map((v) => v.id)));
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => { cancelled = true; };
  }, []);

  // oEmbed thumbnails via proxy
  React.useEffect(() => {
    let cancelled = false;
    if (idList.length === 0) return;

    const chunk = <T,>(arr: T[], size: number) =>
      Array.from({ length: Math.ceil(arr.length / size) }, (_, i) => arr.slice(i * size, i * size + size));

    (async () => {
      try {
        const maps = await Promise.all(
          chunk(idList, 25).map(async (part) => {
            const r = await fetch(`/api/tiktok-oembed?ids=${encodeURIComponent(part.join(","))}`, { cache: "no-store" });
            const j = await r.json();
            return (j?.map || {}) as Record<string, OEmbed | null>;
          })
        );
        if (!cancelled) {
          const merged: Record<string, OEmbed | null> = {};
          maps.forEach((m) => Object.assign(merged, m));
          setThumbs(merged);
        }
      } catch { /* ignore */ }
    })();

    return () => { cancelled = true; };
  }, [idList]);

  const scrollByCards = (dir: "left" | "right") => {
    const rail = railRef.current;
    if (!rail) return;
    const delta = Math.round(rail.clientWidth * 0.9) * (dir === "left" ? -1 : 1);
    rail.scrollBy({ left: delta, behavior: "smooth" });
  };

  const getCardMeta = (id: string) => {
    const api = apiStats[id] || {};
    const local = localStatsById[id];
    const o = thumbs[id] || undefined;

    const title = api.title || local?.title || o?.title || "Vidéo TikTok";
    const views = api.views ?? local?.views ?? 0;
    const likes = api.likes ?? local?.likes ?? 0;
    const er =
      (api.likes !== undefined || api.comments !== undefined || api.shares !== undefined || api.views !== undefined)
        ? erTikTok(api.likes, api.comments, api.shares, api.views)
        : (typeof local?.engagementRate === "number" ? local.engagementRate : 0);

    return { title, views, likes, engagementRate: er, thumb: o?.thumbnail_url };
  };

  // ajoute une seule tuile "Voir +" en fin de liste
  const renderList = loading
    ? Array.from({ length: 8 }).map((_, i) => `skeleton-${i}`)
    : [...idList, "__SEE_MORE__"];

  return (
    <Section id="videos-tiktok" className="py-14">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">Toutes les vidéos TikTok</h2>
        <div className="hidden sm:flex gap-2">
          <button onClick={() => scrollByCards("left")} className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white">
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button onClick={() => scrollByCards("right")} className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white">
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>

      {error && <p className="text-sm text-red-400 mb-4">{error}</p>}

      <div className="relative">
        <div
          ref={railRef}
          className="flex gap-4 overflow-x-auto pb-2 snap-x snap-mandatory scroll-smooth
                     [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']"
        >
          {renderList.map((id) => {
            const isSkeleton = typeof id !== "string";
            const isSeeMore = id === "__SEE_MORE__";
            const meta = (!isSkeleton && !isSeeMore) ? getCardMeta(id as string) : undefined;

            return (
              <div key={id} className="flex-shrink-0 w-[250px] md:w-[280px] lg:w-[320px] snap-start">
                {isSeeMore ? (
                  <a
                    href="https://www.tiktok.com/@sanstransition"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative block aspect-[9/16] w-full rounded-2xl overflow-hidden border border-neutral-800 bg-neutral-900"
                    aria-label="Voir plus sur TikTok"
                  >
                    <div className="w-full h-full bg-neutral-800" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
                      <span className="text-2xl font-semibold tracking-tight">Voir +</span>
                      <ArrowUpRight className="mt-2 h-6 w-6 opacity-80 group-hover:opacity-100 transition" />
                    </div>
                  </a>
                ) : (
                  <>
                    <button
                      onClick={() => !isSkeleton && setOpenId(id as string)}
                      className="group relative block aspect-[9/16] w-full rounded-2xl overflow-hidden border border-neutral-800 bg-neutral-900"
                      disabled={isSkeleton}
                    >
                      {isSkeleton ? (
                        <div className="w-full h-full animate-pulse bg-neutral-800" />
                      ) : meta?.thumb ? (
                        <img src={meta.thumb} alt={meta.title} className="w-full h-full object-cover" loading="lazy" decoding="async" />
                      ) : (
                        <div className="w-full h-full bg-neutral-800">
                          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                          <div className="absolute inset-0 flex items-end p-3">
                            <p className="text-white/90 text-sm leading-snug line-clamp-3">
                              {meta?.title || "Vidéo TikTok"}
                            </p>
                          </div>
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <Play className="h-12 w-12 text-white/80 group-hover:text-white transition" />
                      </div>
                    </button>

                    <div className="mt-2 rounded-xl border border-neutral-800 bg-neutral-900/60 p-3">
                      <p className="text-[13px] leading-snug text-white line-clamp-2">{meta?.title}</p>
                      <div className="mt-2 flex items-center justify-between text-[11px] text-white/85">
                        <span className="inline-flex items-center gap-1.5"><Eye className="h-3.5 w-3.5" />{nf.format(meta?.views ?? 0)}</span>
                        <span className="inline-flex items-center gap-1.5"><Heart className="h-3.5 w-3.5" />{nf.format(meta?.likes ?? 0)}</span>
                        <span className="inline-flex items-center gap-1.5"><Percent className="h-3.5 w-3.5" />{(meta?.engagementRate ?? 0).toFixed(1)}%</span>
                      </div>
                    </div>
                  </>
                )}
              </div>
            );
          })}
        </div>
      </div>

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
              src={`https://www.tiktok.com/embed/v2/${openId}?autoplay=1&muted=1`}
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
