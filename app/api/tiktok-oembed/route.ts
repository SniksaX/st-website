import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// GET /api/tiktok-oembed?ids=ID1,ID2,...
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const idsParam = searchParams.get("ids");
  if (!idsParam) return NextResponse.json({ error: "Missing ids" }, { status: 400 });

  const ids = idsParam.split(",").filter(Boolean).slice(0, 30);

  const results = await Promise.all(
    ids.map(async (id) => {
      const oembedUrl = `https://www.tiktok.com/oembed?url=https://www.tiktok.com/@sanstransition/video/${id}`;
      try {
        const res = await fetch(oembedUrl, {
          cache: "no-store",
          headers: { "User-Agent": "Mozilla/5.0", "Accept-Language": "fr-FR,fr;q=0.9,en;q=0.8" },
        });
        if (!res.ok) return [id, null] as const;
        const j = await res.json();
        return [id, { thumbnail_url: j?.thumbnail_url, title: j?.title, author_name: j?.author_name }] as const;
      } catch {
        return [id, null] as const;
      }
    })
  );

  return NextResponse.json({ map: Object.fromEntries(results) });
}
