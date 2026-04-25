'use client'

import React from 'react'
import Section from '@/components/Section'
import SectionHeading from '@/components/SectionHeading'
import {
  ArrowUpRight,
  BookMarked,
  ShieldCheck,
  Sparkles,
  Camera,
  Flame,
  ScrollText,
  Play,
} from 'lucide-react'

const BOOK_URL =
  'https://www.placedeslibraires.fr/livre/9782488666008-les-comploteurs-antton-rouget-ramses-kefi/'

const MEDIAPART_CONTEXT_URL =
  'https://www.mediapart.fr/journal/france/dossier/saint-etienne-le-maire-la-sextape-et-le-chantage-politique'
const BOOK_SITE_URL = 'https://lescomploteurs.com/'

const YT_URL = 'https://www.youtube.com/watch?v=Jlw544x4T5Q&t=1s'
const YT_THUMB = 'https://img.youtube.com/vi/Jlw544x4T5Q/maxresdefault.jpg'

const quickFacts = [
  { label: 'Sujet', value: 'Affaire Perdriau (Saint-Étienne) : chantage, homophobie, pouvoir local' },
  { label: 'Parution', value: '23 janvier 2026' },
  { label: 'Format', value: 'Broché — 250 pages' },
  { label: 'Prix indicatif', value: '20 €' },
]

const pillars = [
  {
    title: 'Récit chronologique, sources, responsabilités',
    description:
      "Le livre déroule les faits et le contexte : qui fait quoi, qui sait quoi, qui protège qui, et comment la pression se maintient dans le temps.",
    Icon: ScrollText,
  },
  {
    title: 'Logiques de contrôle dans le pouvoir local',
    description:
      'Caméra cachée, intimidation, intox, mise à l’écart : une enquête sur des méthodes concrètes de domination politique, au niveau municipal.',
    Icon: Camera,
  },
  {
    title: 'L’homophobie comme levier',
    description:
      "La menace s’appuie sur l’orientation sexuelle supposée : ce n’est pas un détail de “scandale”, c’est un mécanisme de pouvoir.",
    Icon: Flame,
  },
]

const stAngle = [
  {
    title: 'On l’affiche ici parce qu’on en a fait une interview',
    description:
      'Sans Transition a reçu Antton Rouget. La page rassemble le livre, l’entretien, et des liens de contexte pour approfondir.',
  },
  {
    title: 'Parce que le local structure le national',
    description:
      "Le municipalisme n’est pas “petit” : c’est souvent là que se fabriquent les rapports de force, les réseaux, et l’impunité.",
  },
  {
    title: 'Parce que “complotisme” peut vouloir dire “gens qui complotent”',
    description:
      'Le livre parle d’actions et de stratégies documentées, pas d’une théorie du complot au sens fantasme.',
  },
]

const chips = ['Antton Rouget', 'Ramsès Kefi', 'Mediapart', 'Enquête', 'Pouvoir local']

type VideoSE = {
  tiktok_video_id: string
  title?: string
  create_time?: string
  views?: number
  likes?: number
  comments?: number
  shares?: number
  engagement_rate?: number
}

type OEmbed = { thumbnail_url?: string }

export default function LesComploteurs() {
  const [videos, setVideos] = React.useState<VideoSE[]>([])
  const [thumbs, setThumbs] = React.useState<Record<string, OEmbed | null>>({})
  const [loading, setLoading] = React.useState(true)
  const [error, setError] = React.useState<string | null>(null)

  React.useEffect(() => {
    let cancelled = false
    ;(async () => {
      try {
        setLoading(true)
        setError(null)
        const res = await fetch('/videos_se.json', { cache: 'no-store' })
        if (!res.ok) {
          const txt = await res.text().catch(() => '')
          throw new Error(`/videos_se.json -> ${res.status} ${txt}`)
        }
        const data = (await res.json()) as VideoSE[]
        const sorted = Array.isArray(data)
          ? data.slice().sort((a, b) => {
              const da = a?.create_time ? new Date(a.create_time).getTime() : 0
              const db = b?.create_time ? new Date(b.create_time).getTime() : 0
              return db - da
            })
          : []
        if (!cancelled) setVideos(sorted)
      } catch (e: unknown) {
        if (!cancelled) {
          const msg = e instanceof Error ? e.message : String(e)
          console.error(msg)
          setError(msg)
          setVideos([])
        }
      } finally {
        if (!cancelled) setLoading(false)
      }
    })()
    return () => {
      cancelled = true
    }
  }, [])

  React.useEffect(() => {
    let cancelled = false
    const ids = videos.map((v) => v.tiktok_video_id).filter(Boolean)
    if (ids.length === 0) return
    const chunk = <T,>(arr: T[], size: number) =>
      Array.from({ length: Math.ceil(arr.length / size) }, (_, i) => arr.slice(i * size, i * size + size))
    ;(async () => {
      try {
        const maps = await Promise.all(
          chunk(ids, 25).map(async (part) => {
            const r = await fetch(`/api/tiktok-oembed?ids=${encodeURIComponent(part.join(','))}`, {
              cache: 'no-store',
            })
            if (!r.ok) return {}
            const j = await r.json()
            return (j?.map || {}) as Record<string, OEmbed | null>
          })
        )
        if (!cancelled) {
          const merged: Record<string, OEmbed | null> = {}
          maps.forEach((m) => Object.assign(merged, m))
          setThumbs(merged)
        }
      } catch {
        // silencieux
      }
    })()
    return () => {
      cancelled = true
    }
  }, [videos])

  return (
    <Section id="les-comploteurs" className="py-16">
      {/* Full width container */}
      <div className="w-full space-y-10 rounded-2xl border-y border-white/10 bg-white/[0.02] px-4 py-12 text-foreground shadow-[0_25px_80px_rgba(0,0,0,0.45)] sm:px-8 lg:px-14">
        <div className="mx-auto w-full max-w-[1400px] space-y-10">
          <SectionHeading
            kicker="Lecture"
            title="Les Comploteurs"
            description="Un livre-enquête sur l’affaire Perdriau : chantage, homophobie, méthodes de contrôle politique. Une ressource utile si tu veux comprendre et documenter."
          />

          <div className="grid gap-10 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)]">
            {/* LEFT */}
            <div className="space-y-7 text-sm text-muted-foreground">
              <p className="text-base text-foreground">
                Cette enquête s’appuie sur des faits, des recoupements et un récit suivi. Elle permet de comprendre
                comment une affaire locale peut durer des années : par la peur, la pression, et des protections en chaîne.
              </p>

              {/* Pillars */}
              <div className="grid gap-4">
                {pillars.map(({ title, description, Icon }) => (
                  <div key={title} className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                    <div className="flex items-start gap-3 text-foreground">
                      <Icon className="mt-0.5 h-5 w-5 text-pink-300" aria-hidden />
                      <div className="space-y-1">
                        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                          {title}
                        </p>
                        <p className="text-base text-foreground/85">{description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* ST angle */}
              <div className="space-y-3 rounded-2xl border border-white/10 bg-white/[0.02] p-5">
                <div className="flex items-center gap-2 text-foreground">
                  <ShieldCheck className="h-5 w-5 text-pink-400" aria-hidden />
                  <p className="text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                    Pourquoi cette page existe sur Sans Transition
                  </p>
                </div>

                <ul className="space-y-3">
                  {stAngle.map((item) => (
                    <li key={item.title} className="space-y-1">
                      <p className="font-semibold text-foreground">{item.title}</p>
                      <p className="text-foreground/75">{item.description}</p>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Chips */}
              <div className="flex flex-wrap gap-3">
                {chips.map((chip) => (
                  <span
                    key={chip}
                    className="inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-1 text-xs uppercase tracking-[0.3em] text-muted-foreground"
                  >
                    <Sparkles className="h-3.5 w-3.5 text-pink-400" aria-hidden />
                    {chip}
                  </span>
                ))}
              </div>

              {/* CTA */}
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <a
                  href={BOOK_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-violet-500 via-fuchsia-500 to-orange-400 px-6 py-3 text-base font-semibold text-white shadow-lg shadow-fuchsia-500/25"
                >
                  Commander via Place des Libraires
                  <ArrowUpRight className="h-5 w-5" aria-hidden />
                </a>

                <div className="space-y-1 text-xs text-muted-foreground sm:max-w-[420px]">
                  <p>Place des Libraires : commande via des librairies indépendantes.</p>
                  <p>Si tu le partages, fais-le avec un point clair : “voilà ce qui est documenté”.</p>
                </div>
              </div>

              {/* Secondary links */}
              <div className="flex flex-wrap gap-3 text-xs">
                <a
                  href={MEDIAPART_CONTEXT_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-foreground/80 hover:bg-white/[0.06] transition"
                >
                  Contexte Mediapart
                  <ArrowUpRight className="h-4 w-4" aria-hidden />
                </a>
                <a
                  href={BOOK_SITE_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-foreground/80 hover:bg-white/[0.06] transition"
                >
                  Site du livre
                  <ArrowUpRight className="h-4 w-4" aria-hidden />
                </a>
              </div>

            </div>

            {/* RIGHT */}
            <div className="space-y-5">
              {/* Card 1: Fiche */}
              <div className="rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.05] to-white/[0.02] p-6 text-foreground">
                <div className="flex items-center gap-3">
                  <BookMarked className="h-10 w-10 text-orange-300" aria-hidden />
                  <div>
                    <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">Fiche</p>
                    <p className="text-xl font-semibold">Les Comploteurs</p>
                  </div>
                </div>

                <dl className="mt-5 space-y-4 text-sm text-foreground/80">
                  <div>
                    <dt className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Auteurs</dt>
                    <dd className="text-base text-foreground">Antton Rouget & Ramsès Kefi</dd>
                  </div>
                  <div>
                    <dt className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Édition</dt>
                    <dd className="text-base text-foreground">Collectif éditions / Mediapart</dd>
                  </div>
                  <div>
                    <dt className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Infos</dt>
                    <dd className="mt-2 space-y-2">
                      {quickFacts.map((f) => (
                        <div key={f.label} className="flex items-start justify-between gap-4">
                          <span className="text-foreground/60">{f.label}</span>
                          <span className="text-foreground/90 text-right">{f.value}</span>
                        </div>
                      ))}
                    </dd>
                  </div>
                </dl>
              </div>

              {/* Card 2: Interview (separate) */}
              <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 text-foreground">
                <div className="flex items-center gap-3">
                  <Flame className="h-6 w-6 text-pink-400" aria-hidden />
                  <div>
                    <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">Sans Transition</p>
                    <p className="text-lg font-semibold">Interview d’Antton Rouget</p>
                  </div>
                </div>

                <p className="mt-4 text-sm text-foreground/80">
                  Entretien long format sur l’affaire Perdriau : méthodes, responsabilités politiques, et ce que ça révèle sur l’impunité locale.
                </p>

                <a
                  href={YT_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="group relative mt-4 block overflow-hidden rounded-2xl border border-white/10"
                >
                  <img
                    src={YT_THUMB}
                    alt="Interview Antton Rouget – Sans Transition"
                    className="aspect-video w-full object-cover transition group-hover:scale-[1.02]"
                  />

                  <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition group-hover:opacity-100">
                    <div className="flex items-center gap-3 rounded-full bg-black/70 px-6 py-3 text-white">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="h-6 w-6 text-red-500"
                      >
                        <path d="M8 5v14l11-7z" />
                      </svg>
                      <span className="text-sm font-semibold">Regarder l’interview</span>
                    </div>
                  </div>
                </a>

                <p className="mt-4 text-xs text-muted-foreground">
                  Lien direct : l’interview complète sur YouTube.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 w-full px-4 sm:px-8 lg:px-14">
          {error && <p className="text-xs text-red-400 break-all">{error}</p>}

          <div className="mx-auto grid max-w-[1400px] items-start gap-0 sm:grid-cols-2 lg:grid-cols-4">
            {(loading ? Array.from({ length: 4 }).map(() => null) : videos).map((item, idx) => {
              if (item === null) {
                return (
                  <div
                    key={`skeleton-${idx}`}
                    className="w-full max-w-[220px] rounded-2xl border border-white/10 bg-white/[0.03] p-3"
                  >
                    <div className="aspect-[9/16] w-full rounded-xl bg-muted animate-pulse" />
                    <div className="mt-3 h-3 w-3/4 rounded bg-muted/60 animate-pulse" />
                    <div className="mt-2 h-3 w-1/2 rounded bg-muted/50 animate-pulse" />
                  </div>
                )
              }

              const id = item.tiktok_video_id
              const thumb = thumbs[id]?.thumbnail_url
              const dateLabel = item.create_time
                ? new Date(item.create_time).toLocaleDateString('fr-FR', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                  })
                : undefined

              return (
                <a
                  key={id}
                  href={`https://www.tiktok.com/@sanstransition/video/${id}`}
                  target="_blank"
                  rel="noreferrer"
                  className="group w-full max-w-[220px] rounded-2xl border border-white/10 bg-white/[0.03] p-3 transition hover:bg-white/[0.06]"
                >
                  <div className="relative aspect-[9/16] w-full overflow-hidden rounded-xl bg-muted">
                    {thumb ? (
                      <img
                        src={thumb}
                        alt={item.title || 'Vidéo TikTok'}
                        className="h-full w-full object-cover"
                        loading="lazy"
                        decoding="async"
                      />
                    ) : (
                      <div className="h-full w-full bg-muted" />
                    )}
                    <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 transition group-hover:opacity-100">
                      <Play className="h-10 w-10 text-white" />
                    </div>
                  </div>

                  <p className="mt-3 text-xs text-foreground line-clamp-2">{item.title || 'Vidéo TikTok'}</p>
                  {dateLabel && (
                    <p className="mt-2 text-[11px] text-muted-foreground/80">{dateLabel}</p>
                  )}
                </a>
              )
            })}
          </div>
        </div>
      </div>
    </Section>
  )
}
