import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

async function sleep(ms: number) { return new Promise(r => setTimeout(r, ms)); }

export async function GET() {
  const apiKey = process.env.ST_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: "Missing ST_API_KEY" }, { status: 500 });
  }

  const url = "https://api.sanstransition.fr/api/history/latest-public";
  const headers = {
    "x-api-key": apiKey,
    "Accept": "application/json",
    "User-Agent": "curl/8.5.0",
    "Connection": "close",
  };

  // retry soft si 5xx
  let last: Response | null = null;
  for (let i = 0; i < 3; i++) {
    try {
      const res = await fetch(url, { headers, cache: "no-store" });
      last = res;
      if (res.ok) {
        const json = await res.json(); // renvoie un tableau d'objets { tiktok_video_id, title, views, likes, comments, shares, ... }
        return NextResponse.json({ ids: json.data ?? [], from: "upstream" });
      }
      if (res.status >= 400 && res.status < 500) break;
    } catch {}
    await sleep(250 * (i + 1));
  }

  // fallback local pour ne pas casser l’UI si l’upstream est KO
  try {
    const videos = (await import("@/data/tiktok.json")).default as Array<{ id: string }>;
    return NextResponse.json({ ids: videos.map(v => v.id), from: "fallback", upstreamStatus: last?.status ?? null });
  } catch {
    const body = last ? await last.text().catch(() => "") : "";
    return NextResponse.json({ error: "Upstream error", upstreamStatus: last?.status ?? 502, body }, { status: 502 });
  }
}
