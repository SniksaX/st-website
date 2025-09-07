"use client"

import Link from "next/link"
import { useEffect, useMemo, useRef, useState } from "react"

export default function Home() {
  const [activeSection, setActiveSection] = useState("")
  const sectionsRef = useRef<(HTMLElement | null)[]>([])

  const videos = [
    { id: "7546332456819952918", title: "Aidez Abood. Tous les yeux rivés sur la Global Sumud Flotilla.", date: "2025-09-04T20:24:06.000Z", views: 3718, likes: 1537, comments: 125, shares: 197 },
    { id: "7545046171476086038", title: "Bayrou le 8, Macron le 10 septembre. ITW avec Danièle Obono.", date: "2025-09-01T09:12:41.000Z", views: 834, likes: 187, comments: 8, shares: 0 },
    { id: "7544690787401960726", title: "ITW Danièle Obono : Palestine & responsabilité des gouvernements.", date: "2025-08-31T10:13:38.000Z", views: 4369, likes: 1495, comments: 44, shares: 22 },
    { id: "7544320076745329942", title: "FOKUS — La colère des peuples (s/o TOAM)", date: "2025-08-30T10:15:04.000Z", views: 3269, likes: 1046, comments: 24, shares: 21 },
    { id: "7544070377266269462", title: "FOKUS — ChatControl, future arme de surveillance de l'UE", date: "2025-08-29T18:06:04.000Z", views: 3154, likes: 973, comments: 43, shares: 63 },
    { id: "7542330697876269861", title: "Pi (rentrée) — Chasse aux Noirs, Microsoft/ONU, actu internationale.", date: "2025-08-25T18:00:09.000Z", views: 1512, likes: 460, comments: 16, shares: 5 },
    { id: "7539200312406576406", title: "FOKUS — militarisation actuelle aux USA", date: "2025-08-16T15:07:47.000Z", views: 5025, likes: 1454, comments: 55, shares: 30 },
    { id: "7533915166119890198", title: "Aidez Abood — partagez, commentez, followez", date: "2025-08-02T09:18:45.000Z", views: 162167, likes: 51651, comments: 9052, shares: 10302 },
  ] as const

const mediaFormats = [
{
title: "Fokus",
description:
"Décryptages politiques sans filtre. On expose les mécanismes (lois, institutions, lobbies, finance), on remonte aux sources, on montre l’impact concret sur nos vies et on termine par une position politique + pistes d’action.",
},
{
title: "L’Œil d’Amandine",
description:
"Analyses féministes de l’actualité. Lecture radicale des rapports de pouvoir, mise en avant des luttes de terrain et des enjeux de genre.",
},
{
title: "L’Œil de Lucho",
description:
"Rappels historiques et analyses politiques. Contextualisation des luttes, mémoire des mouvements sociaux et pédagogie accessible.",
},
{
title: "Hedito",
description:
"Éditoriaux d’Hedi (60–180 s). Ton radical et personnel, émotions assumées, pédagogie claire, punchlines clipables, ouverture au débat et appel à contribution.",
},
{
title: "Interviews",
description:
"Entretiens longs avec des personnalités de la gauche et des mouvements sociaux. Questions directes, contradictions posées, recherche de la phrase forte en 20 s, extraits dédiés pour TikTok/Shorts.",
},
{
title: "Mikro",
description:
"Micro-trottoirs et reportages terrain (manifs, piquets, forums). On recueille des paroles diverses, on capte l’ambiance (chants, slogans), montage nerveux mais respectueux, et on politise par contraste avec le quotidien.",
},
] as const

  // --- THEME ------------------------------------------------------------
  useEffect(() => {
    document.documentElement.classList.add("dark")
  }, [])

  // --- OBSERVER ---------------------------------------------------------
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-in-up")
            setActiveSection((entry.target as HTMLElement).id)
          }
        })
      },
      { threshold: 0.3, rootMargin: "0px 0px -20% 0px" },
    )

    sectionsRef.current.forEach((section) => section && observer.observe(section))
    return () => observer.disconnect()
  }, [])

  const [currentSlide, setCurrentSlide] = useState(0)
  const nextSlide = () => setCurrentSlide((p) => (p + 1) % mediaFormats.length)
  const prevSlide = () => setCurrentSlide((p) => (p - 1 + mediaFormats.length) % mediaFormats.length)

  const formatDate = (iso: string) =>
    new Date(iso).toLocaleDateString("fr-FR", { day: "2-digit", month: "short", year: "numeric" })

  return (
    <div className="min-h-screen bg-background text-foreground relative">
      <nav className="fixed left-8 top-1/2 -translate-y-1/2 z-10 hidden lg:block">
        <div className="flex flex-col gap-4">
          {["intro", "work", "thoughts", "connect"].map((section) => (
            <button
              key={section}
              onClick={() => document.getElementById(section)?.scrollIntoView({ behavior: "smooth" })}
              className={`w-2 h-8 rounded-full transition-all duration-500 ${
                activeSection === section ? "bg-foreground" : "bg-muted-foreground/30 hover:bg-muted-foreground/60"
              }`}
              aria-label={`Naviguer vers ${section}`}
            />
          ))}
        </div>
      </nav>

      <main className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-16">
        {/* Intro */}
        <header id="intro" ref={(el) => (sectionsRef.current[0] = el)} className="min-h-screen flex items-center opacity-0">
          <div className="grid lg:grid-cols-5 gap-12 sm:gap-16 w-full">
            <div className="lg:col-span-3 space-y-6 sm:space-y-8">
              <div className="space-y-3 sm:space-y-2">
                <div className="text-sm text-muted-foreground font-mono tracking-wider">SANS TRANSITION / 2025</div>
                <h1 className="text-5xl sm:text-6xl lg:text-7xl font-light tracking-tight">
                  Sans
                  <br />
                  <span className="text-muted-foreground">Transition</span>
                </h1>
              </div>

              <div className="space-y-6 max-w-md">
                <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed">
                  Média radical, On fabrique des formats qui politisent sans bullshit :
                  <span className="text-foreground"> Fokus</span>,<span className="text-foreground"> Hedito</span>,
                  <span className="text-foreground"> L’Œil</span>, interviews et micro-trottoirs.
                </p>

                <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    Ouvert·es aux collabs
                  </div>
                  <div>Paris, France</div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-2 flex flex-col justify-end space-y-6 sm:space-y-8 mt-8 lg:mt-0">
              <div className="space-y-4">
                <div className="text-sm text-muted-foreground font-mono">ACTUELLEMENT</div>
                <div className="space-y-2">
                  <div className="text-foreground">Sans Transition — média radical indépendant</div>
                  <div className="text-muted-foreground">Hedi (+ Amandine, Lucho, Fraise)</div>
                  <div className="text-xs text-muted-foreground">27 févr. 2025 — Présent</div>
                </div>
              </div>

            </div>
          </div>
        </header>

        {/* Work — Formats carousel (no images) */}
        <section id="work" ref={(el) => (sectionsRef.current[1] = el)} className="min-h-screen py-20 sm:py-32 opacity-0">
          <div className="space-y-12 sm:space-y-16">
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
              <h2 className="text-3xl sm:text-4xl font-light">Nos formats</h2>
              <div className="text-sm text-muted-foreground font-mono">2025</div>
            </div>

            <div className="relative">
              <button onClick={() => setCurrentSlide((p) => (p - 1 + mediaFormats.length) % mediaFormats.length)} className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 p-3 rounded-full border border-border bg-background/80 backdrop-blur-sm hover:border-muted-foreground/50 hover:bg-background transition-all duration-300 group" aria-label="Slide précédent">
                <svg className="w-5 h-5 text-muted-foreground group-hover:text-foreground transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
              </button>
              <button onClick={() => setCurrentSlide((p) => (p + 1) % mediaFormats.length)} className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 p-3 rounded-full border border-border bg-background/80 backdrop-blur-sm hover:border-muted-foreground/50 hover:bg-background transition-all duration-300 group" aria-label="Slide suivant">
                <svg className="w-5 h-5 text-muted-foreground group-hover:text-foreground transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
              </button>

              <div className="overflow-hidden rounded-2xl">
                <div className="flex transition-transform duration-500 ease-in-out" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
                  {mediaFormats.map((format, index) => (
                    <div key={index} className="w-full flex-shrink-0 px-2">
                      <div className="group p-8 border border-border rounded-2xl hover:border-muted-foreground/50 transition-all duration-500 hover:shadow-2xl bg-background/50 backdrop-blur-sm">
                        <div className="space-y-5">
                          <h3 className="text-2xl sm:text-3xl font-light group-hover:text-muted-foreground transition-colors duration-300">{format.title}</h3>
                          <p className="text-muted-foreground leading-relaxed text-lg">{format.description}</p>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground group-hover:text-foreground transition-colors duration-300">
                            <span>Découvrir</span>
                            <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-center gap-3 mt-8">
                {mediaFormats.map((_, index) => (
                  <button key={index} onClick={() => setCurrentSlide(index)} className={`w-2 h-2 rounded-full transition-all duration-300 ${currentSlide === index ? "bg-foreground w-8" : "bg-muted-foreground/30 hover:bg-muted-foreground/60"}`} aria-label={`Aller au slide ${index + 1}`} />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Thoughts — Dernières vidéos (liens TikTok réels) */}
        <section id="thoughts" ref={(el) => (sectionsRef.current[2] = el)} className="min-h-screen py-20 sm:py-32 opacity-0">
          <div className="space-y-12 sm:space-y-16">
            <h2 className="text-3xl sm:text-4xl font-light">Dernières vidéos</h2>

            <div className="grid gap-6 sm:gap-8 lg:grid-cols-2">
              {videos.map((v) => (
                <article key={v.id} className="group p-6 sm:p-8 border border-border rounded-lg hover:border-muted-foreground/50 transition-all duration-500 hover:shadow-lg">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between text-xs text-muted-foreground font-mono">
                      <span>{formatDate(v.date)}</span>
                      <span>
                        {new Intl.NumberFormat("fr-FR").format(v.views)} vues · {new Intl.NumberFormat("fr-FR").format(v.likes)} ❤
                      </span>
                    </div>

                    <h3 className="text-lg sm:text-xl font-medium group-hover:text-muted-foreground transition-colors duration-300">
                      {v.title}
                    </h3>

                    <Link href={`https://www.tiktok.com/@sanstransition/video/${v.id}`} target="_blank" className="flex items-center gap-2 text-sm text-muted-foreground group-hover:text-foreground transition-colors duration-300">
                      <span>Voir sur TikTok</span>
                      <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Connect */}
        <section id="connect" ref={(el) => (sectionsRef.current[3] = el)} className="py-20 sm:py-32 opacity-0">
          <div className="grid lg:grid-cols-2 gap-12 sm:gap-16">
            <div className="space-y-6 sm:space-y-8">
              <h2 className="text-3xl sm:text-4xl font-light">Contact</h2>

              <div className="space-y-6">
                <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed">
                  On explore les collabs, interviews et formats communs. Passe dire bonjour — ou propose un sujet.
                </p>

                <div className="space-y-4">
                  <Link href="mailto:sanstransitionmedia@gmail.com" className="group flex items-center gap-3 text-foreground hover:text-muted-foreground transition-colors duration-300">
                    <span className="text-base sm:text-lg">sanstransitionmedia@gmail.com</span>
                    <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                  </Link>
                  <div className="text-sm text-muted-foreground">
                    Formulaire en bio dispo si tu préfères. Ou directement ici :
                    <a className="underline ml-1" href="https://docs.google.com/forms/d/e/1FAIpQLSdNj86zWMaeIupWpkuGcjmmfHlgLXXxBP-ccf4s1JPfCYQfIQ/viewform" target="_blank" rel="noreferrer">proposer un sujet / témoigner</a>.
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-6 sm:space-y-8">
              <div className="text-sm text-muted-foreground font-mono">AILLEURS</div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { name: "TikTok", handle: "@sanstransition", url: "https://www.tiktok.com/@sanstransition" },
                  { name: "YouTube", handle: "@SansTransitionMedia", url: "https://www.youtube.com/@SansTransitionMedia" },
                  { name: "Instagram", handle: "@sanstransition__", url: "https://instagram.com/sanstransition__" },
                  { name: "X", handle: "@sanstransition_", url: "https://x.com/sanstransition_" },
                ].map((social) => (
                  <Link key={social.name} href={social.url} className="group p-4 border border-border rounded-lg hover:border-muted-foreground/50 transition-all duration-300 hover:shadow-sm">
                    <div className="space-y-2">
                      <div className="text-foreground group-hover:text-muted-foreground transition-colors duration-300">{social.name}</div>
                      <div className="text-sm text-muted-foreground">{social.handle}</div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-12 sm:py-16 border-t border-border">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 sm:gap-8">
            <div className="space-y-2">
              <div className="text-sm text-muted-foreground">© 2025 Sans Transition. Tous droits réservés.</div>
              <div className="text-xs text-muted-foreground">Construit avec v0.dev par Sans Transition</div>
            </div>
            <div className="flex items-center gap-4">
              <button className="group p-3 rounded-lg border border-border hover:border-muted-foreground/50 transition-all duration-300">
                <svg className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
              </button>
            </div>
          </div>
        </footer>
      </main>

      <div className="fixed bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background via-background/80 to-transparent pointer-events-none"></div>
    </div>
  )
}
