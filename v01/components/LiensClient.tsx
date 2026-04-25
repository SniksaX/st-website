'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion, AnimatePresence, type Variants } from 'framer-motion'
import { Instagram, Youtube, Twitter, Mail, Heart, MessageSquare, Globe, ArrowUpRight, HandHeart, ChevronDown, BookOpen, ScrollText, Bell, X, Send, Check } from 'lucide-react'
import HelloAssoWidget from '@/components/HelloAssoWidget'
import { useState, type FormEvent } from 'react'

const TikTokIcon = ({ className = '' }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" className={`fill-current ${className}`} aria-hidden>
    <path d="M224 88.4c-23.6 0-42.8-19.2-42.8-42.8V32h-36.6v132.1c0 19.7-16 35.7-35.7 35.7s-35.7-16-35.7-35.7 16-35.7 35.7-35.7c2.4 0 4.7.2 6.9.7V92.6c-2.3-.3-4.6-.5-6.9-.5-39.8 0-72.2 32.4-72.2 72.2S70.4 236.5 110.2 236.5c39.8 0 72.2-32.4 72.2-72.2v-56c12.1 8.7 26.9 13.9 42.8 13.9v-33.8z" />
  </svg>
)

const socials = [
  { label: 'TikTok', href: 'https://tiktok.com/@sanstransition', Icon: TikTokIcon },
  { label: 'Instagram', href: 'https://instagram.com/sanstransition__', Icon: Instagram },
  { label: 'Twitter', href: 'https://x.com/sanstransition_', Icon: Twitter },
  { label: 'YouTube', href: 'https://youtube.com/@SansTransitionMedia', Icon: Youtube },
]

const baseButton =
  'group flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm font-semibold text-white/90 shadow-[0_18px_40px_rgba(0,0,0,0.25)] backdrop-blur transition hover:-translate-y-0.5 hover:bg-white/[0.07] hover:shadow-[0_24px_48px_rgba(0,0,0,0.35)]'

const containerMotion: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1], staggerChildren: 0.08 } },
}

const itemMotion: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } },
}

type FormState = 'idle' | 'loading' | 'success' | 'error' | 'existing'

function NewsletterModal({ onClose }: { onClose: () => void }) {
  const [email, setEmail] = useState('')
  const [state, setState] = useState<FormState>('idle')
  const [message, setMessage] = useState('')

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    if (!email.trim()) { setMessage('Entre une adresse email.'); setState('error'); return }
    setState('loading')
    try {
      const res = await fetch('/api/mailing-list/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
      const data = await res.json()
      if (!res.ok) { setState('error'); setMessage(data.error ?? 'Une erreur est survenue.'); return }
      if (data.alreadySubscribed) { setState('existing'); setMessage('Tu es déjà inscrit(e) !'); return }
      setState('success')
      setMessage('Tu es inscrit(e) à la newsletter.')
    } catch {
      setState('error')
      setMessage('Impossible de contacter le serveur.')
    }
  }

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-end justify-center sm:items-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Overlay */}
      <motion.div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      />

      {/* Panel */}
      <motion.div
        className="relative z-10 w-full max-w-md rounded-t-3xl sm:rounded-3xl bg-[#0f0f1a] border border-white/10 p-6 shadow-[0_-24px_80px_rgba(168,85,247,0.2)]"
        initial={{ y: 60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 60, opacity: 0 }}
        transition={{ type: 'spring', damping: 22, stiffness: 260 }}
      >
        {/* Gradient top bar */}
        <div className="absolute top-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-fuchsia-500/60 to-transparent rounded-full" />

        <button
          onClick={onClose}
          className="absolute right-4 top-4 rounded-full p-1.5 text-white/40 transition hover:bg-white/10 hover:text-white"
          aria-label="Fermer"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="mb-4 flex items-center gap-3">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-fuchsia-500 to-purple-600 shadow-[0_8px_24px_rgba(168,85,247,0.4)]">
            <Bell className="h-4 w-4 text-white" />
          </span>
          <div>
            <h2 className="text-base font-bold text-white">Newsletter Sans Transition</h2>
            <p className="text-xs text-white/50">Reçois nos prochaines infos directement.</p>
          </div>
        </div>

        {state === 'success' || state === 'existing' ? (
          <div className="flex flex-col items-center gap-3 py-4 text-center">
            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-fuchsia-500/15 text-fuchsia-400">
              <Check className="h-6 w-6" />
            </span>
            <p className="text-sm font-medium text-white">{message}</p>
            <button
              onClick={onClose}
              className="mt-1 rounded-full bg-white/10 px-5 py-2 text-xs font-semibold text-white transition hover:bg-white/20"
            >
              Fermer
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-3">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="email@exemple.com"
              aria-label="Adresse email"
              disabled={state === 'loading'}
              className="w-full rounded-xl border border-white/10 bg-white/[0.05] px-4 py-3 text-sm text-white placeholder-white/30 outline-none transition focus:border-fuchsia-500/50 focus:ring-2 focus:ring-fuchsia-500/20 disabled:opacity-50"
            />
            {state === 'error' && (
              <p className="text-xs text-rose-400">{message}</p>
            )}
            <button
              type="submit"
              disabled={state === 'loading'}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-fuchsia-500 via-purple-500 to-orange-400 px-4 py-3 text-sm font-bold text-white shadow-[0_8px_24px_rgba(168,85,247,0.35)] transition hover:-translate-y-0.5 hover:shadow-[0_12px_32px_rgba(168,85,247,0.5)] disabled:opacity-60 disabled:hover:translate-y-0"
            >
              {state === 'loading' ? (
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
              ) : (
                <Send className="h-4 w-4" />
              )}
              {state === 'loading' ? 'Envoi…' : "S'inscrire"}
            </button>
            <p className="text-center text-[10px] text-white/30">Pas de spam. Désinscription en un clic.</p>
          </form>
        )}
      </motion.div>
    </motion.div>
  )
}

export default function LiensClient() {
  const [showNewsletter, setShowNewsletter] = useState(false)

  return (
    <>
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute -left-24 top-10 h-72 w-72 rounded-full bg-fuchsia-500/25 blur-3xl" />
        <div className="absolute right-[-6rem] top-1/3 h-80 w-80 rounded-full bg-cyan-400/20 blur-3xl" />
        <div className="absolute left-1/2 top-[70%] h-96 w-96 -translate-x-1/2 rounded-full bg-orange-400/15 blur-[140px]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.06),transparent_55%)]" />
      </div>

      <motion.div className="relative mx-auto flex w-full max-w-xl flex-col gap-4 px-4 py-12" variants={containerMotion} initial="hidden" animate="show">
        <motion.div variants={itemMotion} className="flex justify-center">
          <div className="relative h-[120px] w-[200px] overflow-hidden">
            <Image
              src="/logo-flat.png"
              alt="Sans Transition"
              fill
              sizes="200px"
              className="object-cover object-center"
            />
            <span
              aria-hidden
              className="absolute inset-0 -z-10 rounded-full bg-gradient-to-r from-fuchsia-500 via-purple-500 to-orange-400 opacity-70 blur-2xl"
            />
          </div>
        </motion.div>

        <motion.div variants={itemMotion} className="flex items-center justify-between gap-3">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight text-white">Liens rapides</h1>
            <p className="mt-1 text-sm text-white/60">Tout l&apos;essentiel, en un tap.</p>
          </div>
          <Link
            href="/don"
            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-fuchsia-500 via-purple-500 to-orange-400 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-white shadow-[0_16px_36px_rgba(168,85,247,0.45)] transition hover:-translate-y-0.5 hover:shadow-[0_22px_44px_rgba(168,85,247,0.6)]"
          >
            Soutenir
            <ArrowUpRight className="h-4 w-4" aria-hidden />
          </Link>
        </motion.div>

        {/* Ligne 1: Site */}
        <motion.div variants={itemMotion}>
          <Link href="/" className={baseButton}>
          <span className="flex items-center gap-2">
            <Globe className="h-4 w-4 text-white/60" aria-hidden />
            sanstransition.fr
          </span>
          <ArrowUpRight
            className="h-4 w-4 text-white/60 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            aria-hidden
          />
          </Link>
        </motion.div>

        {/* Vidéo YouTube */}
        <motion.div variants={itemMotion}>
          <a href="https://www.youtube.com/watch?v=3-pBA4tpqVE" target="_blank" rel="noreferrer" className={baseButton}>
            <span className="flex items-center gap-2">
              <Youtube className="h-4 w-4 text-red-400/80" aria-hidden />
              Regarder notre dernière vidéo
            </span>
            <ArrowUpRight className="h-4 w-4 text-white/60 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden />
          </a>
        </motion.div>

        {/* Ligne 1b: Kit du Révolutionnaire */}
        <motion.div variants={itemMotion}>
          <Link href="/kit-revolutionnaire" className={baseButton}>
            <span className="flex items-center gap-2">
              <BookOpen className="h-4 w-4 text-white/60" aria-hidden />
              Kit du Révolutionnaire
            </span>
            <ArrowUpRight
              className="h-4 w-4 text-white/60 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              aria-hidden
            />
          </Link>
        </motion.div>

        {/* Ligne 2: Social icons */}
        <motion.div variants={itemMotion} className="grid grid-cols-4 gap-3">
          {socials.map((item) => (
            <a
              key={item.label}
              href={item.href}
              target="_blank"
              rel="noreferrer"
              className="group flex h-12 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04] text-sm font-semibold text-white/80 shadow-[0_18px_40px_rgba(0,0,0,0.25)] backdrop-blur transition hover:-translate-y-0.5 hover:bg-white/[0.08]"
              aria-label={item.label}
            >
              {item.Icon ? (
                <item.Icon className="h-5 w-5 transition group-hover:scale-110" />
              ) : (
                <span className="text-[11px]">TikTok</span>
              )}
            </a>
          ))}
        </motion.div>

        {/* Ligne 3: Abood / Elodie / Violences policières */}
        <motion.div variants={itemMotion} className="grid grid-cols-2 gap-3">
          <a href="https://gofund.me/6e217b10a" target="_blank" rel="noreferrer" className={baseButton}>
            <span className="flex items-center gap-2">
              <Heart className="h-4 w-4 text-white/60" aria-hidden />
              Aider Abood
            </span>
            <ArrowUpRight
              className="h-4 w-4 text-white/60 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              aria-hidden
            />
          </a>
          <a href="https://gofund.me/ed90a35c6" target="_blank" rel="noreferrer" className={baseButton}>
            <span className="flex items-center gap-2">
              <Heart className="h-4 w-4 text-white/60" aria-hidden />
              Aider Elodie
            </span>
            <ArrowUpRight
              className="h-4 w-4 text-white/60 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              aria-hidden
            />
          </a>
        </motion.div>


        {/* Ligne 4: Proposer un sujet */}
        <motion.div variants={itemMotion}>
          <a href="https://forms.gle/yoHVL6iKBi6Adz8T9" target="_blank" rel="noreferrer" className={baseButton}>
            <span className="flex items-center gap-2">
              <MessageSquare className="h-4 w-4 text-white/60" aria-hidden />
              Proposer un sujet ou témoigner
            </span>
            <ArrowUpRight
              className="h-4 w-4 text-white/60 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              aria-hidden
            />
          </a>
        </motion.div>

        {/* Newsletter — visible en local uniquement (NEXT_PUBLIC_NEWSLETTER_ENABLED) */}
        {process.env.NEXT_PUBLIC_NEWSLETTER_ENABLED === 'true' && (
          <motion.div variants={itemMotion}>
            <button onClick={() => setShowNewsletter(true)} className={`${baseButton} w-full`}>
              <span className="flex items-center gap-2">
                <Bell className="h-4 w-4 text-fuchsia-400/80" aria-hidden />
                S&apos;inscrire à la newsletter
              </span>
              <ArrowUpRight className="h-4 w-4 text-white/60 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden />
            </button>
          </motion.div>
        )}

        {/* Ligne 5: Mail */}
        <motion.div variants={itemMotion}>
          <a href="mailto:contact@sanstransition.fr" className={baseButton}>
            <span className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-white/60" aria-hidden />
              contact@sanstransition.fr
            </span>
            <ArrowUpRight
              className="h-4 w-4 text-white/60 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              aria-hidden
            />
          </a>
        </motion.div>

        {/* Soutenir (accordion card) */}
        <motion.div variants={itemMotion}>
          <details className="group rounded-2xl border border-white/10 bg-white/[0.04] shadow-[0_18px_40px_rgba(0,0,0,0.25)] backdrop-blur transition">
            <summary className="flex cursor-pointer list-none items-center justify-between rounded-2xl bg-gradient-to-r from-fuchsia-500 via-purple-500 to-orange-400 px-4 py-3 text-sm font-semibold text-white shadow-[0_16px_36px_rgba(168,85,247,0.45)] transition hover:-translate-y-0.5 hover:shadow-[0_22px_44px_rgba(168,85,247,0.6)]">
              <span className="flex items-center gap-2">
                <HandHeart className="h-4 w-4 text-white" aria-hidden />
                Soutenir Sans Transition
              </span>
              <ChevronDown className="h-4 w-4 text-white transition group-open:rotate-180" aria-hidden />
            </summary>
            <div className="px-4 pb-4">
              <HelloAssoWidget className="w-full" />
              <p className="mt-3 text-xs text-white/60">
                Paiement securise via HelloAsso.
              </p>
            </div>
          </details>
        </motion.div>
      </motion.div>

      <AnimatePresence>
        {showNewsletter && <NewsletterModal onClose={() => setShowNewsletter(false)} />}
      </AnimatePresence>
    </>
  )
}
