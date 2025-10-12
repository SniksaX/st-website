'use client';

import React from 'react';
import Section from './Section';
import { ChevronLeft, ChevronRight, Play, Eye, Heart, Percent, ArrowUpRight } from 'lucide-react';

type OEmbed = { thumbnail_url?: string; title?: string; author_name?: string };

type JsonItem = {
  id: string;
  title?: string;
  views?: number;
  likes?: number;
  comments?: number;
  shares?: number;
  engagementRate?: number;
  date?: string; // ISO
};

// chemin du fichier dans /public
const FILE_URL = '/json.txt';

const toNum = (v: unknown) =>
  v === null || v === undefined || v === '' ? undefined : Number(v);

// garde le plus long groupe de chiffres (sécurise les IDs TikTok)
const normalizeId = (v: unknown) => {
  const s = typeof v === 'string' ? v : String(v ?? '');
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
  const L = Number(likes ?? 0),
    C = Number(comments ?? 0),
    S = Number(shares ?? 0),
    V = Number(views ?? 0);
  if (!Number.isFinite(V) || V <= 0) return 0;
  return ((L + C + S) / V) * 100;
};

export default function VideosTikTok() {
  const railRef = React.useRef<HTMLDivElement | null>(null);

  const [idList, setIdList] = React.useState<string[]>([]);
  const [thumbs, setThumbs] = React.useState<Record<string, OEmbed | null>>({});
  const [apiStats, setApiStats] = React.useState<
    Record<string, { title?: string; views?: number; likes?: number; comments?: number; shares?: number; er?: number }>
  >({});
  const [openId, setOpenId] = React.useState<string | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  const nf = React.useMemo(
    () => new Intl.NumberFormat('fr-FR', { notation: 'compact', compactDisplay: 'short' }),
    []
  );

  // 1) Lire les données depuis /public/json.txt
  React.useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        setLoading(true);
        setError(null);

        const res = await fetch(FILE_URL, { cache: 'no-store' });
        if (!res.ok) {
          const txt = await res.text().catch(() => '');
          throw new Error(`${FILE_URL} -> ${res.status} ${txt}`);
        }

        // support .txt contenant du JSON
        const text = await res.text();
        let data: unknown;
        try {
          data = JSON.parse(text);
        } catch {
          // si jamais le txt a un BOM/garbage, on tente un trim
          data = JSON.parse(text.trim());
        }

        if (!Array.isArray(data)) {
          throw new Error('Le fichier ne contient pas un tableau JSON valide.');
        }

        // on trie par date décroissante si dispo
        const items = (data as JsonItem[]).slice().sort((a, b) => {
          const da = a?.date ? new Date(a.date).getTime() : 0;
          const db = b?.date ? new Date(b.date).getTime() : 0;
          return db - da;
        });

        const stats: Record<
          string,
          { title?: string; views?: number; likes?: number; comments?: number; shares?: number; er?: number }
        > = {};
        const rawIds: string[] = [];

        for (const it of items) {
          const nid = normalizeId(it?.id);
          if (!nid) continue;
          rawIds.push(nid);
          const views = toNum(it?.views);
          const likes = toNum(it?.likes);
          const comments = toNum(it?.comments);
          const shares = toNum(it?.shares);
          const er =
            typeof it?.engagementRate === 'number'
              ? it.engagementRate
              : erTikTok(likes, comments, shares, views);

          stats[nid] = {
            title: it?.title,
            views,
            likes,
            comments,
            shares,
            er,
          };
        }

        const uniq = uniqNormalize(rawIds);

        if (!cancelled) {
          setIdList(uniq);
          setApiStats(stats);
        }
      } catch (e: unknown) {
        if (!cancelled) {
          const msg = e instanceof Error ? e.message : String(e);
          console.error(msg);
          setError(msg);
          setIdList([]); // pas d'IDs si lecture KO
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  // 2) oEmbed thumbnails via proxy (on conserve le mécanisme)
  React.useEffect(() => {
    let cancelled = false;
    if (idList.length === 0) return;

    const chunk = <T,>(arr: T[], size: number) =>
      Array.from({ length: Math.ceil(arr.length / size) }, (_, i) => arr.slice(i * size, i * size + size));

    (async () => {
      try {
        const maps = await Promise.all(
          chunk(idList, 25).map(async (part) => {
            const r = await fetch(`/api/tiktok-oembed?ids=${encodeURIComponent(part.join(','))}`, {
              cache: 'no-store',
            });
            if (!r.ok) return {};
            const j = await r.json();
            return (j?.map || {}) as Record<string, OEmbed | null>;
          })
        );
        if (!cancelled) {
          const merged: Record<string, OEmbed | null> = {};
          maps.forEach((m) => Object.assign(merged, m));
          setThumbs(merged);
        }
      } catch {
        // silencieux, on rendra quand même avec titres/stats
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [idList]);

  const scrollByCards = (dir: 'left' | 'right') => {
    const rail = railRef.current;
    if (!rail) return;
    const delta = Math.round(rail.clientWidth * 0.9) * (dir === 'left' ? -1 : 1);
    rail.scrollBy({ left: delta, behavior: 'smooth' });
  };

  const getCardMeta = (id: string) => {
    const api = apiStats[id] || {};
    const o = thumbs[id] || undefined;
    const title = api.title || o?.title || 'Vidéo TikTok';
    const views = api.views ?? 0;
    const likes = api.likes ?? 0;
    const er =
      typeof api.er === 'number'
        ? api.er
        : erTikTok(api.likes, api.comments, api.shares, api.views);

    return { title, views, likes, engagementRate: er, thumb: o?.thumbnail_url };
  };

  const renderList: (string | null)[] = loading ? Array.from({ length: 8 }).map(() => null) : [...idList, '__SEE_MORE__'];

  return (
    <Section id="videos-tiktok" className="py-14">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">Toutes les vidéos TikTok</h2>
        <div className="hidden sm:flex items-center gap-2">
          <a
            href="https://www.tiktok.com/@sanstransition"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-3 h-9 text-sm text-white hover:bg-white/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" className="h-4 w-4 fill-white" aria-hidden>
              <path d="M224 88.4c-23.6 0-42.8-19.2-42.8-42.8V32h-36.6v132.1c0 19.7-16 35.7-35.7 35.7s-35.7-16-35.7-35.7 16-35.7 35.7-35.7c2.4 0 4.7.2 6.9.7V92.6c-2.3-.3-4.6-.5-6.9-.5-39.8 0-72.2 32.4-72.2 72.2S70.4 236.5 110.2 236.5c39.8 0 72.2-32.4 72.2-72.2v-56c12.1 8.7 26.9 13.9 42.8 13.9v-33.8z" />
            </svg>
            <span>Suivre sur TikTok</span>
          </a>
          <button onClick={() => scrollByCards('left')} className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white">
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button onClick={() => scrollByCards('right')} className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white">
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>

      {error && <p className="text-sm text-red-400 mb-4 break-all">{error}</p>}

      <div className="relative">
        <div
          ref={railRef}
          className="flex gap-4 overflow-x-auto pb-2 snap-x snap-mandatory scroll-smooth [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']"
        >
          {renderList.map((id, i) => {
            const isSkeleton = id === null;
            const isSeeMore = id === '__SEE_MORE__';
            const key = isSkeleton ? `skeleton-${i}` : (id as string);
            const meta = !isSkeleton && !isSeeMore ? getCardMeta(id as string) : undefined;

            return (
              <div key={key} className="flex-shrink-0 w-[250px] md:w-[280px] lg:w-[320px] snap-start">
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
                              {meta?.title || 'Vidéo TikTok'}
                            </p>
                          </div>
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <Play className="h-12 w-12 text-white/80 group-hover:text-white transition" />
                      </div>
                    </button>

                    {!isSkeleton && (
                      <div className="mt-2 rounded-xl border border-neutral-800 bg-neutral-900/60 p-3">
                        <p className="text-[13px] leading-snug text-white line-clamp-2">{meta?.title}</p>
                        <div className="mt-2 flex items-center justify-between text-[11px] text-white/85">
                          <span className="inline-flex items-center gap-1.5">
                            <Eye className="h-3.5 w-3.5" />
                            {nf.format(meta?.views ?? 0)}
                          </span>
                          <span className="inline-flex items-center gap-1.5">
                            <Heart className="h-3.5 w-3.5" />
                            {nf.format(meta?.likes ?? 0)}
                          </span>
                          <span className="inline-flex items-center gap-1.5">
                            <Percent className="h-3.5 w-3.5" />
                            {(meta?.engagementRate ?? 0).toFixed(1)}%
                          </span>
                        </div>
                      </div>
                    )}
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
