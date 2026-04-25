"use client"

import type React from "react"
import Link from "next/link"
import { motion, useReducedMotion } from "framer-motion"
import { Instagram, Youtube, Twitter, Mail, Heart, MessageSquare, Globe, ArrowUpRight } from "lucide-react"
import HelloAssoWidget from "@/components/HelloAssoWidget"
import DonProgress from "@/components/DonProgress"
import SectionHeading from "@/components/SectionHeading"

// --- Brand TikTok icon kept from v1
const TikTokIcon = ({ className = "" }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" className={`fill-current ${className}`} aria-hidden>
    <path d="M224 88.4c-23.6 0-42.8-19.2-42.8-42.8V32h-36.6v132.1c0 19.7-16 35.7-35.7 35.7s-35.7-16-35.7-35.7 16-35.7 35.7-35.7c2.4 0 4.7.2 6.9.7V92.6c-2.3-.3-4.6-.5-6.9-.5-39.8 0-72.2 32.4-72.2 72.2S70.4 236.5 110.2 236.5c39.8 0 72.2-32.4 72.2-72.2v-56c12.1 8.7 26.9 13.9 42.8 13.9v-33.8z" />
  </svg>
)

// --- Types
type Network = { label: string; href: string; Icon: React.ComponentType<{ className?: string }>; handle?: string }

const networks: Network[] = [
  { label: "TikTok", href: "https://tiktok.com/@sanstransition", Icon: TikTokIcon, handle: "@sanstransition" },
  { label: "Instagram", href: "https://instagram.com/sanstransition__", Icon: Instagram, handle: "@sanstransition__" },
  { label: "Twitter", href: "https://x.com/sanstransition_", Icon: Twitter, handle: "@sanstransition_" },
  { label: "YouTube", href: "https://youtube.com/@SansTransitionMedia", Icon: Youtube, handle: "@SansTransitionMedia" },
]

const resources: { label: string; href: string }[] = [
  { label: "Mentions légales", href: "/mentions-legales" },
  { label: "CGU", href: "/cgu" },
  { label: "Confidentialité", href: "/confidentialite" },
]

// --- UI primitives
const Section = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <div className={`rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.03] to-transparent p-4 shadow-lg shadow-black/10 backdrop-blur supports-[backdrop-filter]:bg-white/[0.03] ${className}`}>
    {children}
  </div>
)

const Tile = ({
  href,
  children,
  icon: Icon,
  meta,
  external = false,
  emphasis = false,
}: {
  href: string
  children: React.ReactNode
  icon?: React.ComponentType<{ className?: string }>
  meta?: string
  external?: boolean
  emphasis?: boolean
}) => {
  const prefersReduced = useReducedMotion()
  const Comp = external ? "a" : Link
  const common = "group relative flex items-center justify-between gap-3 rounded-xl border border-white/10 bg-white/[0.04] px-3 py-3 text-sm text-white/90 backdrop-blur transition focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40 hover:bg-white/[0.06]"
  const pulse = emphasis ? "after:absolute after:inset-0 after:-z-10 after:rounded-xl after:bg-gradient-to-r after:from-white/10 after:to-transparent" : ""

  return (
    <motion.div whileHover={prefersReduced ? undefined : { y: -2 }} transition={{ duration: 0.2 }}>
      {external ? (
        <a href={href} target="_blank" rel="noreferrer" className={`${common} ${pulse}`}>
          <div className="flex items-center gap-2">
            {Icon && <Icon className="h-4 w-4 opacity-80" />}
            <span className="font-medium">{children}</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-zinc-400">
            {meta && <span className="hidden sm:inline">{meta}</span>}
            <ArrowUpRight className="h-4 w-4" aria-hidden />
          </div>
        </a>
      ) : (
        <Link href={href} className={`${common} ${pulse}`}>
          <div className="flex items-center gap-2">
            {Icon && <Icon className="h-4 w-4 opacity-80" />}
            <span className="font-medium">{children}</span>
          </div>
          <ArrowUpRight className="h-4 w-4 text-zinc-400" aria-hidden />
        </Link>
      )}
    </motion.div>
  )
}

const Grid = ({ children }: { children: React.ReactNode }) => (
  <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">{children}</div>
)

const Stack = ({ children }: { children: React.ReactNode }) => (
  <div className="flex flex-col gap-2">{children}</div>
)

// --- Main component
export default function CompactLinksV2({ showDonations = true }: { showDonations?: boolean }) {
  return (
    <section className="w-full max-w-[120rem] mx-auto px-4 sm:px-6 lg:px-12 py-10">
      <SectionHeading
        kicker="Sans Transition"
        title="Liens & Contact"
        description="Tous les points d’entrée pour suivre ST, proposer une idée ou faire un don."
        className="mb-6"
      />

      <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(320px,0.9fr)]">
        {/* Left column */}
        <div className="flex flex-col gap-4">
          {/* Social */}
          <Section>
            <div className="mb-3 flex items-center gap-2">
              <Globe className="h-4 w-4 text-white/60" aria-hidden />
              <h3 className="text-xs font-semibold uppercase tracking-wide text-zinc-300">Réseaux sociaux</h3>
            </div>
            <Grid>
              {networks.map((n) => (
                <Tile key={n.label} href={n.href} external icon={n.Icon} emphasis>
                  {n.label}
                </Tile>
              ))}
            </Grid>
          </Section>

          {/* Solidarity */}
          <Section>
            <h3 className="mb-3 text-xs font-semibold uppercase tracking-wide text-zinc-300">Solidarité</h3>
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
              <Tile href="https://gofund.me/6e217b10a" external icon={Heart} emphasis>
                Aidez Abood
              </Tile>
              <Tile href="https://gofund.me/ed90a35c6" external icon={Heart} emphasis>
                Aidez Elodie
              </Tile>
            </div>
            <p className="mt-2 text-[11px] leading-relaxed text-zinc-400">
              Vos dons servent à des causes concrètes. Merci pour la force.
            </p>
          </Section>

          {/* Contact */}
          <Section>
            <h3 className="mb-3 text-xs font-semibold uppercase tracking-wide text-zinc-300">Contact</h3>
            <Stack>
              <Tile href="mailto:contact@sanstransition.fr" icon={Mail}>
                contact@sanstransition.fr
              </Tile>
              <Tile href="https://forms.gle/yoHVL6iKBi6Adz8T9" external icon={MessageSquare}>
                Proposer une idée / témoignage
              </Tile>
            </Stack>
          </Section>

          {/* Legal */}
          <Section>
            <h3 className="mb-3 text-xs font-semibold uppercase tracking-wide text-zinc-300">Informations légales</h3>
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
              {resources.map((r) => (
                <Tile key={r.label} href={r.href}>
                  {r.label}
                </Tile>
              ))}
            </div>
          </Section>

          {/* Don Progress */}
          <Section>
            <h3 className="mb-3 text-xs font-semibold uppercase tracking-wide text-zinc-300">Objectif 1000</h3>
            <DonProgress />
          </Section>
        </div>

        {/* Right column: Donation */}
        {showDonations && (
          <Section className="flex flex-col justify-center border border-white/10 bg-gradient-to-b from-white/[0.04] to-transparent px-4 py-5 text-white shadow-lg shadow-black/20">
            <div className="mb-3">
              <h3 className="mt-1 text-lg font-semibold tracking-tight">Soutenir Sans Transition</h3>
              <p className="text-xs text-white/70">Chaque don renforce l’indépendance de notre média. Paiement sécurisé via HelloAsso.</p>
            </div>
            <HelloAssoWidget className="w-full" />
          </Section>
        )}
      </div>
    </section>
  )
}
