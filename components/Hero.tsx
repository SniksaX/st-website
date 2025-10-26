"use client"
import Link from "next/link"
import React from "react"
import Image from "next/image"
import Section from "./Section"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import {
  ArrowRight, Heart, MessageCircle, Share2, Eye,
  Volume2, VolumeX, Pause, Play, Repeat, Youtube, Instagram, Twitter,
} from "lucide-react"
import { HoverLift } from "./HoverLift"

export default function Hero() {
  const stats = {
    id: "7493114184964574486",
    title: "Pourquoi est-ce que j’ai créé Sans Transition?",
    views: 76113,
    likes: 16327,
    comments: 462,
    shares: 364,
    engagementRate: 22.536229027892738,
    date: "2025-04-14T10:30:04.000Z",
  } as const

  const nf = new Intl.NumberFormat("fr-FR", { notation: "compact", compactDisplay: "short" })
  const long = new Intl.NumberFormat("fr-FR")
  const dateStr = new Date(stats.date).toLocaleDateString("fr-FR", { year: "numeric", month: "short", day: "2-digit" })

  const videoRef = React.useRef<HTMLVideoElement | null>(null)
  const [isMuted, setIsMuted] = React.useState(true)
  const [isPlaying, setIsPlaying] = React.useState(true)
  const [isLoop, setIsLoop] = React.useState(true)
  const [duration, setDuration] = React.useState(0)
  const [currentTime, setCurrentTime] = React.useState(0)

  React.useEffect(() => {
    const v = videoRef.current
    if (!v) return
    v.muted = isMuted
    v.loop = isLoop
    const run = async () => { try { isPlaying ? await v.play() : v.pause() } catch {} }
    run()
  }, [isMuted, isPlaying, isLoop])

  React.useEffect(() => {
    const v = videoRef.current
    if (!v) return
    const onLoaded = () => setDuration(v.duration || 0)
    const onTime = () => setCurrentTime(v.currentTime || 0)
    const onPlay = () => setIsPlaying(true)
    const onPause = () => setIsPlaying(false)
    v.addEventListener("loadedmetadata", onLoaded)
    v.addEventListener("timeupdate", onTime)
    v.addEventListener("play", onPlay)
    v.addEventListener("pause", onPause)
    return () => {
      v.removeEventListener("loadedmetadata", onLoaded)
      v.removeEventListener("timeupdate", onTime)
      v.removeEventListener("play", onPlay)
      v.removeEventListener("pause", onPause)
    }
  }, [])

  // gradient fallback si --grad-1 n’est pas défini
  const GRADIENT = "var(--grad-1, linear-gradient(90deg,#ff4dd8 0%,#8a7bff 50%,#ff4dd8 100%))"

  return (
    <Section className="relative overflow-visible pt-16 pb-10">
      {/* === FULL-PAGE BACKDROP — 1 seul bloc, visible (z-0) === */}
     {/* === FULL-PAGE BACKDROP — 1 seul bloc, visible (z-0) === */}
      <div aria-hidden className="pointer-events-none fixed inset-0 z-0">
        {/* halo central (statique) */}
        <div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 
                    w-[50vw] h-[50vh] rounded-[50%] blur-[160px] opacity-[0.12]"
          style={{ background: GRADIENT, mixBlendMode: "screen" }}
        />

        {/* halo haut-droite (statique) */}
        <div
          className="absolute right-[5vw] top-[5vh] w-[18vw] h-[18vw] 
                    rounded-[45%] blur-[90px] opacity-[0.16]"
          style={{ background: GRADIENT, mixBlendMode: "screen" }}
        />

        {/* halo bas-gauche (statique) */}
        <div
          className="absolute left-[5vw] bottom-[5vh] w-[20vw] h-[20vw] 
                    rounded-[55%] blur-[100px] opacity-[0.18]"
          style={{ background: GRADIENT, mixBlendMode: "screen" }}
        />

        {/* grain doux */}
        <div
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage:
              "url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQAAAAEACAYAAABccqhmAAAACXBIWXMAAAsSAAALEgHS3X78AAABcUlEQVR4nO3QMQEAAAjAMMC/5Q0YkW5qgq1m5wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAPxX4b4AAf5qzXsAAAAASUVORK5CYII=')",
            backgroundSize: "256px 256px",
            mixBlendMode: "overlay",
          }}
        />

      </div>

      {/* === HERO GRID === */}
      <div className="relative z-10 grid items-center gap-8 lg:grid-cols-2">
        {/* LEFT: TEXT */}
        <div className="relative">
          <div className="mt-4">
            {/* Invert logo only in light mode for contrast */}
            <Image
              src="/logo-fusee.png"
              alt="Sans Transition"
              width={415}
              height={150}
              priority
              className="invert dark:invert-0"
            />
          </div>
          <h1 className="mt-4 text-4xl font-extrabold leading-[1.05] tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            Média de lutte
            <span
              className="block text-transparent [background:var(--grad-1)]"
              style={{ WebkitBackgroundClip: "text", backgroundClip: "text", WebkitTextFillColor: "transparent" }}
            >
              par et pour les minorités.
            </span>
          </h1>
          <p className="mt-4 max-w-xl text-muted-foreground">
            On vulgarise la politique sans bullsh*t : Fokus, Hedito, L&apos;Œil d&apos;Amandine & Lucho, portraits, mini-séries.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <HoverLift>
              <Button
                variant="brand"
                size="md"
                className="h-11 rounded-2xl px-5 text-[15px] text-white"
              >
                <Link
                  href="#videos-youtube"
                  className="inline-flex items-center gap-1"
                >
                  Regarder les vidéos
                  <ArrowRight className="h-4 w-4 shrink-0" />
                </Link>
              </Button>
            </HoverLift>
            <Button asChild variant="white" size="md" className="h-11 rounded-2xl px-5 text-[15px]">
              <Link href="#videos-tiktok">Vidéos TikTok</Link>
            </Button>
          </div>
          <div className="mt-6 flex items-center gap-4 text-muted-foreground">
            <a href="https://youtube.com/@SansTransitionMedia" target="_blank" rel="noreferrer" className="hover:text-foreground"><Youtube className="h-5 w-5" /></a>
            <a href="https://instagram.com/sanstransition__" target="_blank" rel="noreferrer" className="hover:text-foreground"><Instagram className="h-5 w-5" /></a>
            <a href="https://x.com/sanstransition_" target="_blank" rel="noreferrer" className="hover:text-foreground"><Twitter className="h-5 w-5" /></a>
            <a aria-label="TikTok" href="https://tiktok.com/@sanstransition" target="_blank" rel="noreferrer" className="hover:opacity-80">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" className="h-5 w-5 fill-current text-muted-foreground hover:text-foreground">
                <path d="M224 88.4c-23.6 0-42.8-19.2-42.8-42.8V32h-36.6v132.1c0 19.7-16 35.7-35.7 35.7s-35.7-16-35.7-35.7 16-35.7 35.7-35.7c2.4 0 4.7.2 6.9.7V92.6c-2.3-.3-4.6-.5-6.9-.5-39.8 0-72.2 32.4-72.2 72.2S70.4 236.5 110.2 236.5c39.8 0 72.2-32.4 72.2-72.2v-56c12.1 8.7 26.9 13.9 42.8 13.9v-33.8z" />
              </svg>
            </a>
          </div>
        </div>

        {/* RIGHT: VIDEO */}
        <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6, delay: 0.05 }} className="relative">
          <div className="relative h-full w-full overflow-hidden rounded-3xl border border-border bg-card">
            <video
              ref={videoRef}
              src="/videos/hero.mp4"
              autoPlay
              muted
              loop
              playsInline
              className="h-full w-full object-cover"
              onClick={() => setIsPlaying((p) => !p)}
            />
            {/* overlay actions */}
            <div className="absolute inset-0">
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-black/80 to-transparent" />
              <div className="pointer-events-none absolute right-3 bottom-24 flex flex-col items-center gap-4 text-white drop-shadow-[0_1px_8px_rgba(0,0,0,0.6)]">
                <div className="flex flex-col items-center"><Heart className="h-6 w-6" /><span className="mt-1 text-xs">{nf.format(stats.likes)}</span></div>
                <div className="flex flex-col items-center"><MessageCircle className="h-6 w-6" /><span className="mt-1 text-xs">{nf.format(stats.comments)}</span></div>
                <div className="flex flex-col items-center"><Share2 className="h-6 w-6" /><span className="mt-1 text-xs">{nf.format(stats.shares)}</span></div>
              </div>
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/30">
                <div className="h-full bg-white" style={{ width: `${duration ? (currentTime / duration) * 100 : 0}%` }} />
              </div>
              <div className="absolute bottom-4 right-3 z-20 flex items-center gap-2">
                <button onClick={() => setIsPlaying((p) => !p)} className="rounded-full bg-black/60 p-2 text-white hover:bg-black/80">
                  {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                </button>
                <button onClick={() => setIsMuted((m) => !m)} className="rounded-full bg-black/60 p-2 text-white hover:bg-black/80">
                  {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                </button>
                <button onClick={() => setIsLoop((l) => !l)} className={`rounded-full p-2 ${isLoop ? "bg-white/80 text-black" : "bg-black/60 text-white"}`}>
                  <Repeat className="h-4 w-4" />
                </button>
              </div>
              <div className="pointer-events-none absolute bottom-4 left-4 right-24 space-y-1 text-white drop-shadow-[0_1px_8px_rgba(0,0,0,0.6)]">
                <div className="flex items-center gap-2 text-[11px] text-white/90">
                  <Eye className="h-4 w-4" />
                  <span>{long.format(stats.views)} vues</span>
                  <span>•</span><span>{dateStr}</span>
                  <span>•</span><span>ER {stats.engagementRate.toFixed(1)}%</span>
                </div>
                <p className="text-sm font-semibold leading-snug">{stats.title}</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </Section>
  )
}
