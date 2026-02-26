import React, { useEffect, useMemo, useState } from 'react'

// -- Helpers for YouTube --
type ApiVideo = { id?: string; title?: string; publishedAt?: string }
type YtItem = { id: string; title: string }

function normalizeYtId(raw: string) {
    const m =
        raw.match(/[?&]v=([A-Za-z0-9_-]{11})/) ||
        raw.match(/youtu\.be\/([A-Za-z0-9_-]{11})/) ||
        raw.match(/embed\/([A-Za-z0-9_-]{11})/) ||
        raw.match(/^([A-Za-z0-9_-]{11})$/);
    return m ? m[1] : raw
}

// -- Helpers for TikTok --
type JsonItem = { id: string; title?: string; date?: string }

function normalizeTikTokId(v: unknown) {
    const s = typeof v === 'string' ? v : String(v ?? '')
    const m = s.match(/\d{5,}/)
    return (m ? m[0] : s).trim()
}

type RetroVideosMode = 'youtube' | 'tiktok' | 'all'

export default function RetroVideos({ mode = 'all' }: { mode?: RetroVideosMode }) {
    // State
    const [ytVideos, setYtVideos] = useState<YtItem[]>([])
    const [tiktokVideos, setTikTokVideos] = useState<JsonItem[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    const shouldLoadYouTube = useMemo(() => mode === 'all' || mode === 'youtube', [mode])
    const shouldLoadTikTok = useMemo(() => mode === 'all' || mode === 'tiktok', [mode])

    useEffect(() => {
        let cancelled = false

        async function fetchData() {
            try {
                setLoading(true)

                // 1. YouTube
                let ytItems: YtItem[] = []
                if (shouldLoadYouTube) {
                    const base = process.env.NEXT_PUBLIC_BASE_PATH ?? ''
                    const ytRes = await fetch(`${base}/api/youtube-latest?max=6`, { cache: 'no-store' })
                    if (ytRes.ok) {
                        const data = await ytRes.json()
                        if (data?.videos && Array.isArray(data.videos)) {
                            ytItems = data.videos
                                .map((v: ApiVideo) => ({
                                    id: normalizeYtId(v.id || ''),
                                    title: v.title || 'Untitled Video',
                                }))
                                .filter((v: YtItem) => v.id.length === 11)
                        }
                    }
                }

                // 2. TikTok
                let ttItems: JsonItem[] = []
                if (shouldLoadTikTok) {
                    const ttRes = await fetch('/json.txt', { cache: 'no-store' })
                    if (ttRes.ok) {
                        const text = await ttRes.text()
                        let data
                        try {
                            data = JSON.parse(text)
                        } catch {
                            data = JSON.parse(text.trim())
                        }

                        if (Array.isArray(data)) {
                            ttItems = data.slice(0, 10).map((item: JsonItem) => ({
                                id: normalizeTikTokId(item.id),
                                title: item.title,
                                date: item.date,
                            }))
                        }
                    }
                }

                if (!cancelled) {
                    setYtVideos(ytItems)
                    setTikTokVideos(ttItems)
                }
            } catch (err) {
                if (!cancelled) {
                    console.error('RetroVideos error:', err)
                    setError('Error loading multimedia content...')
                }
            } finally {
                if (!cancelled) setLoading(false)
            }
        }

        fetchData()
        return () => {
            cancelled = true
        }
    }, [shouldLoadTikTok, shouldLoadYouTube])

    return (
        <div className="font-serif p-4 bg-black text-white min-h-full">
            <h2 className="text-center text-yellow-400 font-mono text-xl mb-6">
                &gt;&gt; MULTIMEDIA GALERIE &lt;&lt;
            </h2>

            {loading && <div className="text-center text-green-400 blink">LOADING CONTENT...</div>}
            {error && <div className="text-center text-red-500">{error}</div>}

            <div className={shouldLoadYouTube && shouldLoadTikTok ? 'grid grid-cols-1 md:grid-cols-2 gap-8' : 'space-y-8'}>
                {/* COLUMN LEFT: YOUTUBE */}
                {shouldLoadYouTube && (
                    <div>
                        <h3 className="text-red-500 font-bold mb-4 border-b border-red-500">[ YOUTUBE ]</h3>
                        <div className="space-y-6">
                            {ytVideos.map((v) => (
                                <div key={v.id} className="border-2 border-gray-500 p-1 bg-gray-900">
                                    <iframe
                                        width="100%"
                                        height="200"
                                        src={`https://www.youtube.com/embed/${v.id}`}
                                        frameBorder="0"
                                        allowFullScreen
                                    ></iframe>
                                    <div className="text-center text-xs mt-1 font-mono text-green-400 truncate px-1">
                                        {v.title}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* COLUMN RIGHT: TIKTOK */}
                {shouldLoadTikTok && (
                    <div>
                        <h3 className="text-pink-400 font-bold mb-4 border-b border-pink-400">[ TIKTOK LINKS ]</h3>
                        <div className="border border-white p-4 bg-gray-800">
                            <ul className="list-square pl-4 space-y-2 text-sm font-mono">
                                {tiktokVideos.map((t, i) => (
                                    <li key={i}>
                                        <a
                                            href={`https://www.tiktok.com/@sanstransition/video/${t.id}`}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="text-cyan-300 hover:text-white hover:bg-blue-900 block truncate"
                                        >
                                            {t.title || `TikTok Video #${t.id}`}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                            <div className="mt-4 text-center">
                                <a
                                    href="https://www.tiktok.com/@sanstransition"
                                    target="_blank"
                                    className="text-yellow-300 underline blink"
                                >
                                    Visit Full Profile &gt;&gt;
                                </a>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            <div className="mt-8 text-center border-t border-gray-600 pt-4">
                {shouldLoadYouTube && (
                    <a href="https://youtube.com/@SansTransitionMedia" target="_blank" className="text-blue-300 underline">
                        CLICK HERE FOR MORE VIDEOS
                    </a>
                )}
                {!shouldLoadYouTube && shouldLoadTikTok && (
                    <a href="https://tiktok.com/@sanstransition" target="_blank" className="text-blue-300 underline">
                        CLICK HERE FOR MORE TIKTOKS
                    </a>
                )}
            </div>
        </div>
    )
}
