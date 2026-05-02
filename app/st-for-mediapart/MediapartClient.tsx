'use client'

import { useState, useEffect, useRef, Fragment, useMemo } from 'react'
import { flushSync } from 'react-dom'
import ProtectedDocumentGate from '@/components/ProtectedDocumentGate'
import ActionButton from '@/components/protected-page/ActionButton'
import { useProtectedDossierEffects } from '@/components/protected-page/dossier'
import SideNav from '@/components/protected-page/SideNav'
import './mediapart.css'

/* ── Password gate ──────────────────────────────────────── */
function PasswordGate({ onUnlock }: { onUnlock: () => void }) {
  return (
    <div style={{ minHeight: '100dvh', background: '#08080e', color: '#f0ede8', fontFamily: 'var(--font-body)', margin: 0 }}>
      <ProtectedDocumentGate onUnlock={onUnlock} />
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
  { date: 'Hiver 2025–2026', title: '40k TikTok · 1k YouTube', body: "Lancement YouTube. Expansion des formats. Couvertures terrain." },
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

const TOP_VIRAL = [
  { title: 'Aidez Abood',                    sr: 6.2, views: '178k vues' },
  { title: 'Loi Yadan — Antisionisme',        sr: 2.6, views: '546k vues' },
  { title: 'Élodie (OeilDe)',                sr: 2.1, views: '262k vues' },
  { title: 'Ibti — Lesbienne et musulmane',  sr: 1.7, views: '1,0M vues' },
  { title: 'Hommes de droite (OeilDe)',       sr: 1.2, views: '236k vues' },
]

const PROOF_POINTS = [
  { value: '4,5 M', label: 'vues cumulees', body: '11 semaines de pilote et une preuve claire de distribution sur TikTok.' },
  { value: '21,8 %', label: 'engagement moyen', body: 'Un niveau tres au-dessus du benchmark medias sur formats courts.' },
  { value: '3 / 11', label: 'seuil viral franchi', body: 'Le share rate depasse 1 % sur trois episodes, signal de diffusion hors bulle.' },
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

/* ── Growth chart ───────────────────────────────────────── */
function GrowthChart() {
  const line = 'M60,244 C80,244 90,220 100,212 C130,196 190,165 249,140 C310,115 420,72 502,68 C580,64 640,46 692,44 C760,40 820,38 880,37'
  const area = line + ' L880,280 L60,280 Z'
  return (
    <div className="mp-chart-wrap mp-rv mp-d1" id="mp-growth-chart">
      <p style={{ fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.28em', color: '#8a8aa4', margin: '0 0 24px' }}>
        Croissance abonné·es — Fév. 2025 → Avr. 2026
      </p>
      <svg id="mp-growth-svg" viewBox="0 0 940 310" style={{ width: '100%', overflow: 'visible' }}>
        <defs>
          <linearGradient id="mp-cgrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="oklch(0.72 0.27 290)" />
            <stop offset="48%" stopColor="oklch(0.78 0.22 330)" />
            <stop offset="100%" stopColor="oklch(0.85 0.25 40)" />
          </linearGradient>
          <linearGradient id="mp-carea-fill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="oklch(0.72 0.27 290)" stopOpacity=".18" />
            <stop offset="100%" stopColor="oklch(0.72 0.27 290)" stopOpacity="0" />
          </linearGradient>
        </defs>
        {[{ y: 280, t: '0' }, { y: 220, t: '10k' }, { y: 163, t: '25k' }, { y: 106, t: '37k' }, { y: 44, t: '47k' }].map(({ y, t }) => (
          <g key={y}>
            <line x1="60" y1={y} x2="880" y2={y} className="mp-chart-guide" />
            <text x="52" y={y + 4} className="mp-axis-lbl" textAnchor="end">{t}</text>
          </g>
        ))}
        <line x1="60" y1="28" x2="60" y2="280" className="mp-chart-guide" />
        <path className="mp-chart-area" id="mp-chart-area" d={area} />
        <path className="mp-chart-line" id="mp-chart-line" d={line} />
        {[
          { x: 100, y: 212, label: '19 jours', val: '10k' },
          { x: 249, y: 140, label: '3 mois',   val: '25k' },
          { x: 502, y: 68,  label: '7 mois',   val: '40k' },
          { x: 880, y: 37,  label: '13 mois',  val: '47k+', right: true },
        ].map((p) => (
          <g key={p.label} className="mp-chart-ms">
            {!p.right && <line x1={p.x} y1={p.y} x2={p.x} y2="280" className="mp-chart-guide" strokeDasharray="3 5" />}
            <text x={p.right ? p.x - 8 : p.x + 8} y={p.y - 17} className="mp-ms-text" textAnchor={p.right ? 'end' : 'start'}>{p.label}</text>
            <text x={p.right ? p.x - 8 : p.x + 8} y={p.y - 3}  className="mp-ms-num"  textAnchor={p.right ? 'end' : 'start'}>{p.val}</text>
            <circle className="mp-chart-dot" cx={p.x} cy={p.y} r="5" fill="url(#mp-cgrad)" />
          </g>
        ))}
        {[{ x: 60, t: 'Fév. 25' }, { x: 249, t: 'Mai 25' }, { x: 502, t: 'Sep. 25' }, { x: 755, t: 'Jan. 26' }, { x: 880, t: 'Avr. 26' }].map(({ x, t }) => (
          <text key={t} x={x} y="298" className="mp-axis-lbl" textAnchor="middle">{t}</text>
        ))}
      </svg>
    </div>
  )
}

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
        <span style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.22em', color: 'rgba(255,255,255,0.5)' }}>TikTok</span>
        <span style={{ marginLeft: 'auto', fontSize: 11, color: 'rgba(255,255,255,0.4)', letterSpacing: '0.1em' }}>{video.date}</span>
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
            <div style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.18em', color: 'rgba(255,255,255,0.4)', marginTop: 1 }}>vues</div>
          </div>
          <div style={{ width: 1, height: 24, background: 'rgba(255,255,255,0.12)', flexShrink: 0 }} />
          <div>
            <div style={{ fontSize: 16, fontWeight: 700, letterSpacing: '-0.03em', color: '#fff', fontVariantNumeric: 'tabular-nums' }}>{video.er.toFixed(1)}%</div>
            <div style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.18em', color: 'rgba(255,255,255,0.4)', marginTop: 1 }}>engagement</div>
          </div>
          {video.shares > 50 && (
            <>
              <div style={{ width: 1, height: 24, background: 'rgba(255,255,255,0.12)', flexShrink: 0 }} />
              <div>
                <div style={{ fontSize: 16, fontWeight: 700, letterSpacing: '-0.03em', color: '#fff', fontVariantNumeric: 'tabular-nums' }}>{fmtViews(video.shares)}</div>
                <div style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.18em', color: 'rgba(255,255,255,0.4)', marginTop: 1 }}>partages</div>
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
    <div className="mp-video-deck">
      <div style={{ fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.28em', color: '#8a8aa4', marginBottom: 20, display: 'flex', alignItems: 'center', gap: 10 }}>
        <span className="mp-grad-line" />{label} · {videos.length} épisode{videos.length > 1 ? 's' : ''}
      </div>

      {/* Stack */}
      <div className="mp-video-stack" style={{ position: 'relative', width: CARD_W, height: CARD_H }}>

        {/* Card ×2 (back) — decorative */}
        <div className="mp-video-back mp-video-back-2" style={{
          position: 'absolute', top: 0, left: 0, width: CARD_W, height: CARD_H,
          borderRadius: 12, overflow: 'hidden', zIndex: 1,
          transform: 'translateX(20px) translateY(-16px) scale(0.91)',
          opacity: 0.35, background: '#0d0d18', border: '1px solid #1c1c2c',
        }}>
          <div style={{ padding: '20px 18px', fontSize: 11, fontWeight: 600, color: '#6a6a84', lineHeight: 1.5 }}>{next2.title}</div>
        </div>

        {/* Card ×1 (middle) — decorative */}
        <div className="mp-video-back mp-video-back-1" style={{
          position: 'absolute', top: 0, left: 0, width: CARD_W, height: CARD_H,
          borderRadius: 12, overflow: 'hidden', zIndex: 2,
          transform: 'translateX(10px) translateY(-8px) scale(0.955)',
          opacity: 0.6, background: '#0d0d18', border: '1px solid #1c1c2c',
        }}>
          <div style={{ padding: '20px 18px', fontSize: 12, fontWeight: 600, color: '#8a8aa4', lineHeight: 1.5 }}>{next1.title}</div>
        </div>

        {/* Front card — poster or TikTok embed */}
        <div className="mp-video-front" style={{
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
      <div className="mp-video-controls" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 16, width: CARD_W }}>
        <span style={{ fontSize: 12, color: '#6a6a84', letterSpacing: '0.12em', fontVariantNumeric: 'tabular-nums' }}>
          {front + 1} / {videos.length}
        </span>
        <button
          onClick={advance}
          disabled={phase !== 'idle'}
          className="mp-interactive"
          style={{ display: 'flex', alignItems: 'center', gap: 6, background: 'none', border: '1px solid #1c1c2c', color: '#a8a4b0', fontFamily: "'Space Grotesk',sans-serif", fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.2em', padding: '8px 14px', borderRadius: 2, cursor: 'none', transition: 'border-color .2s, color .2s' }}
          onMouseEnter={e => { e.currentTarget.style.borderColor = '#6a6a84'; e.currentTarget.style.color = '#f0ede8' }}
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
    <section ref={containerRef} className="mp-timeline-section" style={{ height: '270vh', background: '#08080e', position: 'relative', fontFamily: "'Space Grotesk',sans-serif" }}>
      <div style={{ position: 'sticky', top: 0, height: '100vh', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>

        {/* Header */}
        <div style={{ maxWidth: 1440, margin: '0 auto', width: '100%', padding: 'clamp(32px,4vw,52px) clamp(24px,5vw,64px) 0', display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14, fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.28em', color: '#8a8aa4', marginBottom: 8 }}>
              <span className="mp-grad-line" />Notre parcours
            </div>
            <h2 style={{ fontSize: 'clamp(22px,3.2vw,40px)', fontWeight: 700, letterSpacing: '-0.025em' }}>14 mois · une trajectoire</h2>
          </div>
          <span style={{ fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.22em', color: '#8a8aa4' }}>fév. 2025 → avr. 2026</span>
        </div>

        {/* Track + line dans le même conteneur flex-column */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
          {/* Cartes centrées verticalement */}
          <div style={{ flex: 1, overflow: 'hidden', display: 'flex', alignItems: 'center' }}>
            <div id="mp-tl-track" style={{ display: 'flex', gap: 0, paddingLeft: 'calc((100vw - clamp(450px, 39vw, 630px)) / 2)', willChange: 'transform' }}>
              {TL.map((item, i) => (
                <div key={i} className="mp-tl-hcard">
                  <div style={{ fontSize: 11, letterSpacing: '0.18em', color: '#8a8aa4', fontVariantNumeric: 'tabular-nums', marginBottom: 20 }}>
                    {String(i + 1).padStart(2, '0')}
                  </div>
                  <div style={{ fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.22em', color: '#8a8aa4', marginBottom: 10 }}>{item.date}</div>
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
            <span style={{ fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.2em', color: '#8a8aa4' }}>Fondation</span>
            <span style={{ fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.2em', color: '#8a8aa4' }}>{TL.length} jalons</span>
            <span style={{ fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.2em', color: '#8a8aa4' }}>Ce dossier</span>
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
    <section ref={containerRef} className="mp-showcase-section" style={{ height: '250vh', background: '#0d0d18', position: 'relative', fontFamily: "'Space Grotesk',sans-serif" }}>
      <div style={{ position: 'sticky', top: 0, height: '100vh', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>

        {/* Header */}
        <div style={{ maxWidth: 1440, margin: '0 auto', padding: 'clamp(32px,4vw,52px) clamp(24px,5vw,64px) 24px', width: '100%', display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14, fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.28em', color: '#8a8aa4', marginBottom: 8 }}>
              <span className="mp-grad-line" />Chiffres clés
            </div>
            <h2 style={{ fontSize: 'clamp(22px,3.2vw,40px)', fontWeight: 700, letterSpacing: '-0.025em' }}>Les données qui comptent</h2>
          </div>
          <div className="mp-scroll-hint" style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.2em', color: '#8a8aa4' }}>
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
                  <span style={{ fontSize: 11, letterSpacing: '0.2em', color: '#8a8aa4', fontVariantNumeric: 'tabular-nums' }}>{item.num}</span>
                  <div className="mp-dot-pulse" style={{ width: 7, height: 7, borderRadius: '50%', background: 'linear-gradient(135deg,oklch(0.72 0.27 290),oklch(0.85 0.25 40))', animationDelay: `${i * 0.25}s` }} />
                </div>
                <div className="mp-grad-text" style={{ fontSize: 'clamp(48px,5.5vw,76px)', fontWeight: 700, letterSpacing: '-0.04em', lineHeight: 1, flex: 1, display: 'flex', alignItems: 'center' }}>
                  {item.stat}
                </div>
                <div>
                  <div style={{ fontSize: 16, fontWeight: 600, letterSpacing: '-0.01em', color: '#f0ede8', marginBottom: 4 }}>{item.label}</div>
                  <div style={{ fontSize: 12, color: '#8a8aa4' }}>{item.detail}</div>
                </div>
              </div>
            ))}

            {/* End card */}
            <div style={{ width: 'clamp(260px,20vw,340px)', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.24em', color: '#8a8aa4', marginBottom: 16 }}>Continue</div>
                <div className="mp-end-circle" style={{ width: 56, height: 56, border: '1px solid #282840', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 14px' }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 5v14M5 12l7 7 7-7" /></svg>
                </div>
                <div style={{ fontSize: 12, color: '#8a8aa4' }}>Scrolle pour découvrir la suite</div>
              </div>
            </div>
          </div>
        </div>

        {/* Progress */}
        <div style={{ padding: '20px clamp(24px,5vw,64px) clamp(24px,3vw,36px)' }}>
          <div style={{ maxWidth: 1440, margin: '0 auto', display: 'flex', alignItems: 'center', gap: 16 }}>
            <span style={{ fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.2em', color: '#8a8aa4', flexShrink: 0 }}>Progression</span>
            <div style={{ flex: 1, height: 1, background: '#1c1c2c', position: 'relative', overflow: 'hidden', borderRadius: 999 }}>
              <div id="mp-hscroll-fill" style={{ position: 'absolute', top: 0, bottom: 0, left: 0, width: '0%', background: 'linear-gradient(90deg,oklch(0.72 0.27 290),oklch(0.78 0.22 330) 48%,oklch(0.85 0.25 40))' }} />
            </div>
            <span style={{ fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.2em', color: '#8a8aa4', flexShrink: 0, fontVariantNumeric: 'tabular-nums' }}>{SHOWCASE_ITEMS.length} stats</span>
          </div>
        </div>

      </div>
    </section>
  )
}

/* ── Pitch content ──────────────────────────────────────── */
function PitchContent() {
  const [openFormat, setOpenFormat] = useState<number | null>(null)
  const [theme, setTheme] = useState<'st' | 'mediapart'>('st')
  const now = new Date()
  const editorialDate = new Intl.DateTimeFormat('fr-FR', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  }).format(now)
  const editorialDateLabel = editorialDate.charAt(0).toUpperCase() + editorialDate.slice(1)
  const editorialEdition = now.getHours() < 12 ? 'Édition du matin' : now.getHours() < 18 ? 'Édition de l’après-midi' : 'Édition du soir'

  function switchTheme(nextTheme: 'st' | 'mediapart') {
    if (nextTheme === theme) return

    const root = document.documentElement
    const startViewTransition = (document as Document & {
      startViewTransition?: (callback: () => void) => { finished: Promise<void> }
    }).startViewTransition?.bind(document)

    root.classList.add('mp-theme-animating')

    if (startViewTransition) {
      const transition = startViewTransition(() => {
        flushSync(() => setTheme(nextTheme))
      })
      transition.finished.finally(() => root.classList.remove('mp-theme-animating'))
      return
    }

    setTheme(nextTheme)
    window.setTimeout(() => root.classList.remove('mp-theme-animating'), 760)
  }

  function goTo(id: string) {
    const el = document.getElementById(id)
    if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 60, behavior: 'smooth' })
  }

  function toggleFormat(idx: number) {
    setOpenFormat(prev => prev === idx ? null : idx)
  }

  useEffect(() => {
    document.body.classList.toggle('mp-mediapart-page', theme === 'mediapart')
    return () => document.body.classList.remove('mp-mediapart-page')
  }, [theme])
  const dossierEffects = useMemo(() => ({
    progressId: 'mp-progress-bar',
    cursorId: 'mp-cursor',
    cursorRingId: 'mp-cursor-ring',
    glowAId: 'mp-glow-a',
    glowBId: 'mp-glow-b',
    sectionDataAttr: 'data-mp-section',
    dotSelector: '.mp-dot',
    activeDotClassName: 'mp-active',
    revealSelector: '.mp-rv',
    revealOnClassName: 'mp-on',
    interactiveSelector: '.mp-interactive',
    hoveringBodyClassName: 'mp-hovering',
    cursorMode: 'always' as const,
    setBodyCursorNone: true,
    counterSelector: '[data-target],[data-count]',
    counterMode: 'mediapart' as const,
    widthSelector: '.mp-viral-bar',
    growthChart: {
      triggerId: 'mp-growth-svg',
      drawnClassName: 'mp-drawn',
    },
    erBarSelector: '.mp-er-bar',
    grainCanvasId: 'mp-grain-c',
    tiltSelector: '.mp-prop-card',
  }), [])

  useProtectedDossierEffects(dossierEffects)

  return (
    <div className={`mp-theme mp-theme-${theme}`}>

      <div className="mp-page-bg" />
      <canvas id="mp-grain-c" style={{ position: 'fixed', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 9996, opacity: 0.09, mixBlendMode: 'overlay' }} />
      <div id="mp-cursor" />
      <div id="mp-cursor-ring" />
      <div id="mp-progress-bar" />

      {/* Side nav */}
      <SideNav
        navId="mp-side-nav"
        ariaLabel="Navigation"
        items={NAV}
        itemClassName="mp-dot mp-interactive"
        activeClassName="mp-active"
        onItemClick={goTo}
      />

      {/* ══ HERO ══ */}
      <section
        id="mp-hero"
        data-mp-section="mp-hero"
        style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', position: 'relative', overflow: 'hidden', background: '#08080e', fontFamily: "'Space Grotesk', sans-serif" }}
      >
        <div className="mp-hero-grid" />
        <div className="mp-glow-a" id="mp-glow-a" />
        <div className="mp-glow-b" id="mp-glow-b" />

        <div className="mp-hero-inner">
          <div className="mp-editorial-chrome" aria-hidden={theme !== 'mediapart'}>
            <div className="mp-editorial-masthead">
              <div className="mp-editorial-date">
                <span>Français - English - Español</span>
                <strong>{editorialDateLabel}</strong>
                <span>{editorialEdition}</span>
              </div>
              <div className="mp-editorial-brand-slot">
                <div className="mp-hero-brand mp-editorial-brand-lockup" style={{ alignItems: 'center', gap: 'clamp(10px,1.6vw,22px)' }}>
                  <button
                    type="button"
                    className="mp-logo-button mp-st-trigger mp-interactive"
                    onClick={() => switchTheme('st')}
                    aria-label="Revenir au design Sans Transition"
                    title="Revenir au design Sans Transition"
                  >
                    <span className="mp-st-wordmark" style={{ lineHeight: 0.88, flexShrink: 0 }}>
                      <span className="mp-st-word mp-grad-outline" style={{ display: 'block', fontFamily: 'var(--font-barbra)', fontWeight: 400, fontSize: 'clamp(52px,8vw,108px)', letterSpacing: '-0.01em' }}>
                        Sans
                      </span>
                      <span className="mp-st-word mp-grad-text" style={{ display: 'block', fontFamily: 'var(--font-barbra)', fontWeight: 400, fontSize: 'clamp(52px,8vw,108px)', letterSpacing: '-0.01em' }}>
                        Transition
                      </span>
                    </span>
                  </button>
                  <span className="mp-grad-text" style={{ fontWeight: 700, fontSize: 'clamp(24px,3.5vw,48px)', letterSpacing: '0.04em', flexShrink: 0 }}>×</span>
                  <button
                    type="button"
                    className="mp-logo-button mp-mediapart-trigger mp-interactive"
                    onClick={() => switchTheme('mediapart')}
                    aria-label="Passer au design Mediapart"
                    title="Passer au design Mediapart"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src="/mediapart.png"
                      alt="Mediapart"
                      className="mp-mediapart-logo"
                      style={{ width: 'clamp(270px,32vw,520px)', height: 'auto', display: 'block', filter: 'brightness(0) invert(1)', opacity: 1, transition: 'opacity .4s, transform .4s, filter .45s ease', flexShrink: 0 }}
                    />
                  </button>
                </div>
              </div>
              <div className="mp-editorial-actions">
                <span>Newsletter</span>
                <span>Nous contacter</span>
                <span>Proposition</span>
              </div>
            </div>
            <div className="mp-editorial-nav">
              <span>☰ Menu</span>
              <span>Le Journal</span>
              <span>Le Studio · Dossiers · Formats courts</span>
              <span>Le Club de Mediapart</span>
            </div>
            <div className="mp-editorial-topics">
              <div className="mp-editorial-topic">
                <strong>Journal</strong>
                Transformer une enquête longue en vidéo native sans perdre la rigueur.
              </div>
              <div className="mp-editorial-topic">
                <strong>Studio</strong>
                Un cycle test de quatre épisodes, validé factuellement et mesuré.
              </div>
              <div className="mp-editorial-topic">
                <strong>Formats courts</strong>
                Le share rate comme signal de circulation hors de la bulle militante.
              </div>
              <div className="mp-editorial-topic">
                <strong>Le Club</strong>
                Une discussion sur les publics jeunes qui ne lisent pas encore la presse.
              </div>
            </div>
          </div>

          <div className="mp-hero-brief">
            <div className="mp-hero-copy">
          <div className="mp-rv" style={{ display: 'inline-flex', alignItems: 'center', gap: 14, fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.32em', color: '#8a8aa4', marginBottom: 44 }}>
            <span className="mp-grad-line" />
            Dossier de partenariat · Avril 2026
          </div>

          <div className="mp-rv mp-hero-brand mp-st-hero-brand" style={{ display: 'flex', alignItems: 'center', gap: 'clamp(20px,3vw,48px)' }}>
            {/* Sans + Transition */}
            <button
              type="button"
              className="mp-logo-button mp-st-trigger mp-interactive"
              onClick={() => switchTheme('st')}
              aria-label="Revenir au design Sans Transition"
              title="Revenir au design Sans Transition"
            >
              <span className="mp-st-wordmark" style={{ lineHeight: 0.88, flexShrink: 0 }}>
                <span className="mp-st-word mp-grad-outline" style={{ display: 'block', fontFamily: 'var(--font-barbra)', fontWeight: 400, fontSize: 'clamp(52px,8vw,108px)', letterSpacing: '-0.01em' }}>
                  Sans
                </span>
                <span className="mp-st-word mp-grad-text" style={{ display: 'block', fontFamily: 'var(--font-barbra)', fontWeight: 400, fontSize: 'clamp(52px,8vw,108px)', letterSpacing: '-0.01em' }}>
                  Transition
                </span>
              </span>
            </button>

            {/* × */}
            <span className="mp-grad-text" style={{ fontWeight: 700, fontSize: 'clamp(24px,3.5vw,48px)', letterSpacing: '0.04em', flexShrink: 0 }}>×</span>

            <button
              type="button"
              className="mp-logo-button mp-mediapart-trigger mp-interactive"
              onClick={() => switchTheme('mediapart')}
              aria-label="Passer au design Mediapart"
              title="Passer au design Mediapart"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/mediapart.png"
                alt="Mediapart"
                className="mp-mediapart-logo"
                style={{ width: 'clamp(270px,32vw,520px)', height: 'auto', display: 'block', filter: 'brightness(0) invert(1)', opacity: 1, transition: 'opacity .4s, transform .4s, filter .45s ease', flexShrink: 0 }}
                onMouseEnter={e => { e.currentTarget.style.opacity = '0.7'; e.currentTarget.style.transform = 'scale(1.015)' }}
                onMouseLeave={e => { e.currentTarget.style.opacity = '1'; e.currentTarget.style.transform = 'scale(1)' }}
              />
            </button>
          </div>

          <p className="mp-rv mp-d3" style={{ fontSize: 'clamp(14px,1.5vw,18px)', fontWeight: 300, color: '#a8a4b0', maxWidth: 560, lineHeight: 1.7, marginBottom: 40, marginTop: 40 }}>
            Faire résonner l&apos;enquête radicale sur la For You Page — structurer, revendiquer et décupler un pipeline éditorial qui fonctionne déjà.
          </p>

          <article className="mp-editorial-story">
            <div className="mp-editorial-kicker">Partenariat éditorial</div>
            <h1 className="mp-editorial-title">
              Sans Transition propose à Mediapart de faire circuler l’enquête sur la For You Page
            </h1>
            <p className="mp-editorial-deck">
              Le média féministe et antiraciste veut transformer des enquêtes exigeantes en formats courts natifs, pensés pour toucher les publics qui ne lisent pas encore la presse indépendante.
            </p>
            <div className="mp-editorial-author">
              par <strong>Sans Transition</strong> · dossier transmis à la rédaction · avril 2026
            </div>
          </article>

          <div className="mp-rv mp-d4" style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <ActionButton onClick={() => goTo('mp-proposition')} className="mp-interactive" style={{ cursor: 'none' }}>
              Voir la proposition
            </ActionButton>
            <ActionButton
              onClick={() => goTo('mp-cta')}
              variant="outline"
              className="mp-interactive"
              style={{ cursor: 'none', transition: 'border-color .15s' }}
              showArrow={false}
            >
              Nous contacter
            </ActionButton>
          </div>
            </div>
            <aside className="mp-editorial-side">
              <div className="mp-editorial-alert">
                <div className="mp-editorial-alert-badge">En bref</div>
                <p>
                  Une proposition pour relier rigueur éditoriale, narration vidéo et distribution sociale.
                </p>
                <p>
                  Objectif: tester un cycle court, mesurable, sans diluer l’indépendance des deux rédactions.
                </p>
              </div>
              <div className="mp-editorial-club">
                <h3>Le Club de Mediapart</h3>
                <p>
                  Comment une enquête peut-elle rencontrer les publics jeunes sans devenir un produit d’algorithme?
                </p>
              </div>
            </aside>
          </div>
        </div>

        {/* Stats strip */}
        <div className="mp-hero-stats">
          <div className="mp-hero-stats-grid">
            {[
              { target: 4.5, suffix: '', label: 'M vues TikTok', isFloat: true },
              { target: 21.8, suffix: '', label: '% engagement moyen', isFloat: true },
              { target: 76, suffix: '', label: '% audience féminine', isFloat: false },
              { target: 2025, prefix: 'fév. ', suffix: '', label: 'Depuis', isFloat: false },
              { target: 11, prefix: '', suffix: ' semaines', label: 'Pilote', isFloat: false },
            ].map((st, i) => (
              <div key={i} className="mp-hero-stat-card mp-interactive">
                {i > 0 && <span style={{ color: '#282840', fontSize: 20 }}>·</span>}
                <div>
                  <span className="mp-hero-stat-value" data-target={st.target} data-prefix={st.prefix} data-suffix={st.suffix}>0</span>
                  <span className="mp-hero-stat-label">{st.label}</span>
                </div>
              </div>
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
                  <span style={{ display: 'inline-block', padding: '11px 20px', fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.26em', color: '#a8a4b0' }}>{w}</span>
                  <span style={{ display: 'inline-flex', alignItems: 'center', color: '#8a8aa4', fontSize: 14, padding: '0 4px', alignSelf: 'center' }}>·</span>
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
            <div style={{ display: 'flex', alignItems: 'center', gap: 14, fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.28em', color: '#8a8aa4', marginBottom: 10 }}>
              <span>01</span><span>— Ce qu&apos;on propose à Mediapart</span>
            </div>
            <h2 style={{ fontSize: 'clamp(22px,3.2vw,40px)', fontWeight: 700, letterSpacing: '-0.025em' }}>Un pipeline éditorial qui existe déjà</h2>
          </div>

          <div className="mp-proof-strip mp-rv mp-d1">
            <div className="mp-proof-intro">
              <span style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.22em', color: '#8a8aa4' }}>Pourquoi ce partenariat est credible</span>
              <strong>La relation ne part pas d&apos;une promesse, elle part d&apos;un usage deja observe.</strong>
            </div>
            {PROOF_POINTS.map((item) => (
              <div key={item.label} className="mp-proof-item mp-interactive">
                <span className="mp-proof-value mp-grad-text">{item.value}</span>
                <span className="mp-proof-label">{item.label}</span>
                <p>{item.body}</p>
              </div>
            ))}
          </div>

          <div className="mp-prop-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 1, background: '#1c1c2c', borderRadius: 3, overflow: 'hidden', border: '1px solid #1c1c2c' }}>
            {[
              { n: '01', tag: 'Couverture éditoriale', title: 'Format Fokus natif TikTok', body: "Un format court de 145–156 secondes à trois voix, face caméra, monté sous DaVinci Resolve. Conçu spécifiquement pour la viralité politique. L'enquête Mediapart devient le matériau principal d'un script court sans perdre la rigueur factuelle." },
              { n: '02', tag: 'Zéro cannibalisation', title: "Extension de domaine bilatérale", body: "L'audience TikTok de ST lit peu la presse ; le lectorat de Mediapart ne scrolle pas sur TikTok. Une enquête liée à une vidéo ST qui franchit le seuil viral touche des centaines de milliers de jeunes qui n'auraient jamais cliqué sur un lien texte." },
              { n: '03', tag: 'Indépendance d\'angle', title: "Mediapart valide, ST formule", body: "Mediapart détient la validation factuelle absolue. ST conserve la maîtrise totale de l'angle éditorial et de la formulation — c'est cette indépendance qui produit la performance algorithmique. ST reste libre de traiter d'autres sujets." },
            ].map((c) => (
              <div key={c.n} className="mp-prop-card mp-shiny mp-rv mp-interactive">
                <div className="mp-grad-text" style={{ fontSize: 42, fontWeight: 700, letterSpacing: '-0.04em', lineHeight: 1, marginBottom: 16 }}>{c.n}</div>
                <div style={{ fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.24em', color: '#8a8aa4', marginBottom: 10 }}>{c.tag}</div>
                <div style={{ fontSize: 17, fontWeight: 600, color: '#f0ede8', marginBottom: 12, letterSpacing: '-0.01em' }}>{c.title}</div>
                <p style={{ fontSize: 13.5, color: '#a8a4b0', lineHeight: 1.7 }}>{c.body}</p>
              </div>
            ))}
          </div>

          <div className="mp-quote mp-rv" style={{ marginTop: 32 }}>
            <p style={{ fontSize: 'clamp(16px,2vw,22px)', fontWeight: 300, fontStyle: 'italic', color: '#a8a4b0', lineHeight: 1.7, marginBottom: 12 }}>
              &ldquo;L&apos;objectif de cette proposition n&apos;est pas de créer une relation à partir de rien. C&apos;est de structurer, revendiquer et décupler un pipeline qui fonctionne.&rdquo;
            </p>
            <span style={{ fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.24em', color: '#8a8aa4' }}>— Proposition éditoriale · Sans Transition · Avril 2026</span>
          </div>
        </div>
      </section>

      {/* ══ FORMATS ══ */}
      <section id="mp-formats" data-mp-section="mp-formats" style={{ background: '#0d0d18', fontFamily: "'Space Grotesk',sans-serif" }}>
        <div style={{ maxWidth: 1440, margin: '0 auto', padding: 'clamp(56px,7vw,96px) clamp(24px,5vw,64px)' }}>
          <div className="mp-rv" style={{ paddingBottom: 20, marginBottom: 52, borderBottom: '1px solid #1c1c2c' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14, fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.28em', color: '#8a8aa4', marginBottom: 10 }}>
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
                  <div style={{ padding: '22px 20px', fontSize: 11, letterSpacing: '0.2em', color: '#8a8aa4', fontVariantNumeric: 'tabular-nums', borderRight: '1px solid #1c1c2c', alignSelf: 'stretch', display: 'flex', alignItems: 'flex-start', paddingTop: 26 }}>{f.idx}</div>
                  <div style={{ padding: '22px 28px' }}>
                    <div style={{ fontSize: 16, fontWeight: 600, letterSpacing: '-0.01em', color: '#f0ede8', marginBottom: 4 }}>{f.name}</div>
                    <div style={{ fontSize: 13, color: '#a8a4b0' }}>{f.desc}</div>
                  </div>
                  <div style={{ padding: '22px 24px', fontSize: 20, color: openFormat === i ? 'oklch(0.78 0.22 330)' : '#8a8aa4', transition: 'transform .35s,color .25s', transform: openFormat === i ? 'rotate(45deg)' : 'none', alignSelf: 'stretch', display: 'flex', alignItems: 'center' }}>+</div>
                </div>
                {openFormat === i && (
                  <div style={{ padding: '0 28px 28px 112px', background: '#08080e' }}>
                    <p style={{ fontSize: 14, color: '#a8a4b0', lineHeight: 1.8, marginBottom: 12 }}>{f.body}</p>
                    <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                      {f.tags.map(t => (
                        <span key={t} style={{ display: 'inline-block', fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.2em', color: '#8a8aa4', border: '1px solid #282840', padding: '3px 8px', borderRadius: 2 }}>{t}</span>
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
            <div style={{ display: 'flex', alignItems: 'center', gap: 14, fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.28em', color: '#8a8aa4', marginBottom: 10 }}>
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
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '2fr 1fr',
              gap: 1,
              background: '#1c1c2c',
              borderRadius: 3,
              overflow: 'hidden',
              border: '1px solid #1c1c2c',
              alignItems: 'stretch',
            }}
            className="mp-rv mp-d1 mp-hist-grid"
          >
            {/* Gauche — table pilote */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 1,
                background: '#1c1c2c',
              }}
            >
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 88px 62px 62px',
                  background: '#1c1c2c',
                  gap: 1,
                }}
              >
                {['Sujet', 'Vues', 'ER', 'SR'].map(h => (
                  <div
                    key={h}
                    style={{
                      background: '#0d0d18',
                      padding: '8px 14px',
                      fontSize: 11,
                      fontWeight: 700,
                      textTransform: 'uppercase',
                      letterSpacing: '0.14em',
                      color: '#8a8aa4',
                    }}
                  >
                    {h}
                  </div>
                ))}

                {PILOT_DATA.map(row => {
                  const bg = row.top ? '#0a0a14' : '#08080e'
                  const pad = row.top ? '15px 14px' : '10px 14px'
                  const fs = row.top ? 13 : 12

                  const srViral = row.sr >= 1
                  const srNear = row.sr >= 0.7 && row.sr < 1
                  const erGood = row.er >= 20

                  const srColor = srViral ? '#f59e0b' : srNear ? '#60a5fa' : '#8a8aa4'
                  const erColor = erGood ? '#22c55e' : '#a8a4b0'

                  return (
                    <Fragment key={row.sujet}>
                      <div
                        style={{
                          background: bg,
                          padding: pad,
                          fontSize: fs,
                          color: row.top ? '#f0ede8' : '#a8a4b0',
                          fontWeight: row.top ? 700 : 400,
                          borderLeft: row.top ? '2px solid #f59e0b' : '2px solid transparent',
                          display: 'flex',
                          alignItems: 'center',
                          gap: 8,
                        }}
                      >
                        {srViral && !row.top && (
                          <span
                            style={{
                              width: 4,
                              height: 4,
                              borderRadius: '50%',
                              background: '#f59e0b',
                              flexShrink: 0,
                              display: 'inline-block',
                            }}
                          />
                        )}

                        {row.sujet}
                      </div>

                      <div
                        style={{
                          background: bg,
                          padding: pad,
                          fontSize: fs,
                          color: row.top ? '#f0ede8' : '#7a7a90',
                          fontVariantNumeric: 'tabular-nums',
                          display: 'flex',
                          alignItems: 'center',
                        }}
                      >
                        {row.vues}
                      </div>

                      <div
                        style={{
                          background: bg,
                          padding: pad,
                          fontSize: row.top ? 14 : fs,
                          fontWeight: 700,
                          color: erColor,
                          display: 'flex',
                          alignItems: 'center',
                          fontVariantNumeric: 'tabular-nums',
                        }}
                      >
                        {row.er.toFixed(1)}%
                      </div>

                      <div
                        style={{
                          background: bg,
                          padding: pad,
                          fontSize: row.top ? 14 : fs,
                          fontWeight: 700,
                          color: srColor,
                          display: 'flex',
                          alignItems: 'center',
                          fontVariantNumeric: 'tabular-nums',
                        }}
                      >
                        {row.sr.toFixed(2)}%
                      </div>
                    </Fragment>
                  )
                })}
              </div>

              <div
                style={{
                  background: '#08080e',
                  padding: '10px 14px',
                  display: 'flex',
                  gap: 20,
                  flexWrap: 'wrap',
                }}
              >
                <span style={{ fontSize: 11, color: '#8a8aa4', fontStyle: 'italic' }}>
                  <span style={{ color: '#f59e0b' }}>●</span> SR ≥ 1 % · viralité
                </span>

                <span style={{ fontSize: 11, color: '#8a8aa4', fontStyle: 'italic' }}>
                  <span style={{ color: '#60a5fa' }}>●</span> SR 0,7–1 %
                </span>

                <span style={{ fontSize: 11, color: '#8a8aa4', fontStyle: 'italic' }}>
                  <span style={{ color: '#22c55e' }}>●</span> ER ≥ 20 % · engagement profond
                </span>
              </div>
            </div>

            {/* Droite — stats agrégées */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gridTemplateRows: 'repeat(2, minmax(0, 1fr)) auto',
                gap: 1,
                background: '#1c1c2c',
                height: '100%',
                alignSelf: 'stretch',
              }}
            >
              {[
                { val: '614 K', label: 'Vues cumulées', sub: '11 épisodes' },
                { val: '21,8 %', label: 'ER moyen', sub: '×3,6 le secteur' },
                { val: '3 / 11', label: 'SR ≥ 1 %', sub: 'seuil viral franchi' },
                { val: '10 / 11', label: 'ER ≥ 20 %', sub: 'engagement profond' },
              ].map(s => (
                <div
                  key={s.label}
                  style={{
                    background: '#08080e',
                    padding: '22px 16px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    minHeight: 0,
                  }}
                >
                  <div
                    className="mp-grad-text"
                    style={{
                      fontSize: 'clamp(18px,2vw,26px)',
                      fontWeight: 700,
                      letterSpacing: '-0.04em',
                      lineHeight: 1,
                      marginBottom: 6,
                    }}
                  >
                    {s.val}
                  </div>

                  <div
                    style={{
                      fontSize: 11,
                      textTransform: 'uppercase',
                      letterSpacing: '0.18em',
                      color: '#8a8aa4',
                      lineHeight: 1.4,
                    }}
                  >
                    {s.label}
                  </div>

                  <div
                    style={{
                      fontSize: 11,
                      color: '#6a6a84',
                      marginTop: 3,
                    }}
                  >
                    {s.sub}
                  </div>
                </div>
              ))}

              <div
                style={{
                  gridColumn: '1 / -1',
                  background: '#08080e',
                  padding: '10px 16px',
                  borderTop: '1px solid #1c1c2c',
                }}
              >
                <span
                  style={{
                    fontSize: 11,
                    color: '#6a6a84',
                    fontStyle: 'italic',
                  }}
                >
                  TikTok Studio · avril 2026 · 11 épisodes
                </span>
              </div>
            </div>
          </div>

          <GrowthChart />
        </div>
      </section>

      <HorizontalScrollSection />

      {/* ══ VIDEOS ══ */}
      <section id="mp-videos" data-mp-section="mp-videos" style={{ background: '#08080e', fontFamily: "'Space Grotesk',sans-serif" }}>
        <div style={{ maxWidth: 1440, margin: '0 auto', padding: 'clamp(56px,7vw,96px) clamp(24px,5vw,64px)' }}>
          <div className="mp-rv" style={{ paddingBottom: 20, marginBottom: 52, borderBottom: '1px solid #1c1c2c' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14, fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.28em', color: '#8a8aa4', marginBottom: 10 }}>
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
            <div style={{ display: 'flex', alignItems: 'center', gap: 14, fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.28em', color: '#8a8aa4', marginBottom: 10 }}>
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
                <div style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.2em', color: '#8a8aa4', marginBottom: 6 }}>Audience féministe 18–34</div>
                <div style={{ fontSize: 12, color: '#a8a4b0', lineHeight: 1.6 }}>Femmes, non-binaires, jeunes politisé·es — le cœur de cible que Mediapart cherche à toucher.</div>
              </div>
              {/* 78% */}
              <div style={{ background: '#08080e', padding: '28px 24px', flex: 1 }}>
                <div className="mp-grad-text" style={{ fontSize: 'clamp(32px,4vw,56px)', fontWeight: 700, letterSpacing: '-0.04em', lineHeight: 1, marginBottom: 10 }} data-count={78}>0%</div>
                <div style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.2em', color: '#8a8aa4', marginBottom: 6 }}>Audience France</div>
                <div style={{ fontSize: 12, color: '#a8a4b0', lineHeight: 1.6 }}>Paris, Lyon, Marseille, Bordeaux — concentré sur les bassins urbains de Mediapart.</div>
              </div>
            </div>

            {/* Right col — engagement feature card */}
            <div style={{ background: '#08080e', padding: '32px 32px 28px', display: 'flex', flexDirection: 'column', position: 'relative', overflow: 'hidden' }}>
              {/* Ghost bg number */}
              <div aria-hidden style={{ position: 'absolute', right: -12, top: -8, fontSize: 'clamp(100px,14vw,180px)', fontWeight: 800, letterSpacing: '-0.06em', lineHeight: 1, userSelect: 'none', pointerEvents: 'none', background: 'linear-gradient(90deg,oklch(0.72 0.27 290 / 0.07),oklch(0.85 0.25 40 / 0.04))', WebkitBackgroundClip: 'text', backgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>21,8</div>

              {/* Header */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 14, fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.28em', color: '#8a8aa4', marginBottom: 20, position: 'relative' }}>
                <span className="mp-grad-line" />Taux d&apos;engagement — comparatif secteur
              </div>

              {/* Big number + badge */}
              <div style={{ display: 'flex', alignItems: 'flex-end', gap: 16, marginBottom: 32, position: 'relative' }}>
                <div className="mp-grad-text" style={{ fontSize: 'clamp(48px,6vw,80px)', fontWeight: 700, letterSpacing: '-0.04em', lineHeight: 1 }} data-count={21.8}>0</div>
                <div style={{ marginBottom: 8, display: 'flex', flexDirection: 'column', gap: 4 }}>
                  <span style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.2em', color: '#8a8aa4' }}>% engagement moyen</span>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'linear-gradient(90deg,oklch(0.72 0.27 290 / 0.15),oklch(0.85 0.25 40 / 0.1))', border: '1px solid oklch(0.72 0.27 290 / 0.25)', borderRadius: 2, padding: '3px 8px', fontSize: 12, fontWeight: 700, letterSpacing: '0.1em', color: 'oklch(0.85 0.25 40)' }}>
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
                      <span style={{ fontSize: 11, color: '#6a6a84', letterSpacing: '0.1em' }}>{tick}%</span>
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
                        <span style={{ fontSize: 12, color: '#8a8aa4' }}>{row.sub}</span>
                      </div>
                      <span style={{ fontSize: row.muted ? 12 : 15, fontWeight: 700, color: row.muted ? '#8a8aa4' : 'transparent', backgroundImage: row.muted ? 'none' : 'linear-gradient(90deg,oklch(0.72 0.27 290),oklch(0.85 0.25 40))', WebkitBackgroundClip: row.muted ? 'unset' : 'text', backgroundClip: row.muted ? 'unset' : 'text', WebkitTextFillColor: row.muted ? 'unset' : 'transparent' }}>{row.display}</span>
                    </div>
                    <div style={{ position: 'relative', height: row.h, background: '#1c1c2c', borderRadius: 999, overflow: 'hidden' }}>
                      <div className="mp-er-bar" style={{ position: 'absolute', top: 0, left: 0, height: '100%', width: 0, borderRadius: 999, background: row.muted ? '#6a6a84' : 'linear-gradient(90deg,oklch(0.72 0.27 290),oklch(0.78 0.22 330) 48%,oklch(0.85 0.25 40))', transition: 'width 1.4s cubic-bezier(0.2,0,0,1)', boxShadow: row.muted ? 'none' : '0 0 12px oklch(0.72 0.27 290 / 0.4)' }} data-er-pct={row.pct} />
                    </div>
                  </div>
                ))}
              </div>

              {/* Footer note */}
              <div style={{ marginTop: 24, paddingTop: 16, borderTop: '1px solid #1c1c2c', fontSize: 12, color: '#8a8aa4', fontStyle: 'italic' }}>
                Données TikTok Studio certifiées · arrêtées avril 2026 · Benchmark : moyenne médias TikTok FR
              </div>
            </div>
          </div>

          {/* Viral board */}
          <div className="mp-viral-wrap mp-rv mp-d2">
            <div style={{ display: 'flex', alignItems: 'center', gap: 14, fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.28em', color: '#8a8aa4', marginBottom: 20 }}>
              <span className="mp-grad-line" />Top share rate — tous formats confondus
            </div>
            {TOP_VIRAL.map((item) => (
              <div key={item.title} className="mp-viral-row">
                <span className="mp-viral-title">{item.title}</span>
                <div className="mp-viral-track">
                  <div className="mp-viral-bar" data-width={((item.sr / 6.2) * 100).toFixed(1)} />
                </div>
                <span className="mp-viral-sr">{item.sr.toFixed(1)} %</span>
                <span className="mp-viral-views">{item.views}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ MANIFESTO ══ */}
      <section id="mp-manifesto" data-mp-section="mp-manifesto" style={{ background: '#08080e', fontFamily: "'Space Grotesk',sans-serif" }}>
        <div style={{ maxWidth: 1440, margin: '0 auto', padding: 'clamp(56px,7vw,96px) clamp(24px,5vw,64px)' }}>
          <div className="mp-rv" style={{ paddingBottom: 20, marginBottom: 52, borderBottom: '1px solid #1c1c2c' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14, fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.28em', color: '#8a8aa4', marginBottom: 10 }}>
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
            <div style={{ display: 'flex', alignItems: 'center', gap: 14, fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.28em', color: '#8a8aa4', marginBottom: 10 }}>
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
                <div style={{ fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.24em', color: '#8a8aa4', marginBottom: 14 }}>{c.tag}</div>
                <div style={{ fontSize: 20, fontWeight: 700, letterSpacing: '-0.02em', color: '#f0ede8', marginBottom: 12 }}>{c.title}</div>
                <p style={{ fontSize: 13.5, color: '#a8a4b0', lineHeight: 1.75 }}>{c.body}</p>
              </div>
            ))}
          </div>

          <div className="mp-rv" style={{ marginBottom: 56 }}>
            <p style={{ fontSize: 'clamp(15px,1.6vw,18px)', fontWeight: 300, color: '#a8a4b0', lineHeight: 1.75 }}>
              Ce cycle peut être adapté selon le calendrier éditorial de Mediapart. Si l’actualité, un événement public ou un temps fort éditorial le justifie, un épisode Fokus peut être remplacé par une activation événementielle équivalente : couverture d’un festival, capsules courtes, interviews verticales, micro-trottoirs, formats ‘ce qu’il faut retenir’, ou contenus incarnés tournés sur place. L’objectif reste le même : traduire un temps fort Mediapart en contenus sociaux natifs, distribuables sur TikTok et Instagram, avec validation factuelle, montage ST et bilan data.            </p>
          </div>

          <div className="mp-quote mp-rv" style={{ marginBottom: 56 }}>
            <p style={{ fontSize: 'clamp(16px,2vw,22px)', fontWeight: 300, fontStyle: 'italic', color: '#a8a4b0', lineHeight: 1.7, marginBottom: 12 }}>
              &ldquo;Sans Transition n&apos;est pas un prestataire de production. La collaboration fonctionne parce que les deux parties partagent un cadre éditorial et que ST garde la main sur le script, l&apos;angle et le montage. C&apos;est ce qui produit les résultats — pas le plateau, pas le logo en haut à droite.&rdquo;
            </p>
            <span style={{ fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.24em', color: '#8a8aa4' }}>— Proposition éditoriale · Sans Transition · Avril 2026</span>
          </div>

          <div className="mp-rv mp-d1" style={{ textAlign: 'center', maxWidth: 640, margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 28 }}>
            <h3 style={{ fontSize: 'clamp(20px,3vw,32px)', fontWeight: 700, letterSpacing: '-0.02em' }}>
              On démarre quand <span className="mp-grad-text">vous voulez.</span>
            </h3>
            <p style={{ fontSize: 15, color: '#a8a4b0', lineHeight: 1.8, maxWidth: 480 }}>
              Hedi et l&apos;équipe sont disponibles pour en discuter — un appel, un café, un mail. Dossier complet, idées de sujets, calendrier prêt.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
              <ActionButton
                href="mailto:contact@sanstransition.fr"
                className="mp-interactive"
                style={{ cursor: 'none', fontSize: 12, padding: '15px 32px', gap: 10 }}
              >
                contact@sanstransition.fr
              </ActionButton>
              <ActionButton
                href="/collabs"
                variant="outline"
                className="mp-interactive"
                style={{ cursor: 'none', color: '#8a8aa4', border: 'none', padding: '8px 0', fontWeight: 400 }}
              >
                Voir les collabs
              </ActionButton>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ borderTop: '1px solid #1c1c2c', padding: '28px clamp(24px,5vw,64px)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16, background: '#08080e', fontFamily: "'Space Grotesk',sans-serif" }}>
        <span style={{ fontSize: 12, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#f0ede8' }}>Sans Transition × Mediapart</span>
        <span style={{ fontSize: 11, color: '#8a8aa4' }}>Dossier de partenariat · Avril 2026 · Association loi 1901 · Paris</span>
        <span style={{ fontSize: 11, color: '#8a8aa4' }}>Fait par Hedi pour Sans Transition</span>
      </footer>
    </div>
  )
}

/* ── Main ────────────────────────────────────────────────── */
export default function MediapartClient() {
  const [unlocked, setUnlocked] = useState(false)
  if (!unlocked) return <PasswordGate onUnlock={() => setUnlocked(true)} />
  return <PitchContent />
}
