"use client"

import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"

const navItems = [
  { id: "hero", label: "Accueil" },
  { id: "videos", label: "Vidéos" },
  { id: "formats", label: "Formats" },
  { id: "about", label: "À Propos" },
]

export function StickyHeader() {
  const [activeSection, setActiveSection] = useState("hero")

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        })
      },
      { threshold: 0.3 },
    )

    navItems.forEach(({ id }) => {
      const element = document.getElementById(id)
      if (element) observer.observe(element)
    })

    return () => observer.disconnect()
  }, [])

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <header className="fixed top-4 left-1/2 -translate-x-1/2 z-50">
      <nav className="bg-black/20 backdrop-blur-md border border-[#8B5CF6]/20 rounded-full px-6 py-3">
        <ul className="flex items-center gap-8 relative">
          {navItems.map(({ id, label }) => (
            <li key={id} className="relative">
              <button
                onClick={() => scrollToSection(id)}
                className={cn(
                  "px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 relative z-10",
                  activeSection === id ? "text-white" : "text-[#737373] hover:text-[#E5E5E5]",
                )}
              >
                {label}
              </button>
              {activeSection === id && (
                <div className="absolute inset-0 bg-[#F97316] rounded-full transition-all duration-300" />
              )}
            </li>
          ))}
        </ul>
      </nav>
    </header>
  )
}
