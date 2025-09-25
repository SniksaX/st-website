import { NextResponse } from 'next/server';
import { XMLParser } from 'fast-xml-parser';

export const revalidate = 300;

type FeedEntry = {
  ['yt:videoId']?: string;
  title?: string;
  published?: string;
};
type Feed = { feed?: { entry?: FeedEntry | FeedEntry[] } };

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const max = Math.min(Number(searchParams.get('max') ?? 10), 10);

    const channelId = process.env.YT_CHANNEL_ID;
    if (!channelId) {
      return NextResponse.json({ error: 'Missing YT_CHANNEL_ID' }, { status: 500 });
    }

    const feedUrl = `https://www.youtube.com/feeds/videos.xml?channel_id=${channelId}`;
    const res = await fetch(feedUrl, { next: { revalidate } });
    if (!res.ok) {
      const text = await res.text().catch(() => '');
      return NextResponse.json({ error: `YT RSS error: ${text || res.status}` }, { status: 502 });
    }

    const xml = await res.text();
    const parser = new XMLParser({ ignoreAttributes: false, removeNSPrefix: false });
    const parsed = parser.parse(xml) as Feed;

    const entries: FeedEntry[] = Array.isArray(parsed?.feed?.entry)
      ? (parsed.feed!.entry as FeedEntry[])
      : parsed?.feed?.entry
      ? [parsed.feed.entry as FeedEntry]
      : [];

    const videos = entries
      .slice(0, max)
      .map((e: FeedEntry) => ({
        id: e['yt:videoId'] ?? '',
        title: e.title ?? undefined,
        publishedAt: e.published ?? undefined,
        views: undefined as number | undefined,
      }))
      .filter((v) => v.id && v.id.length === 11);

    return NextResponse.json({ videos }, { status: 200 });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Server error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
