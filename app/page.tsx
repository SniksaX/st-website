'use client'

import React, { useEffect, useState, useRef } from 'react'
import { motion, useScroll, useSpring, useReducedMotion } from 'framer-motion'

import Header from '@/components/Header'
import Hero from '@/components/Hero'
import Formats from '@/components/Formats'
import VideosYouTube from '@/components/VideosYouTube'
import VideosTikTok from '@/components/VideosTikTokFromJson'
import Links from '@/components/Links'
import Footer from '@/components/Footer'
import About from '@/components/About'
import Campaign from '@/components/Campaign'
import { Separator } from '@/components/ui/separator'
import { BackdropParallax } from '@/components/ScrollFx'
import StreamCalendar from '@/components/StreamCalendar'
import HelloAssoWidget from '@/components/HelloAssoWidget'
import AboutIntro from '@/components/AboutIntro'

// -- UI Enhancers ------------------------------------------------------------
function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 20, mass: 0.3 })
  return (
    <motion.div
      aria-hidden
      className="fixed left-0 right-0 top-0 z-[60] h-1 origin-left bg-gradient-to-r from-violet-600 via-fuchsia-500 to-orange-400 shadow-[0_0_12px_rgba(255,128,255,0.3)]"
      style={{ scaleX }}
      animate={{ opacity: [0.8, 1, 0.8] }}
      transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
    />
  )
}

function BackToTop() {
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 640)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className={`fixed bottom-6 right-6 z-[60] rounded-2xl px-4 py-3 text-sm font-medium shadow-xl backdrop-blur-md transition-all focus:outline-none focus:ring-2 focus:ring-ring/50 focus:ring-offset-2 focus:ring-offset-background ${
        visible ? 'pointer-events-auto opacity-100 bg-muted/90 text-foreground hover:bg-muted' : 'pointer-events-none opacity-0'
      }`}
      aria-label="Remonter en haut"
    >
      <span className="flex items-center gap-1">
        <span aria-hidden>↑</span>
        <span>Haut</span>
      </span>
    </button>
  )
}

function AmbientGlow() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 select-none">
      <motion.div
        className="absolute left-[-15%] top-[10%] h-80 w-80 rounded-full bg-violet-600/15 blur-3xl"
        animate={{ scale: [1, 1.1, 1], opacity: [0.25, 0.4, 0.25] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute right-[10%] top-[40%] h-96 w-96 rounded-full bg-fuchsia-500/10 blur-3xl"
        animate={{ scale: [1, 1.05, 1], opacity: [0.15, 0.25, 0.15] }}
        transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute bottom-[8%] left-[30%] h-[28rem] w-[28rem] rounded-full bg-orange-400/10 blur-3xl"
        animate={{ scale: [1, 1.08, 1], opacity: [0.1, 0.2, 0.1] }}
        transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }}
      />
    </div>
  )
}

// Motion section wrapper (respects reduced motion)
function MotionSection({ id, children }: { id: string; children: React.ReactNode }) {
  const prefersReducedMotion = useReducedMotion()
  const ref = useRef<HTMLDivElement | null>(null)
  return (
    <motion.section
      id={id}
      ref={ref}
      initial={prefersReducedMotion ? false : { opacity: 0, y: 24, scale: 0.98 }}
      whileInView={prefersReducedMotion ? {} : { opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: '-10% 0px -10% 0px' }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="scroll-mt-24"
    >
      {children}
    </motion.section>
  )
}

// Skip link for accessibility
function SkipLink() {
  return (
    <a
      href="#main"
      className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[70] focus:rounded-xl focus:bg-foreground focus:px-4 focus:py-2 focus:text-background focus:shadow-lg"
    >
      Aller au contenu
    </a>
  )
}

// FloatingCTA suppressed (unused)

export default function Page() {
  useEffect(() => {
    const required = ['formats', 'videos-youtube', 'videos-tiktok', 'liens', 'contact']
    const missing = required.filter((id) => !document.getElementById(id))
    if (missing.length) console.error('Smoke test failed: missing sections:', missing)
  }, [])

  return (
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-muted">
      <SkipLink />
      <ScrollProgress />
      <AmbientGlow />

      {/* background animÃ© (asymÃ©trique) */}
      <BackdropParallax />

      <Header />

      {/* Hero sans reveal (il est dÃ©jÃ  animÃ©) */}
      <main id="main" className="relative z-10">
        <Hero />

        <Separator className="bg-border" />

        <MotionSection id="about">
          <AboutIntro />
        </MotionSection>

        <Separator className="bg-border" />

        {/* Sections avec motion + ids pour la smoke test */}
        <MotionSection id="liens">
          <Links />
        </MotionSection>

        <Separator className="bg-border" />

        <MotionSection id="videos-youtube">
          <VideosYouTube />
        </MotionSection>

        <Separator className="bg-border" />

        <MotionSection id="formats">
          <Formats />
        </MotionSection>

        <Separator className="bg-border" />

        <MotionSection id="videos-tiktok">
          <VideosTikTok />
        </MotionSection>

        <Separator className="bg-border" />

        <MotionSection id="founders">
          <About />
        </MotionSection>

        <Separator className="bg-border" />

        <MotionSection id="stream">
          <StreamCalendar />
        </MotionSection>

        <Separator className="bg-border" />

        <MotionSection id="contact">
          <Campaign />
        </MotionSection>

        <Footer />
      </main>

      <BackToTop />
    </div>
  )
}


