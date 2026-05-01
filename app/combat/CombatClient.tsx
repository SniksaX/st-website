'use client'
/* eslint-disable react/no-unescaped-entities */

import { type ReactNode, useEffect, useState } from 'react'

import Image from 'next/image'

import ProtectedDocumentGate from '@/components/ProtectedDocumentGate'
import ActionButton from '@/components/protected-page/ActionButton'
import SectionHeader from '@/components/protected-page/SectionHeader'
import SideNav from '@/components/protected-page/SideNav'

import { Euro, Eye, Heart, MapPin, MessageCircle, Play, Share2, ThumbsUp, TrendingUp, Users } from 'lucide-react'

import './combat.css'

type NavItem = { id: string; label: string }
type StatItem = { label: string; sub: string; count: number; format?: 'millions'; suffix?: string; float?: boolean; icon?: React.ReactNode }
type AudienceBarItem = { label: string; value: number }
type ViralItem = { title: string; sr: number; views: string }
type FormatItem = { idx: string; name: string; tagline: string; body: string; stat: string; muted?: boolean }
type AskItem = { idx: string; title: string; body: string }
type CompareRow = { label: string; value: string; pct: number; gradient?: boolean; dark?: boolean }
type TableProps = { headers: string[]; rows: ReactNode[][] }
type SnapStat = { label: string; sub: string; value: string }
type BudgetLine = { label: string; amount: string; pct: number }
type FinancePoint = { kicker: string; title: string; body: string }

const NAV_ITEMS: NavItem[] = [
  { id: 'combat-hero', label: 'Intro' },
  { id: 'combat-organisation', label: 'Organisation' },
  { id: 'combat-projet', label: 'Projet' },
  { id: 'combat-audience', label: 'Audience' },
  { id: 'combat-finances', label: 'Modèle' },
  { id: 'combat-demande', label: 'Demande' },
  { id: 'combat-perspectives', label: 'Plan' },
  { id: 'combat-preuves', label: 'Preuves' },
  { id: 'combat-annexes', label: 'Annexes' },
]

const HERO_STATS: StatItem[] = [
  { label: 'Vues TikTok', sub: 'Cumulées - avril 2026', count: 5124294, format: 'millions', icon: <Eye size={20} /> },
  { label: 'Abonné·es', sub: 'TikTok', count: 47590, icon: <Users size={20} /> },
  { label: 'Engagement rate', sub: 'Benchmark : 5 - 7 %', count: 21.7, suffix: '%', float: true, icon: <TrendingUp size={20} /> },
  { label: 'Donateurs·trices', sub: 'Récurrents sans défiscalisation', count: 91, icon: <Heart size={20} /> },
]

const MOSAIC_STATS: StatItem[] = [
  { label: 'Likes totaux', sub: "Signal d'adhésion", count: 944052, icon: <ThumbsUp size={14} /> },
  { label: 'Partages', sub: 'Signal de viralité', count: 75938, icon: <Share2 size={14} /> },
  { label: 'Commentaires', sub: 'Conversation active', count: 37843, icon: <MessageCircle size={14} /> },
  { label: 'Viewers uniques', sub: 'Sur 12 mois', count: 3893265, format: 'millions', icon: <Eye size={14} /> },
  { label: 'Vidéos publiées', sub: '14 mois', count: 203, icon: <Play size={14} /> },
  { label: 'Audience France', sub: 'Basée en France', count: 77.4, suffix: '%', float: true, icon: <MapPin size={14} /> },
  { label: 'Audience 18 - 34', sub: 'Tranche centrale', count: 80.7, suffix: '%', float: true, icon: <Users size={14} /> },
  { label: 'Dons mensuels', sub: 'HelloAsso', count: 592, suffix: 'EUR', icon: <Euro size={14} /> },
]

const AUDIENCE_BARS: AudienceBarItem[] = [
  { label: 'Audience féminine', value: 73 },
  { label: '18 - 34 ans', value: 80.7 },
  { label: 'Basée en France', value: 77.4 },
  { label: 'Belgique', value: 4 },
  { label: 'International francophone', value: 18.6 },
]

const VIRAL_ITEMS: ViralItem[] = [
  { title: 'Aidez Abood', sr: 6.2, views: '178k vues' },
  { title: 'Loi Yadan - Antisionisme', sr: 2.6, views: '527k vues' },
  { title: 'Elodie (OeilDe)', sr: 2.1, views: '262k vues' },
  { title: 'Ibti - Lesbienne et musulmane', sr: 1.7, views: '997k vues' },
  { title: 'Hommes de droite (OeilDe)', sr: 1.2, views: '236k vues' },
]

const FORMAT_ITEMS: FormatItem[] = [
  { idx: '01', name: 'FOKUS', tagline: 'Trois voix - 145 à 156 secondes - studio', body: "Enquête ou décryptage sur un sujet politique, économique ou social. Format pilier de ST. Dense, sourcé, cadre éditorial radical. Vise l'impact informatif et la viralité militante.", stat: 'ER moyen : 23 %' },
  { idx: '02', name: 'FOKUS-TÉMOIGNAGE', tagline: 'Une voix minoritaire - expérience - cadre politique', body: "Variante du Fokus avec un·e invité·e qui apporte une expérience vécue. Format le plus performant de ST en vues et partages. La subjectivité militante comme preuve.", stat: 'Moyenne des 4 meilleurs : 325k vues' },
  { idx: '03', name: 'OEIL DE', tagline: 'Format solo - point de vue personnel', body: "L'actu passée au prisme des chroniqueurs de ST. Un fait, un événement, un moment politique — décrypté par une voix récurrente de la rédaction. Le regard situé comme méthode, pas la neutralité comme posture.", stat: 'Moyenne : 20 926 vues - ER 22,6 %' },
  { idx: '04', name: 'INTERVIEWS LONGUES', tagline: 'Format long - invité·e - YouTube', body: "Format YouTube principalement. Développement en profondeur avec un·e invité·e politique ou militant·e. Espace pour la nuance, la contradiction, le clash maîtrisé.", stat: 'Format en développement', muted: true },
  { idx: '05', name: 'HEDITO', tagline: 'Format solo du fondateur - fidélisation - conversion', body: "Prise de parole directe de Hedi. Point de vue assumé, ton personnel, clôture comme acte politique. Le format « coup de gueule » de ST. Court, tranchant, sans invité.", stat: 'ER : 23,1 %' },
  { idx: '06', name: 'TRIBUNAL DES MÉDIAS', tagline: 'Format trimestriel - procès fictif - segment libre', body: "Format trimestriel. Procès symbolique d'un média, d'une figure ou d'une institution. Témoins à charge, avocat·e du diable, délibération publique, verdict formulaique. Un seul take. Spectacle politique autant que journalisme.", stat: 'Prêt à produire', muted: true },
]

const ASK_ITEMS: AskItem[] = [
  { idx: '01', title: 'Premiers postes salariés', body: "Salarier le président et le trésorier de l'association pour stabiliser la direction éditoriale et garantir la continuité de production. Le sujet n'est plus la preuve de concept mais la capacité à tenir." },
  { idx: '02', title: 'Frais de production structurels', body: "Déplacements, tournages, renouvellement de matériel, stockage et logiciels. Les coûts sont modestes ; l'absence de financement crée pourtant un plafond immédiat." },
  { idx: '03', title: 'Capacité de préproduction', body: 'Débloquer les formats sous-exploités faute de temps : Tribunal des Médias, Fokus-témoignage, mini-séries et documentaires.' },
]

const ROADMAP_ITEMS: AskItem[] = [
  { idx: '01', title: 'Production maintenue', body: "Tenir 3 vidéos par semaine dans des conditions viables, sans dépendre du sacrifice permanent de l'équipe." },
  { idx: '02', title: 'Tribunal des Médias lancé', body: "Le format est déjà écrit et outillé. Le soutien achète du temps de production, pas une idée spéculative." },
  { idx: '03', title: 'Fokus-témoignage développé', body: "Le format le plus performant du catalogue demande du sourcing, de la préparation et de l'accompagnement éditorial." },
  { idx: '04', title: 'Base de dons structurée', body: "Objectif : passer de 91 à 180+ donateurs·trices d'ici fin 2026 puis 300+ à horizon fin 2027." },
]

const COMPARE_ROWS: CompareRow[] = [
  { label: 'Dons mensuels actuellement encaissés', value: '592 EUR', pct: 33, gradient: true },
  { label: "Coût mensuel brut d'un premier poste", value: '~ 1 800 EUR', pct: 100, dark: true },
  { label: "Coût d'un Fokus en tarif prestataire", value: '400 à 800 EUR', pct: 44 },
]

// Snapshot financier — remplace la table revenus
const FIN_STATS: SnapStat[] = [
  { label: 'Revenus mensuels', sub: 'Dons HelloAsso · avril 2026', value: '592 EUR' },
  { label: 'Donateurs·trices', sub: 'Sans réduction fiscale', value: '91' },
  { label: 'Salaires versés', sub: 'Depuis la fondation', value: '0 EUR' },
  { label: 'Solde net · 14 mois', sub: "Pour 2 444 EUR d'équipement", value: '−44,60 EUR' },
]

const FINANCE_POINTS: FinancePoint[] = [
  {
    kicker: 'Situation actuelle',
    title: 'Le public finance déjà le média, mais à une échelle trop basse.',
    body: 'Les 91 dons récurrents prouvent la confiance éditoriale. Ils couvrent une partie des frais courants, pas le temps de travail qui permet de produire régulièrement.',
  },
  {
    kicker: 'Seuil immédiat',
    title: 'Un seul premier poste coûte environ trois fois les revenus mensuels actuels.',
    body: '592 EUR par mois restent insuffisants face à un minimum d’environ 1 800 EUR brut mensuel, avant même les déplacements, logiciels, stockage ou renouvellements de matériel.',
  },
  {
    kicker: 'Enjeu réel',
    title: 'Le modèle est validé ; il n’est pas encore soutenable.',
    body: "La section 05 ne finance pas une expérimentation. Elle sert à transformer une preuve d'adhésion en capacité de production stable.",
  },
]

// Ventilation budget — remplace la table budget
const BUDGET_VIZ: BudgetLine[] = [
  { label: '2 postes salariés brut + charges (2 × 2 000€ net)', amount: '87 400 EUR', pct: 94 },
  { label: 'Déplacements de tournage', amount: '2 400 EUR', pct: 3 },
  { label: 'Équipement et renouvellement', amount: '1 500 EUR', pct: 2 },
  { label: 'Démarches juridiques (CPPAP, rescrit)', amount: '1 000 EUR', pct: 1 },
  { label: 'Production (stockage, logiciels)', amount: '800 EUR', pct: 1 },
]

// Objectifs visuels — remplace la table goals
const GOAL_STATS: SnapStat[] = [
  { label: 'Abonné·es TikTok', sub: 'Objectif fin 2026', value: '65 000' },
  { label: 'Vues cumulées', sub: 'Objectif fin 2026', value: '7,5 M' },
  { label: 'Donateurs·trices', sub: 'Objectif fin 2026', value: '180+' },
  { label: 'Revenus dons / mois', sub: 'Objectif fin 2026', value: '1 100 EUR' },
]

type TeamMember = { name: string; role: string; photo: string | null }

const TEAM: TeamMember[] = [
  { name: 'Hedi', role: 'Fondateur · Directeur éditorial · Présentateur', photo: '/hedi.png' },
  { name: 'Amandine', role: 'Rédactrice · Présentatrice (Fokus, OeilDe)', photo: '/amandine.png' },
  { name: 'Lucho', role: 'Rédacteur · Présentateur (Fokus, OeilDe)', photo: '/louis.png' },
  { name: 'Diego', role: 'Rédacteur · Présentateur (OeilDe)', photo: '/diego.png' },
  { name: 'Gappy', role: 'Montage', photo: '/gappy.png' },
  { name: 'Ibti', role: 'Stagiaire (depuis avril 2026)', photo: '/ibti.png' },
]

type PlatformItem = { name: string; handle: string; role: string; primary?: boolean }

const PLATFORMS: PlatformItem[] = [
  { name: 'TikTok', handle: '@sanstransition', role: 'Plateforme principale', primary: true },
  { name: 'YouTube', handle: 'SansTransitionMedia', role: 'Formats longs et documentaires' },
  { name: 'Instagram', handle: '@sanstransition__', role: 'Relais Fokus et Reels' },
  { name: 'X', handle: '@sanstransition_', role: 'Veille et relais' },
  { name: 'Twitch', handle: '@sans_transition', role: 'Lives et formats interactifs' },
]

const TABLES = {
  team: [['Hedi', 'Fondateur - Directeur éditorial - Présentateur'], ['Amandine', 'Rédactrice - Présentatrice (Fokus, OeilDe)'], ['Lucho', 'Rédacteur - Présentateur (Fokus, OeilDe)'], ['Diego', 'Rédacteur - Présentateur (OeilDe)'], ['Gappy', 'Montage'], ['Ibti', 'Stagiaire (depuis avril 2026)']],
  platforms: [['TikTok', '@sanstransition - plateforme principale'], ['YouTube', 'SansTransitionMedia - formats longs et documentaires'], ['Instagram', '@sanstransition__ - relais Fokus et Reels'], ['X (Twitter)', '@sanstransition_ - veille et relais'], ['Twitch', '@sans_transition - lives et formats interactifs']],
  timeline: [['T2 2026 (avril - juin)', 'Mise en place du contrat de travail et lancement de Tribunal des Médias saison 1.'], ['T3 2026 (juillet - septembre)', 'Dépôt CPPAP, campagne donateurs·trices et accélération de la production.'], ['T4 2026 (octobre - décembre)', 'TDM saison 2, bilan annuel et préparation du dossier de rescrit fiscal.'], ['T1 2027 (janvier - mars)', 'Consolidation, bilan du soutien et discussion sur le renouvellement.']],
  collab: [['Vues cumulées TikTok', '602 000'], ['Vues Instagram', '379 000'], ['Nouveaux abonné·es ST acquis', '+ 3 251'], ['Engagement rate moyen (TikTok)', '24,3 %'], ['Share rate peak (Extrême gauche)', '1,30 %']],
  references: [['Loi Yadan (31 mars 2026)', '527k vues - 2,6 % share rate'], ['Ibti - Lesbienne et musulmane', '997k vues - 1,7 % share rate'], ['Élodie (OeilDe)', '262k vues - 2,1 % share rate'], ['Aidez Abood', '178k vues - 6,2 % share rate']],
}

const LISTS = {
  works: ['Le modèle de dons récurrents : 91 personnes paient sans contrepartie fiscale.', 'La cohérence éditoriale attire une audience fidèle, ce qui rend les appels au don crédibles.', 'Le coût de production reste bas grâce à une équipe outillée et autonome.'],
  gaps: ["Toute l'équipe travaille sans rémunération depuis 14 mois : le risque d'épuisement est structurel.", '592 EUR par mois couvrent des frais courants, pas un poste ni des déplacements réguliers.', "L'absence de CPPAP et de rescrit fiscal freine les aides publiques et la croissance des dons."],
  goals24: ["Deux postes salariés dans l'association : direction éditoriale et coordination de production.", '300+ donateurs·trices récurrents avec défiscalisation activée si le rescrit aboutit.', 'Tribunal des Médias institutionnalisé : 4 épisodes par an et présence événementielle.', 'Développement YouTube vers des documentaires longs et des mini-séries thématiques.', 'Diversification des revenus : aides publiques presse, fondations et appels à projets européens.'],
  annexes: ["Statuts de l'association loi 1901", 'Bilan financier détaillé 2025 / T1 2026', 'Données TikTok Studio certifiées (export complet)', 'Rapport de collaboration Le Média (mars 2026)', 'Pitch de partenariat Mediapart (avril 2026)', "CV des membres clés de l'équipe", 'Liens vers les vidéos mentionnées dans le dossier', 'Projections financières fin 2026 et 2027'],
}

function Table({ headers, rows }: TableProps) {
  return <div className="cbt-data-table"><table><thead><tr>{headers.map((h) => <th key={h}>{h}</th>)}</tr></thead><tbody>{rows.map((row, i) => <tr key={`${headers[0]}-${i}`}>{row.map((cell, j) => <td key={`${headers[0]}-${i}-${j}`}>{cell}</td>)}</tr>)}</tbody></table></div>
}

function BulletPanel({ title, items }: { title: string; items: string[] }) {
  return <div className="cbt-panel cbt-panel-surface cbt-interactive"><div className="cbt-panel-kicker">{title}</div><ul className="cbt-bullet-list">{items.map((item) => <li key={item}>{item}</li>)}</ul></div>
}

function GrowthChart() {
  return <div className="cbt-chart-wrap cbt-rv cbt-d1"><svg className="cbt-chart-svg" viewBox="0 0 900 320" id="cbt-growth-svg"><defs><linearGradient id="cbt-lg" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stopColor="oklch(0.72 0.27 290)" /><stop offset="48%" stopColor="oklch(0.78 0.22 330)" /><stop offset="100%" stopColor="oklch(0.85 0.25 40)" /></linearGradient><linearGradient id="cbt-area-fill" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="oklch(0.72 0.27 290)" stopOpacity=".18" /><stop offset="100%" stopColor="oklch(0.72 0.27 290)" stopOpacity="0" /></linearGradient></defs><line x1="60" y1="20" x2="60" y2="260" stroke="#1c1c2c" strokeWidth="1" /><line x1="60" y1="260" x2="880" y2="260" stroke="#1c1c2c" strokeWidth="1" /><text x="50" y="264" className="cbt-axis-label" textAnchor="end">0</text><text x="50" y="205" className="cbt-axis-label" textAnchor="end">10k</text><text x="50" y="146" className="cbt-axis-label" textAnchor="end">25k</text><text x="50" y="100" className="cbt-axis-label" textAnchor="end">40k</text><text x="50" y="64" className="cbt-axis-label" textAnchor="end">47k</text><line x1="60" y1="205" x2="880" y2="205" className="cbt-guide" /><line x1="60" y1="146" x2="880" y2="146" className="cbt-guide" /><line x1="60" y1="100" x2="880" y2="100" className="cbt-guide" /><text x="60" y="278" className="cbt-axis-label" textAnchor="middle">Fev. 25</text><text x="231" y="278" className="cbt-axis-label" textAnchor="middle">Mai 25</text><text x="401" y="278" className="cbt-axis-label" textAnchor="middle">Août 25</text><text x="572" y="278" className="cbt-axis-label" textAnchor="middle">Nov. 25</text><text x="742" y="278" className="cbt-axis-label" textAnchor="middle">Fev. 26</text><text x="880" y="278" className="cbt-axis-label" textAnchor="middle">Avr. 26</text><path className="cbt-chart-area" id="cbt-chart-area" d="M60,244 C80,244 90,220 100,212 C130,196 190,165 249,140 C310,115 420,72 502,68 C580,64 640,46 692,44 C760,40 820,38 880,37 L880,260 L60,260 Z" /><path className="cbt-chart-line" id="cbt-chart-line" d="M60,244 C80,244 90,220 100,212 C130,196 190,165 249,140 C310,115 420,72 502,68 C580,64 640,46 692,44 C760,40 820,38 880,37" /><line x1="100" y1="212" x2="100" y2="260" className="cbt-milestone-line" /><circle className="cbt-chart-dot" cx="100" cy="212" r="5" /><text x="104" y="200" className="cbt-milestone-text">19 jours</text><text x="104" y="213" className="cbt-milestone-num">10k</text><line x1="249" y1="140" x2="249" y2="260" className="cbt-milestone-line" /><circle className="cbt-chart-dot" cx="249" cy="140" r="5" /><text x="253" y="128" className="cbt-milestone-text">3 mois</text><text x="253" y="141" className="cbt-milestone-num">25k</text><line x1="502" y1="68" x2="502" y2="260" className="cbt-milestone-line" /><circle className="cbt-chart-dot" cx="502" cy="68" r="5" /><text x="506" y="56" className="cbt-milestone-text">7 mois</text><text x="506" y="69" className="cbt-milestone-num">40k</text><circle className="cbt-chart-dot" cx="880" cy="37" r="5" /><text x="840" y="26" className="cbt-milestone-text">13 mois</text><text x="840" y="38" className="cbt-milestone-num">47k+</text></svg></div>
}

function BlockingLoop() {
  return (
    <div className="cbt-loop-panel cbt-interactive">
      <div className="cbt-loop-copy">
        <div className="cbt-panel-kicker">Pourquoi les aides publiques sont inaccessibles</div>
        <h3 className="cbt-loop-title">Le financement public demande le statut que le financement permettrait d'obtenir.</h3>
        <p className="cbt-loop-lead">Sans premier poste salarié, pas de carte de presse. Sans carte de presse, pas de reconnaissance CPPAP. Sans CPPAP, pas d'aides structurelles à la presse.</p>
      </div>
      <div className="cbt-loop-map" aria-label="Boucle bloquante des aides publiques">
        <div className="cbt-loop-core">
          <span>Boucle</span>
          bloquante
        </div>
        <div className="cbt-loop-card cbt-loop-card-a">
          <span className="cbt-loop-step">01</span>
          <strong>Pas de salariés</strong>
          <small>0 EUR versés · 14 mois</small>
        </div>
        <div className="cbt-loop-card cbt-loop-card-b">
          <span className="cbt-loop-step">02</span>
          <strong>Pas de carte de presse</strong>
          <small>Exige un salaire journalistique</small>
        </div>
        <div className="cbt-loop-card cbt-loop-card-c">
          <span className="cbt-loop-step">03</span>
          <strong>Pas de CPPAP</strong>
          <small>Exige des journalistes accrédités</small>
        </div>
        <div className="cbt-loop-card cbt-loop-card-d">
          <span className="cbt-loop-step">04</span>
          <strong>Pas d'aides publiques</strong>
          <small>Conditionnées au CPPAP</small>
        </div>
      </div>
      <div className="cbt-loop-exit">
        <span className="grad-line" />
        <p>La sortie logique est un financement direct, non conditionné à un statut que ce financement doit précisément permettre d'obtenir.</p>
      </div>
    </div>
  )
}

function PlatformGrid() {
  return (
    <div className="cbt-platform-grid cbt-rv cbt-d2">
      {PLATFORMS.map((p) => (
        <div key={p.name} className={`cbt-platform-card cbt-interactive${p.primary ? ' cbt-platform-primary' : ''}`}>
          <div className="cbt-platform-name">{p.name}</div>
          <div className="cbt-platform-handle">{p.handle}</div>
          <div className="cbt-platform-role">{p.role}</div>
        </div>
      ))}
    </div>
  )
}

function TeamGrid() {
  return (
    <div className="cbt-team-grid cbt-rv cbt-d2">
      {TEAM.map((member) => (
        <div key={member.name} className="cbt-team-card cbt-interactive">
          <div className="cbt-team-avatar">
            {member.photo ? (
              <Image src={member.photo} alt={member.name} width={96} height={96} className="cbt-team-photo" />
            ) : (
              <div className="cbt-team-initials grad-text">{member.name.slice(0, 2).toUpperCase()}</div>
            )}
          </div>
          <div className="cbt-team-name">{member.name}</div>
          <div className="cbt-team-role">{member.role}</div>
        </div>
      ))}
    </div>
  )
}

export default function CombatClient() {
  const [unlocked, setUnlocked] = useState(false)
  const goTo = (id: string) => { const el = document.getElementById(id); if (!el) return; window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 60, behavior: 'smooth' }) }
  useEffect(() => {
    if (!unlocked) return
    const prefersFinePointer = window.matchMedia('(pointer: fine)').matches
    const cursor = document.getElementById('cbt-cursor'); const ring = document.getElementById('cbt-cursor-ring'); const progress = document.getElementById('cbt-progress'); const header = document.getElementById('cbt-header'); const glowA = document.getElementById('cbt-glow-a'); const glowB = document.getElementById('cbt-glow-b'); const chartLine = document.getElementById('cbt-chart-line'); const chartArea = document.getElementById('cbt-chart-area'); const chartDots = document.querySelectorAll('.cbt-chart-dot')
    let mx = window.innerWidth / 2, my = window.innerHeight / 2, rx = mx, ry = my, rafId = 0
    const onMove = (e: MouseEvent) => { mx = e.clientX; my = e.clientY; if (cursor) { cursor.style.left = `${mx}px`; cursor.style.top = `${my}px` } if (glowA && glowB) { const nx = (e.clientX / window.innerWidth - 0.5) * 2; const ny = (e.clientY / window.innerHeight - 0.5) * 2; glowA.style.transform = `translate(${nx * 24}px, ${ny * 16}px)`; glowB.style.transform = `translate(${-nx * 20}px, ${-ny * 14}px) scale(1.05)` } }
    const animateRing = () => { rx += (mx - rx) * 0.12; ry += (my - ry) * 0.12; if (ring) { ring.style.left = `${rx}px`; ring.style.top = `${ry}px` } rafId = requestAnimationFrame(animateRing) }
    const onScroll = () => { const h = document.documentElement.scrollHeight - window.innerHeight; if (progress) progress.style.width = `${(window.scrollY / h) * 100}%`; if (header) header.classList.toggle('cbt-scrolled', window.scrollY > 20) }
    const interactEls = document.querySelectorAll('.cbt-interactive'); const addHover = () => document.body.classList.add('cbt-hovering'); const removeHover = () => document.body.classList.remove('cbt-hovering'); interactEls.forEach((el) => { el.addEventListener('mouseenter', addHover); el.addEventListener('mouseleave', removeHover) })
    const revealEls = document.querySelectorAll('.cbt-rv'); const revealObserver = new IntersectionObserver((entries) => { entries.forEach((entry) => { if (entry.isIntersecting) entry.target.classList.add('cbt-on') }) }, { threshold: 0.1 }); revealEls.forEach((el) => revealObserver.observe(el)); window.setTimeout(() => { revealEls.forEach((el) => { if (el.getBoundingClientRect().top < window.innerHeight) el.classList.add('cbt-on') }) }, 60)
    const dots = document.querySelectorAll('.cbt-dot'); const sections = document.querySelectorAll('[data-combat-section]'); const dotObserver = new IntersectionObserver((entries) => { entries.forEach((entry) => { if (!entry.isIntersecting) return; dots.forEach((dot) => dot.classList.remove('cbt-active')); const id = entry.target.getAttribute('data-combat-section'); document.querySelector(`.cbt-dot[data-section="${id}"]`)?.classList.add('cbt-active') }) }, { threshold: 0.35 }); sections.forEach((section) => dotObserver.observe(section))
    const animateCount = (el: Element) => { const dataset = (el as HTMLElement).dataset; const target = parseFloat(dataset.count ?? '0'); if (Number.isNaN(target)) return; const duration = 1400; const start = performance.now(); const format = dataset.format; const suffix = dataset.suffix ?? ''; const isFloat = dataset.float === 'true'; const step = (now: number) => { const ratio = Math.min((now - start) / duration, 1); const eased = 1 - Math.pow(1 - ratio, 3); const value = target * eased; let text = ''; if (format === 'millions') text = `${(value / 1000000).toFixed(1)}M`; else if (suffix === 'EUR') text = `${Math.round(value).toLocaleString('fr-FR')} EUR`; else if (suffix === '%') text = `${value.toFixed(1)} %`; else if (isFloat) text = `${value.toFixed(1)}`; else text = Math.round(value).toLocaleString('fr-FR'); el.textContent = text; if (ratio < 1) requestAnimationFrame(step) }; requestAnimationFrame(step) }
    const counterObserver = new IntersectionObserver((entries) => { entries.forEach((entry) => { if (!entry.isIntersecting) return; animateCount(entry.target); counterObserver.unobserve(entry.target) }) }, { threshold: 0.4 }); document.querySelectorAll('[data-count]').forEach((el) => counterObserver.observe(el))
    const widthObserver = new IntersectionObserver((entries) => { entries.forEach((entry) => { if (!entry.isIntersecting) return; const target = entry.target as HTMLElement; const width = target.dataset.width; if (width) target.style.width = `${width}%`; widthObserver.unobserve(target) }) }, { threshold: 0.2 }); document.querySelectorAll('[data-width]').forEach((el) => widthObserver.observe(el))
    const chartObserver = new IntersectionObserver((entries) => { entries.forEach((entry) => { if (!entry.isIntersecting) return; chartLine?.classList.add('cbt-drawn'); chartArea?.classList.add('cbt-drawn'); chartDots.forEach((dot, index) => window.setTimeout(() => dot.classList.add('cbt-drawn'), 600 + index * 200)); chartObserver.disconnect() }) }, { threshold: 0.3 }); const growthSvg = document.getElementById('cbt-growth-svg'); if (growthSvg) chartObserver.observe(growthSvg)
    if (prefersFinePointer) { document.addEventListener('mousemove', onMove); animateRing(); document.body.classList.add('cbt-custom-cursor') }
    window.addEventListener('scroll', onScroll, { passive: true }); onScroll()
    return () => { if (prefersFinePointer) { document.removeEventListener('mousemove', onMove); cancelAnimationFrame(rafId); document.body.classList.remove('cbt-custom-cursor') } window.removeEventListener('scroll', onScroll); revealObserver.disconnect(); dotObserver.disconnect(); counterObserver.disconnect(); widthObserver.disconnect(); chartObserver.disconnect(); interactEls.forEach((el) => { el.removeEventListener('mouseenter', addHover); el.removeEventListener('mouseleave', removeHover) }); document.body.classList.remove('cbt-hovering') }
  }, [unlocked])

  if (!unlocked) return <ProtectedDocumentGate onUnlock={() => setUnlocked(true)} />

  return <><div id="cbt-progress" /><div id="cbt-cursor" /><div id="cbt-cursor-ring" /><div className="cbt-shell"><header id="cbt-header"><div className="cbt-header-inner"><a href="/combat" className="cbt-logo cbt-interactive">Sans Transition</a><span className="cbt-tag">Document confidentiel - Avril 2026</span><ActionButton href="mailto:contact@sanstransition.fr" className="cbt-interactive cbt-cta" style={{ cursor: 'none' }}>Contact</ActionButton></div></header><SideNav navId="cbt-side-nav" ariaLabel="Navigation latérale" items={NAV_ITEMS} itemClassName="cbt-dot cbt-interactive" activeClassName="cbt-active" onItemClick={goTo} />

    {/* ── HERO ── */}
    <section id="combat-hero" data-combat-section="combat-hero" className="cbt-section cbt-hero"><div className="cbt-hero-grid" /><div className="cbt-glow-a" id="cbt-glow-a" /><div className="cbt-glow-b" id="cbt-glow-b" /><div className="cbt-hero-inner"><p className="cbt-hero-kicker cbt-rv">Dossier de demande de soutien financier - Avril 2026</p><h1 className="cbt-hero-title cbt-rv cbt-d1">SANS<br /><span className="grad-text">TRANSITION</span></h1><p className="cbt-hero-sub cbt-rv cbt-d2">Sans Transition est un média associatif radical de 14 mois. Zéro budget d'acquisition. Zéro publicité. 5,1 millions de vues. 47 590 abonné·es. Une équipe entièrement bénévole. Ce dossier expose pourquoi ce modèle mérite un soutien financier structurel et ce que ce soutien rend possible.</p><div className="cbt-hero-actions cbt-rv cbt-d2"><ActionButton onClick={() => goTo('combat-demande')} className="cbt-interactive cbt-cta" style={{ cursor: 'none' }}>La demande</ActionButton><ActionButton onClick={() => goTo('combat-preuves')} variant="outline" className="cbt-interactive" style={{ cursor: 'none' }} showArrow={false}>Les preuves</ActionButton></div><div className="cbt-hero-stats cbt-rv cbt-d3">{HERO_STATS.map((item) => <div key={item.label} className="cbt-card cbt-hero-card cbt-interactive">{item.icon && <span className="cbt-card-icon">{item.icon}</span>}<span className="cbt-hero-num grad-text" data-count={item.count} data-format={item.format} data-suffix={item.suffix} data-float={item.float ? 'true' : undefined}>0</span><span className="cbt-card-label">{item.label}</span><span className="cbt-card-sub">{item.sub}</span></div>)}</div></div></section>

    {/* ── 01 · ORGANISATION — sans grille résumé ni fiche juridique ── */}
    <section id="combat-organisation" data-combat-section="combat-organisation" className="cbt-section cbt-section-alt"><div className="cbt-max"><SectionHeader className="cbt-rv" showLine eyebrow="01 · Présentation" title="L'organisation, son cadre et son positionnement" body="Sans Transition est une association loi 1901 fondée le 27 février 2025. Son positionnement éditorial est la condition de la confiance de son audience." /><div className="cbt-grid-2 cbt-rv cbt-d1"><div className="cbt-panel cbt-interactive"><div className="cbt-panel-kicker">Positionnement éditorial</div><h3 className="cbt-panel-title">Par et pour les minorités</h3><div className="cbt-rich-text"><p>Ligne éditoriale : radicale de gauche, décoloniale, écosocialiste. Sans Transition traite les violences institutionnelles, les luttes minoritaires, la géopolitique et l'écologie sans neutralité de façade.</p><p>Ce positionnement est le fondement de la crédibilité du média et la raison pour laquelle l'audience partage, défend et finance le projet.</p></div></div><div className="cbt-panel cbt-panel-surface cbt-interactive"><div className="cbt-panel-kicker">Gouvernance</div><div className="cbt-rich-text"><p>Association loi 1901 · siège à Saint-Denis (93) · fondée le 27 février 2025. Direction éditoriale et représentation légale : Hedi. Décisions éditoriales prises collégialement avec la rédaction.</p><p>Aucun investisseur extérieur, aucun actionnaire, aucune dépendance capitalistique. L'intégralité de l'équipe travaille bénévolement à ce jour.</p></div></div></div><TeamGrid /></div></section>

    {/* ── 02 · PROJET ── */}
    <section id="combat-projet" data-combat-section="combat-projet" className="cbt-section"><div className="cbt-max"><SectionHeader className="cbt-rv" showLine eyebrow="02 · Projet éditorial" title="Une ligne assumée, des formats identifiés, une distribution pensée pour le partage" body="Sans Transition ne modère pas sa ligne pour l'algorithme. La cohérence éditoriale produit ici la confiance, puis la viralité, puis le soutien financier." /><div className="cbt-grid-2 cbt-rv cbt-d1"><div className="cbt-panel cbt-interactive"><div className="cbt-panel-kicker">Ligne éditoriale</div><div className="cbt-rich-text"><p>Violences policières, Palestine, islamophobie, impérialisme : les sujets structurellement défavorisés par les plateformes sont traités sans filtre.</p><p>La neutralité est un biais en faveur du statu quo. Sans Transition assume son positionnement comme condition de sa crédibilité, pas comme obstacle à surmonter.</p></div></div><div className="cbt-panel cbt-panel-surface cbt-interactive"><div className="cbt-panel-kicker">Distribution et plateformes</div><div className="cbt-rich-text"><p>TikTok est le moteur principal de distribution. La stratégie repose sur la viralité algorithmique via le share rate, pas sur la portée organique des seuls abonné·es.</p><p>Chaque vidéo est conçue pour être partagée hors communauté. YouTube, Instagram, X et Twitch servent d'extensions de contexte, de relais et de développement de formats.</p></div></div></div><div className="cbt-format-grid cbt-rv cbt-d1">{FORMAT_ITEMS.map((item) => <div key={item.idx} className="cbt-format-card cbt-interactive"><div className="cbt-format-idx">{item.idx}</div><div className="cbt-format-name">{item.name}</div><div className="cbt-format-tagline">{item.tagline}</div><p className="cbt-format-body">{item.body}</p><span className={`cbt-format-stat${item.muted ? ' cbt-muted' : ''}`}>{item.stat}</span></div>)}</div><PlatformGrid /></div></section>

    {/* ── 03 · AUDIENCE — sans table métriques (remplacée par la mosaïque) ── */}
    <section id="combat-audience" data-combat-section="combat-audience" className="cbt-section cbt-section-alt"><div className="cbt-max"><SectionHeader className="cbt-rv" showLine eyebrow="03 · Audience et impact" title="Une audience rare, active et politiquement alignée" body="Cette audience ne lit pas la presse payante, consomme l'information sur plateformes courtes, partage ce qui la représente et finance les médias en qui elle a confiance." /><div className="cbt-rv cbt-d1"><div className="cbt-audience-wrap"><div className="cbt-audience-reach">{MOSAIC_STATS.slice(0, 4).map((item) => <div key={item.label} className="cbt-reach-card cbt-interactive"><span className="cbt-reach-num grad-text" data-count={item.count} data-format={item.format} data-suffix={item.suffix} data-float={item.float ? 'true' : undefined}>0</span><div className="cbt-card-label cbt-card-label-wrap">{item.icon && <span style={{ flexShrink: 0 }}>{item.icon}</span>}{item.label}</div><div className="cbt-card-sub">{item.sub}</div></div>)}</div><div className="cbt-audience-profile">{MOSAIC_STATS.slice(4).map((item) => <div key={item.label} className="cbt-profile-card cbt-interactive"><span className="cbt-profile-num grad-text" data-count={item.count} data-format={item.format} data-suffix={item.suffix} data-float={item.float ? 'true' : undefined}>0</span><div className="cbt-card-label cbt-card-label-wrap">{item.icon && <span style={{ flexShrink: 0 }}>{item.icon}</span>}{item.label}</div><div className="cbt-card-sub">{item.sub}</div></div>)}</div></div></div><div className="cbt-demo-redesign cbt-rv cbt-d1"><div className="cbt-demo-left"><p className="cbt-demo-title">Démographie de l'audience</p><div>{AUDIENCE_BARS.map((item) => <div key={item.label} className="cbt-demo-bar-item"><div className="cbt-demo-bar-row"><span className="cbt-demo-bar-label">{item.label}</span><span className="cbt-demo-bar-value" data-count={item.value} data-float="true">0</span></div><div className="cbt-demo-bar-track"><div className="cbt-demo-bar-fill" data-width={item.value} /></div></div>)}</div></div><div className="cbt-demo-right"><p className="cbt-er-label">Engagement rate moyen</p><div className="cbt-er-stat grad-text" data-count={21.7} data-suffix="%">0</div><div className="cbt-er-notes"><p className="cbt-er-note">Trois à huit fois le benchmark du secteur. La signature d'une audience idéologiquement alignée qui interagit parce qu'elle fait confiance au média.</p><p className="cbt-er-note">91 personnes paient chaque mois sans réduction fiscale. C'est une preuve de communauté plus forte que n'importe quelle métrique de portée brute.</p></div></div></div><div className="cbt-rv cbt-d2"><SectionHeader showLine eyebrow="03.1 · Croissance" title="Multiplication par 14 en 13 mois" body="10 000 abonné·es en 19 jours, 25 000 en 3 mois, 40 000 en 7 mois, 47 000+ en 13 mois. Sans budget d'acquisition, sans promotion payante." style={{ marginTop: 64 }} /><GrowthChart /></div><div className="cbt-rv cbt-d2"><SectionHeader showLine eyebrow="03.2 · Seuil viral" title="Quand une vidéo sort de la bulle communautaire" body="Au-delà de 1,0 %, le share rate fait basculer une vidéo vers le flux algorithmique de masse." style={{ marginTop: 64 }} /><div className="cbt-viral-grid"><div className="cbt-viral-head"><span>Vidéo</span><span>Share rate</span><span style={{ textAlign: 'right' }}>SR</span><span style={{ textAlign: 'right' }}>Vues</span></div>{VIRAL_ITEMS.map((item) => <div key={item.title} className="cbt-viral-row cbt-interactive"><span className="cbt-viral-title">{item.title}</span><div className="cbt-viral-bar-wrap"><div className="cbt-viral-bar" data-width={(item.sr / 6.2) * 100} /></div><span className="cbt-viral-sr grad-text">{item.sr.toFixed(1).replace('.', ',')} %</span><span className="cbt-viral-views">{item.views}</span></div>)}</div><div className="cbt-threshold"><span className="grad-line" />Seuil viral constaté à 1,0 % - en dessous, bulle communautaire - au-delà, diffusion de masse</div></div><div className="cbt-grid-2 cbt-rv cbt-d3"><div className="cbt-panel cbt-interactive"><div className="cbt-panel-kicker">Impact qualitatif</div><h3 className="cbt-panel-title">Loi Yadan : la vidéo de référence</h3><div className="cbt-rich-text"><p>La vidéo du 31 mars 2026 a dépassé 527k vues avec un share rate de 2,6 %. Elle a circulé dans des réseaux militants et s'est imposée comme référence dans la search TikTok sur la loi Yadan avant le vote de l'Assemblée nationale du 16 avril.</p></div></div><div className="cbt-panel cbt-panel-surface cbt-interactive"><div className="cbt-panel-kicker">Communauté engagée</div><h3 className="cbt-panel-title">Le soutien précède déjà le financement structurel</h3><div className="cbt-rich-text"><p>91 donateurs·trices récurrents sans réduction fiscale constituent une preuve d'adhésion éditoriale plus solide que n'importe quelle croissance de reach.</p><p>Chaque don mensuel est ici un acte de confiance politique, pas une optimisation fiscale.</p></div></div></div></div></section>

    {/* ── 04 · FINANCES — snapshot visuel remplace la table revenus ── */}
    <section id="combat-finances" data-combat-section="combat-finances" className="cbt-section"><div className="cbt-max"><SectionHeader className="cbt-rv" showLine eyebrow="04 · Modèle économique actuel" title="Une preuve de soutien, pas encore un modèle soutenable" body="Le média a validé son utilité éditoriale et sa capacité à convertir la confiance en dons. Le blocage est maintenant très concret : les revenus récurrents ne couvrent pas le temps de travail nécessaire pour tenir dans la durée." /><div className="cbt-hero-stats cbt-rv cbt-d1" style={{ marginTop: 0, marginBottom: 48 }}>{FIN_STATS.map((item) => <div key={item.label} className="cbt-card cbt-hero-card cbt-interactive"><span className="cbt-hero-num grad-text">{item.value}</span><span className="cbt-card-label">{item.label}</span><span className="cbt-card-sub">{item.sub}</span></div>)}</div><div className="cbt-fin-clarity cbt-rv cbt-d1">{FINANCE_POINTS.map((item) => <div key={item.kicker} className="cbt-fin-point cbt-interactive"><div className="cbt-panel-kicker">{item.kicker}</div><h3>{item.title}</h3><p>{item.body}</p></div>)}</div><div className="cbt-fin-grid cbt-rv cbt-d1"><div><p className="cbt-compare-title">Lecture du besoin mensuel minimal</p><div className="cbt-compare-list">{COMPARE_ROWS.map((row) => <div key={row.label}><div className="cbt-compare-label"><span>{row.label}</span><span>{row.value}</span></div><div className="cbt-compare-track"><div className={`cbt-compare-fill${row.gradient ? ' cbt-gradient' : ''}${row.dark ? ' cbt-dark' : ' cbt-dim'}`} data-width={row.pct} /></div></div>)}</div><div className="cbt-fin-quote cbt-rv cbt-d2">&ldquo;Le coût de production reste faible grâce au bénévolat de l'équipe et à une chaîne technique maîtrisée. Ce faible coût prouve l'efficacité du modèle ; il ne justifie pas que le bénévolat devienne permanent.&rdquo;</div></div><div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}><BulletPanel title="Ce qui est déjà validé" items={LISTS.works} /><BulletPanel title="Ce qui bloque encore" items={LISTS.gaps} /></div></div></div></section>

    {/* ── 05 · DEMANDE — ventilation budget visuelle remplace la table ── */}
    <section id="combat-demande" data-combat-section="combat-demande" className="cbt-section cbt-section-alt"><div className="cbt-max"><SectionHeader className="cbt-rv" showLine eyebrow="05 · La demande" title="Un soutien structurel sur 12 mois" body="Base de travail : environ 93 000 EUR pour couvrir deux postes salariés à temps plein (2 000€ net chacun) et les frais de production indispensables à la stabilisation du média." /><div className="cbt-highlight-panel cbt-rv cbt-d1"><div className="cbt-panel-kicker">Montant sollicité</div><div className="cbt-highlight-value grad-text">93 000 EUR</div><p className="cbt-highlight-copy">Deux postes salariés à temps plein (2 000€ net chacun) sur 12 mois, plus les frais de production. Ajustable selon la forme du soutien.</p></div><div className="cbt-ask-grid cbt-rv cbt-d1">{ASK_ITEMS.map((item) => <div key={item.idx} className="cbt-ask-card cbt-interactive"><div className="cbt-ask-idx">{item.idx}</div><div className="cbt-ask-title">{item.title}</div><p className="cbt-ask-body">{item.body}</p></div>)}</div><div className="cbt-rv cbt-d2" style={{ marginBottom: 48 }}><BlockingLoop /></div><div className="cbt-grid-2 cbt-rv cbt-d2"><div className="cbt-panel cbt-interactive"><div className="cbt-panel-kicker">Ventilation du budget · 93 000 EUR / an</div><div style={{ display: 'flex', flexDirection: 'column', gap: 20, marginTop: 8 }}>{BUDGET_VIZ.map((item) => <div key={item.label}><div className="cbt-compare-label"><span>{item.label}</span><span style={{ fontWeight: 600, color: 'var(--fg)' }}>{item.amount}</span></div><div className="cbt-compare-track" style={{ height: 6 }}><div className="cbt-compare-fill cbt-gradient" data-width={item.pct} /></div></div>)}</div><p style={{ marginTop: 20, fontSize: 11, color: 'var(--fg2)', letterSpacing: '0.14em', textTransform: 'uppercase' }}>Total · 93 100 EUR sur 12 mois</p></div><Table headers={['Trimestre', 'Usage prioritaire']} rows={TABLES.timeline} /></div><div className="cbt-sec-head cbt-roadmap-head cbt-rv"><div className="cbt-eyebrow"><span className="grad-line" />Ce que ce soutien débloque concrètement</div></div><div className="cbt-roadmap-grid cbt-rv cbt-d2">{ROADMAP_ITEMS.map((item) => <div key={item.idx} className="cbt-roadmap-card cbt-interactive"><div className="cbt-roadmap-idx">{item.idx}</div><div className="cbt-roadmap-title">{item.title}</div><p className="cbt-roadmap-body">{item.body}</p></div>)}</div></div></section>

    {/* ── 06 · PERSPECTIVES — stat cards remplacent la table objectifs ── */}
    <section id="combat-perspectives" data-combat-section="combat-perspectives" className="cbt-section"><div className="cbt-max"><SectionHeader className="cbt-rv" showLine eyebrow="06 · Perspectives et plan" title="Un levier d'autonomie, pas une perfusion" body="Le soutien demandé ne vise pas une dépendance durable à un financeur unique. Il sert à rendre possible une diversification réelle des ressources à 12 et 24 mois." /><div className="cbt-hero-stats cbt-rv cbt-d1" style={{ marginTop: 0, marginBottom: 48 }}>{GOAL_STATS.map((item) => <div key={item.label} className="cbt-card cbt-hero-card cbt-interactive"><span className="cbt-hero-num grad-text">{item.value}</span><span className="cbt-card-label">{item.label}</span><span className="cbt-card-sub">{item.sub}</span></div>)}</div><div className="cbt-rv cbt-d1"><BulletPanel title="Objectifs à 24 mois (fin 2027)" items={LISTS.goals24} /></div><div className="cbt-sec-head cbt-roadmap-head cbt-rv"><div className="cbt-eyebrow"><span className="grad-line" />Stratégie de diversification</div></div><div className="cbt-grid-3 cbt-rv cbt-d2"><div className="cbt-panel cbt-interactive"><div className="cbt-panel-kicker">Dons grand public</div><div className="cbt-rich-text"><p>Campagne de recrutement avec UTM tracking. Objectif : 180 donateurs·trices fin 2026 puis 300 fin 2027.</p></div></div><div className="cbt-panel cbt-interactive"><div className="cbt-panel-kicker">Aides publiques</div><div className="cbt-rich-text"><p>Dépôt CPPAP pour ouvrir l'accès aux aides structurelles à la presse après 12 mois de publication régulière.</p></div></div><div className="cbt-panel cbt-interactive"><div className="cbt-panel-kicker">Partenariats éditoriaux rémunérés</div><div className="cbt-rich-text"><p>Structuration d'une convention Mediapart et identification d'autres rédactions compatibles sur des sujets prioritaires.</p></div></div></div></div></section>

    {/* ── 07 · PREUVES ── */}
    <section id="combat-preuves" data-combat-section="combat-preuves" className="cbt-section cbt-section-alt"><div className="cbt-max"><SectionHeader className="cbt-rv" showLine eyebrow="07 · Preuves de crédibilité" title="Des résultats, des collaborations, des formats déjà validés" body="Le dossier ne part pas d'une promesse abstraite. Il s'appuie sur des chiffres, une collaboration déjà exécutée et une relation éditoriale en cours de structuration." /><div className="cbt-grid-2 cbt-rv cbt-d1"><div className="cbt-panel cbt-interactive"><div className="cbt-panel-kicker">Collaboration Le Média (janvier - mars 2026)</div><div className="cbt-rich-text"><p>11 épisodes Fokus co-produits sur le plateau du Média, distribués en cross-post TikTok. La collaboration a validé la capacité de Sans Transition à produire dans un cadre partenarial tout en conservant sa performance éditoriale.</p><p>La rupture est intervenue sur la question de la rémunération après présentation d'un bilan chiffré complet et de deux scénarios de paiement. Le désaccord a été documenté et géré stratégiquement.</p></div></div><Table headers={['Résultat', 'Valeur']} rows={TABLES.collab} /></div><div className="cbt-grid-2 cbt-rv cbt-d2"><div className="cbt-panel cbt-panel-surface cbt-interactive"><div className="cbt-panel-kicker">Partenariat Mediapart (en cours de structuration)</div><div className="cbt-rich-text"><p>Un pitch de collaboration formel a été transmis à la rédaction de Mediapart. La proposition porte sur un cycle test de 4 épisodes Fokus à trois voix, basés sur des enquêtes Mediapart et cross-postés sur les deux comptes TikTok.</p><p>La relation éditoriale informelle existe déjà depuis plusieurs mois via une journaliste référente. Le sujet n'est pas de créer un lien ex nihilo, mais de formaliser une compatibilité déjà observée.</p></div></div><div className="cbt-panel cbt-interactive"><div className="cbt-panel-kicker">Soutien financier communautaire</div><div className="cbt-rich-text"><p>91 donateurs·trices récurrents constitués en 12 mois, sans réduction fiscale et sans budget d'acquisition. Chaque personne finance le média par adhésion éditoriale, pas par contrepartie.</p><p>Ce socle reste encore trop faible pour financer un poste, mais il confirme la légitimité du modèle et sa capacité à convertir la confiance en soutien concret.</p></div></div></div><div className="cbt-rv cbt-d3"><Table headers={['Vidéos de référence', 'Performance']} rows={TABLES.references} /></div></div></section>

    {/* ── 08 · ANNEXES ── */}
    <section id="combat-annexes" data-combat-section="combat-annexes" className="cbt-section"><div className="cbt-max"><SectionHeader className="cbt-rv" showLine eyebrow="08 · Annexes" title="Documents disponibles sur demande" body="Les pièces suivantes peuvent être transmises pour vérifier les chiffres, les statuts, les projections et les collaborations mentionnées dans ce dossier." /><div className="cbt-grid-2 cbt-rv cbt-d1"><BulletPanel title="Pièces disponibles" items={LISTS.annexes} /><div className="cbt-panel cbt-panel-surface cbt-interactive"><div className="cbt-panel-kicker">Ce que ce dossier cherche à établir</div><div className="cbt-rich-text"><p>Sans Transition n'a plus besoin de prouver qu'il peut construire une audience. Le point de bascule concerne maintenant la stabilisation de la production et la sortie du tout-bénévolat.</p><p>Le soutien demandé vise à rendre possible une transition structurelle : du média militant qui tient grâce au sacrifice, vers le média militant qui tient parce qu'il est enfin soutenu à hauteur de son utilité politique.</p></div></div></div></div></section>

    {/* ── CONTACT ── */}
    <section id="combat-contact" data-combat-section="combat-contact" className="cbt-contact"><div className="cbt-contact-wrap"><SectionHeader className="cbt-rv" showLine eyebrow="Contact" title="On vous fait confiance." body="Sans Transition ne cherche pas un mécène passif. On cherche quelqu'un qui comprend pourquoi ce type de média doit exister et qui veut que l'équipe puisse continuer dans des conditions dignes." centered /><a href="mailto:contact@sanstransition.fr" className="cbt-contact-link cbt-interactive">contact@sanstransition.fr</a><p className="cbt-contact-meta">Hedi - Fondateur et directeur éditorial - Sans Transition</p><p className="cbt-contact-meta">@sanstransition (TikTok) - SansTransitionMedia (YouTube) - @sanstransition__ (Instagram) - @sans_transition (Twitch)</p></div></section>
    <footer className="cbt-footer">Association loi 1901 - Fondée le 27 février 2025 - Document confidentiel - Avril 2026 - sanstransition.fr</footer></div></>
}
