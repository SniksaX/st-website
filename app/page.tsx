'use client'

import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { motion, useScroll, useSpring } from 'framer-motion'

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

type SectionConfig = {
  id: string
  label: string
  content: React.ReactNode
}

export default function Page() {
  const sections = useMemo<SectionConfig[]>(
    () => [
      { id: 'about', label: 'A propos', content: <AboutIntro /> },
      { id: 'liens', label: 'Liens', content: <Links /> },
      { id: 'videos-youtube', label: 'YouTube', content: <VideosYouTube /> },
      { id: 'formats', label: 'Formats', content: <Formats /> },
      { id: 'videos-tiktok', label: 'TikTok', content: <VideosTikTok /> },
      { id: 'founders', label: 'Fondateurs', content: <About /> },
      { id: 'stream', label: 'Agenda', content: <StreamCalendar /> },
      { id: 'campaign', label: 'Campagne', content: <Campaign /> },
    ],
    []
  )
  const [activeSection, setActiveSection] = useState(sections[0]?.id ?? 'about')
  const switcherRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const required = ['formats', 'videos-youtube', 'videos-tiktok', 'liens', 'campaign']
    const missing = required.filter((id) => !sections.some((section) => section.id === id))
    if (missing.length) console.error('Smoke test failed: missing sections:', missing)
  }, [sections])

  const handleSectionChange = useCallback(
    (id: string, options?: { updateHash?: boolean }) => {
      setActiveSection(id)

      if (options?.updateHash !== false && typeof window !== 'undefined') {
        const targetHash = `#${id}`
        if (window.location.hash !== targetHash) {
          window.history.replaceState(null, '', targetHash)
        }
      }

      requestAnimationFrame(() => {
        switcherRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      })
    },
    []
  )

  useEffect(() => {
    if (typeof window === 'undefined') return

    const syncFromHash = () => {
      const target = window.location.hash.replace('#', '')
      if (!target) return
      const hasSection = sections.some((section) => section.id === target)
      if (hasSection) {
        handleSectionChange(target, { updateHash: false })
      }
    }

    syncFromHash()
    window.addEventListener('hashchange', syncFromHash)
    return () => window.removeEventListener('hashchange', syncFromHash)
  }, [sections, handleSectionChange])

  const activeSectionData = sections.find((section) => section.id === activeSection) ?? sections[0]

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

        <section
          id="section-switcher"
          ref={switcherRef}
          className="sticky top-[62px] z-40 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80"
        >
          <div className="mx-auto flex max-w-5xl flex-wrap gap-2 px-3 py-3 text-xs sm:text-sm">
            {sections.map((section, index) => {
              const isActive = section.id === activeSection
              return (
                <button
                  key={section.id}
                  type="button"
                  onClick={() => handleSectionChange(section.id)}
                  className={`flex items-center gap-1.5 rounded-2xl border px-3 py-1.5 font-medium transition focus:outline-none focus-visible:ring-2 focus-visible:ring-ring/50 ${
                    isActive
                      ? 'border-foreground bg-foreground text-background shadow-lg'
                      : 'border-border bg-muted/40 text-muted-foreground hover:bg-muted/70'
                  }`}
                >
                  <span className="text-[0.65rem] uppercase tracking-[0.18em] text-muted-foreground">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  {section.label}
                </button>
              )
            })}
          </div>
        </section>

        <div id="sections-hub" className="relative">
          {activeSectionData && (
            <>
              <Separator className="bg-border" />
              <section id={activeSection} className="scroll-mt-24">
                {activeSectionData.content}
              </section>
            </>
          )}
        </div>

        <Footer />
      </main>

      <BackToTop />
    </div>
  )
}


