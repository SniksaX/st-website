import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const revalidate = 0;

async function sleep(ms: number) { return new Promise(r => setTimeout(r, ms)); }

export async function GET() {
  const apiKey =
  process.env.ST_API_KEY ??
  process.env.BACKEND_PUBLIC_API_KEY ??
  "";

if (!apiKey) {
  return NextResponse.json(
    {
      error: "Missing API key",
      diag: {
        ST_API_KEY: !!process.env.ST_API_KEY,
        BACKEND_PUBLIC_API_KEY: !!process.env.BACKEND_PUBLIC_API_KEY,
        NETLIFY: !!process.env.NETLIFY,
        NODE_ENV: process.env.NODE_ENV || null,
      },
    },
    { status: 500 }
  );
}

  const url = "https://api.sanstransition.fr/api/history/latest-public";
  const headers = {
    "x-api-key": apiKey,
    "Accept": "application/json",
    "User-Agent": "curl/8.5.0",
  };

  let last: Response | null = null;

  for (let i = 0; i < 3; i++) {
    try {
      const res = await fetch(url, { headers, cache: "no-store", next: { revalidate: 0 } });
      last = res;
      if (res.ok) {
        const json = await res.json(); // { data: [...] }
        return new NextResponse(
          JSON.stringify({ ids: json?.data ?? [], from: "upstream" }),
          { headers: { "Content-Type": "application/json", "Cache-Control": "no-store, no-cache, must-revalidate" } }
        );
      }
      if (res.status >= 400 && res.status < 500) break; // pas la peine de retry les 4xx
    } catch {
      // soft fail → retry
    }
    await sleep(250 * (i + 1));
  }
  return NextResponse.json(
    { ids: [], from: "fallback", status: last?.status ?? 0 },
    { headers: { "Cache-Control": "no-store, no-cache, must-revalidate" }, status: 200 }
  );
}
