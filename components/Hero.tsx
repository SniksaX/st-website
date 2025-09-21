"use client"
import Link from "next/link"
import React from 'react';
import Image from 'next/image';
import Section from './Section';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight, Heart, MessageCircle, Share2, Eye, Volume2, VolumeX, Pause, Play, Repeat, Youtube, Instagram, Twitter } from 'lucide-react';
import { HoverLift } from "./HoverLift";


export default function Hero() {
  const stats = {
    id: '7493114184964574486',
    title: "Pourquoi est-ce que j’ai créé Sans Transition?",
    views: 76113,
    likes: 16327,
    comments: 462,
    shares: 364,
    engagementRate: 22.536229027892738,
    date: '2025-04-14T10:30:04.000Z',
  } as const;

  const nf = new Intl.NumberFormat('fr-FR', { notation: 'compact', compactDisplay: 'short' });
  const long = new Intl.NumberFormat('fr-FR');
  const dateStr = new Date(stats.date).toLocaleDateString('fr-FR', { year: 'numeric', month: 'short', day: '2-digit' });

  const videoRef = React.useRef<HTMLVideoElement | null>(null);
  const [isMuted, setIsMuted] = React.useState(true);
  const [isPlaying, setIsPlaying] = React.useState(true);
  const [isLoop, setIsLoop] = React.useState(true);
  const [duration, setDuration] = React.useState(0);
  const [currentTime, setCurrentTime] = React.useState(0);

  React.useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = isMuted;
    v.loop = isLoop;
    const run = async () => { try { isPlaying ? await v.play() : v.pause(); } catch {} };
    run();
  }, [isMuted, isPlaying, isLoop]);

  React.useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    const onLoaded = () => setDuration(v.duration || 0);
    const onTime = () => setCurrentTime(v.currentTime || 0);
    const onPlay = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);
    v.addEventListener('loadedmetadata', onLoaded);
    v.addEventListener('timeupdate', onTime);
    v.addEventListener('play', onPlay);
    v.addEventListener('pause', onPause);
    return () => {
      v.removeEventListener('loadedmetadata', onLoaded);
      v.removeEventListener('timeupdate', onTime);
      v.removeEventListener('play', onPlay);
      v.removeEventListener('pause', onPause);
    };
  }, []);

  return (
    <Section className="pt-16 pb-10">
      <div className="grid lg:grid-cols-2 gap-8 items-center">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <Image src="/logo-flat.png" alt="Sans Transition" width={420} height={120} priority />
         <h1 className="mt-4 text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-[1.05] tracking-tight text-white">
            Média de lutte
            <span
              className="block text-transparent [background:var(--grad-1)]"
              style={{
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              par et pour les minorités.
            </span>
          </h1>
          <p className="mt-4 text-neutral-200 max-w-xl">
            On vulgarise la politique sans bullsh*t : Fokus, Hedito, L&apos;Œil d&apos;Amandine & Lucho, portraits, mini-séries.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
          <HoverLift>
              <Button
                variant="brand"
                size="md"
                className="rounded-2xl h-11 px-5 text-[15px] text-white"
              >
                Regarder les vidéos <ArrowRight className="ml-1 h-4 w-4 shrink-0" />
              </Button>
            </HoverLift>

            <Button
              asChild
              variant="white"             // ⬅️ maintenant blanc garanti (pas de gradient)
              size="md"
              className="rounded-2xl h-11 px-5 text-[15px]"
            >
              <Link href="#videos-tiktok">Vidéos TikTok</Link>
            </Button>
          </div>
          <div className="mt-6 flex items-center gap-4 text-neutral-300">
            <a href="https://youtube.com/@SansTransitionMedia" target="_blank" rel="noreferrer" className="hover:text-white"><Youtube className="h-5 w-5" /></a>
            <a href="https://instagram.com/sanstransition__" target="_blank" rel="noreferrer" className="hover:text-white"><Instagram className="h-5 w-5" /></a>
            <a href="https://x.com/sanstransition_" target="_blank" rel="noreferrer" className="hover:text-white"><Twitter className="h-5 w-5" /></a>
            <a
                aria-label="TikTok"
                href="https://tiktok.com/@sanstransition"
                target="_blank"
                rel="noreferrer"
                className="hover:opacity-80"
            >
                <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 256 256"
                className="h-5 w-5 fill-white"
                >
                <path d="M224 88.4c-23.6 0-42.8-19.2-42.8-42.8V32h-36.6v132.1c0 19.7-16 35.7-35.7 35.7s-35.7-16-35.7-35.7 16-35.7 35.7-35.7c2.4 0 4.7.2 6.9.7V92.6c-2.3-.3-4.6-.5-6.9-.5-39.8 0-72.2 32.4-72.2 72.2S70.4 236.5 110.2 236.5c39.8 0 72.2-32.4 72.2-72.2v-56c12.1 8.7 26.9 13.9 42.8 13.9v-33.8z"/>
                </svg>
            </a>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6, delay: 0.05 }} className="relative">
          <div className="rounded-3xl overflow-hidden border border-neutral-900 w-full h-full relative bg-black">
            <video
              ref={videoRef}
              src="/videos/hero.mp4"
              autoPlay muted loop playsInline
              className="w-full h-full object-cover"
              onClick={() => setIsPlaying(p => !p)}
            />

            {/* overlay actions */}
            <div className="absolute inset-0">
              <div className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-black/80 to-transparent pointer-events-none" />
              <div className="absolute right-3 bottom-24 flex flex-col items-center gap-4 text-white drop-shadow-[0_1px_8px_rgba(0,0,0,0.6)] pointer-events-none">
                <div className="flex flex-col items-center"><Heart className="h-6 w-6" /><span className="text-xs mt-1">{nf.format(stats.likes)}</span></div>
                <div className="flex flex-col items-center"><MessageCircle className="h-6 w-6" /><span className="text-xs mt-1">{nf.format(stats.comments)}</span></div>
                <div className="flex flex-col items-center"><Share2 className="h-6 w-6" /><span className="text-xs mt-1">{nf.format(stats.shares)}</span></div>
              </div>

              {/* progress bar full bottom */}
              <div className="absolute left-0 right-0 bottom-0 h-1 bg-white/30">
                <div className="h-full bg-white" style={{ width: `${duration ? (currentTime / duration) * 100 : 0}%` }} />
              </div>

              {/* controls */}
              <div className="absolute right-3 bottom-4 flex items-center gap-2 z-20 pointer-events-auto">
                <button onClick={() => setIsPlaying(p => !p)} className="bg-black/60 hover:bg-black/80 text-white p-2 rounded-full">
                  {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                </button>
                <button onClick={() => setIsMuted(m => !m)} className="bg-black/60 hover:bg-black/80 text-white p-2 rounded-full">
                  {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                </button>
                <button onClick={() => setIsLoop(l => !l)} className={`p-2 rounded-full ${isLoop ? 'bg-white/80 text-black' : 'bg-black/60 text-white'}`}>
                  <Repeat className="h-4 w-4" />
                </button>
              </div>

              {/* meta caption */}
              <div className="absolute left-4 right-24 bottom-4 text-white space-y-1 drop-shadow-[0_1px_8px_rgba(0,0,0,0.6)] pointer-events-none">
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
  );
}
