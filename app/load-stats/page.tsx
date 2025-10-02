// app/load-stats/page.tsx
"use client";

import * as React from "react";
import type { ReactElement } from "react";
import Section from "@/components/Section";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import BackgroundBlobs from "@/components/BackgroundBlobs";
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
  // id présent dans la donnée mais jamais affiché
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

  [key: string]: unknown;
}

type Payload = StatsItem[] | RootObject;
type RootPick = StatsItem[] | RootObject | null;

type SortKey = "date" | "title" | "views" | "likes" | "comments" | "shares" | "er";
type SortDir = "asc" | "desc";

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

// ---------- Couleurs (vues + ER) -> pastilles ----------
function badgeClassesForViews(v?: number): string {
  // 0–5k rouge, 5–10k jaune, 10–25k vert, 25–100k bleu, >100k violet
  if (v === undefined) return "bg-white/10 text-white";
  if (v < 5000) return "bg-red-500/20 text-red-300 ring-1 ring-red-500/30";
  if (v < 10000) return "bg-yellow-500/20 text-yellow-300 ring-1 ring-yellow-500/30";
  if (v < 25000) return "bg-green-500/20 text-green-300 ring-1 ring-green-500/30";
  if (v < 100000) return "bg-blue-500/20 text-blue-300 ring-1 ring-blue-500/30";
  return "bg-purple-500/20 text-purple-300 ring-1 ring-purple-500/30";
}

function badgeClassesForER(er?: number): string {
  // 0–15 rouge, 15–25 jaune, 25–35 vert, 35–45 bleu, >45 violet
  if (er === undefined) return "bg-white/10 text-white";
  if (er < 15) return "bg-red-500/20 text-red-300 ring-1 ring-red-500/30";
  if (er < 25) return "bg-yellow-500/20 text-yellow-300 ring-1 ring-yellow-500/30";
  if (er < 35) return "bg-green-500/20 text-green-300 ring-1 ring-green-500/30";
  if (er < 45) return "bg-blue-500/20 text-blue-300 ring-1 ring-blue-500/30";
  return "bg-purple-500/20 text-purple-300 ring-1 ring-purple-500/30";
}

// ---------- Root & Array picking ----------
function pickRoot(payload: Payload | null): RootPick {
  if (!payload) return null;
  if (Array.isArray(payload)) return payload;

  const p = payload as RootObject;
  if (p && typeof p === "object") {
    if (Array.isArray(p.data)) return p.data as StatsItem[];
    if (p.result && typeof p.result === "object") return p.result as RootObject | StatsItem[];
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

// ---------- Petits composants UI ----------
function Kpi({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  label: string;
  value: React.ReactNode;
}) {
  return (
    <Card className="rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur-md shadow-[0_0_0_1px_rgba(255,255,255,0.03)]">
      <CardContent className="p-6">
        <div className="flex items-center gap-4">
          <div className="h-11 w-11 grid place-items-center rounded-2xl bg-white/5 border border-white/10">
            <Icon className="h-5 w-5 text-white" />
          </div>
          <div>
            <div className="text-[11px] uppercase tracking-wide text-neutral-400">{label}</div>
            <div className="text-xl font-bold text-white">{value}</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function JsonPreview({ data }: { data: unknown }) {
  const [open, setOpen] = React.useState<boolean>(false);
  return (
    <Card className="rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur-md">
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
          <pre className="max-h-[50vh] overflow-auto text-xs leading-snug whitespace-pre text-neutral-200">
            {JSON.stringify(data, null, 2)}
          </pre>
        </CardContent>
      )}
    </Card>
  );
}

function SortButton({
  active,
  dir,
  onClick,
  children,
}: {
  active: boolean;
  dir: SortDir;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`inline-flex items-center gap-1 hover:text-white transition ${
        active ? "text-white" : "text-neutral-400"
      }`}
      title={active ? `Trier ${dir === "asc" ? "↑" : "↓"}` : "Cliquer pour trier"}
    >
      <span>{children}</span>
      <span className="text-[10px] leading-none">
        {active ? (dir === "asc" ? "▲" : "▼") : "↕"}
      </span>
    </button>
  );
}

// ---------- Page ----------
export default function LoadStatsOfflinePage(): ReactElement {
  const [payload, setPayload] = React.useState<Payload | null>(null);
  const [error, setError] = React.useState<string | null>(null);
  const fileInputRef = React.useRef<HTMLInputElement | null>(null);

  // ENTIER (pas de compact)
  const fmt = React.useMemo(() => new Intl.NumberFormat("fr-FR"), []);

  // Tri par colonne
  const [sortKey, setSortKey] = React.useState<SortKey>("date");
  const [sortDir, setSortDir] = React.useState<SortDir>("desc");

  const root = pickRoot(payload);
  const items = pickArray(root) ?? [];

  // KPIs globaux (optionnels si présents à la racine)
  const followers = toNum((root as RootObject | null)?.followers ?? (root as RootObject | null)?.subscribers);
  const totalViews = toNum((root as RootObject | null)?.views ?? (root as RootObject | null)?.totalViews);
  const totalLikes = toNum((root as RootObject | null)?.likes ?? (root as RootObject | null)?.totalLikes);
  const totalComments = toNum((root as RootObject | null)?.comments ?? (root as RootObject | null)?.totalComments);
  const totalShares = toNum((root as RootObject | null)?.shares ?? (root as RootObject | null)?.totalShares);
  const erGlobal =
    (root as RootObject | null)?.engagementRate ??
    (totalViews !== undefined ? erTikTok(totalLikes, totalComments, totalShares, totalViews) : undefined);

  // LocalStorage au mount
  React.useEffect(() => {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored) as unknown;
        if (Array.isArray(parsed) || (parsed && typeof parsed === "object")) {
          setPayload(parsed as Payload);
        }
      }
    } catch {
      // ignore
    }
  }, []);

  const parseFile = async (file: File): Promise<void> => {
    setError(null);
    try {
      const text = await file.text();
      const clean = text.replace(/^\uFEFF/, "").trim();
      const parsed = JSON.parse(clean) as unknown;
      if (!(Array.isArray(parsed) || (parsed && typeof parsed === "object"))) {
        throw new Error("Format JSON inattendu");
      }
      const usable = parsed as Payload;
      setPayload(usable);
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(usable));
    } catch (e) {
      const msg = e instanceof Error ? e.message : String(e);
      setPayload(null);
      setError(`Fichier illisible : ${msg}`);
    }
  };

  const onPick = (): void => fileInputRef.current?.click();
  const onChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const f = e.target.files?.[0];
    if (f) void parseFile(f);
    e.currentTarget.value = "";
  };
  const clearStorage = (): void => {
    window.localStorage.removeItem(STORAGE_KEY);
    setPayload(null);
  };

  // ---------- Helpers tri ----------
  const getDateMs = (it: StatsItem): number | undefined => {
    const raw = it.date ?? it.create_time ?? it.created_at ?? it.published_at;
    if (raw === null || raw === undefined || raw === "") return undefined;
    if (typeof raw === "number") return raw;
    const d = new Date(String(raw)).getTime();
    return Number.isNaN(d) ? undefined : d;
  };

  const getEr = (it: StatsItem): number | undefined => {
    const v = toNum(it.views);
    const l = toNum(it.likes);
    const c = toNum(it.comments);
    const s = toNum(it.shares);
    const er = toNum(it.engagementRate);
    return er !== undefined ? er : (v !== undefined ? erTikTok(l, c, s, v) : undefined);
  };

  const getTitle = (it: StatsItem): string =>
    String(it.title ?? it.caption ?? it.name ?? "");

  const valueFor = (it: StatsItem, key: SortKey): number | string | undefined => {
    switch (key) {
      case "date": return getDateMs(it);
      case "title": return getTitle(it).toLowerCase();
      case "views": return toNum(it.views);
      case "likes": return toNum(it.likes);
      case "comments": return toNum(it.comments);
      case "shares": return toNum(it.shares);
      case "er": return getEr(it);
    }
  };

  const sortedItems = React.useMemo(() => {
    const arr = items.slice();
    arr.sort((a, b) => {
      const va = valueFor(a, sortKey);
      const vb = valueFor(b, sortKey);

      // valeurs vides en bas
      const aEmpty = va === undefined || va === "";
      const bEmpty = vb === undefined || vb === "";
      if (aEmpty && bEmpty) return 0;
      if (aEmpty) return 1;
      if (bEmpty) return -1;

      let cmp: number;
      if (typeof va === "number" && typeof vb === "number") cmp = va - vb;
      else cmp = String(va).localeCompare(String(vb), "fr", { numeric: true, sensitivity: "base" });

      return sortDir === "asc" ? cmp : -cmp;
    });
    return arr;
  }, [items, sortKey, sortDir]);

  const toggleSort = (key: SortKey): void => {
    if (sortKey === key) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortDir(key === "title" ? "asc" : "desc");
    }
  };

  // ---------- UI ----------
  return (
    <div className="relative min-h-screen bg-black">
    <BackgroundBlobs />

      {/* Header style hero */}
      <div className="relative z-10">
        <div className="px-6 sm:px-8 pt-10">
          <div className="mx-auto max-w-6xl">
            <div className="rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur-md p-6 sm:p-8 shadow-[0_0_0_1px_rgba(255,255,255,0.03)]">
              <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
                <div>
                  <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
                    Stats (offline)
                  </h1>
                  <p className="mt-2 text-neutral-300">
                    Importe un fichier JSON pour afficher tes perfs. Cache local activé.
                  </p>
                </div>
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
              {error && <p className="text-sm text-red-400 mt-4 break-all">{error}</p>}
            </div>
          </div>
        </div>

        {/* Contenu principal */}
        <Section className="relative z-10 py-8">
          {!payload && (
            <div className="mx-auto max-w-6xl text-center text-neutral-300">
              Dépose ton fichier JSON pour commencer.
            </div>
          )}

          {payload && (
            <div className="mx-auto max-w-6xl space-y-8">
              {/* KPIs */}
              {(followers ?? totalViews ?? totalLikes ?? totalComments ?? totalShares ?? erGlobal) !== undefined && (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                  {followers !== undefined && (
                    <Kpi icon={Heart} label="Abonné·es" value={fmt.format(followers)} />
                  )}
                  {totalViews !== undefined && (
                    <Kpi
                      icon={Eye}
                      label="Vues"
                      value={
                        <Badge
                          variant="secondary"
                          className={`rounded-full px-2.5 py-1 text-[12px] font-semibold ${badgeClassesForViews(totalViews)}`}
                        >
                          {fmt.format(totalViews)}
                        </Badge>
                      }
                    />
                  )}
                  {totalLikes !== undefined && (
                    <Kpi icon={Heart} label="Likes" value={fmt.format(totalLikes)} />
                  )}
                  {totalComments !== undefined && (
                    <Kpi icon={MessageSquare} label="Commentaires" value={fmt.format(totalComments)} />
                  )}
                  {totalShares !== undefined && (
                    <Kpi icon={Share2} label="Partages" value={fmt.format(totalShares)} />
                  )}
                  {erGlobal !== undefined && (
                    <Kpi
                      icon={Percent}
                      label="ER global"
                      value={
                        <Badge
                          variant="secondary"
                          className={`rounded-full px-2.5 py-1 text-[12px] font-semibold ${badgeClassesForER(Number(erGlobal))}`}
                        >
                          {(Number(erGlobal) || 0).toFixed(1)}
                        </Badge>
                      }
                    />
                  )}
                </div>
              )}

              {/* Tableau items triable */}
              {items.length > 0 && (
                <Card className="rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur-md">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-white text-base">
                      Éléments ({items.length})
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="overflow-x-auto rounded-2xl">
                      <table className="min-w-full text-sm">
                        <thead className="text-left text-neutral-400">
                          <tr className="border-b border-white/10">
                            <th className="py-3 px-3">
                              <SortButton active={sortKey==="date"} dir={sortDir} onClick={()=>toggleSort("date")}>
                                Date
                              </SortButton>
                            </th>
                            <th className="py-3 px-3">
                              <SortButton active={sortKey==="title"} dir={sortDir} onClick={()=>toggleSort("title")}>
                                Titre
                              </SortButton>
                            </th>
                            <th className="py-3 px-3">
                              <SortButton active={sortKey==="views"} dir={sortDir} onClick={()=>toggleSort("views")}>
                                Vues
                              </SortButton>
                            </th>
                            <th className="py-3 px-3">
                              <SortButton active={sortKey==="likes"} dir={sortDir} onClick={()=>toggleSort("likes")}>
                                Likes
                              </SortButton>
                            </th>
                            <th className="py-3 px-3">
                              <SortButton active={sortKey==="comments"} dir={sortDir} onClick={()=>toggleSort("comments")}>
                                Coms
                              </SortButton>
                            </th>
                            <th className="py-3 px-3">
                              <SortButton active={sortKey==="shares"} dir={sortDir} onClick={()=>toggleSort("shares")}>
                                Partages
                              </SortButton>
                            </th>
                            <th className="py-3 px-3">
                              <SortButton active={sortKey==="er"} dir={sortDir} onClick={()=>toggleSort("er")}>
                                ER
                              </SortButton>
                            </th>
                          </tr>
                        </thead>
                        <tbody className="text-neutral-200">
                          {sortedItems.map((it, i) => {
                            const title = String(it.title ?? it.caption ?? it.name ?? "");
                            const v = toNum(it.views);
                            const l = toNum(it.likes);
                            const c = toNum(it.comments);
                            const s = toNum(it.shares);
                            const er = getEr(it);

                            const ms = getDateMs(it);
                            const dateStr =
                              ms !== undefined
                                ? new Date(ms).toLocaleDateString("fr-FR", {
                                    year: "numeric",
                                    month: "2-digit",
                                    day: "2-digit",
                                  })
                                : "—";

                            return (
                              <tr
                                key={i}
                                className="border-b border-white/[0.06] hover:bg-white/[0.04] transition-colors"
                              >
                                <td className="py-2.5 px-3 align-top whitespace-nowrap">{dateStr}</td>
                                <td className="py-2.5 px-3 align-top">
                                  <div className="font-medium text-white leading-snug">{title || "—"}</div>
                                </td>
                                <td className="py-2.5 px-3 align-top">
                                  {v !== undefined ? (
                                    <Badge
                                      variant="secondary"
                                      className={`rounded-full px-2 py-0.5 text-[12px] font-semibold ${badgeClassesForViews(v)}`}
                                    >
                                      {fmt.format(v)}
                                    </Badge>
                                  ) : (
                                    "—"
                                  )}
                                </td>
                                <td className="py-2.5 px-3 align-top">
                                  {l !== undefined ? fmt.format(l) : "—"}
                                </td>
                                <td className="py-2.5 px-3 align-top">
                                  {c !== undefined ? fmt.format(c) : "—"}
                                </td>
                                <td className="py-2.5 px-3 align-top">
                                  {s !== undefined ? fmt.format(s) : "—"}
                                </td>
                                <td className="py-2.5 px-3 align-top">
                                  {er !== undefined && Number.isFinite(er) ? (
                                    <Badge
                                      variant="secondary"
                                      className={`rounded-full px-2 py-0.5 text-[12px] font-semibold ${badgeClassesForER(er)}`}
                                    >
                                      {er.toFixed(1)}
                                    </Badge>
                                  ) : (
                                    "—"
                                  )}
                                </td>
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
            </div>
          )}
        </Section>
      </div>
    </div>
  );
}
