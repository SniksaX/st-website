'use client';

import React from 'react';
// Using native <img> to avoid remote image config issues

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

function normalizeId(v: unknown) {
  const s = typeof v === 'string' ? v : String(v ?? '');
  const m = s.match(/\d{5,}/);
  return (m ? m[0] : s).trim();
}

function uniqNormalize(arr: unknown[]) {
  const seen = new Set<string>();
  const out: string[] = [];
  for (const raw of arr) {
    const id = normalizeId(raw);
    if (!id || seen.has(id)) continue;
    seen.add(id);
    out.push(id);
  }
  return out;
}

function shuffle<T>(arr: T[]) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function FacesMosaic({ fileUrl = '/json_don.txt', variant = 'default' }: { fileUrl?: string; variant?: 'default' | 'background' | 'static' }) {
  const [ids, setIds] = React.useState<string[]>([]);
  const [thumbs, setThumbs] = React.useState<Record<string, OEmbed | null>>({});
  const [openId, setOpenId] = React.useState<string | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);
  const scrollerRef = React.useRef<HTMLDivElement | null>(null);
  const segmentRef = React.useRef<HTMLDivElement | null>(null);
  const slideRef = React.useRef<HTMLDivElement | null>(null);
  const paused = React.useRef(false);

  React.useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        setLoading(true);
        const res = await fetch(fileUrl, { cache: 'no-store' });
        if (!res.ok) throw new Error(`${fileUrl} -> ${res.status}`);
        const text = await res.text();
        let data: unknown;
        try {
          data = JSON.parse(text);
        } catch {
          data = JSON.parse(text.trim());
        }
        if (!Array.isArray(data)) throw new Error('Fichier JSON invalide');

        const items = (data as JsonItem[]).slice().sort((a, b) => {
          const da = a?.date ? new Date(a.date).getTime() : 0;
          const db = b?.date ? new Date(b.date).getTime() : 0;
          return db - da;
        });
        const rawIds = items.map((i) => i?.id).filter(Boolean) as string[];
        const uniq = uniqNormalize(rawIds);
        const randomized = shuffle(uniq);
        if (!cancelled) setIds(randomized);
      } catch (e: unknown) {
        if (!cancelled) setError(e instanceof Error ? e.message : String(e));
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [fileUrl]);

  React.useEffect(() => {
    let cancelled = false;
    if (ids.length === 0) return;
    const chunk = <T,>(arr: T[], size: number) =>
      Array.from({ length: Math.ceil(arr.length / size) }, (_, i) => arr.slice(i * size, i * size + size));
    (async () => {
      try {
        const maps = await Promise.all(
          chunk(ids, 25).map(async (part) => {
            const r = await fetch(`/api/tiktok-oembed?ids=${encodeURIComponent(part.join(','))}`, { cache: 'no-store' });
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
        // silencieux
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [ids]);

  const renderList: (string | null)[] = loading ? Array.from({ length: 12 }).map(() => null) : ids;

  // Auto défilement vers la droite (boucle infinie) — grille 3 lignes avec span
  React.useEffect(() => {
    if (variant === 'static') return; // pas d'animation pour la version statique
    let raf = 0;
    let last: number | null = null;
    const speed = variant === 'background' ? 0.012 : 0.12; // px/ms plus lent pour plus de confort visuel

    const tick = (t: number) => {
      if (last == null) last = t;
      const dt = t - last;
      last = t;
      const seg = segmentRef.current;
      if (!seg || paused.current) {
        raf = requestAnimationFrame(tick);
        return;
      }

      if (variant === 'background') {
        // translate the whole rail instead of scrollLeft
        const rail = slideRef.current;
        const el = scrollerRef.current;
        if (rail && el) {
          const w = seg.offsetWidth || 0;
          const current = parseFloat(rail.dataset.offset || '0');
          let next = current + dt * speed;
          if (w > 0 && next >= w) next -= w;
          rail.dataset.offset = String(next);
          rail.style.transform = `translateX(${-next}px)`;
        }
      } else {
        const el = scrollerRef.current;
        if (el) {
          el.scrollLeft += dt * speed;
          const w = seg.offsetWidth || 0;
          if (w > 0 && el.scrollLeft >= w) {
            el.scrollLeft -= w;
          }
        }
      }
      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [renderList.length, variant]);

  const handleMouseEnter = () => {
    if (variant === 'background') return;
    paused.current = true;
  };
  const handleMouseLeave = () => {
    if (variant === 'background') return;
    paused.current = false;
  };

  // Prépare la liste statique (utilisée si variant === 'static')
  const staticItems = React.useMemo(() => ids.filter((id) => !!thumbs[id]?.thumbnail_url), [ids, thumbs]);

  // Rendu mosaïque statique irrégulière via sous-composant (évite hooks conditionnels)
  if (variant === 'static') {
    return <StaticMosaic items={staticItems} thumbs={thumbs} openId={openId} onOpen={(id) => setOpenId(id)} onClose={() => setOpenId(null)} />;
  }

  return (
    <>
      {error && <p className="text-sm text-red-400 mb-4 break-all">{error}</p>}

      <div
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        ref={scrollerRef}
        className={`relative ${variant === 'background' ? 'overflow-x-hidden' : 'overflow-x-auto'} [scrollbar-width:'none'] [-ms-overflow-style:'none'] [&::-webkit-scrollbar]:hidden`}
      >
        <div className="flex items-start gap-6 will-change-transform" ref={slideRef}>
          {/* segment A */}
          <div ref={segmentRef} className="grid grid-flow-col gap-3"
               style={{ gridTemplateRows: 'repeat(3, var(--tile))', gridAutoColumns: 'var(--tile)', ...( { ['--tile']: 'clamp(110px, 12vw, 200px)' } as unknown as React.CSSProperties) }}>
            {renderList.map((id, i) => {
              const isSkeleton = id === null;
              const key = isSkeleton ? `sk-a-${i}` : `a-${id}`;
              const thumb = !isSkeleton ? thumbs[id as string]?.thumbnail_url : undefined;
              const title = !isSkeleton ? thumbs[id as string]?.title || 'Vidéo TikTok' : '';
              const span2 = !isSkeleton && i % 9 === 0; // un élément sur 9 environ
              return (
                <div
                  key={key}
                  className={`relative rounded-2xl overflow-hidden ${variant === 'default' ? 'border border-border bg-card' : ''} ${span2 ? 'row-span-2' : ''}`}
                >
                  {isSkeleton ? (
                    <div className="w-full h-full animate-pulse bg-muted" />
                  ) : thumb ? (
                    <img src={thumb} alt={title} className="w-full h-full object-cover" loading="lazy" decoding="async" />
                  ) : (
                    <div className="w-full h-full bg-muted" />
                  )}
                  {variant === 'default' && (
                    <button
                      onClick={() => !isSkeleton && setOpenId(id as string)}
                      className="absolute inset-0 bg-black/0 hover:bg-black/5 transition cursor-pointer focus:outline-none focus:ring-2 focus:ring-ring/50"
                      aria-label="Lire la vidéo"
                      disabled={isSkeleton}
                    />
                  )}
                </div>
              );
            })}
          </div>

          {/* segment B (duplication pour la boucle) */}
          <div className="grid grid-flow-col gap-3"
               style={{ gridTemplateRows: 'repeat(3, var(--tile))', gridAutoColumns: 'var(--tile)', ...( { ['--tile']: 'clamp(110px, 12vw, 200px)' } as unknown as React.CSSProperties) }}>
            {renderList.map((id, i) => {
              const isSkeleton = id === null;
              const key = isSkeleton ? `sk-b-${i}` : `b-${id}`;
              const thumb = !isSkeleton ? thumbs[id as string]?.thumbnail_url : undefined;
              const title = !isSkeleton ? thumbs[id as string]?.title || 'Vidéo TikTok' : '';
              const span2 = !isSkeleton && i % 9 === 0;
              return (
                <div
                  key={key}
                  className={`relative rounded-2xl overflow-hidden ${variant === 'default' ? 'border border-border bg-card' : ''} ${span2 ? 'row-span-2' : ''}`}
                >
                  {isSkeleton ? (
                    <div className="w-full h-full animate-pulse bg-muted" />
                  ) : thumb ? (
                    <img src={thumb} alt={title} className="w-full h-full object-cover" loading="lazy" decoding="async" />
                  ) : (
                    <div className="w-full h-full bg-muted" />
                  )}
                  {variant === 'default' && (
                    <button
                      onClick={() => !isSkeleton && setOpenId(id as string)}
                      className="absolute inset-0 bg-black/0 hover:bg-black/5 transition cursor-pointer focus:outline-none focus:ring-2 focus:ring-ring/50"
                      aria-label="Lire la vidéo"
                      disabled={isSkeleton}
                    />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {variant === 'default' && openId && (
        <div
          className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center"
          onClick={() => setOpenId(null)}
        >
          <div
            className="relative w-[min(92vw,420px)] max-h-[88vh] rounded-3xl overflow-hidden border border-border bg-card shadow-[0_20px_60px_rgba(0,0,0,0.5)]"
            onClick={(e) => e.stopPropagation()}
          >
            <iframe
              src={`https://www.tiktok.com/embed/v2/${openId}?autoplay=1&muted=1`}
              allow="autoplay; fullscreen; encrypted-media; picture-in-picture; clipboard-write"
              allowFullScreen
              className="w-full h-[min(80vh,720px)] aspect-[9/16] bg-card"
            />
            <button
              onClick={() => setOpenId(null)}
              className="absolute top-3 right-3 text-muted-foreground hover:text-foreground text-2xl"
              aria-label="Fermer"
            >
              ×
            </button>
          </div>
        </div>
      )}
    </>
  );
}

// Static irregular mosaic (top-level component)
function StaticMosaic({ items, thumbs, openId, onOpen, onClose }: { items: string[]; thumbs: Record<string, OEmbed | null>; openId: string | null; onOpen: (id: string) => void; onClose: () => void }) {
  const [cols, setCols] = React.useState(3);
  React.useEffect(() => {
    const update = () => {
      if (window.matchMedia('(min-width: 1024px)').matches) setCols(6);
      else if (window.matchMedia('(min-width: 768px)').matches) setCols(6);
      else if (window.matchMedia('(min-width: 640px)').matches) setCols(4);
      else setCols(3);
    };
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  const spanFor = (i: number) => {
    const m = i % 9;
    if (m === 0) return { rs: 2, cs: 2 };
    if (m === 4) return { rs: 2, cs: 1 };
    return { rs: 1, cs: 1 };
  };

  const rowVar = ({ ['--row']: 'clamp(110px, 11vw, 160px)' } as unknown as React.CSSProperties);

  return (
    <div
      className="grid gap-4"
      style={{ gridTemplateColumns: `repeat(${cols}, 1fr)`, gridAutoRows: 'var(--row)', gridAutoFlow: 'dense', ...rowVar }}
    >
      {items.map((id, i) => {
        const key = `st-${id}-${i}`;
        const thumb = thumbs[id]?.thumbnail_url as string | undefined;
        if (!thumb) return null;
        const title = thumbs[id]?.title || 'Vidéo TikTok';
        const { rs, cs } = spanFor(i);
        return (
          <div
            key={key}
            className="relative min-h-0 rounded-2xl overflow-hidden border border-border bg-muted"
            style={{ gridRow: `span ${rs} / span ${rs}`, gridColumn: `span ${cs} / span ${cs}` }}
          >
            <img src={thumb} alt={title} className="w-full h-full object-cover block" loading="lazy" decoding="async" />
            <button
              onClick={() => onOpen(id)}
              className="absolute inset-0 bg-black/0 hover:bg-black/5 transition cursor-pointer focus:outline-none focus:ring-2 focus:ring-ring/50"
              aria-label="Lire la vidéo"
            />
          </div>
        );
      })}

      {openId && (
        <div
          className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center"
          onClick={onClose}
        >
          <div
            className="relative w-[min(92vw,420px)] max-h-[88vh] rounded-3xl overflow-hidden border border-border bg-card shadow-[0_20px_60px_rgba(0,0,0,0.5)]"
            onClick={(e) => e.stopPropagation()}
          >
            <iframe
              src={`https://www.tiktok.com/embed/v2/${openId}?autoplay=1&muted=1`}
              allow="autoplay; fullscreen; encrypted-media; picture-in-picture; clipboard-write"
              allowFullScreen
              className="w-full h-[min(80vh,720px)] aspect-[9/16] bg-card"
            />
            <button
              onClick={onClose}
              className="absolute top-3 right-3 text-muted-foreground hover:text-foreground text-2xl"
              aria-label="Fermer"
            >
              ×
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
