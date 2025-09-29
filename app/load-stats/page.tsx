// app/load-stats/page.tsx
"use client";

import * as React from "react";
import type { ReactElement } from "react";
import Section from "@/components/Section";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Eye,
  Heart,
  MessageSquare,
  Share2,
  Percent,
  UploadCloud,
  Database,
  Trash2,
} from "lucide-react";

// ---------- Types ----------
type NumLike = number | string | null | undefined;

export interface StatsItem {
  id?: string | number;
  title?: string;
  caption?: string;
  name?: string;
  views?: NumLike;
  likes?: NumLike;
  comments?: NumLike;
  shares?: NumLike;
  engagementRate?: NumLike;
  date?: string | number;
  create_time?: string | number;
  created_at?: string;
  published_at?: string;
  video_id?: string | number;
  slug?: string;
  tiktok_video_id?: string | number;
  // champs divers tolérés
  [key: string]: unknown;
}

export interface RootObject {
  followers?: NumLike;
  subscribers?: NumLike;
  views?: NumLike;
  totalViews?: NumLike;
  likes?: NumLike;
  totalLikes?: NumLike;
  comments?: NumLike;
  totalComments?: NumLike;
  shares?: NumLike;
  totalShares?: NumLike;
  engagementRate?: NumLike;

  videos?: StatsItem[];
  items?: StatsItem[];
  data?: StatsItem[] | Record<string, unknown>;
  result?: unknown;

  // pour tolérer des structures libres
  [key: string]: unknown;
}

type Payload = StatsItem[] | RootObject;
type RootPick = StatsItem[] | RootObject | null;

const STORAGE_KEY = "stats-json";

// ---------- Utils ----------
const toNum = (v: NumLike): number | undefined => {
  if (v === null || v === undefined || v === "") return undefined;
  const n = Number(v);
  return Number.isNaN(n) ? undefined : n;
};

// ER = (likes + comments + shares) / views * 100
const erTikTok = (
  likes?: number,
  comments?: number,
  shares?: number,
  views?: number
): number => {
  const L = Number(likes ?? 0);
  const C = Number(comments ?? 0);
  const S = Number(shares ?? 0);
  const V = Number(views ?? 0);
  if (!Number.isFinite(V) || V <= 0) return 0;
  return ((L + C + S) / V) * 100;
};

// ---------- UI helpers ----------
function Kpi({
  icon: Icon,
  label,
  value,
  suffix,
}: {
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  label: string;
  value: React.ReactNode;
  suffix?: string;
}) {
  return (
    <Card className="rounded-2xl border-neutral-900 bg-neutral-950/80">
      <CardContent className="p-5">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 grid place-items-center rounded-xl bg-neutral-900 border border-neutral-800">
            <Icon className="h-4 w-4 text-white" />
          </div>
          <div>
            <div className="text-xs text-neutral-400">{label}</div>
            <div className="text-lg font-semibold text-white">
              {value}
              {suffix ? (
                <span className="text-neutral-300 text-sm ml-1">{suffix}</span>
              ) : null}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function JsonPreview({ data }: { data: unknown }) {
  const [open, setOpen] = React.useState<boolean>(false);
  return (
    <Card className="rounded-2xl border-neutral-900 bg-neutral-950/80">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-white text-base flex items-center gap-2">
            <Database className="h-4 w-4" /> Payload brut
          </CardTitle>
          <Button
            variant="outline"
            size="sm"
            className="rounded-xl"
            onClick={() => setOpen((o) => !o)}
          >
            {open ? "Masquer" : "Afficher"}
          </Button>
        </div>
      </CardHeader>
      {open && (
        <CardContent className="pt-0">
          <pre className="max-h-[50vh] overflow-auto text-xs leading-snug whitespace-pre-wrap text-neutral-200">
            {JSON.stringify(data, null, 2)}
          </pre>
        </CardContent>
      )}
    </Card>
  );
}

// ---------- Root & Array picking ----------
function pickRoot(payload: Payload | null): RootPick {
  if (!payload) return null;
  if (Array.isArray(payload)) return payload;

  const p = payload as RootObject;
  if (p && typeof p === "object") {
    if (Array.isArray(p.data)) return p.data as StatsItem[];
    if (p.result && typeof p.result === "object") {
      return p.result as RootObject | StatsItem[];
    }
    return p;
  }
  return null;
}

function pickArray(root: RootPick): StatsItem[] | null {
  if (!root) return null;
  if (Array.isArray(root)) return root;
  const r = root as RootObject;
  if (Array.isArray(r.videos)) return r.videos;
  if (Array.isArray(r.items)) return r.items;
  if (Array.isArray(r.data)) return r.data as StatsItem[];
  return null;
}

// ---------- Page ----------
export default function LoadStatsOfflinePage(): ReactElement {
  const [payload, setPayload] = React.useState<Payload | null>(null);
  const [error, setError] = React.useState<string | null>(null);
  const fileInputRef = React.useRef<HTMLInputElement | null>(null);

  const nf = React.useMemo(
    () => new Intl.NumberFormat("fr-FR", { notation: "compact", compactDisplay: "short" }),
    []
  );

  const root = pickRoot(payload);
  const items = pickArray(root);

  // KPIs globaux (optionnels)
  const followers = toNum((root as RootObject | null)?.followers ?? (root as RootObject | null)?.subscribers);
  const views = toNum((root as RootObject | null)?.views ?? (root as RootObject | null)?.totalViews);
  const likes = toNum((root as RootObject | null)?.likes ?? (root as RootObject | null)?.totalLikes);
  const comments = toNum((root as RootObject | null)?.comments ?? (root as RootObject | null)?.totalComments);
  const shares = toNum((root as RootObject | null)?.shares ?? (root as RootObject | null)?.totalShares);
  const erGlobal =
    (root as RootObject | null)?.engagementRate ??
    (views !== undefined ? erTikTok(likes, comments, shares, views) : undefined);

  // Charger depuis localStorage au mount
  React.useEffect(() => {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed: unknown = JSON.parse(stored);
        // validation minimale
        if (Array.isArray(parsed) || (parsed && typeof parsed === "object")) {
          setPayload(parsed as Payload);
        }
      }
    } catch {
      // ignore parsing error, keep page empty
    }
  }, []);

  const parseFile = async (file: File): Promise<void> => {
    setError(null);
    try {
      const text = await file.text();
      const clean = text.replace(/^\uFEFF/, "").trim();
      const parsed: unknown = JSON.parse(clean);
      if (!(Array.isArray(parsed) || (parsed && typeof parsed === "object"))) {
        throw new Error("Format JSON inattendu");
      }
      const usable = parsed as Payload;
      setPayload(usable);
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(usable));
    } catch (e: unknown) {
      setPayload(null);
      const message = e instanceof Error ? e.message : String(e);
      setError(`Fichier illisible : ${message}`);
    }
  };

  const onPick = (): void => fileInputRef.current?.click();

  const onChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const f = e.target.files?.[0];
    if (f) void parseFile(f);
    e.currentTarget.value = ""; // reset pour recharger le même fichier
  };

  const clearStorage = (): void => {
    window.localStorage.removeItem(STORAGE_KEY);
    setPayload(null);
  };

  return (
    <div className="relative min-h-screen bg-black overflow-hidden">
      {/* BLOBS mieux répartis */}
      <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] bg-gradient-to-r from-pink-500/30 to-purple-500/30 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-[-15%] right-[-15%] w-[550px] h-[550px] bg-gradient-to-r from-cyan-500/30 to-blue-500/30 rounded-full blur-3xl animate-spin-slow" />
      <div className="absolute top-[20%] right-[10%] w-[400px] h-[400px] bg-gradient-to-r from-yellow-400/20 to-orange-500/20 rounded-full blur-3xl animate-pulse" />

      <Section className="relative z-10 py-10">
        <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            Charger des stats (offline)
          </h1>
          <div className="flex gap-2">
            <Button onClick={onPick} variant="outline" className="rounded-2xl">
              <UploadCloud className="h-4 w-4 mr-2" />
              Importer JSON
            </Button>
            <input
              ref={fileInputRef}
              type="file"
              accept=".txt,.json,application/json,text/plain"
              className="hidden"
              onChange={onChange}
            />
            {payload && (
              <Button onClick={clearStorage} className="rounded-2xl">
                <Trash2 className="h-4 w-4 mr-2" />
                Vider
              </Button>
            )}
          </div>
        </div>

        {error && <p className="text-sm text-red-400 mb-4 break-all">{error}</p>}

        {!payload && (
          <p className="text-neutral-300">
            Importe un fichier texte contenant du JSON pour afficher les stats.
          </p>
        )}

        {payload && (
          <>
            {(followers ?? views ?? likes ?? comments ?? shares ?? erGlobal) !== undefined && (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
                {followers !== undefined && (
                  <Kpi icon={Heart} label="Abonné·es" value={nf.format(followers)} />
                )}
                {views !== undefined && <Kpi icon={Eye} label="Vues" value={nf.format(views)} />}
                {likes !== undefined && <Kpi icon={Heart} label="Likes" value={nf.format(likes)} />}
                {comments !== undefined && (
                  <Kpi icon={MessageSquare} label="Commentaires" value={nf.format(comments)} />
                )}
                {shares !== undefined && (
                  <Kpi icon={Share2} label="Partages" value={nf.format(shares)} />
                )}
                {erGlobal !== undefined && (
                  <Kpi
                    icon={Percent}
                    label="ER global"
                    value={(Number(erGlobal) || 0).toFixed(1)}
                    suffix="%"
                  />
                )}
              </div>
            )}

            {Array.isArray(items) && items.length > 0 && (
              <Card className="rounded-2xl border-neutral-900 bg-neutral-950/80 mb-8">
                <CardHeader className="pb-2">
                  <CardTitle className="text-white text-base">
                    Éléments ({items.length})
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="overflow-x-auto">
                    <table className="min-w-full text-sm">
                      <thead className="text-left text-neutral-400">
                        <tr className="border-b border-neutral-900">
                          <th className="py-2 pr-4">Titre / ID</th>
                          <th className="py-2 pr-4">Vues</th>
                          <th className="py-2 pr-4">Likes</th>
                          <th className="py-2 pr-4">Coms</th>
                          <th className="py-2 pr-4">Partages</th>
                          <th className="py-2 pr-4">ER</th>
                          <th className="py-2 pr-4">Date</th>
                        </tr>
                      </thead>
                      <tbody className="text-neutral-200">
                        {items.map((it, i) => {
                          const title = String(it.title ?? it.caption ?? it.name ?? "");
                          const id = String(it.id ?? it.tiktok_video_id ?? it.video_id ?? it.slug ?? i);
                          const v = toNum(it.views);
                          const l = toNum(it.likes);
                          const c = toNum(it.comments);
                          const s = toNum(it.shares);
                          const er =
                            toNum(it.engagementRate) ?? erTikTok(l, c, s, v);
                          const rawDate =
                            it.date ?? it.create_time ?? it.created_at ?? it.published_at;
                          const d =
                            typeof rawDate === "number"
                              ? new Date(rawDate)
                              : rawDate
                              ? new Date(String(rawDate))
                              : null;
                          const dateStr = d
                            ? d.toLocaleDateString("fr-FR", {
                                year: "numeric",
                                month: "short",
                                day: "2-digit",
                              })
                            : "—";

                          return (
                            <tr key={id || i} className="border-b border-neutral-900/60">
                              <td className="py-2 pr-4 align-top">
                                <div className="font-medium text-white leading-snug line-clamp-2">
                                  {title || "—"}
                                </div>
                                <div className="text-[11px] text-neutral-400">{id}</div>
                              </td>
                              <td className="py-2 pr-4">
                                {v !== undefined ? nf.format(v) : "—"}
                              </td>
                              <td className="py-2 pr-4">
                                {l !== undefined ? nf.format(l) : "—"}
                              </td>
                              <td className="py-2 pr-4">
                                {c !== undefined ? nf.format(c) : "—"}
                              </td>
                              <td className="py-2 pr-4">
                                {s !== undefined ? nf.format(s) : "—"}
                              </td>
                              <td className="py-2 pr-4">
                                {Number.isFinite(er) ? `${er.toFixed(1)} %` : "—"}
                              </td>
                              <td className="py-2 pr-4">{dateStr}</td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            )}

            <JsonPreview data={payload} />
          </>
        )}
      </Section>
    </div>
  );
}
