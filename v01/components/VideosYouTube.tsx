'use client';

import React from 'react';
import Section from './Section';
import { ArrowUpRight, Youtube as YoutubeIcon } from 'lucide-react';
import SectionHeading from '@/components/SectionHeading';

type YtItem = { id: string; title?: string; publishedAt?: string };
type Item = { kind: 'video'; v: YtItem } | { kind: 'more' };

type ApiVideo = { id?: string; title?: string; publishedAt?: string; views?: number };
type ApiResponse = { videos?: ApiVideo[] };

function isApiResponse(x: unknown): x is ApiResponse {
  return !!x && typeof x === 'object' && 'videos' in (x as Record<string, unknown>);
}

/** Normalize to the 11-char YouTube video ID */
function normalizeId(raw: string) {
  const m =
    raw.match(/[?&]v=([A-Za-z0-9_-]{11})/) ||
    raw.match(/youtu\.be\/([A-Za-z0-9_-]{11})/) ||
    raw.match(/embed\/([A-Za-z0-9_-]{11})/) ||
    raw.match(/^([A-Za-z0-9_-]{11})$/);
  return m ? m[1] : raw;
}

export default function VideosYouTube() {
  const [videos, setVideos] = React.useState<YtItem[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        setLoading(true);
        setError(null);
        const base = process.env.NEXT_PUBLIC_BASE_PATH ?? '';
        const res = await fetch(`${base}/api/youtube-latest?max=10`, { cache: 'no-store' });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);

        const data: unknown = await res.json().catch(() => ({}));
        const arr: ApiVideo[] = isApiResponse(data) && Array.isArray(data.videos) ? data.videos : [];

        const mapped: YtItem[] = arr
          .map((v) => {
            const id = normalizeId(String(v.id ?? ''));
            return {
              id,
              title: typeof v.title === 'string' ? v.title : undefined,
              publishedAt: typeof v.publishedAt === 'string' ? v.publishedAt : undefined,
            };
          })
          .filter((v) => v.id && v.id.length === 11)
          .slice(0, 10);

        if (!cancelled) setVideos(mapped);
      } catch (e) {
        if (!cancelled) {
          const msg = e instanceof Error ? e.message : String(e);
          setError(msg);
          setVideos([
            { id: '6S5YPk-GIng', title: 'Vidéo Sans Transition' },
            { id: 'V7d_6ePKy6E', title: 'Vidéo Sans Transition' },
          ]);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  // vidéos + carte "voir +"
  const items: Item[] = [...videos.map((v) => ({ kind: 'video', v } as const)), { kind: 'more' }];
  const placeholders = Array.from({ length: 4 });

  return (
    <Section id="videos-youtube" className="py-14 relative z-10 isolate">
      <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <SectionHeading kicker="Dernières sorties" title="Vidéos YouTube" className="mb-0" />
        <div className="hidden sm:flex items-center gap-2">
          <a
            href="https://youtube.com/@SansTransitionMedia"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-border bg-muted px-3 h-9 text-sm text-foreground hover:bg-muted/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50"
          >
            <YoutubeIcon className="h-4 w-4" />
            <span>Suivre sur YouTube</span>
          </a>
        </div>
      </div>

      {error && <p className="text-sm text-amber-300 mb-4 break-all">{error}</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {loading ? (
          placeholders.map((_, idx) => (
            <div key={`skeleton-${idx}`} className="aspect-video w-full animate-pulse bg-muted rounded-2xl" />
          ))
        ) : (
          items.map((item, k) =>
            item.kind === 'video' ? (
              <div
                key={`${item.v.id}-${k}`}
                className="relative aspect-video w-full rounded-2xl overflow-hidden border border-border bg-card"
              >
                <iframe
                  className="absolute inset-0 h-full w-full"
                  src={`https://www.youtube.com/embed/${item.v.id}?rel=0&modestbranding=1&playsinline=1`}
                  title={item.v.title ?? 'Lecture YouTube'}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              </div>
            ) : (
              <a
                key={`more-${k}`}
                href="https://youtube.com/@SansTransitionMedia/videos"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative aspect-video w-full rounded-2xl overflow-hidden border border-border bg-muted"
                aria-label="Voir plus sur YouTube"
              >
                <div className="w-full h-full bg-muted" />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/40 to-transparent" />
                <div className="absolute inset-0 flex flex-col items-center justify-center text-foreground">
                  <span className="text-2xl font-semibold tracking-tight">Voir +</span>
                  <ArrowUpRight className="mt-2 h-6 w-6 opacity-80 group-hover:opacity-100 transition" />
                </div>
              </a>
            )
          )
        )}
      </div>
    </Section>
  );
}
