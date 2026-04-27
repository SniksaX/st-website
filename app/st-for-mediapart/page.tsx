'use client'

import { useState, useEffect, useRef, Fragment } from 'react'

/* ── Password gate ──────────────────────────────────────── */
function PasswordGate({ onUnlock }: { onUnlock: () => void }) {
  const [value, setValue] = useState('')
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!value.trim()) return
    setLoading(true); setError(false)
    try {
      const res = await fetch('/api/mediapart-auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password: value }),
      })
      if (res.ok) { onUnlock() }
      else { setError(true); setValue('') }
    } catch { setError(true) }
    finally { setLoading(false) }
  }

  return (
    <div style={{ minHeight: '100vh', background: '#08080e', color: '#f0ede8', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24, fontFamily: "'Space Grotesk', sans-serif" }}>
      <div style={{ width: '100%', maxWidth: 360 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 40 }}>
          <span style={{ display: 'inline-block', width: 24, height: 2, background: 'linear-gradient(90deg, oklch(0.72 0.27 290) 0%, oklch(0.78 0.22 330) 48%, oklch(0.85 0.25 40) 100%)', flexShrink: 0 }} />
          <span style={{ fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.28em', color: '#5a5a72' }}>Document confidentiel</span>
        </div>
        <h1 style={{ fontSize: 24, fontWeight: 700, letterSpacing: '-0.02em', marginBottom: 8 }}>Accès restreint</h1>
        <p style={{ fontSize: 13, color: '#a8a4b0', marginBottom: 32, lineHeight: 1.6 }}>Ce document est réservé à son destinataire.</p>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <input
            autoFocus
            type="password"
            value={value}
            onChange={(e) => { setValue(e.target.value); setError(false) }}
            placeholder="Mot de passe"
            disabled={loading}
            style={{ width: '100%', boxSizing: 'border-box', padding: '12px 16px', background: '#0d0d18', border: `1px solid ${error ? '#ef4444' : '#1c1c2c'}`, borderRadius: 3, fontSize: 14, color: '#f0ede8', outline: 'none', fontFamily: 'inherit' }}
          />
          {error && <p style={{ fontSize: 11, color: '#ef4444' }}>Mot de passe incorrect.</p>}
          <button
            type="submit"
            disabled={loading || !value.trim()}
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, background: 'linear-gradient(90deg, oklch(0.72 0.27 290) 0%, oklch(0.78 0.22 330) 48%, oklch(0.85 0.25 40) 100%)', color: '#fff', fontFamily: 'inherit', fontWeight: 600, fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.2em', padding: '13px 22px', borderRadius: 2, border: 'none', cursor: 'pointer' }}
          >
            {loading ? 'Vérification…' : 'Accéder'}
          </button>
        </form>
      </div>
    </div>
  )
}

/* ── Data ───────────────────────────────────────────────── */
const FORMATS = [
  {
    idx: '01', name: 'FOKUS', desc: 'Format natif TikTok · 145–156 secondes · Trois voix',
    body: "Le Fokus n'est pas un format magazine adapté au web. C'est un format natif TikTok : trois voix alternées en rythme soutenu, durée calibrée entre 145 et 156 secondes. Au-delà de 160 secondes, le taux de complétion chute brutalement. La vidéo transforme une information dense en acte d'identification ou de dénonciation — c'est ce mécanisme qui produit la viralité militante.",
    tags: ['TikTok', 'Instagram', '145–156s', 'Viralité politique'],
  },
  {
    idx: '02', name: 'CROSS-POST', desc: 'Distribution simultanée · Deux comptes TikTok · Reach amplifié',
    body: "Chaque épisode est publié simultanément sur @sanstransition et @Mediapart. Les vues cumulées incluent les deux comptes. Ce mécanisme double le reach organique initial et active deux algorithmes distincts — avec en prime la reprise sur Instagram Mediapart et le lien article → vidéo intégré dans l'enquête web.",
    tags: ['TikTok', 'Instagram', 'Cross-post simultané'],
  },
  {
    idx: '03', name: 'SHARE RATE', desc: 'L\'indicateur-clé · Seuil 1,0 % · Viralité de masse',
    body: "Le share rate — taux de partage par vue — est notre boussole. Au-delà de 1,0 %, la vidéo sort de la bulle communautaire et inonde l'algorithme de masse. Sur 11 épisodes pilote : Loi Yadan → 535 111 vues, 2,62 % de share rate, 96 % de non-abonné·es. Les sujets Mediapart réunissent exactement les conditions qui produisent ce signal.",
    tags: ['Analytics', 'Share rate ≥ 1%', 'FYP', 'Algorithme'],
  },
  {
    idx: '04', name: 'PIPELINE', desc: 'Sujet → Script → Tournage → Post-prod → Distribution',
    body: 'ST prend en charge 100 % de la production. Mediapart fournit les sujets, valide les faits, apporte ses locaux pour le tournage. Chaque épisode mobilise 3 personnes sur environ 8h. La répartition est claire : Mediapart détient la validation factuelle absolue. ST conserve la maîtrise totale de l\'angle éditorial et de la formulation — c\'est cette indépendance qui produit la performance algorithmique.',
    tags: ['DaVinci Resolve', 'Locaux Mediapart', 'Équipe ST', 'Convention formelle'],
  },
  {
    idx: '05', name: 'CYCLE TEST', desc: '4 épisodes · Sujets Mediapart · Indicateurs partagés',
    body: "On propose de ne pas s'engager sur le long terme avant d'avoir vu la mécanique en action. Quatre épisodes sur des thèmes issus des enquêtes Mediapart : santé mentale / psychiatrie, violences policières / justice, Palestine / droit international, affaire judiciaire / politique. Objectif : mesurer le share rate, calibrer le ton, établir les indicateurs communs avant de signer la convention.",
    tags: ['4 épisodes', 'Pilote', 'Convention à venir'],
  },
]

// er = taux d'engagement (%) · sr = share rate (%)
const PILOT_DATA = [
  { sujet: 'Loi Yadan',                  vues: '546 243', er: 17.4, sr: 2.58, top: true },
  { sujet: 'Iran pt. 1',                 vues: '17 621',  er: 24.9, sr: 0.82, top: false },
  { sujet: 'LFI = extrême gauche ?',     vues: '16 325',  er: 25.7, sr: 1.27, top: false },
  { sujet: 'Concentration des médias',   vues: '9 944',   er: 25.9, sr: 0.72, top: false },
  { sujet: 'Violences policières',       vues: '4 452',   er: 27.8, sr: 0.54, top: false },
  { sujet: 'Iran pt. 2',                 vues: '3 849',   er: 24.1, sr: 0.44, top: false },
  { sujet: 'Diplomatie Trump',           vues: '3 453',   er: 26.6, sr: 0.46, top: false },
  { sujet: 'Dossiers Epstein',           vues: '3 313',   er: 19.5, sr: 0.63, top: false },
  { sujet: 'Municipales — 2e tour',      vues: '3 303',   er: 23.6, sr: 0.30, top: false },
  { sujet: 'Peine de mort (Knesset)',    vues: '2 964',   er: 24.3, sr: 0.88, top: false },
  { sujet: 'Rima Hassan — GAV',          vues: '2 523',   er: 23.7, sr: 1.19, top: false },
]

const TL = [
  { date: 'Février 2025', title: 'Fondation à Paris', body: "Sans Transition naît comme association loi 1901. Premier compte TikTok, première couverture d'une manif. Format FOKUS lancé." },
  { date: 'Mars – Mai 2025', title: '10k abonné·es TikTok', body: "En 10 semaines, on franchit les 10 000. Format FOKUS : analyses courtes, féministes, accessibles, radicales." },
  { date: 'Été 2025', title: 'Campagne de soutien', body: "Première levée citoyenne sur HelloAsso. Lancement du site vitrine. 3k abonné·es Instagram." },
  { date: 'Hiver 2025–2026', title: '40k TikTok · 1k YouTube', body: "Lancement YouTube. Expansion des formats. Couvertures terrain : droits trans, répression policière, logement." },
  { date: 'Jan – Avr 2026', title: '11 semaines de pilote', body: "Collaboration avec un premier média partenaire. 11 épisodes. 3 franchissements du seuil viral. 535k vues sur la Loi Yadan." },
  { date: 'Avril 2026', title: 'Ce dossier', body: "On frappe à votre porte. On pense que Sans Transition et Mediapart peuvent construire quelque chose de fort ensemble." },
]

const SHOWCASE_ITEMS = [
  { num: '01', stat: '4,5M',   label: 'Vues TikTok cumulées',  detail: '11 semaines de pilote' },
  { num: '02', stat: '21,8%',  label: "Taux d'engagement",     detail: 'Benchmark secteur : 5–7 %' },
  { num: '03', stat: '76%',    label: 'Audience féminine',     detail: 'Queer & féministe' },
  { num: '04', stat: '2,62%',  label: 'Share rate record',     detail: 'Loi Yadan — viralité totale' },
  { num: '05', stat: '535K',   label: 'Vues — Loi Yadan',      detail: '96 % non-abonné·es' },
  { num: '06', stat: '78%',    label: 'Audience France',       detail: 'Paris, Lyon, Marseille' },
  { num: '07', stat: '18–34',  label: "Tranche d'âge",         detail: 'Cœur de cible jeune' },
  { num: '08', stat: '≥ 1%',   label: 'Seuil viral',          detail: '3 franchissements' },
]

const NAV = [
  { id: 'mp-hero',        label: 'Intro' },
  { id: 'mp-proposition', label: 'Proposition' },
  { id: 'mp-formats',     label: 'Formats' },
  { id: 'mp-histoire',    label: 'Pilote' },
  { id: 'mp-videos',      label: 'Épisodes' },
  { id: 'mp-audience',    label: 'Audience' },
  { id: 'mp-manifesto',   label: 'Éthique' },
  { id: 'mp-cta',         label: 'Contact' },
]

/* ── Video data ──────────────────────────────────────────── */
interface VidItem { id: string; title: string; date: string; views: number; er: number; shares: number }

const VIDEOS_LEMEDIA: VidItem[] = [
  { id: '7623463034530401569', title: 'Loi Yadan — criminaliser la critique de l\'État hébreu', date: 'Mars 2026', views: 546243, er: 17.4, shares: 14103 },
  { id: '7613049538198195478', title: 'Iran — ils libèrent un peuple, ils frappent une école', date: 'Mars 2026', views: 17621, er: 24.9, shares: 145 },
  { id: '7610467542531951894', title: 'LFI = extrême gauche ? Comment paver le chemin à la droite', date: 'Fév. 2026', views: 16325, er: 25.7, shares: 208 },
  { id: '7606798495110171927', title: 'Concentration des médias — à qui profite la neutralité ?', date: 'Fév. 2026', views: 9944, er: 25.9, shares: 72 },
  { id: '7602353869598870806', title: 'Violences policières — El Hacen Diarra', date: 'Fév. 2026', views: 4452, er: 27.8, shares: 24 },
  { id: '7628310754516634902', title: 'Garde-à-vue illégale de Rima Hassan', date: 'Avr. 2026', views: 2523, er: 23.7, shares: 30 },
  { id: '7626054527329848608', title: 'Peine de mort pour les Palestiniens — Knesset', date: 'Avr. 2026', views: 2964, er: 24.3, shares: 26 },
  { id: '7619403100780154115', title: 'Municipales — second tour, LFI et extrême droite', date: 'Mars 2026', views: 3303, er: 23.6, shares: 10 },
  { id: '7615678953944026390', title: 'Iran pt. 2', date: 'Mars 2026', views: 3849, er: 24.1, shares: 17 },
  { id: '7604942850769325334', title: 'Dossiers Epstein — ce qu\'ils révèlent', date: 'Fév. 2026', views: 3313, er: 19.5, shares: 21 },
  { id: '7599749031916490006', title: 'Diplomatie Trump', date: 'Jan. 2026', views: 3453, er: 26.6, shares: 16 },
]

const VIDEOS_MEDIAPART: VidItem[] = [
  { id: '7593457658443681046', title: 'Kompromat de Saint-Étienne pt. 2 — le chantage', date: 'Jan. 2026', views: 10810, er: 20.9, shares: 40 },
  { id: '7593068443847363862', title: 'Kompromat de Saint-Étienne pt. 1 — la sextape', date: 'Jan. 2026', views: 7666, er: 26.7, shares: 52 },
  { id: '7593811948811308310', title: 'Kompromat de Saint-Étienne — le Fokus complet', date: 'Jan. 2026', views: 2072, er: 21.1, shares: 7 },
]

/* ── Video card deck ────────────────────────────────────── */
function VideoPoster({ video, onPlay }: { video: VidItem; onPlay: () => void }) {
  const [thumb, setThumb] = useState<string | null>(null)

  useEffect(() => {
    fetch(`/api/tiktok-oembed?ids=${video.id}`)
      .then(r => r.json())
      .then(d => {
        const url = d?.map?.[video.id]?.thumbnail_url
        if (url) setThumb(url)
      })
      .catch(() => {})
  }, [video.id])

  const fmtViews = (n: number) =>
    n >= 1000000 ? `${(n / 1000000).toFixed(1)}M` : n >= 1000 ? `${(n / 1000).toFixed(n >= 100000 ? 0 : 1)}k` : String(n)

  return (
    <div
      onClick={onPlay}
      style={{
        width: '100%', height: '100%', cursor: 'none',
        position: 'relative', overflow: 'hidden',
        background: '#0a0a14',
      }}
    >
      {/* Thumbnail */}
      {thumb
        ? <img src={thumb} alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
        : <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(ellipse at 60% 20%, oklch(0.72 0.27 290 / 0.12) 0%, transparent 60%)' }} />
      }

      {/* Dark overlay gradient — stronger at bottom for text legibility */}
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(5,5,12,0.45) 0%, rgba(5,5,12,0.1) 30%, rgba(5,5,12,0.7) 65%, rgba(5,5,12,0.96) 100%)' }} />

      {/* Gradient top accent line */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: 'linear-gradient(90deg,oklch(0.72 0.27 290),oklch(0.78 0.22 330) 48%,oklch(0.85 0.25 40))', zIndex: 2 }} />

      {/* Top label */}
      <div style={{ position: 'absolute', top: 12, left: 16, right: 16, display: 'flex', alignItems: 'center', gap: 8, zIndex: 2 }}>
        <svg width="14" height="14" viewBox="0 0 32 32" fill="none" style={{ flexShrink: 0 }}>
          <path d="M22.5 2h-4.3v19.3a4.3 4.3 0 1 1-4.3-4.3c.4 0 .8 0 1.2.1V12.7a8.6 8.6 0 1 0 7.4 8.5V10.7a12.8 12.8 0 0 0 7.5 2.4V8.7A7.5 7.5 0 0 1 22.5 2z" fill="rgba(255,255,255,0.7)"/>
        </svg>
        <span style={{ fontSize: 9, textTransform: 'uppercase', letterSpacing: '0.22em', color: 'rgba(255,255,255,0.5)' }}>TikTok</span>
        <span style={{ marginLeft: 'auto', fontSize: 9, color: 'rgba(255,255,255,0.4)', letterSpacing: '0.1em' }}>{video.date}</span>
      </div>

      {/* Bottom content */}
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '0 18px 20px', zIndex: 2 }}>
        {/* Title */}
        <p style={{
          fontSize: 13.5, fontWeight: 600, color: '#f0ede8', lineHeight: 1.5,
          display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden',
          letterSpacing: '-0.01em', marginBottom: 14,
        }}>
          {video.title}
        </p>

        {/* Stats */}
        <div style={{ display: 'flex', gap: 14, alignItems: 'center', marginBottom: 14 }}>
          <div>
            <div style={{ fontSize: 16, fontWeight: 700, letterSpacing: '-0.03em', color: '#fff', fontVariantNumeric: 'tabular-nums' }}>{fmtViews(video.views)}</div>
            <div style={{ fontSize: 8.5, textTransform: 'uppercase', letterSpacing: '0.18em', color: 'rgba(255,255,255,0.4)', marginTop: 1 }}>vues</div>
          </div>
          <div style={{ width: 1, height: 24, background: 'rgba(255,255,255,0.12)', flexShrink: 0 }} />
          <div>
            <div style={{ fontSize: 16, fontWeight: 700, letterSpacing: '-0.03em', color: '#fff', fontVariantNumeric: 'tabular-nums' }}>{video.er.toFixed(1)}%</div>
            <div style={{ fontSize: 8.5, textTransform: 'uppercase', letterSpacing: '0.18em', color: 'rgba(255,255,255,0.4)', marginTop: 1 }}>engagement</div>
          </div>
          {video.shares > 50 && (
            <>
              <div style={{ width: 1, height: 24, background: 'rgba(255,255,255,0.12)', flexShrink: 0 }} />
              <div>
                <div style={{ fontSize: 16, fontWeight: 700, letterSpacing: '-0.03em', color: '#fff', fontVariantNumeric: 'tabular-nums' }}>{fmtViews(video.shares)}</div>
                <div style={{ fontSize: 8.5, textTransform: 'uppercase', letterSpacing: '0.18em', color: 'rgba(255,255,255,0.4)', marginTop: 1 }}>partages</div>
              </div>
            </>
          )}
        </div>

        {/* Play button */}
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
          background: 'linear-gradient(90deg,oklch(0.72 0.27 290),oklch(0.78 0.22 330) 48%,oklch(0.85 0.25 40))',
          color: '#fff', fontFamily: "'Space Grotesk',sans-serif", fontWeight: 600,
          fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.22em',
          padding: '12px 0', borderRadius: 3,
        }}>
          <svg width="11" height="11" viewBox="0 0 16 16" fill="currentColor"><path d="M4 2l10 6-10 6V2z"/></svg>
          Regarder
        </div>
      </div>
    </div>
  )
}

function VideoCardDeck({ videos, label }: { videos: VidItem[]; label: string }) {
  const [front, setFront] = useState(0)
  const [phase, setPhase] = useState<'idle' | 'out' | 'in'>('idle')
  const [playing, setPlaying] = useState(false)

  const advance = () => {
    if (phase !== 'idle') return
    setPlaying(false)
    setPhase('out')
    setTimeout(() => {
      setFront(i => (i + 1) % videos.length)
      setPhase('in')
      setTimeout(() => setPhase('idle'), 320)
    }, 340)
  }

  const card  = videos[front]
  const next1 = videos[(front + 1) % videos.length]
  const next2 = videos[(front + 2) % videos.length]

  const CARD_W = 325
  const CARD_H = 580

  return (
    <div>
      <div style={{ fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.28em', color: '#5a5a72', marginBottom: 20, display: 'flex', alignItems: 'center', gap: 10 }}>
        <span className="mp-grad-line" />{label} · {videos.length} épisode{videos.length > 1 ? 's' : ''}
      </div>

      {/* Stack */}
      <div style={{ position: 'relative', width: CARD_W, height: CARD_H }}>

        {/* Card ×2 (back) — decorative */}
        <div style={{
          position: 'absolute', top: 0, left: 0, width: CARD_W, height: CARD_H,
          borderRadius: 12, overflow: 'hidden', zIndex: 1,
          transform: 'translateX(20px) translateY(-16px) scale(0.91)',
          opacity: 0.35, background: '#0d0d18', border: '1px solid #1c1c2c',
        }}>
          <div style={{ padding: '20px 18px', fontSize: 11, fontWeight: 600, color: '#3a3a54', lineHeight: 1.5 }}>{next2.title}</div>
        </div>

        {/* Card ×1 (middle) — decorative */}
        <div style={{
          position: 'absolute', top: 0, left: 0, width: CARD_W, height: CARD_H,
          borderRadius: 12, overflow: 'hidden', zIndex: 2,
          transform: 'translateX(10px) translateY(-8px) scale(0.955)',
          opacity: 0.6, background: '#0d0d18', border: '1px solid #1c1c2c',
        }}>
          <div style={{ padding: '20px 18px', fontSize: 12, fontWeight: 600, color: '#5a5a72', lineHeight: 1.5 }}>{next1.title}</div>
        </div>

        {/* Front card — poster or TikTok embed */}
        <div style={{
          position: 'absolute', top: 0, left: 0, width: CARD_W, height: CARD_H,
          borderRadius: 12, overflow: 'hidden', zIndex: 10,
          transition: 'transform .36s cubic-bezier(0.4,0,0.2,1), opacity .28s ease',
          transform: phase === 'out' ? 'translateX(-115%) rotate(-6deg)' : 'translateX(0) rotate(0)',
          opacity: phase === 'out' ? 0 : 1,
          boxShadow: '0 24px 64px rgba(0,0,0,0.6)',
        }}>
          {playing ? (
            <iframe
              key={card.id}
              src={`https://www.tiktok.com/embed/v2/${card.id}?lang=fr-FR`}
              style={{ width: '100%', height: '100%', border: 'none', display: 'block' }}
              allowFullScreen
              allow="encrypted-media"
              title={card.title}
            />
          ) : (
            <VideoPoster video={card} onPlay={() => setPlaying(true)} />
          )}
        </div>
      </div>

      {/* Controls */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 16, width: CARD_W }}>
        <span style={{ fontSize: 10, color: '#3a3a54', letterSpacing: '0.12em', fontVariantNumeric: 'tabular-nums' }}>
          {front + 1} / {videos.length}
        </span>
        <button
          onClick={advance}
          disabled={phase !== 'idle'}
          className="mp-interactive"
          style={{ display: 'flex', alignItems: 'center', gap: 6, background: 'none', border: '1px solid #1c1c2c', color: '#a8a4b0', fontFamily: "'Space Grotesk',sans-serif", fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.2em', padding: '8px 14px', borderRadius: 2, cursor: 'none', transition: 'border-color .2s, color .2s' }}
          onMouseEnter={e => { e.currentTarget.style.borderColor = '#3a3a54'; e.currentTarget.style.color = '#f0ede8' }}
          onMouseLeave={e => { e.currentTarget.style.borderColor = '#1c1c2c'; e.currentTarget.style.color = '#a8a4b0' }}
        >
          Suivant
          <svg width={10} height={10} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M3 8h10M9 4l4 4-4 4" /></svg>
        </button>
      </div>
    </div>
  )
}

/* ── Timeline horizontal scroll ────────────────────────── */
function TimelineScrollSection() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return
    const track = document.getElementById('mp-tl-track') as HTMLElement | null
    const fill  = document.getElementById('mp-tl-fill')  as HTMLElement | null

    let target = 0, current = 0, rafId = 0
    const loop = () => {
      current += (target - current) * 0.08
      if (track) track.style.transform = `translateX(${-current}%)`
      rafId = requestAnimationFrame(loop)
    }
    loop()

    const onScroll = () => {
      const scrolled = -container.getBoundingClientRect().top
      const max      = container.offsetHeight - window.innerHeight
      const p        = Math.max(0, Math.min(1, scrolled / max))
      target = p * 74
      if (fill) fill.style.width = `${p * 100}%`
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => { window.removeEventListener('scroll', onScroll); cancelAnimationFrame(rafId) }
  }, [])

  return (
    <section ref={containerRef} style={{ height: '270vh', background: '#08080e', position: 'relative', fontFamily: "'Space Grotesk',sans-serif" }}>
      <div style={{ position: 'sticky', top: 0, height: '100vh', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>

        {/* Header */}
        <div style={{ maxWidth: 1440, margin: '0 auto', width: '100%', padding: 'clamp(32px,4vw,52px) clamp(24px,5vw,64px) 0', display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14, fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.28em', color: '#5a5a72', marginBottom: 8 }}>
              <span className="mp-grad-line" />Notre parcours
            </div>
            <h2 style={{ fontSize: 'clamp(22px,3.2vw,40px)', fontWeight: 700, letterSpacing: '-0.025em' }}>14 mois · une trajectoire</h2>
          </div>
          <span style={{ fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.22em', color: '#5a5a72' }}>fév. 2025 → avr. 2026</span>
        </div>

        {/* Track + line dans le même conteneur flex-column */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
          {/* Cartes centrées verticalement */}
          <div style={{ flex: 1, overflow: 'hidden', display: 'flex', alignItems: 'center' }}>
            <div id="mp-tl-track" style={{ display: 'flex', gap: 0, paddingLeft: 'calc((100vw - clamp(450px, 39vw, 630px)) / 2)', willChange: 'transform' }}>
              {TL.map((item, i) => (
                <div key={i} className="mp-tl-hcard">
                  <div style={{ fontSize: 11, letterSpacing: '0.18em', color: '#5a5a72', fontVariantNumeric: 'tabular-nums', marginBottom: 20 }}>
                    {String(i + 1).padStart(2, '0')}
                  </div>
                  <div style={{ fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.22em', color: '#5a5a72', marginBottom: 10 }}>{item.date}</div>
                  <div style={{ fontSize: 'clamp(14px,1.3vw,17px)', fontWeight: 600, color: '#f0ede8', marginBottom: 10, letterSpacing: '-0.01em' }}>{item.title}</div>
                  <p style={{ fontSize: 12.5, color: '#a8a4b0', lineHeight: 1.75 }}>{item.body}</p>
                  <div style={{ flex: 1 }} />
                  <div aria-hidden style={{ position: 'absolute', right: -4, bottom: 8, fontSize: 'clamp(90px,11vw,140px)', fontWeight: 800, color: '#0d0d18', fontVariantNumeric: 'tabular-nums', letterSpacing: '-0.06em', lineHeight: 1, userSelect: 'none', pointerEvents: 'none' }}>
                    {String(i + 1).padStart(2, '0')}
                  </div>
                  <div className={`mp-tl-hdot${i === TL.length - 1 ? ' mp-tl-hdot-last' : ''}`} />
                </div>
              ))}
              <div style={{ width: 'calc((100vw - clamp(450px, 39vw, 630px)) / 2)', flexShrink: 0 }} />
            </div>
          </div>

          {/* Ligne — flush avec le bas des cartes */}
          <div style={{ padding: '0 clamp(24px,5vw,64px)', flexShrink: 0 }}>
            <div style={{ position: 'relative', height: 1, background: '#1c1c2c' }}>
              <div id="mp-tl-fill" style={{ position: 'absolute', top: 0, left: 0, height: '100%', width: '0%', background: 'linear-gradient(90deg,oklch(0.72 0.27 290),oklch(0.78 0.22 330) 48%,oklch(0.85 0.25 40))' }} />
            </div>
          </div>
        </div>

        {/* Bottom labels */}
        <div style={{ padding: '14px clamp(24px,5vw,64px) clamp(20px,2.5vw,32px)' }}>
          <div style={{ maxWidth: 1440, margin: '0 auto', display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.2em', color: '#5a5a72' }}>Fondation</span>
            <span style={{ fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.2em', color: '#5a5a72' }}>{TL.length} jalons</span>
            <span style={{ fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.2em', color: '#5a5a72' }}>Ce dossier</span>
          </div>
        </div>

      </div>
    </section>
  )
}

/* ── Horizontal scroll stats ───────────────────────────── */
function HorizontalScrollSection() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const track    = document.getElementById('mp-hscroll-track') as HTMLElement | null
    const fillBar  = document.getElementById('mp-hscroll-fill')  as HTMLElement | null

    let target = 0, current = 0, rafId = 0

    const loop = () => {
      current += (target - current) * 0.08
      if (track) track.style.transform = `translateX(${-current}%)`
      rafId = requestAnimationFrame(loop)
    }
    loop()

    const onScroll = () => {
      const scrolled  = -container.getBoundingClientRect().top
      const maxScroll = container.offsetHeight - window.innerHeight
      const progress  = Math.max(0, Math.min(1, scrolled / maxScroll))
      target = progress * 72
      if (fillBar) fillBar.style.width = `${progress * 100}%`
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => { window.removeEventListener('scroll', onScroll); cancelAnimationFrame(rafId) }
  }, [])

  return (
    <section ref={containerRef} style={{ height: '250vh', background: '#0d0d18', position: 'relative', fontFamily: "'Space Grotesk',sans-serif" }}>
      <div style={{ position: 'sticky', top: 0, height: '100vh', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>

        {/* Header */}
        <div style={{ maxWidth: 1440, margin: '0 auto', padding: 'clamp(32px,4vw,52px) clamp(24px,5vw,64px) 24px', width: '100%', display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14, fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.28em', color: '#5a5a72', marginBottom: 8 }}>
              <span className="mp-grad-line" />Chiffres clés
            </div>
            <h2 style={{ fontSize: 'clamp(22px,3.2vw,40px)', fontWeight: 700, letterSpacing: '-0.025em' }}>Les données qui comptent</h2>
          </div>
          <div className="mp-scroll-hint" style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.2em', color: '#5a5a72' }}>
            <span>Scroll</span>
            <div style={{ width: 32, height: 32, border: '1px solid #282840', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width="12" height="12" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M8 3v10M4 9l4 4 4-4" /></svg>
            </div>
          </div>
        </div>

        {/* Track */}
        <div style={{ flex: 1, overflow: 'hidden', display: 'flex', alignItems: 'center' }}>
          <div id="mp-hscroll-track" style={{ display: 'flex', gap: 12, paddingLeft: 'clamp(24px,5vw,64px)', willChange: 'transform' }}>
            {SHOWCASE_ITEMS.map((item, i) => (
              <div key={item.num} className="mp-hcard mp-interactive" style={{ animationDelay: `${i * 0.22}s` }}>
                <div className="mp-hcard-glow" />
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <span style={{ fontSize: 11, letterSpacing: '0.2em', color: '#5a5a72', fontVariantNumeric: 'tabular-nums' }}>{item.num}</span>
                  <div className="mp-dot-pulse" style={{ width: 7, height: 7, borderRadius: '50%', background: 'linear-gradient(135deg,oklch(0.72 0.27 290),oklch(0.85 0.25 40))', animationDelay: `${i * 0.25}s` }} />
                </div>
                <div className="mp-grad-text" style={{ fontSize: 'clamp(48px,5.5vw,76px)', fontWeight: 700, letterSpacing: '-0.04em', lineHeight: 1, flex: 1, display: 'flex', alignItems: 'center' }}>
                  {item.stat}
                </div>
                <div>
                  <div style={{ fontSize: 16, fontWeight: 600, letterSpacing: '-0.01em', color: '#f0ede8', marginBottom: 4 }}>{item.label}</div>
                  <div style={{ fontSize: 12, color: '#5a5a72' }}>{item.detail}</div>
                </div>
              </div>
            ))}

            {/* End card */}
            <div style={{ width: 'clamp(260px,20vw,340px)', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.24em', color: '#5a5a72', marginBottom: 16 }}>Continue</div>
                <div className="mp-end-circle" style={{ width: 56, height: 56, border: '1px solid #282840', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 14px' }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 5v14M5 12l7 7 7-7" /></svg>
                </div>
                <div style={{ fontSize: 12, color: '#5a5a72' }}>Scrolle pour découvrir la suite</div>
              </div>
            </div>
          </div>
        </div>

        {/* Progress */}
        <div style={{ padding: '20px clamp(24px,5vw,64px) clamp(24px,3vw,36px)' }}>
          <div style={{ maxWidth: 1440, margin: '0 auto', display: 'flex', alignItems: 'center', gap: 16 }}>
            <span style={{ fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.2em', color: '#5a5a72', flexShrink: 0 }}>Progression</span>
            <div style={{ flex: 1, height: 1, background: '#1c1c2c', position: 'relative', overflow: 'hidden', borderRadius: 999 }}>
              <div id="mp-hscroll-fill" style={{ position: 'absolute', top: 0, bottom: 0, left: 0, width: '0%', background: 'linear-gradient(90deg,oklch(0.72 0.27 290),oklch(0.78 0.22 330) 48%,oklch(0.85 0.25 40))' }} />
            </div>
            <span style={{ fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.2em', color: '#5a5a72', flexShrink: 0, fontVariantNumeric: 'tabular-nums' }}>{SHOWCASE_ITEMS.length} stats</span>
          </div>
        </div>

      </div>
    </section>
  )
}

/* ── Pitch content ──────────────────────────────────────── */
function PitchContent() {
  const [openFormat, setOpenFormat] = useState<number | null>(null)

  function goTo(id: string) {
    const el = document.getElementById(id)
    if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 60, behavior: 'smooth' })
  }

  function toggleFormat(idx: number) {
    setOpenFormat(prev => prev === idx ? null : idx)
  }

  useEffect(() => {
    const cursor  = document.getElementById('mp-cursor')
    const ring    = document.getElementById('mp-cursor-ring')
    const bar     = document.getElementById('mp-progress-bar')
    const glowA   = document.getElementById('mp-glow-a')
    const glowB   = document.getElementById('mp-glow-b')

    let mx = window.innerWidth / 2, my = window.innerHeight / 2
    let rx = mx, ry = my, rafId = 0

    const onMove = (e: MouseEvent) => {
      mx = e.clientX; my = e.clientY
      if (cursor) { cursor.style.left = mx + 'px'; cursor.style.top = my + 'px' }
      if (glowA && glowB) {
        const nx = (e.clientX / window.innerWidth - 0.5) * 2
        const ny = (e.clientY / window.innerHeight - 0.5) * 2
        glowA.style.transform = `translate(${nx * 24}px, ${ny * 16}px)`
        glowB.style.transform = `translate(${-nx * 20}px, ${-ny * 14}px) scale(1.05)`
      }
    }
    const animRing = () => {
      rx += (mx - rx) * 0.12; ry += (my - ry) * 0.12
      if (ring) { ring.style.left = rx + 'px'; ring.style.top = ry + 'px' }
      rafId = requestAnimationFrame(animRing)
    }
    animRing()
    document.addEventListener('mousemove', onMove)

    const onScroll = () => {
      if (!bar) return
      const h = document.documentElement.scrollHeight - window.innerHeight
      bar.style.width = (window.scrollY / h * 100) + '%'
    }
    window.addEventListener('scroll', onScroll)


    // Hover cursor enlargement
    const interactEls = document.querySelectorAll('.mp-interactive')
    const addH = () => document.body.classList.add('mp-hovering')
    const remH = () => document.body.classList.remove('mp-hovering')
    interactEls.forEach(el => { el.addEventListener('mouseenter', addH); el.addEventListener('mouseleave', remH) })

    // Reveal
    const rvEls = document.querySelectorAll('.mp-rv')
    const rvObs = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('mp-on') })
    }, { threshold: 0.1 })
    rvEls.forEach(el => rvObs.observe(el))
    setTimeout(() => {
      rvEls.forEach(el => { if (el.getBoundingClientRect().top < window.innerHeight) el.classList.add('mp-on') })
    }, 60)

    // Side nav
    const sections = document.querySelectorAll('[data-mp-section]')
    const dots = document.querySelectorAll('.mp-dot')
    const dotObs = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          dots.forEach(d => d.classList.remove('mp-active'))
          const id = e.target.getAttribute('data-mp-section')
          const d = document.querySelector(`.mp-dot[data-section="${id}"]`)
          if (d) d.classList.add('mp-active')
        }
      })
    }, { threshold: 0.35 })
    sections.forEach(s => dotObs.observe(s))

    // ER bars
    const erObs = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          const bar = e.target as HTMLElement
          const pct = parseFloat(bar.dataset.erPct ?? '0')
          bar.style.setProperty('--er-w', `${pct}%`)
          bar.classList.add('mp-er-on')
          erObs.unobserve(bar)
        }
      })
    }, { threshold: 0.3 })
    document.querySelectorAll('.mp-er-bar').forEach(el => erObs.observe(el))

    // Counters
    function animCount(el: Element) {
      const ds = (el as HTMLElement).dataset
      const target = parseFloat(ds.target ?? ds.count ?? '0')
      if (isNaN(target)) return
      const isPct = ds.count !== undefined
      const isFloat = target % 1 !== 0
      const dur = 1400; const t0 = performance.now()
      const step = (now: number) => {
        const p = Math.min((now - t0) / dur, 1)
        const ease = 1 - Math.pow(1 - p, 3)
        const v = target * ease
        el.textContent = isFloat ? v.toFixed(1) + (isPct ? ' %' : '') : Math.round(v) + (isPct ? '%' : '')
        if (p < 1) requestAnimationFrame(step)
      }
      requestAnimationFrame(step)
    }
    const cntObs = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) { animCount(e.target); cntObs.unobserve(e.target) } })
    }, { threshold: 0.5 })
    document.querySelectorAll('[data-target],[data-count]').forEach(el => cntObs.observe(el))

    // Grain canvas
    const grainCanvas = document.getElementById('mp-grain-c') as HTMLCanvasElement | null
    let grainInterval = 0
    if (grainCanvas) {
      const gc = grainCanvas.getContext('2d')
      if (gc) {
        grainCanvas.width = 256; grainCanvas.height = 256
        const redrawGrain = () => {
          const d = gc.createImageData(256, 256)
          for (let i = 0; i < d.data.length; i += 4) {
            const v = (Math.random() * 255) | 0
            d.data[i] = d.data[i + 1] = d.data[i + 2] = v
            d.data[i + 3] = 22
          }
          gc.putImageData(d, 0, 0)
        }
        redrawGrain()
        grainInterval = window.setInterval(redrawGrain, 80)
      }
    }

    // 3D card tilt
    const tiltCards = document.querySelectorAll('.mp-prop-card')
    const onTiltMove = (e: MouseEvent) => {
      const card = e.currentTarget as HTMLElement
      const r = card.getBoundingClientRect()
      const dx = ((e.clientX - r.left) / r.width  - 0.5) * 2
      const dy = ((e.clientY - r.top)  / r.height - 0.5) * 2
      card.style.transition = 'transform .06s ease, background .25s'
      card.style.transform  = `perspective(700px) rotateY(${dx * 9}deg) rotateX(${-dy * 7}deg) scale(1.03)`
    }
    const onTiltLeave = (e: MouseEvent) => {
      const card = e.currentTarget as HTMLElement
      card.style.transition = 'transform .5s cubic-bezier(0.2,1,0.2,1), background .25s'
      card.style.transform  = 'perspective(700px) rotateY(0deg) rotateX(0deg) scale(1)'
    }
    tiltCards.forEach(c => {
      c.addEventListener('mousemove',  onTiltMove  as EventListener)
      c.addEventListener('mouseleave', onTiltLeave as EventListener)
    })

    document.body.style.cursor = 'none'

    return () => {
      document.removeEventListener('mousemove', onMove)
      window.removeEventListener('scroll', onScroll)
      cancelAnimationFrame(rafId)
      clearInterval(grainInterval)
      rvObs.disconnect(); dotObs.disconnect(); cntObs.disconnect(); erObs.disconnect()
      interactEls.forEach(el => { el.removeEventListener('mouseenter', addH); el.removeEventListener('mouseleave', remH) })
      tiltCards.forEach(c => { c.removeEventListener('mousemove', onTiltMove as EventListener); c.removeEventListener('mouseleave', onTiltLeave as EventListener) })
      document.body.style.cursor = ''
      document.body.classList.remove('mp-hovering')
    }
  }, [])

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&display=swap');
        #mp-cursor {
          position:fixed;z-index:9999;pointer-events:none;
          width:10px;height:10px;border-radius:50%;
          background:linear-gradient(90deg,oklch(0.72 0.27 290),oklch(0.78 0.22 330) 48%,oklch(0.85 0.25 40));
          transform:translate(-50%,-50%);transition:width .25s,height .25s;
        }
        #mp-cursor-ring {
          position:fixed;z-index:9998;pointer-events:none;
          width:36px;height:36px;border-radius:50%;
          border:1px solid oklch(0.72 0.27 290 / 0.5);
          transform:translate(-50%,-50%);
          transition:width .25s,height .25s,border-color .25s;
        }
        body.mp-hovering #mp-cursor { width:6px;height:6px; }
        body.mp-hovering #mp-cursor-ring { width:52px;height:52px;border-color:oklch(0.78 0.22 330 / 0.6); }
        #mp-progress-bar { position:fixed;top:0;left:0;height:2px;z-index:1000;background:linear-gradient(90deg,oklch(0.72 0.27 290),oklch(0.78 0.22 330) 48%,oklch(0.85 0.25 40));width:0%;transition:width .05s linear; }
        #mp-side-nav { position:fixed;right:24px;top:50%;transform:translateY(-50%);z-index:500;display:flex;flex-direction:column;gap:12px; }
        .mp-dot { width:5px;height:5px;border-radius:50%;background:#282840;cursor:none;transition:all .3s;position:relative; }
        .mp-dot.mp-active { background:transparent; }
        .mp-dot.mp-active::after { content:'';position:absolute;inset:-3px;border-radius:50%;background:linear-gradient(90deg,oklch(0.72 0.27 290),oklch(0.78 0.22 330) 48%,oklch(0.85 0.25 40)); }
        .mp-dot::before { content:attr(data-label);position:absolute;right:16px;top:50%;transform:translateY(-50%);font-size:9px;text-transform:uppercase;letter-spacing:0.22em;color:#5a5a72;white-space:nowrap;opacity:0;transition:opacity .2s;pointer-events:none;font-family:'Space Grotesk',sans-serif; }
        .mp-dot:hover::before { opacity:1; }
        .mp-rv { opacity:0;transform:translateY(22px);transition:opacity .6s ease,transform .6s ease; }
        .mp-rv.mp-on { opacity:1;transform:translateY(0); }
        .mp-d1 { transition-delay:.1s; } .mp-d2 { transition-delay:.2s; } .mp-d3 { transition-delay:.3s; } .mp-d4 { transition-delay:.4s; }
        .mp-grad-text { background:linear-gradient(90deg,oklch(0.72 0.27 290) 0%,oklch(0.78 0.22 330) 48%,oklch(0.85 0.25 40) 100%);-webkit-background-clip:text;background-clip:text;-webkit-text-fill-color:transparent; }
        .mp-grad-outline { -webkit-text-stroke:1.5px #f0ede8;-webkit-text-fill-color:transparent; }
        .mp-grad-line { display:inline-block;width:24px;height:2px;background:linear-gradient(90deg,oklch(0.72 0.27 290) 0%,oklch(0.78 0.22 330) 48%,oklch(0.85 0.25 40) 100%);flex-shrink:0; }
        .mp-hero-grid { position:absolute;inset:0;pointer-events:none;background-image:linear-gradient(#1c1c2c 1px,transparent 1px),linear-gradient(90deg,#1c1c2c 1px,transparent 1px);background-size:72px 72px;opacity:0.16; }
        .mp-glow-a { position:absolute;top:-5%;left:-15%;width:65vw;height:65vw;background:radial-gradient(circle,oklch(0.72 0.27 290 / 0.12) 0%,transparent 65%);filter:blur(60px);animation:mp-glow-a 8s ease-in-out infinite;pointer-events:none; }
        .mp-glow-b { position:absolute;bottom:-10%;right:-10%;width:50vw;height:50vw;background:radial-gradient(circle,oklch(0.85 0.25 40 / 0.1) 0%,transparent 65%);filter:blur(60px);animation:mp-glow-b 11s ease-in-out infinite;pointer-events:none; }
        @keyframes mp-glow-a { 0%,100%{opacity:.7;transform:scale(1)} 50%{opacity:1;transform:scale(1.1)} }
        @keyframes mp-glow-b { 0%,100%{opacity:.6;transform:scale(1.05)} 50%{opacity:1;transform:scale(.92)} }
        .mp-prop-card { background:#08080e;padding:32px 28px;position:relative;overflow:hidden;cursor:none;transition:background .25s; }
        .mp-prop-card:hover { background:#0d0d18; }
        .mp-prop-card::before { content:'';position:absolute;top:0;left:0;right:0;height:2px;background:linear-gradient(90deg,oklch(0.72 0.27 290),oklch(0.78 0.22 330) 48%,oklch(0.85 0.25 40));opacity:0;transition:opacity .3s; }
        .mp-prop-card:hover::before { opacity:1; }
        .mp-shiny { position:relative;overflow:hidden; }
        .mp-shiny::after { content:'';position:absolute;top:-80%;left:-60%;width:40%;height:260%;background:linear-gradient(105deg,transparent 20%,rgba(255,255,255,0.04) 50%,transparent 80%);opacity:0;transition:opacity .3s,transform .4s cubic-bezier(0.2,0.6,0.2,1);pointer-events:none; }
        .mp-shiny:hover::after { opacity:1;transform:translateX(300%); }
        .mp-format-row { background:#08080e;display:grid;grid-template-columns:64px 1fr auto;align-items:center;cursor:none;transition:background .2s;position:relative;overflow:hidden; }
        .mp-format-row::after { content:'';position:absolute;left:0;top:0;bottom:0;width:0;background:linear-gradient(90deg,oklch(0.72 0.27 290),oklch(0.78 0.22 330) 48%,oklch(0.85 0.25 40));opacity:0.08;transition:width .35s ease; }
        .mp-format-row.mp-open::after { width:100%; }
        .mp-format-row:hover { background:#0d0d18; }
        .mp-tl-dot { width:8px;height:8px;border-radius:50%;border:1px solid #282840;background:#08080e;position:relative;z-index:1;margin-top:8px;margin-left:11px;flex-shrink:0;transition:border-color .3s,background .3s; }
        .mp-tl-item.mp-on .mp-tl-dot { border-color:oklch(0.72 0.27 290);background:oklch(0.72 0.27 290 / .2); }
        .mp-mf-line { font-size:clamp(22px,4vw,54px);font-weight:300;color:#7a7a90;line-height:1.4;cursor:none;padding:14px 0;position:relative;transition:color .3s; }
        .mp-mf-line::after { content:'';position:absolute;bottom:0;left:0;height:1px;width:0;background:linear-gradient(90deg,oklch(0.72 0.27 290),oklch(0.78 0.22 330) 48%,oklch(0.85 0.25 40));transition:width .55s cubic-bezier(0.4,0,0.2,1); }
        .mp-mf-line:hover { color:#f0ede8; }
        .mp-mf-line:hover::after { width:100%; }
        .mp-mf-kw { background:linear-gradient(90deg,oklch(0.72 0.27 290),oklch(0.78 0.22 330) 48%,oklch(0.85 0.25 40));-webkit-background-clip:text;background-clip:text;-webkit-text-fill-color:transparent;font-weight:700; }
        .mp-mf-line.mp-rv { transform:translateY(18px) translateX(-40px); }
        .mp-mf-line.mp-rv.mp-mf-right { transform:translateY(18px) translateX(40px); }
        .mp-mf-line.mp-rv.mp-on { transform:translateY(0) translateX(0); opacity:1; }
        .mp-mf-left  { opacity:0;transform:translateY(18px) translateX(-40px);transition:opacity .7s ease,transform .7s cubic-bezier(0.2,0,0,1),color .3s; }
        .mp-mf-right { opacity:0;transform:translateY(18px) translateX(40px); transition:opacity .7s ease,transform .7s cubic-bezier(0.2,0,0,1),color .3s; }
        .mp-mf-left.mp-on,.mp-mf-right.mp-on { opacity:1;transform:translateY(0) translateX(0); }
        .mp-ticker-track { display:flex;animation:mp-ticker 28s linear infinite;will-change:transform; }
        .mp-ticker-track:hover { animation-play-state:paused; }
        @keyframes mp-ticker { from{transform:translateX(0)} to{transform:translateX(-50%)} }
        .mp-prop-card { transform-style:preserve-3d; will-change:transform; }
        .mp-quote { background:#0d0d18;border-left:2px solid oklch(0.72 0.27 290);padding:28px 32px;border-radius:0 3px 3px 0; }
        .mp-hcard { position:relative; width:clamp(260px,20vw,320px); height:clamp(300px,36vh,380px); flex-shrink:0; background:#08080e; border:1px solid #1c1c2c; border-radius:3px; padding:24px; display:flex; flex-direction:column; gap:12px; overflow:hidden; cursor:none; transition:border-color .25s; }
        .mp-hcard:hover { border-color:#282840; }
        .mp-hcard::before { content:''; position:absolute; top:0; left:0; right:0; height:2px; background:linear-gradient(90deg,oklch(0.72 0.27 290),oklch(0.78 0.22 330) 48%,oklch(0.85 0.25 40)); opacity:0; transition:opacity .3s; }
        .mp-hcard:hover::before { opacity:1; }
        .mp-hcard-glow { position:absolute; inset:0; pointer-events:none; opacity:0; background:radial-gradient(circle at 50% 50%,oklch(0.72 0.27 290 / 0.08),transparent 65%); transition:opacity .3s; }
        .mp-hcard:hover .mp-hcard-glow { opacity:1; }
        @keyframes mp-pulse { 0%,100%{transform:scale(1);opacity:.5} 50%{transform:scale(1.4);opacity:1} }
        .mp-dot-pulse { animation:mp-pulse 2s ease-in-out infinite; }
        @keyframes mp-scroll-hint-y { 0%,100%{transform:translateY(0)} 50%{transform:translateY(4px)} }
        .mp-scroll-hint > div { animation:mp-scroll-hint-y 1.5s ease-in-out infinite; }
        @keyframes mp-end-border { 0%,100%{border-color:#282840} 50%{border-color:oklch(0.72 0.27 290)} }
        .mp-end-circle { animation:mp-end-border 2s ease-in-out infinite; }
        .mp-tl-hcard { width:clamp(450px,39vw,630px);height:clamp(330px,45vh,420px);flex-shrink:0;padding:36px 36px 0;border-right:1px solid #1c1c2c;display:flex;flex-direction:column;cursor:none;transition:border-right-color .25s,background .25s;position:relative;overflow:hidden; }
        .mp-tl-hcard:hover { border-right-color:oklch(0.72 0.27 290 / 0.35);background:#0a0a12; }
        .mp-tl-hdot { width:8px;height:8px;border-radius:50%;border:1px solid #282840;background:#08080e;flex-shrink:0;transition:border-color .3s,background .3s; }
        .mp-tl-hcard:hover .mp-tl-hdot { border-color:oklch(0.72 0.27 290);background:oklch(0.72 0.27 290 / 0.2); }
        .mp-tl-hdot-last { background:linear-gradient(135deg,oklch(0.72 0.27 290),oklch(0.85 0.25 40));border-color:transparent; }
        @media (max-width:860px) { .mp-prop-grid { grid-template-columns:1fr !important; } .mp-aud-grid { grid-template-columns:1fr !important; } .mp-hist-grid { grid-template-columns:1fr !important; } #mp-side-nav { display:none; } }
        @media (max-width:640px) { body { cursor:auto !important; } #mp-cursor,#mp-cursor-ring { display:none; } }
        .mp-er-bar { width:0 !important; }
        .mp-er-bar.mp-er-on { width:var(--er-w) !important; }
      `}</style>

      <canvas id="mp-grain-c" style={{ position: 'fixed', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 9996, opacity: 0.09, mixBlendMode: 'overlay' }} />
      <div id="mp-cursor" />
      <div id="mp-cursor-ring" />
      <div id="mp-progress-bar" />

      {/* Side nav */}
      <nav id="mp-side-nav" aria-label="Navigation">
        {NAV.map((item, i) => (
          <div
            key={item.id}
            className={`mp-dot mp-interactive${i === 0 ? ' mp-active' : ''}`}
            data-section={item.id}
            data-label={item.label}
            onClick={() => goTo(item.id)}
          />
        ))}
      </nav>

      {/* ══ HERO ══ */}
      <section
        id="mp-hero"
        data-mp-section="mp-hero"
        style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', position: 'relative', overflow: 'hidden', background: '#08080e', fontFamily: "'Space Grotesk', sans-serif" }}
      >
        <div className="mp-hero-grid" />
        <div className="mp-glow-a" id="mp-glow-a" />
        <div className="mp-glow-b" id="mp-glow-b" />

        <div style={{ flex: 1, zIndex: 1, maxWidth: 1440, width: '100%', margin: '0 auto', padding: 'clamp(80px,9vw,120px) clamp(24px,5vw,64px) 0', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
          <div className="mp-rv" style={{ display: 'inline-flex', alignItems: 'center', gap: 14, fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.32em', color: '#5a5a72', marginBottom: 44 }}>
            <span className="mp-grad-line" />
            Dossier de partenariat · Avril 2026
          </div>

          <div className="mp-rv" style={{ display: 'flex', alignItems: 'center', gap: 'clamp(20px,3vw,48px)' }}>
            {/* Sans + Transition */}
            <div style={{ lineHeight: 0.88, flexShrink: 0 }}>
              <span className="mp-grad-outline" style={{ display: 'block', fontFamily: 'var(--font-barbra)', fontWeight: 400, fontSize: 'clamp(52px,8vw,108px)', letterSpacing: '-0.01em' }}>
                Sans
              </span>
              <span className="mp-grad-text" style={{ display: 'block', fontFamily: 'var(--font-barbra)', fontWeight: 400, fontSize: 'clamp(52px,8vw,108px)', letterSpacing: '-0.01em' }}>
                Transition
              </span>
            </div>

            {/* × */}
            <span className="mp-grad-text" style={{ fontWeight: 700, fontSize: 'clamp(24px,3.5vw,48px)', letterSpacing: '0.04em', flexShrink: 0 }}>×</span>

            {/* Mediapart */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/mediapart.png"
              alt="Mediapart"
              className="mp-interactive"
              style={{ width: 'clamp(180px,28vw,400px)', height: 'auto', display: 'block', filter: 'brightness(0) invert(1)', opacity: 1, transition: 'opacity .4s, transform .4s', flexShrink: 0 }}
              onMouseEnter={e => { e.currentTarget.style.opacity = '0.7'; e.currentTarget.style.transform = 'scale(1.015)' }}
              onMouseLeave={e => { e.currentTarget.style.opacity = '1'; e.currentTarget.style.transform = 'scale(1)' }}
            />
          </div>

          <p className="mp-rv mp-d3" style={{ fontSize: 'clamp(14px,1.5vw,18px)', fontWeight: 300, color: '#a8a4b0', maxWidth: 560, lineHeight: 1.7, marginBottom: 40, marginTop: 40 }}>
            Faire résonner l&apos;enquête radicale sur la For You Page — structurer, revendiquer et décupler un pipeline éditorial qui fonctionne déjà.
          </p>

          <div className="mp-rv mp-d4" style={{ display: 'flex', gap: 12, flexWrap: 'wrap', paddingBottom: 56 }}>
            <button onClick={() => goTo('mp-proposition')} className="mp-interactive" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'linear-gradient(90deg,oklch(0.72 0.27 290) 0%,oklch(0.78 0.22 330) 48%,oklch(0.85 0.25 40) 100%)', color: '#fff', fontFamily: "'Space Grotesk',sans-serif", fontWeight: 600, fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.2em', padding: '11px 22px', borderRadius: 2, border: 'none', cursor: 'none' }}>
              Voir la proposition
              <svg width={11} height={11} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M3 8h10M9 4l4 4-4 4" /></svg>
            </button>
            <button onClick={() => goTo('mp-cta')} className="mp-interactive" style={{ display: 'inline-flex', alignItems: 'center', background: 'none', border: '1px solid #282840', color: '#f0ede8', fontFamily: "'Space Grotesk',sans-serif", fontWeight: 500, fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.18em', padding: '11px 22px', borderRadius: 2, cursor: 'none', transition: 'border-color .15s' }}>
              Nous contacter
            </button>
          </div>
        </div>

        {/* Stats strip */}
        <div style={{ zIndex: 1, borderTop: '1px solid #1c1c2c', padding: '16px clamp(24px,5vw,64px)' }}>
          <div style={{ maxWidth: 1440, margin: '0 auto', display: 'flex', gap: 36, alignItems: 'center', flexWrap: 'wrap' }}>
            {[
              { target: 4.5, suffix: '', label: 'M vues TikTok', isFloat: true },
              { target: 21.8, suffix: '', label: '% engagement moyen', isFloat: true },
              { target: 76, suffix: '', label: '% audience féminine', isFloat: false },
              { val: 'fév. 2025', label: 'Depuis' },
              { val: '11 semaines', label: 'Pilote' },
            ].map((st, i) => (
              <Fragment key={i}>
                {i > 0 && <span style={{ color: '#282840', fontSize: 20 }}>·</span>}
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  {'target' in st
                    ? <span style={{ fontSize: 20, fontWeight: 700, letterSpacing: '-0.02em', color: '#f0ede8', fontVariantNumeric: 'tabular-nums' }} data-target={st.target}>0</span>
                    : <span style={{ fontSize: 20, fontWeight: 700, letterSpacing: '-0.02em', color: '#f0ede8' }}>{st.val}</span>
                  }
                  <span style={{ fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.2em', color: '#5a5a72' }}>{st.label}</span>
                </div>
              </Fragment>
            ))}
          </div>
        </div>
      </section>

      {/* ══ TICKER ══ */}
      <div style={{ borderTop: '1px solid #1c1c2c', borderBottom: '1px solid #1c1c2c', overflow: 'hidden', background: '#08080e' }}>
        <div className="mp-ticker-track">
          {[1, 2].map(n => (
            <div key={n} style={{ display: 'inline-flex', flexShrink: 0 }} aria-hidden={n === 2 ? true : undefined}>
              {['Radical', 'Queer', 'Féministe', 'Antiraciste', 'Indépendant', 'Pédagogique', 'Sans bullshit', 'Par et pour les minorités', '100% citoyen', 'Zéro pub · Zéro milliardaire', 'Association loi 1901', 'Pipeline éditorial', '4,5 M vues', 'Share rate ≥ 1%'].map((w) => (
                <Fragment key={w + n}>
                  <span style={{ display: 'inline-block', padding: '11px 20px', fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.26em', color: '#a8a4b0' }}>{w}</span>
                  <span style={{ display: 'inline-flex', alignItems: 'center', color: '#5a5a72', fontSize: 14, padding: '0 4px', alignSelf: 'center' }}>·</span>
                </Fragment>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* ══ PROPOSITION ══ */}
      <section id="mp-proposition" data-mp-section="mp-proposition" style={{ background: '#08080e', fontFamily: "'Space Grotesk',sans-serif" }}>
        <div style={{ maxWidth: 1440, margin: '0 auto', padding: 'clamp(56px,7vw,96px) clamp(24px,5vw,64px)' }}>
          <div className="mp-rv" style={{ paddingBottom: 20, marginBottom: 52, borderBottom: '1px solid #1c1c2c' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14, fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.28em', color: '#5a5a72', marginBottom: 10 }}>
              <span>01</span><span>— Ce qu&apos;on propose à Mediapart</span>
            </div>
            <h2 style={{ fontSize: 'clamp(22px,3.2vw,40px)', fontWeight: 700, letterSpacing: '-0.025em' }}>Un pipeline éditorial qui existe déjà</h2>
          </div>

          <div className="mp-prop-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 1, background: '#1c1c2c', borderRadius: 3, overflow: 'hidden', border: '1px solid #1c1c2c' }}>
            {[
              { n: '01', tag: 'Couverture éditoriale', title: 'Format Fokus natif TikTok', body: "Un format court de 145–156 secondes à trois voix, face caméra, monté sous DaVinci Resolve. Conçu spécifiquement pour la viralité politique. L'enquête Mediapart devient le matériau principal d'un script court sans perdre la rigueur factuelle." },
              { n: '02', tag: 'Zéro cannibalisation', title: "Extension de domaine bilatérale", body: "L'audience TikTok de ST lit peu la presse ; le lectorat de Mediapart ne scrolle pas sur TikTok. Une enquête liée à une vidéo ST qui franchit le seuil viral touche des centaines de milliers de jeunes qui n'auraient jamais cliqué sur un lien texte." },
              { n: '03', tag: 'Indépendance d\'angle', title: "Mediapart valide, ST formule", body: "Mediapart détient la validation factuelle absolue. ST conserve la maîtrise totale de l'angle éditorial et de la formulation — c'est cette indépendance qui produit la performance algorithmique. ST reste libre de traiter d'autres sujets." },
            ].map((c) => (
              <div key={c.n} className="mp-prop-card mp-shiny mp-rv mp-interactive">
                <div className="mp-grad-text" style={{ fontSize: 42, fontWeight: 700, letterSpacing: '-0.04em', lineHeight: 1, marginBottom: 16 }}>{c.n}</div>
                <div style={{ fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.24em', color: '#5a5a72', marginBottom: 10 }}>{c.tag}</div>
                <div style={{ fontSize: 17, fontWeight: 600, color: '#f0ede8', marginBottom: 12, letterSpacing: '-0.01em' }}>{c.title}</div>
                <p style={{ fontSize: 13.5, color: '#a8a4b0', lineHeight: 1.7 }}>{c.body}</p>
              </div>
            ))}
          </div>

          <div className="mp-quote mp-rv" style={{ marginTop: 32 }}>
            <p style={{ fontSize: 'clamp(16px,2vw,22px)', fontWeight: 300, fontStyle: 'italic', color: '#a8a4b0', lineHeight: 1.7, marginBottom: 12 }}>
              &ldquo;L&apos;objectif de cette proposition n&apos;est pas de créer une relation à partir de rien. C&apos;est de structurer, revendiquer et décupler un pipeline qui fonctionne.&rdquo;
            </p>
            <span style={{ fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.24em', color: '#5a5a72' }}>— Proposition éditoriale · Sans Transition · Avril 2026</span>
          </div>
        </div>
      </section>

      {/* ══ FORMATS ══ */}
      <section id="mp-formats" data-mp-section="mp-formats" style={{ background: '#0d0d18', fontFamily: "'Space Grotesk',sans-serif" }}>
        <div style={{ maxWidth: 1440, margin: '0 auto', padding: 'clamp(56px,7vw,96px) clamp(24px,5vw,64px)' }}>
          <div className="mp-rv" style={{ paddingBottom: 20, marginBottom: 52, borderBottom: '1px solid #1c1c2c' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14, fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.28em', color: '#5a5a72', marginBottom: 10 }}>
              <span>02</span><span>— Architecture du pipeline</span>
            </div>
            <h2 style={{ fontSize: 'clamp(22px,3.2vw,40px)', fontWeight: 700, letterSpacing: '-0.025em' }}>Comment ça marche</h2>
          </div>

          <div className="mp-rv" style={{ display: 'flex', flexDirection: 'column', gap: 1, background: '#1c1c2c', borderRadius: 3, overflow: 'hidden', border: '1px solid #1c1c2c' }}>
            {FORMATS.map((f, i) => (
              <div key={f.idx}>
                <div
                  className={`mp-format-row mp-interactive${openFormat === i ? ' mp-open' : ''}`}
                  onClick={() => toggleFormat(i)}
                >
                  <div style={{ padding: '22px 20px', fontSize: 11, letterSpacing: '0.2em', color: '#5a5a72', fontVariantNumeric: 'tabular-nums', borderRight: '1px solid #1c1c2c', alignSelf: 'stretch', display: 'flex', alignItems: 'flex-start', paddingTop: 26 }}>{f.idx}</div>
                  <div style={{ padding: '22px 28px' }}>
                    <div style={{ fontSize: 16, fontWeight: 600, letterSpacing: '-0.01em', color: '#f0ede8', marginBottom: 4 }}>{f.name}</div>
                    <div style={{ fontSize: 13, color: '#a8a4b0' }}>{f.desc}</div>
                  </div>
                  <div style={{ padding: '22px 24px', fontSize: 20, color: openFormat === i ? 'oklch(0.78 0.22 330)' : '#5a5a72', transition: 'transform .35s,color .25s', transform: openFormat === i ? 'rotate(45deg)' : 'none', alignSelf: 'stretch', display: 'flex', alignItems: 'center' }}>+</div>
                </div>
                {openFormat === i && (
                  <div style={{ padding: '0 28px 28px 112px', background: '#08080e' }}>
                    <p style={{ fontSize: 14, color: '#a8a4b0', lineHeight: 1.8, marginBottom: 12 }}>{f.body}</p>
                    <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                      {f.tags.map(t => (
                        <span key={t} style={{ display: 'inline-block', fontSize: 9, textTransform: 'uppercase', letterSpacing: '0.2em', color: '#5a5a72', border: '1px solid #282840', padding: '3px 8px', borderRadius: 2 }}>{t}</span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <TimelineScrollSection />

      {/* ══ HISTOIRE / PILOTE ══ */}
      <section id="mp-histoire" data-mp-section="mp-histoire" style={{ background: '#0d0d18', fontFamily: "'Space Grotesk',sans-serif" }}>
        <div style={{ maxWidth: 1440, margin: '0 auto', padding: 'clamp(56px,7vw,96px) clamp(24px,5vw,64px)' }}>
          <div className="mp-rv" style={{ paddingBottom: 20, marginBottom: 52, borderBottom: '1px solid #1c1c2c' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14, fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.28em', color: '#5a5a72', marginBottom: 10 }}>
              <span>03</span><span>— Notre parcours</span>
            </div>
            <h2 style={{ fontSize: 'clamp(22px,3.2vw,40px)', fontWeight: 700, letterSpacing: '-0.025em' }}>11 semaines de pilote · les preuves</h2>
          </div>

          <div className="mp-rv" style={{ marginBottom: 8 }}>
            <p style={{ fontSize: 'clamp(15px,1.6vw,18px)', fontWeight: 300, color: '#a8a4b0', lineHeight: 1.75 }}>
              Entre janvier et avril 2026, 11 semaines de collaboration sur le format exact. L&apos;indicateur-clé : le <strong style={{ color: '#f0ede8', fontWeight: 600 }}>share rate</strong>. Au-delà de 1,0 %, la vidéo sort de la bulle communautaire.
            </p>
          </div>

          {/* Deux colonnes côte à côte */}
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 1, background: '#1c1c2c', borderRadius: 3, overflow: 'hidden', border: '1px solid #1c1c2c' }} className="mp-rv mp-d1 mp-hist-grid">

            {/* Gauche — table pilote */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 1, background: '#1c1c2c' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 88px 62px 62px', background: '#1c1c2c', gap: 1 }}>
                {['Sujet', 'Vues', 'ER', 'SR'].map(h => (
                  <div key={h} style={{ background: '#0d0d18', padding: '8px 14px', fontSize: 9, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.14em', color: '#5a5a72' }}>{h}</div>
                ))}
                {PILOT_DATA.map(row => {
                  const bg  = row.top ? '#0a0a14' : '#08080e'
                  const pad = row.top ? '15px 14px' : '10px 14px'
                  const fs  = row.top ? 13 : 12
                  const srViral = row.sr >= 1
                  const srNear  = row.sr >= 0.7 && row.sr < 1
                  const erGood  = row.er >= 20
                  const srColor = srViral ? '#f59e0b' : srNear ? '#60a5fa' : '#5a5a72'
                  const erColor = erGood  ? '#22c55e' : '#a8a4b0'
                  return (
                    <Fragment key={row.sujet}>
                      <div style={{ background: bg, padding: pad, fontSize: fs, color: row.top ? '#f0ede8' : '#a8a4b0', fontWeight: row.top ? 700 : 400, borderLeft: row.top ? '2px solid #f59e0b' : '2px solid transparent', display: 'flex', alignItems: 'center', gap: 8 }}>
                        {srViral && !row.top && <span style={{ width: 4, height: 4, borderRadius: '50%', background: '#f59e0b', flexShrink: 0, display: 'inline-block' }} />}
                        {row.sujet}
                      </div>
                      <div style={{ background: bg, padding: pad, fontSize: fs, color: row.top ? '#f0ede8' : '#7a7a90', fontVariantNumeric: 'tabular-nums', display: 'flex', alignItems: 'center' }}>{row.vues}</div>
                      <div style={{ background: bg, padding: pad, fontSize: row.top ? 14 : fs, fontWeight: 700, color: erColor, display: 'flex', alignItems: 'center', fontVariantNumeric: 'tabular-nums' }}>{row.er.toFixed(1)}%</div>
                      <div style={{ background: bg, padding: pad, fontSize: row.top ? 14 : fs, fontWeight: 700, color: srColor, display: 'flex', alignItems: 'center', fontVariantNumeric: 'tabular-nums' }}>{row.sr.toFixed(2)}%</div>
                    </Fragment>
                  )
                })}
              </div>
              <div style={{ background: '#08080e', padding: '10px 14px', display: 'flex', gap: 20, flexWrap: 'wrap' }}>
                <span style={{ fontSize: 9, color: '#5a5a72', fontStyle: 'italic' }}><span style={{ color: '#f59e0b' }}>●</span> SR ≥ 1 % · viralité</span>
                <span style={{ fontSize: 9, color: '#5a5a72', fontStyle: 'italic' }}><span style={{ color: '#60a5fa' }}>●</span> SR 0,7–1 %</span>
                <span style={{ fontSize: 9, color: '#5a5a72', fontStyle: 'italic' }}><span style={{ color: '#22c55e' }}>●</span> ER ≥ 20 % · engagement profond</span>
              </div>
            </div>

            {/* Droite — stats agrégées */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 1, background: '#1c1c2c', alignContent: 'start' }}>
              {[
                { val: '4,5 M',  label: 'Vues cumulées', sub: '11 épisodes' },
                { val: '21,8 %', label: 'ER moyen',      sub: '×3,6 le secteur' },
                { val: '3 / 11', label: 'SR ≥ 1 %',      sub: 'seuil viral franchi' },
                { val: '10 / 11',label: 'ER ≥ 20 %',     sub: 'engagement profond' },
              ].map(s => (
                <div key={s.label} style={{ background: '#08080e', padding: '22px 16px' }}>
                  <div className="mp-grad-text" style={{ fontSize: 'clamp(18px,2vw,26px)', fontWeight: 700, letterSpacing: '-0.04em', lineHeight: 1, marginBottom: 6 }}>{s.val}</div>
                  <div style={{ fontSize: 9, textTransform: 'uppercase', letterSpacing: '0.18em', color: '#5a5a72', lineHeight: 1.4 }}>{s.label}</div>
                  <div style={{ fontSize: 9, color: '#3a3a54', marginTop: 3 }}>{s.sub}</div>
                </div>
              ))}
              <div style={{ gridColumn: '1 / -1', background: '#08080e', padding: '10px 16px', borderTop: '1px solid #1c1c2c' }}>
                <span style={{ fontSize: 9, color: '#3a3a54', fontStyle: 'italic' }}>TikTok Studio · avril 2026 · 11 épisodes</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <HorizontalScrollSection />

      {/* ══ VIDEOS ══ */}
      <section id="mp-videos" data-mp-section="mp-videos" style={{ background: '#08080e', fontFamily: "'Space Grotesk',sans-serif" }}>
        <div style={{ maxWidth: 1440, margin: '0 auto', padding: 'clamp(56px,7vw,96px) clamp(24px,5vw,64px)' }}>
          <div className="mp-rv" style={{ paddingBottom: 20, marginBottom: 52, borderBottom: '1px solid #1c1c2c' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14, fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.28em', color: '#5a5a72', marginBottom: 10 }}>
              <span>04</span><span>— Le format en action</span>
            </div>
            <h2 style={{ fontSize: 'clamp(22px,3.2vw,40px)', fontWeight: 700, letterSpacing: '-0.025em' }}>Les épisodes</h2>
          </div>

          <div className="mp-rv mp-d1" style={{ display: 'flex', justifyContent: 'center', gap: 'clamp(40px,5vw,80px)', flexWrap: 'wrap' }}>
            <VideoCardDeck videos={VIDEOS_LEMEDIA} label="× Le Media" />
            <VideoCardDeck videos={VIDEOS_MEDIAPART} label="× Mediapart" />
          </div>
        </div>
      </section>

      {/* ══ AUDIENCE ══ */}
      <section id="mp-audience" data-mp-section="mp-audience" style={{ background: '#0d0d18', fontFamily: "'Space Grotesk',sans-serif" }}>
        <div style={{ maxWidth: 1440, margin: '0 auto', padding: 'clamp(56px,7vw,96px) clamp(24px,5vw,64px)' }}>
          <div className="mp-rv" style={{ paddingBottom: 20, marginBottom: 52, borderBottom: '1px solid #1c1c2c' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14, fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.28em', color: '#5a5a72', marginBottom: 10 }}>
              <span>05</span><span>— Notre audience</span>
            </div>
            <h2 style={{ fontSize: 'clamp(22px,3.2vw,40px)', fontWeight: 700, letterSpacing: '-0.025em' }}>Qui ne lit pas encore Mediapart</h2>
          </div>

          {/* Asymmetric grid */}
          <div className="mp-rv mp-aud-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 1, background: '#1c1c2c', borderRadius: 3, overflow: 'hidden', border: '1px solid #1c1c2c' }}>

            {/* Left col — 2 stacked mini cards */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              {/* 76% merged */}
              <div style={{ background: '#08080e', padding: '28px 24px', flex: 1 }}>
                <div className="mp-grad-text" style={{ fontSize: 'clamp(32px,4vw,56px)', fontWeight: 700, letterSpacing: '-0.04em', lineHeight: 1, marginBottom: 10 }} data-count={76}>0%</div>
                <div style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.2em', color: '#5a5a72', marginBottom: 6 }}>Audience féministe 18–34</div>
                <div style={{ fontSize: 12, color: '#a8a4b0', lineHeight: 1.6 }}>Femmes, non-binaires, jeunes politisé·es — le cœur de cible que Mediapart cherche à toucher.</div>
              </div>
              {/* 78% */}
              <div style={{ background: '#08080e', padding: '28px 24px', flex: 1 }}>
                <div className="mp-grad-text" style={{ fontSize: 'clamp(32px,4vw,56px)', fontWeight: 700, letterSpacing: '-0.04em', lineHeight: 1, marginBottom: 10 }} data-count={78}>0%</div>
                <div style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.2em', color: '#5a5a72', marginBottom: 6 }}>Audience France</div>
                <div style={{ fontSize: 12, color: '#a8a4b0', lineHeight: 1.6 }}>Paris, Lyon, Marseille, Bordeaux — concentré sur les bassins urbains de Mediapart.</div>
              </div>
            </div>

            {/* Right col — engagement feature card */}
            <div style={{ background: '#08080e', padding: '32px 32px 28px', display: 'flex', flexDirection: 'column', position: 'relative', overflow: 'hidden' }}>
              {/* Ghost bg number */}
              <div aria-hidden style={{ position: 'absolute', right: -12, top: -8, fontSize: 'clamp(100px,14vw,180px)', fontWeight: 800, letterSpacing: '-0.06em', lineHeight: 1, userSelect: 'none', pointerEvents: 'none', background: 'linear-gradient(90deg,oklch(0.72 0.27 290 / 0.07),oklch(0.85 0.25 40 / 0.04))', WebkitBackgroundClip: 'text', backgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>21,8</div>

              {/* Header */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 14, fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.28em', color: '#5a5a72', marginBottom: 20, position: 'relative' }}>
                <span className="mp-grad-line" />Taux d&apos;engagement — comparatif secteur
              </div>

              {/* Big number + badge */}
              <div style={{ display: 'flex', alignItems: 'flex-end', gap: 16, marginBottom: 32, position: 'relative' }}>
                <div className="mp-grad-text" style={{ fontSize: 'clamp(48px,6vw,80px)', fontWeight: 700, letterSpacing: '-0.04em', lineHeight: 1 }} data-count={21.8}>0</div>
                <div style={{ marginBottom: 8, display: 'flex', flexDirection: 'column', gap: 4 }}>
                  <span style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.2em', color: '#5a5a72' }}>% engagement moyen</span>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'linear-gradient(90deg,oklch(0.72 0.27 290 / 0.15),oklch(0.85 0.25 40 / 0.1))', border: '1px solid oklch(0.72 0.27 290 / 0.25)', borderRadius: 2, padding: '3px 8px', fontSize: 10, fontWeight: 700, letterSpacing: '0.1em', color: 'oklch(0.85 0.25 40)' }}>
                    ×3,6 le benchmark secteur
                  </span>
                </div>
              </div>

              {/* Bars */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16, position: 'relative', flex: 1 }}>
                {/* Scale ticks */}
                <div style={{ position: 'relative', height: 16, marginBottom: 2 }}>
                  {[0, 5, 10, 15, 20, 25].map(tick => (
                    <div key={tick} style={{ position: 'absolute', left: `${(tick / 25) * 100}%`, top: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', transform: 'translateX(-50%)' }}>
                      <span style={{ fontSize: 9, color: '#3a3a54', letterSpacing: '0.1em' }}>{tick}%</span>
                    </div>
                  ))}
                </div>

                {[
                  { label: 'Benchmark secteur', sub: '5–7 % · médias TikTok', pct: (6 / 25) * 100, display: '~6 %', muted: true, h: 6 },
                  { label: 'Sans Transition', sub: 'moyenne · 11 semaines pilote', pct: (21.8 / 25) * 100, display: '21,8 %', muted: false, h: 12 },
                ].map((row) => (
                  <div key={row.label}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 8 }}>
                      <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
                        <span style={{ fontSize: 12, fontWeight: 600, color: row.muted ? '#7a7a90' : '#f0ede8' }}>{row.label}</span>
                        <span style={{ fontSize: 10, color: '#5a5a72' }}>{row.sub}</span>
                      </div>
                      <span style={{ fontSize: row.muted ? 12 : 15, fontWeight: 700, color: row.muted ? '#5a5a72' : 'transparent', backgroundImage: row.muted ? 'none' : 'linear-gradient(90deg,oklch(0.72 0.27 290),oklch(0.85 0.25 40))', WebkitBackgroundClip: row.muted ? 'unset' : 'text', backgroundClip: row.muted ? 'unset' : 'text', WebkitTextFillColor: row.muted ? 'unset' : 'transparent' }}>{row.display}</span>
                    </div>
                    <div style={{ position: 'relative', height: row.h, background: '#1c1c2c', borderRadius: 999, overflow: 'hidden' }}>
                      <div className="mp-er-bar" style={{ position: 'absolute', top: 0, left: 0, height: '100%', width: 0, borderRadius: 999, background: row.muted ? '#3a3a54' : 'linear-gradient(90deg,oklch(0.72 0.27 290),oklch(0.78 0.22 330) 48%,oklch(0.85 0.25 40))', transition: 'width 1.4s cubic-bezier(0.2,0,0,1)', boxShadow: row.muted ? 'none' : '0 0 12px oklch(0.72 0.27 290 / 0.4)' }} data-er-pct={row.pct} />
                    </div>
                  </div>
                ))}
              </div>

              {/* Footer note */}
              <div style={{ marginTop: 24, paddingTop: 16, borderTop: '1px solid #1c1c2c', fontSize: 10, color: '#5a5a72', fontStyle: 'italic' }}>
                Données TikTok Studio certifiées · arrêtées avril 2026 · Benchmark : moyenne médias TikTok FR
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ MANIFESTO ══ */}
      <section id="mp-manifesto" data-mp-section="mp-manifesto" style={{ background: '#08080e', fontFamily: "'Space Grotesk',sans-serif" }}>
        <div style={{ maxWidth: 1440, margin: '0 auto', padding: 'clamp(56px,7vw,96px) clamp(24px,5vw,64px)' }}>
          <div className="mp-rv" style={{ paddingBottom: 20, marginBottom: 52, borderBottom: '1px solid #1c1c2c' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14, fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.28em', color: '#5a5a72', marginBottom: 10 }}>
              <span>06</span><span>— Fondations éthiques</span>
            </div>
            <h2 style={{ fontSize: 'clamp(22px,3.2vw,40px)', fontWeight: 700, letterSpacing: '-0.025em' }}>Ce en quoi on croit</h2>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {[
              { delay: 0, text: <>Le journalisme doit partir <span className="mp-mf-kw">des concerné·es</span>, pas des experts de plateau.</> },
              { delay: .1, text: <><span className="mp-mf-kw">L&apos;indépendance d&apos;angle</span> n&apos;est pas une valeur — c&apos;est la condition de la performance algorithmique.</> },
              { delay: .2, text: <>Un format qui ne touche <span className="mp-mf-kw">pas les 18–34 ans</span> est un format qui disparaît du flux.</> },
              { delay: .3, text: <>La rigueur factuelle et <span className="mp-mf-kw">dire clairement ce qu&apos;on pense</span> ne sont pas opposés.</> },
              { delay: .4, text: <><span className="mp-mf-kw">Politiser sans bullshit.</span> C&apos;est notre seul brief éditorial.</> },
              { delay: .5, text: <>On pense que <span className="mp-mf-kw">Mediapart</span> croit aux mêmes choses. C&apos;est pourquoi on frappe à votre porte.</> },
            ].map((line, i) => (
              <div
                key={i}
                className={`mp-mf-line mp-rv mp-interactive mp-mf-${i % 2 === 0 ? 'left' : 'right'}`}
                style={{ transitionDelay: `${line.delay}s` }}
              >
                {line.text}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ CTA ══ */}
      <section id="mp-cta" data-mp-section="mp-cta" style={{ background: '#0d0d18', fontFamily: "'Space Grotesk',sans-serif" }}>
        <div style={{ maxWidth: 1440, margin: '0 auto', padding: 'clamp(56px,7vw,96px) clamp(24px,5vw,64px)' }}>
          <div className="mp-rv" style={{ paddingBottom: 20, marginBottom: 52, borderBottom: '1px solid #1c1c2c' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14, fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.28em', color: '#5a5a72', marginBottom: 10 }}>
              <span>07</span><span>— Ce qu&apos;on propose concrètement</span>
            </div>
            <h2 style={{ fontSize: 'clamp(22px,3.2vw,40px)', fontWeight: 700, letterSpacing: '-0.025em' }}>Une collab régulière, pas un one-shot</h2>
          </div>

          {/* Cycle test cards */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 1, background: '#1c1c2c', borderRadius: 3, overflow: 'hidden', border: '1px solid #1c1c2c', marginBottom: 48 }} className="mp-prop-grid">
            {[
              { tag: 'Semaine 1', title: 'Santé mentale / psychiatrie', body: "Enquête sur l'électroconvulsivothérapie et la fondation FondaMental — ce que les données révèlent sur la psychiatrie institutionnelle française." },
              { tag: 'Semaine 2–3', title: 'Violences policières · Palestine', body: "Suivi d'une affaire judiciaire en cours : mécanismes institutionnels, impunité, données chiffrées. Puis analyse d'une révélation Mediapart sur la politique française vis-à-vis de l'État hébreu." },
              { tag: 'Semaine 4', title: 'Affaire judiciaire / politique', body: "Enquête Mediapart sur une personnalité ou une institution — ce que les documents révèlent, ce que les grands médias n'ont pas dit." },
            ].map((c, i) => (
              <div key={i} className="mp-prop-card mp-shiny mp-rv mp-interactive" style={{ transitionDelay: `${i * 0.1}s` }}>
                <div style={{ fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.24em', color: '#5a5a72', marginBottom: 14 }}>{c.tag}</div>
                <div style={{ fontSize: 20, fontWeight: 700, letterSpacing: '-0.02em', color: '#f0ede8', marginBottom: 12 }}>{c.title}</div>
                <p style={{ fontSize: 13.5, color: '#a8a4b0', lineHeight: 1.75 }}>{c.body}</p>
              </div>
            ))}
          </div>

          <div className="mp-quote mp-rv" style={{ marginBottom: 56 }}>
            <p style={{ fontSize: 'clamp(16px,2vw,22px)', fontWeight: 300, fontStyle: 'italic', color: '#a8a4b0', lineHeight: 1.7, marginBottom: 12 }}>
              &ldquo;Sans Transition n&apos;est pas un prestataire de production. La collaboration fonctionne parce que les deux parties partagent un cadre éditorial et que ST garde la main sur le script, l&apos;angle et le montage. C&apos;est ce qui produit les résultats — pas le plateau, pas le logo en bas à droite.&rdquo;
            </p>
            <span style={{ fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.24em', color: '#5a5a72' }}>— Proposition éditoriale · Sans Transition · Avril 2026</span>
          </div>

          <div className="mp-rv mp-d1" style={{ textAlign: 'center', maxWidth: 640, margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 28 }}>
            <h3 style={{ fontSize: 'clamp(20px,3vw,32px)', fontWeight: 700, letterSpacing: '-0.02em' }}>
              On démarre quand <span className="mp-grad-text">vous voulez.</span>
            </h3>
            <p style={{ fontSize: 15, color: '#a8a4b0', lineHeight: 1.8, maxWidth: 480 }}>
              Hedi et l&apos;équipe sont disponibles pour en discuter — un appel, un café, un mail. Dossier complet, idées de sujets, calendrier prêt.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
              <a href="mailto:contact@sanstransition.fr" className="mp-interactive" style={{ display: 'inline-flex', alignItems: 'center', gap: 10, background: 'linear-gradient(90deg,oklch(0.72 0.27 290) 0%,oklch(0.78 0.22 330) 48%,oklch(0.85 0.25 40) 100%)', color: '#fff', fontFamily: 'inherit', fontWeight: 600, fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.2em', padding: '15px 32px', borderRadius: 2, border: 'none', textDecoration: 'none', cursor: 'none' }}>
                contact@sanstransition.fr
                <svg width={12} height={12} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M3 8h10M9 4l4 4-4 4" /></svg>
              </a>
              <a href="/collabs" className="mp-interactive" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'none', border: 'none', color: '#5a5a72', fontFamily: 'inherit', fontWeight: 400, fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.18em', padding: '8px 0', cursor: 'none', textDecoration: 'none', transition: 'color .2s' }}
                onMouseEnter={e => (e.currentTarget.style.color = '#a8a4b0')}
                onMouseLeave={e => (e.currentTarget.style.color = '#5a5a72')}
              >
                Voir les collabs →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ borderTop: '1px solid #1c1c2c', padding: '28px clamp(24px,5vw,64px)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16, background: '#08080e', fontFamily: "'Space Grotesk',sans-serif" }}>
        <span style={{ fontSize: 12, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#f0ede8' }}>Sans Transition × Mediapart</span>
        <span style={{ fontSize: 11, color: '#5a5a72' }}>Dossier de partenariat · Avril 2026 · Association loi 1901 · Paris</span>
        <span style={{ fontSize: 11, color: '#5a5a72' }}>Fait par Hedi :)</span>
      </footer>
    </>
  )
}

/* ── Main ────────────────────────────────────────────────── */
export default function MediapartPage() {
  const [unlocked, setUnlocked] = useState(false)
  if (!unlocked) return <PasswordGate onUnlock={() => setUnlocked(true)} />
  return <PitchContent />
}
