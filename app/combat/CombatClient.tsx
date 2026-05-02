'use client'
/* eslint-disable react/no-unescaped-entities */

import { type CSSProperties, type ReactNode, useEffect, useMemo, useState } from 'react'

import Image from 'next/image'

import ProtectedDocumentGate from '@/components/ProtectedDocumentGate'
import ActionButton from '@/components/protected-page/ActionButton'
import {
  AnimatedStatNumber,
  BulletPanel as SharedBulletPanel,
  DataTable,
  formatStatValue,
  useProtectedDossierEffects,
} from '@/components/protected-page/dossier'
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
type FinancePoint = { kicker: string; title: string; body: string }
type ProofPoint = { value: string; label: string; body: string }
type HeroSignalItem = { title: string; meta: string; stat: string }
type BudgetSummaryItem = { label: string; amount: string; note: string; primary?: boolean }
type DonationMonth = { month: string; collectedTotal: number; transactions: number; recurringBase: number; oneTimeCollected: number }
type DonationProgress = { monthlyActive: number; monthlyAmount?: number; goal?: number; currency?: string }

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
  { label: 'Vues TikTok', sub: '208 vidéos consolidées', count: 5181269, format: 'millions', icon: <Eye size={20} /> },
  { label: 'Abonné·es', sub: 'TikTok', count: 47590, icon: <Users size={20} /> },
  { label: 'Engagement rate', sub: 'Calculé sur les exports', count: 20.5, suffix: '%', float: true, icon: <TrendingUp size={20} /> },
  { label: 'Donateurs·trices', sub: 'Récurrents sans défiscalisation', count: 91, icon: <Heart size={20} /> },
]

const MOSAIC_STATS: StatItem[] = [
  { label: 'Likes totaux', sub: "Signal d'adhésion", count: 949882, icon: <ThumbsUp size={14} /> },
  { label: 'Partages', sub: 'Signal de viralité', count: 76357, icon: <Share2 size={14} /> },
  { label: 'Commentaires', sub: 'Conversation active', count: 37861, icon: <MessageCircle size={14} /> },
  { label: 'Viewers uniques', sub: 'Sur 12 mois', count: 3893265, format: 'millions', icon: <Eye size={14} /> },
  { label: 'Vidéos publiées', sub: 'Exports consolidés', count: 208, icon: <Play size={14} /> },
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
  { title: 'Loi Yadan - Antisionisme', sr: 2.6, views: '546k vues' },
  { title: 'Élodie (OeilDe)', sr: 2.1, views: '262k vues' },
  { title: 'Ibti - Lesbienne et musulmane', sr: 1.7, views: '1,0M vues' },
  { title: 'Hommes de droite (OeilDe)', sr: 1.2, views: '236k vues' },
]

const DONATION_MONTHS: DonationMonth[] = [
  { month: 'Oct. 25', collectedTotal: 440, transactions: 51, recurringBase: 107, oneTimeCollected: 333 },
  { month: 'Nov. 25', collectedTotal: 239, transactions: 30, recurringBase: 246, oneTimeCollected: 100 },
  { month: 'Déc. 25', collectedTotal: 26, transactions: 6, recurringBase: 262, oneTimeCollected: 10 },
  { month: 'Jan. 26', collectedTotal: 87, transactions: 6, recurringBase: 279, oneTimeCollected: 70 },
  { month: 'Fév. 26', collectedTotal: 71, transactions: 12, recurringBase: 320, oneTimeCollected: 30 },
  { month: 'Mar. 26', collectedTotal: 74, transactions: 17, recurringBase: 379, oneTimeCollected: 15 },
  { month: 'Avr. 26', collectedTotal: 728, transactions: 84, recurringBase: 598, oneTimeCollected: 509 },
  { month: 'Mai 26', collectedTotal: 58, transactions: 11, recurringBase: 592, oneTimeCollected: 35 },
]

const FORMAT_ITEMS: FormatItem[] = [
  { idx: '01', name: 'FOKUS', tagline: 'Trois voix - 145 à 156 secondes - studio', body: "Enquête ou décryptage sur un sujet politique, économique ou social. Format pilier de ST. Dense, sourcé, cadre éditorial radical. Vise l'impact informatif et la viralité militante.", stat: 'ER moyen : 23 %' },
  { idx: '02', name: 'FOKUS-TÉMOIGNAGE', tagline: 'Une voix minoritaire - expérience - cadre politique', body: "Variante du Fokus avec un·e invité·e qui apporte une expérience vécue. Format le plus performant de ST en vues et partages. La subjectivité militante comme preuve.", stat: 'Moyenne des 4 meilleurs : 325k vues' },
  { idx: '03', name: 'OEIL DE', tagline: 'Format solo - point de vue personnel', body: "L'actu passée au prisme des chroniqueurs de ST. Un fait, un événement, un moment politique — décrypté par une voix récurrente de la rédaction. Le regard situé comme méthode, pas la neutralité comme posture.", stat: 'Moyenne : 20 926 vues - ER 22,6 %' },
  { idx: '04', name: 'INTERVIEWS LONGUES', tagline: 'Format long - invité·e - YouTube', body: "Format YouTube principalement. Développement en profondeur avec un·e invité·e politique ou militant·e. Espace pour la nuance, la contradiction argumentée et la construction d'une parole longue.", stat: 'Format en développement', muted: true },
  { idx: '05', name: 'HEDITO', tagline: 'Format solo du fondateur - fidélisation - conversion', body: "Prise de parole directe de Hedi. Point de vue assumé, ton personnel, clôture comme acte politique. Le format « coup de gueule » de ST. Court, tranchant, sans invité.", stat: 'ER : 23,1 %' },
  { idx: '06', name: 'TRIBUNAL DES MÉDIAS', tagline: 'Format trimestriel - procès fictif - segment libre', body: "Format trimestriel. Procès symbolique d'un média, d'une figure ou d'une institution. Témoins à charge, avocat·e du diable, délibération publique, verdict formulé. Un seul take. Spectacle politique autant que journalisme.", stat: 'Prêt à produire', muted: true },
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
  { idx: '04', title: 'Base de dons structurée', body: "Objectif : passer de 91 à 220+ donateurs·trices d'ici fin 2026 puis 350+ à horizon fin 2027." },
]

const COMPARE_ROWS: CompareRow[] = [
  { label: 'Dons mensuels actuellement encaissés', value: '592 EUR', pct: 33, gradient: true },
  { label: "Coût mensuel brut d'un premier poste", value: '~ 1 800 EUR', pct: 100, dark: true },
  { label: "Coût d'un Fokus en tarif prestataire", value: '400 à 800 EUR', pct: 44 },
]

// Snapshot financier — remplace la table revenus
const BASE_FIN_STATS: SnapStat[] = [
  { label: 'Historique encaissé', sub: 'Oct. 2025 - mai 2026 · 217 transactions', value: '1 723 EUR' },
  { label: 'Pic de conversion', sub: 'Avril 2026 · 84 transactions', value: '728 EUR' },
]

const FINANCE_POINTS: FinancePoint[] = [
  {
    kicker: 'Situation actuelle',
    title: 'Le public finance déjà le média, mais à une échelle trop basse.',
    body: 'Les dons récurrents prouvent la confiance éditoriale. Ils couvrent une partie des frais courants, pas le temps de travail qui permet de produire régulièrement.',
  },
  {
    kicker: 'Seuil immédiat',
    title: 'Un seul premier poste coûte environ trois fois les revenus mensuels actuels.',
    body: 'Le mensuel actif reste insuffisant face à un minimum d’environ 1 800 EUR brut mensuel, avant même les déplacements, logiciels, stockage ou renouvellements de matériel.',
  },
  {
    kicker: 'Enjeu réel',
    title: 'Le modèle est validé ; il n’est pas encore soutenable.',
    body: "La section 05 ne finance pas une expérimentation. Elle sert à transformer une preuve d'adhésion en capacité de production stable.",
  },
]

const BUDGET_SUMMARY: BudgetSummaryItem[] = [
  { label: 'Masse salariale', amount: '87 400 EUR', note: 'Deux postes salariés à temps plein, charges incluses.', primary: true },
  { label: 'Production et terrain', amount: '3 200 EUR', note: 'Déplacements, stockage, logiciels et frais directs de production.' },
  { label: 'Structuration', amount: '2 500 EUR', note: 'Équipement, renouvellement et démarches juridiques.' },
]

// Objectifs visuels — remplace la table goals
const GOAL_STATS: SnapStat[] = [
  { label: 'Abonné·es TikTok', sub: 'Objectif fin 2026 · avec financement', value: '72 000' },
  { label: 'Vues cumulées', sub: 'Objectif fin 2026', value: '9 M' },
  { label: 'Donateurs·trices', sub: 'Objectif fin 2026 · avec financement', value: '220+' },
  { label: 'Revenus dons / mois', sub: 'Objectif fin 2026', value: '1 400 EUR' },
]

const PROOF_POINTS: ProofPoint[] = [
  { value: '5,18 M', label: 'vues cumulées', body: "208 vidéos consolidées, sans budget d'acquisition ni publicité." },
  { value: '20,5 %', label: 'engagement moyen', body: 'Calculé sur les exports vidéo : likes, commentaires et partages rapportés aux vues.' },
  { value: '728 EUR', label: 'pic HelloAsso', body: 'Avril 2026 : 84 transactions validées, dont 56 mensualités.' },
]

const HERO_SIGNAL_ITEMS: HeroSignalItem[] = [
  { title: 'Loi Yadan', meta: 'Vidéo de référence', stat: '546k vues' },
  { title: 'Ibti', meta: 'Fokus-témoignage', stat: '1,0M vues' },
  { title: 'Le Média', meta: 'Collaboration', stat: '11 épisodes' },
]

const DELIVERABLE_ITEMS: AskItem[] = [
  { idx: '01', title: 'Rythme stabilisé', body: "Maintenir trois vidéos par semaine sans dépendre d'un temps bénévole imprévisible." },
  { idx: '02', title: 'Formats débloqués', body: 'Lancer Tribunal des Médias et développer les Fokus-témoignages, mini-séries et formats YouTube longs.' },
  { idx: '03', title: 'Pilotage mesurable', body: 'Suivre production, coûts, dons, collaborations et jalons à 3, 6 et 12 mois.' },
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
  collab: [['Vues cumulées TikTok', '614 000'], ['Vues Instagram', '379 000'], ['Nouveaux abonné·es ST acquis', '+ 3 251'], ['Engagement rate pondéré (TikTok)', '18,3 %'], ['Share rate peak (Loi Yadan)', '2,58 %']],
  references: [['Ibti - Lesbienne et musulmane', '1,0M vues - 17 147 partages'], ['Loi Yadan (31 mars 2026)', '546k vues - 14 103 partages'], ['Élodie (OeilDe)', '262k vues - 5 594 partages'], ['Aidez Abood', '178k vues - 11 000 partages']],
  donations: [['Base mensuelle février 2026', '320 EUR récurrents reconstitués'], ['Base mensuelle mars 2026', '379 EUR récurrents reconstitués'], ['Base mensuelle avril 2026', '598 EUR récurrents reconstitués'], ['Mensuel actif actuel', 'Valeur chargée automatiquement depuis HelloAsso']],
}

const LISTS = {
  works: ['Le modèle de dons récurrents : une base mensuelle active paie sans contrepartie fiscale.', 'La cohérence éditoriale attire une audience fidèle, ce qui rend les appels au don crédibles.', 'Le coût de production reste bas grâce à une équipe outillée et autonome.'],
  gaps: ["Toute l'équipe travaille sans rémunération depuis 14 mois : le risque d'épuisement est structurel.", 'Le mensuel actif couvre des frais courants, pas un poste ni des déplacements réguliers.', "L'absence de CPPAP et de rescrit fiscal freine les aides publiques et la croissance des dons."],
  goals24: ["Deux postes salariés dans l'association : direction éditoriale et coordination de production.", "350+ donateurs·trices récurrents avec défiscalisation activée — base d'acquisition validée par les 56 mensualités lancées en avril 2026.", 'Tribunal des Médias institutionnalisé : 4 épisodes par an et présence événementielle.', '130 000 abonnés TikTok et 9 M de vues cumulées — trajectoire validée par les données historiques de croissance.', 'Diversification des revenus : aides publiques presse, fondations et appels à projets européens.'],
  annexes: ["Statuts de l'association loi 1901", 'Bilan financier détaillé 2025 / T1 2026', 'Données TikTok Studio certifiées (export complet)', 'Rapport de collaboration Le Média (mars 2026)', 'Pitch de partenariat Mediapart (avril 2026)', "CV des membres clés de l'équipe", 'Liens vers les vidéos mentionnées dans le dossier', 'Projections financières fin 2026 et 2027'],
}

function Table({ headers, rows }: TableProps) {
  return <DataTable headers={headers} rows={rows} className="cbt-data-table" />
}

function BulletPanel({ title, items }: { title: string; items: string[] }) {
  return (
    <SharedBulletPanel
      title={title}
      items={items}
      className="cbt-panel cbt-panel-surface cbt-interactive"
      kickerClassName="cbt-panel-kicker"
      listClassName="cbt-bullet-list"
    />
  )
}

function formatLiveEuro(cents?: number, currency = 'EUR') {
  if (typeof cents !== 'number') return '592 EUR'

  return (cents / 100).toLocaleString('fr-FR', {
    style: 'currency',
    currency,
    maximumFractionDigits: 0,
  }).replace(/\s€$/, ' EUR')
}

function StatNumber({ item, value }: { item: StatItem; value?: number }) {
  if (typeof value === 'number') {
    return <span className="cbt-hero-num grad-text">{formatStatValue(value, item.suffix)}</span>
  }

  return <AnimatedStatNumber className="cbt-hero-num grad-text" value={item.count} format={item.format} suffix={item.suffix} float={item.float} />
}

function GrowthChart() {
  return <div className="cbt-chart-wrap cbt-rv cbt-d1"><svg className="cbt-chart-svg" viewBox="0 0 900 320" id="cbt-growth-svg"><defs><linearGradient id="cbt-lg" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stopColor="oklch(0.72 0.27 290)" /><stop offset="48%" stopColor="oklch(0.78 0.22 330)" /><stop offset="100%" stopColor="oklch(0.85 0.25 40)" /></linearGradient><linearGradient id="cbt-area-fill" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="oklch(0.72 0.27 290)" stopOpacity=".18" /><stop offset="100%" stopColor="oklch(0.72 0.27 290)" stopOpacity="0" /></linearGradient></defs><line x1="60" y1="20" x2="60" y2="260" stroke="#1c1c2c" strokeWidth="1" /><line x1="60" y1="260" x2="880" y2="260" stroke="#1c1c2c" strokeWidth="1" /><text x="50" y="264" className="cbt-axis-label" textAnchor="end">0</text><text x="50" y="205" className="cbt-axis-label" textAnchor="end">10k</text><text x="50" y="146" className="cbt-axis-label" textAnchor="end">25k</text><text x="50" y="100" className="cbt-axis-label" textAnchor="end">40k</text><text x="50" y="64" className="cbt-axis-label" textAnchor="end">47k</text><line x1="60" y1="205" x2="880" y2="205" className="cbt-guide" /><line x1="60" y1="146" x2="880" y2="146" className="cbt-guide" /><line x1="60" y1="100" x2="880" y2="100" className="cbt-guide" /><text x="60" y="278" className="cbt-axis-label" textAnchor="middle">Fév. 25</text><text x="231" y="278" className="cbt-axis-label" textAnchor="middle">Mai 25</text><text x="401" y="278" className="cbt-axis-label" textAnchor="middle">Août 25</text><text x="572" y="278" className="cbt-axis-label" textAnchor="middle">Nov. 25</text><text x="742" y="278" className="cbt-axis-label" textAnchor="middle">Fév. 26</text><text x="880" y="278" className="cbt-axis-label" textAnchor="middle">Avr. 26</text><path className="cbt-chart-area" id="cbt-chart-area" d="M60,244 C80,244 90,220 100,212 C130,196 190,165 249,140 C310,115 420,72 502,68 C580,64 640,46 692,44 C760,40 820,38 880,37 L880,260 L60,260 Z" /><path className="cbt-chart-line" id="cbt-chart-line" d="M60,244 C80,244 90,220 100,212 C130,196 190,165 249,140 C310,115 420,72 502,68 C580,64 640,46 692,44 C760,40 820,38 880,37" /><line x1="100" y1="212" x2="100" y2="260" className="cbt-milestone-line" /><circle className="cbt-chart-dot" cx="100" cy="212" r="5" /><text x="104" y="200" className="cbt-milestone-text">19 jours</text><text x="104" y="213" className="cbt-milestone-num">10k</text><line x1="249" y1="140" x2="249" y2="260" className="cbt-milestone-line" /><circle className="cbt-chart-dot" cx="249" cy="140" r="5" /><text x="253" y="128" className="cbt-milestone-text">3 mois</text><text x="253" y="141" className="cbt-milestone-num">25k</text><line x1="502" y1="68" x2="502" y2="260" className="cbt-milestone-line" /><circle className="cbt-chart-dot" cx="502" cy="68" r="5" /><text x="506" y="56" className="cbt-milestone-text">7 mois</text><text x="506" y="69" className="cbt-milestone-num">40k</text><circle className="cbt-chart-dot" cx="880" cy="37" r="5" /><text x="840" y="26" className="cbt-milestone-text">13 mois</text><text x="840" y="38" className="cbt-milestone-num">47k+</text></svg></div>
}

function DonationHistory({ liveDonors, liveMonthlyAmount, error }: { liveDonors: number; liveMonthlyAmount: string; error: string | null }) {
  const liveMonthlyValue = Number(liveMonthlyAmount.replace(/[^\d]/g, '')) || 592
  const donationMonths = DONATION_MONTHS.map((item) => item.month === 'Mai 26' ? { ...item, recurringBase: liveMonthlyValue } : item)
  const max = Math.max(...donationMonths.map((item) => item.recurringBase))
  const threshold = 300
  const thresholdPct = Math.min(100, (threshold / max) * 100)
  const firstAboveThreshold = donationMonths.find((item) => item.recurringBase >= threshold)
  const growthSinceOctober = Math.max(0, liveMonthlyValue - donationMonths[0].recurringBase)

  return (
    <div className="cbt-donation-history cbt-rv cbt-d1">
      <div className="cbt-donation-head">
        <div>
          <div className="cbt-panel-kicker">Historique HelloAsso anonymisé</div>
          <h3>La base mensuelle récurrente dépasse 300 EUR depuis février.</h3>
        </div>
        <div className="cbt-donation-summary">
          <div className="cbt-donation-total">
            <span>Mensuel actif · API</span>
            <strong>{liveMonthlyAmount}</strong>
            <small>{liveDonors} donateurs mensuels{error ? ' · fallback si API indisponible' : ''}</small>
          </div>
          <div className="cbt-donation-metrics">
            <div>
              <strong>+{growthSinceOctober} EUR</strong>
              <span>Base gagnée depuis oct. 2025</span>
            </div>
            <div>
              <strong>{firstAboveThreshold?.month ?? 'Fév. 26'}</strong>
              <span>Seuil 300 EUR franchi</span>
            </div>
          </div>
        </div>
      </div>
      <div className="cbt-donation-bars" style={{ '--threshold': `${thresholdPct}%` } as CSSProperties}>
        <div className="cbt-donation-threshold"><span>Seuil 300 EUR / mois</span></div>
        {donationMonths.map((item) => (
          <div key={item.month} className={`cbt-donation-month${item.recurringBase >= threshold ? ' cbt-donation-month-above' : ''}`}>
            <div className="cbt-donation-bar-track">
              <div className="cbt-donation-bar" style={{ height: `${Math.max(4, (item.recurringBase / max) * 100)}%` }} />
            </div>
            <div className="cbt-donation-row">
              <span>{item.month}</span>
              <strong>{formatStatValue(item.recurringBase, 'EUR')}</strong>
            </div>
            <div className="cbt-donation-meta">
              <span>{formatStatValue(item.collectedTotal, 'EUR')} encaissés</span>
              <span>{item.transactions} transactions</span>
              <span>{formatStatValue(item.oneTimeCollected, 'EUR')} ponctuels</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function EngagementBenchmarkGraph() {
  const rows = [
    { label: 'Benchmark secteur', sub: 'Médias TikTok FR', value: '~6 %', pct: 24, muted: true },
    { label: 'Sans Transition', sub: 'Engagement moyen consolidé', value: '20,5 %', pct: 82, muted: false },
  ]

  return (
    <div className="cbt-er-graph">
      <div className="cbt-er-ghost" aria-hidden>20,5</div>
      <div className="cbt-er-graph-head">
        <span className="grad-line" />
        <span>Taux d'engagement · comparatif secteur</span>
      </div>
      <div className="cbt-er-graph-main">
        <span className="cbt-er-graph-value grad-text" data-count={20.5} data-suffix="%">0</span>
        <div className="cbt-er-graph-copy">
          <span>% engagement moyen</span>
          <strong>x3,4 le benchmark secteur</strong>
        </div>
      </div>
      <div className="cbt-er-scale" aria-hidden>
        {[0, 5, 10, 15, 20, 25].map((tick) => <span key={tick} style={{ left: `${(tick / 25) * 100}%` }}>{tick}%</span>)}
      </div>
      <div className="cbt-er-bars">
        {rows.map((row) => (
          <div key={row.label} className={`cbt-er-bar-row${row.muted ? ' cbt-er-bar-row-muted' : ''}`}>
            <div className="cbt-er-bar-label">
              <div>
                <strong>{row.label}</strong>
                <span>{row.sub}</span>
              </div>
              <em>{row.value}</em>
            </div>
            <div className="cbt-er-bar-track">
              <div className="cbt-er-bar-fill" data-width={row.pct} />
            </div>
          </div>
        ))}
      </div>
      <p className="cbt-er-graph-note">Données TikTok Studio · moyenne consolidée des exports · benchmark : 5-7 %.</p>
    </div>
  )
}

function ProjectionChart() {
  return (
    <div className="cbt-chart-wrap cbt-rv cbt-d1">
      <svg className="cbt-chart-svg" viewBox="0 0 900 320" id="cbt-projection-svg">
        <defs>
          <linearGradient id="cbt-proj-lg" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="oklch(0.72 0.27 290)" />
            <stop offset="48%" stopColor="oklch(0.78 0.22 330)" />
            <stop offset="100%" stopColor="oklch(0.85 0.25 40)" />
          </linearGradient>
          <linearGradient id="cbt-proj-area-fill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="oklch(0.78 0.22 330)" stopOpacity=".1" />
            <stop offset="100%" stopColor="oklch(0.72 0.27 290)" stopOpacity=".02" />
          </linearGradient>
        </defs>

        {/* Axes */}
        <line x1="60" y1="20" x2="60" y2="280" stroke="#1c1c2c" strokeWidth="1" />
        <line x1="60" y1="280" x2="880" y2="280" stroke="#1c1c2c" strokeWidth="1" />

        {/* Y axis */}
        <text x="50" y="284" className="cbt-axis-label" textAnchor="end">0</text>
        <text x="50" y="225" className="cbt-axis-label" textAnchor="end">30k</text>
        <text x="50" y="165" className="cbt-axis-label" textAnchor="end">60k</text>
        <text x="50" y="105" className="cbt-axis-label" textAnchor="end">90k</text>
        <text x="50" y="46" className="cbt-axis-label" textAnchor="end">120k</text>
        <line x1="60" y1="221" x2="880" y2="221" className="cbt-guide" />
        <line x1="60" y1="162" x2="880" y2="162" className="cbt-guide" />
        <line x1="60" y1="103" x2="880" y2="103" className="cbt-guide" />
        <line x1="60" y1="44" x2="880" y2="44" className="cbt-guide" />

        {/* X axis */}
        <text x="60" y="300" className="cbt-axis-label" textAnchor="middle">Mai 26</text>
        <text x="233" y="300" className="cbt-axis-label" textAnchor="middle">Sep. 26</text>
        <text x="405" y="300" className="cbt-axis-label" textAnchor="middle">Jan. 27</text>
        <text x="621" y="300" className="cbt-axis-label" textAnchor="middle">Juin 27</text>
        <text x="880" y="300" className="cbt-axis-label" textAnchor="middle">Déc. 27</text>

        {/* Gap area */}
        <polygon
          points="60,191 146,172 233,151 319,132 405,113 492,94 621,64 751,45 880,29 880,151 751,157 621,162 492,168 405,172 319,176 233,180 146,186 60,191"
          fill="url(#cbt-proj-area-fill)"
        />

        {/* Sans financement (dashed) */}
        <path
          d="M60,191 C92,190 118,188 146,186 C176,184 206,182 233,180 C262,178 293,177 319,176 C348,175 377,173 405,172 C434,171 463,170 492,168 C526,167 572,164 621,162 C660,159 706,157 751,157 C800,154 845,152 880,151"
          stroke="#3a3a5a"
          strokeWidth="1.5"
          strokeDasharray="5,4"
          fill="none"
        />

        {/* Avec financement (gradient) */}
        <path
          d="M60,191 C90,185 116,177 146,172 C175,166 205,157 233,151 C260,144 290,138 319,132 C348,126 376,119 405,113 C433,106 462,100 492,94 C526,83 571,70 621,64 C656,58 706,49 751,45 C800,36 845,30 880,29"
          stroke="url(#cbt-proj-lg)"
          strokeWidth="2.5"
          fill="none"
        />

        {/* Today marker */}
        <line x1="60" y1="191" x2="60" y2="280" stroke="oklch(0.72 0.27 290 / 0.2)" strokeWidth="1" strokeDasharray="3,3" />
        <circle cx="60" cy="191" r="5" fill="oklch(0.72 0.27 290)" />
        <text x="68" y="181" className="cbt-milestone-text">Aujourd'hui</text>
        <text x="68" y="193" className="cbt-milestone-num">47,8k</text>

        {/* End labels */}
        <circle cx="880" cy="151" r="4" fill="#3a3a5a" />
        <text x="875" y="144" className="cbt-axis-label" textAnchor="end">67k</text>
        <circle cx="880" cy="29" r="5" fill="oklch(0.85 0.25 40)" />
        <text x="875" y="22" className="cbt-milestone-text" textAnchor="end">130k</text>

        {/* Legend */}
        <path d="M580,18 L608,18" stroke="url(#cbt-proj-lg)" strokeWidth="2.5" />
        <text x="613" y="22" className="cbt-axis-label">Avec financement</text>
        <path d="M580,34 L608,34" stroke="#3a3a5a" strokeWidth="1.5" strokeDasharray="5,3" />
        <text x="613" y="38" className="cbt-axis-label">Sans financement</text>
      </svg>
    </div>
  )
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
  const [donProgress, setDonProgress] = useState<DonationProgress | null>(null)
  const [donProgressError, setDonProgressError] = useState<string | null>(null)
  const goTo = (id: string) => { const el = document.getElementById(id); if (!el) return; window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 60, behavior: 'smooth' }) }
  const dossierEffects = useMemo(() => ({
    progressId: 'cbt-progress',
    cursorId: 'cbt-cursor',
    cursorRingId: 'cbt-cursor-ring',
    headerId: 'cbt-header',
    headerScrolledClassName: 'cbt-scrolled',
    glowAId: 'cbt-glow-a',
    glowBId: 'cbt-glow-b',
    sectionDataAttr: 'data-combat-section',
    dotSelector: '.cbt-dot',
    activeDotClassName: 'cbt-active',
    revealSelector: '.cbt-rv',
    revealOnClassName: 'cbt-on',
    interactiveSelector: '.cbt-interactive',
    hoveringBodyClassName: 'cbt-hovering',
    customCursorBodyClassName: 'cbt-custom-cursor',
    cursorMode: 'fine' as const,
    counterSelector: '[data-count]',
    counterMode: 'standard' as const,
    widthSelector: '[data-width]',
    growthChart: {
      triggerId: 'cbt-growth-svg',
      lineId: 'cbt-chart-line',
      areaId: 'cbt-chart-area',
      dotSelector: '.cbt-chart-dot',
      dotDrawnClassName: 'cbt-drawn',
    },
  }), [])

  useEffect(() => {
    if (!unlocked) return
    let cancelled = false

    ;(async () => {
      try {
        const res = await fetch('/api/don-progress', { cache: 'no-store' })
        if (!res.ok) throw new Error(`/api/don-progress ${res.status}`)
        const data = (await res.json()) as DonationProgress
        if (!cancelled) setDonProgress(data)
      } catch (error) {
        if (!cancelled) setDonProgressError(error instanceof Error ? error.message : String(error))
      }
    })()

    return () => {
      cancelled = true
    }
  }, [unlocked])

  useProtectedDossierEffects({ ...dossierEffects, enabled: unlocked })

  if (!unlocked) return <ProtectedDocumentGate onUnlock={() => setUnlocked(true)} />

  const liveDonors = Math.max(0, donProgress?.monthlyActive ?? 91)
  const liveGoal = Math.max(1, donProgress?.goal ?? 1000)
  const livePct = Math.round((Math.min(liveDonors, liveGoal) / liveGoal) * 100)
  const liveMonthlyAmount = formatLiveEuro(donProgress?.monthlyAmount, donProgress?.currency)
  const finStats: SnapStat[] = [
    { label: 'Revenus mensuels', sub: donProgress ? 'Dons HelloAsso · temps réel' : 'Dons HelloAsso · fallback local', value: liveMonthlyAmount },
    { label: 'Donateurs·trices', sub: donProgress ? `Mensuels actifs · ${livePct} % de l'objectif` : 'Fallback local · API en attente', value: String(liveDonors) },
    ...BASE_FIN_STATS,
  ]
  const mosaicStats = MOSAIC_STATS.map((item) => {
    if (item.label !== 'Dons mensuels') return item

    return {
      ...item,
      count: typeof donProgress?.monthlyAmount === 'number' ? Math.round(donProgress.monthlyAmount / 100) : item.count,
      sub: donProgress ? 'HelloAsso · temps réel' : item.sub,
    }
  })
  const compareRows = COMPARE_ROWS.map((row) => {
    if (row.label !== 'Dons mensuels actuellement encaissés') return row

    const monthlyAmount = typeof donProgress?.monthlyAmount === 'number' ? Math.round(donProgress.monthlyAmount / 100) : 592
    return {
      ...row,
      value: liveMonthlyAmount,
      pct: Math.min(100, Math.round((monthlyAmount / 1800) * 100)),
    }
  })

  return <><div id="cbt-progress" /><div id="cbt-cursor" /><div id="cbt-cursor-ring" /><div className="cbt-shell"><header id="cbt-header"><div className="cbt-header-inner"><a href="/combat" className="cbt-logo cbt-interactive">Sans Transition</a><span className="cbt-tag">Document confidentiel - Mai 2026</span><ActionButton href="mailto:contact@sanstransition.fr" className="cbt-interactive cbt-cta" style={{ cursor: 'none' }}>Contact</ActionButton></div></header><SideNav navId="cbt-side-nav" ariaLabel="Navigation latérale" items={NAV_ITEMS} itemClassName="cbt-dot cbt-interactive" activeClassName="cbt-active" onItemClick={goTo} /><nav className="cbt-mobile-nav" aria-label="Navigation du dossier">{NAV_ITEMS.slice(1).map((item) => <button key={item.id} type="button" className="cbt-mobile-nav-item cbt-interactive" onClick={() => goTo(item.id)}>{item.label}</button>)}</nav>

    {/* ── HERO ── */}
    <section id="combat-hero" data-combat-section="combat-hero" className="cbt-section cbt-hero"><div className="cbt-hero-grid" /><div className="cbt-glow-a" id="cbt-glow-a" /><div className="cbt-glow-b" id="cbt-glow-b" /><div className="cbt-hero-inner"><p className="cbt-hero-kicker cbt-rv">Dossier de demande de soutien financier - Mai 2026</p><h1 className="cbt-hero-title cbt-rv cbt-d1"><span className="cbt-hero-outline">Sans</span><br /><span className="grad-text">Transition</span></h1><div className="cbt-hero-brief cbt-rv cbt-d2"><p className="cbt-hero-sub">Sans Transition est un média associatif radical de 14 mois. Zéro budget d'acquisition. Zéro publicité. 5,18 millions de vues. 47 590 abonné·es. Une équipe entièrement bénévole. Ce dossier expose pourquoi ce modèle mérite un soutien financier structurel et ce que ce soutien rend possible.</p><div className="cbt-hero-proof cbt-interactive"><div className="cbt-hero-proof-head"><span>Preuves clés</span><strong>@sanstransition</strong></div><div className="cbt-hero-proof-feed">{HERO_SIGNAL_ITEMS.map((item) => <div key={item.title} className="cbt-hero-proof-row"><div><strong>{item.title}</strong><span>{item.meta}</span></div><em>{item.stat}</em></div>)}</div></div></div><div className="cbt-hero-actions cbt-rv cbt-d2"><ActionButton onClick={() => goTo('combat-demande')} className="cbt-interactive cbt-cta" style={{ cursor: 'none' }}>La demande</ActionButton><ActionButton onClick={() => goTo('combat-preuves')} variant="outline" className="cbt-interactive" style={{ cursor: 'none' }} showArrow={false}>Les preuves</ActionButton></div><div className="cbt-hero-stats cbt-rv cbt-d3">{HERO_STATS.map((item) => { const isDonorCard = item.label === 'Donateurs·trices'; return <div key={item.label} className="cbt-card cbt-hero-card cbt-interactive">{item.icon && <span className="cbt-card-icon">{item.icon}</span>}<StatNumber item={item} value={isDonorCard ? liveDonors : undefined} /><span className="cbt-card-label">{item.label}</span><span className="cbt-card-sub">{isDonorCard ? (donProgress ? 'Mensuels actifs · temps réel' : item.sub) : item.sub}</span></div> })}</div></div></section>

    {/* ── 01 · ORGANISATION — sans grille résumé ni fiche juridique ── */}
    <section id="combat-organisation" data-combat-section="combat-organisation" className="cbt-section cbt-section-alt"><div className="cbt-max"><SectionHeader className="cbt-rv" showLine eyebrow="01 · Présentation" title="L'organisation, son cadre et son positionnement" body="Sans Transition est une association loi 1901 fondée le 27 février 2025. Son positionnement éditorial est la condition de la confiance de son audience." /><div className="cbt-grid-2 cbt-rv cbt-d1"><div className="cbt-panel cbt-interactive"><div className="cbt-panel-kicker">Positionnement éditorial</div><h3 className="cbt-panel-title">Par et pour les minorités</h3><div className="cbt-rich-text"><p>Ligne éditoriale : radicale de gauche, décoloniale, écosocialiste. Sans Transition traite les violences institutionnelles, les luttes minoritaires, la géopolitique et l'écologie sans neutralité de façade.</p><p>Ce positionnement est le fondement de la crédibilité du média et la raison pour laquelle l'audience partage, défend et finance le projet.</p></div></div><div className="cbt-panel cbt-panel-surface cbt-interactive"><div className="cbt-panel-kicker">Gouvernance</div><div className="cbt-rich-text"><p>Association loi 1901 · siège à Villejuif (94) · fondée le 27 février 2025. Direction éditoriale et représentation légale : Hedi. Décisions éditoriales prises collégialement avec la rédaction.</p><p>Aucun investisseur extérieur, aucun actionnaire, aucune dépendance capitalistique. L'intégralité de l'équipe travaille bénévolement à ce jour.</p></div></div></div><TeamGrid /></div></section>

    {/* ── 02 · PROJET ── */}
    <section id="combat-projet" data-combat-section="combat-projet" className="cbt-section"><div className="cbt-max"><SectionHeader className="cbt-rv" showLine eyebrow="02 · Projet éditorial" title="Une ligne assumée, des formats identifiés, une distribution pensée pour le partage" body="Sans Transition ne modère pas sa ligne pour l'algorithme. La cohérence éditoriale produit ici la confiance, puis la viralité, puis le soutien financier." /><div className="cbt-grid-2 cbt-rv cbt-d1"><div className="cbt-panel cbt-interactive"><div className="cbt-panel-kicker">Ligne éditoriale</div><div className="cbt-rich-text"><p>Violences policières, Palestine, islamophobie, impérialisme : les sujets structurellement défavorisés par les plateformes sont traités sans filtre.</p><p>La neutralité est un biais en faveur du statu quo. Sans Transition assume son positionnement comme condition de sa crédibilité, pas comme obstacle à surmonter.</p></div></div><div className="cbt-panel cbt-panel-surface cbt-interactive"><div className="cbt-panel-kicker">Distribution et plateformes</div><div className="cbt-rich-text"><p>TikTok est le moteur principal de distribution. La stratégie repose sur la viralité algorithmique via le share rate, pas sur la portée organique des seuls abonné·es.</p><p>Chaque vidéo est conçue pour être partagée hors communauté. YouTube, Instagram, X et Twitch servent d'extensions de contexte, de relais et de développement de formats.</p></div></div></div><div className="cbt-format-grid cbt-rv cbt-d1">{FORMAT_ITEMS.map((item) => <div key={item.idx} className="cbt-format-card cbt-interactive"><div className="cbt-format-idx">{item.idx}</div><div className="cbt-format-name">{item.name}</div><div className="cbt-format-tagline">{item.tagline}</div><p className="cbt-format-body">{item.body}</p><span className={`cbt-format-stat${item.muted ? ' cbt-muted' : ''}`}>{item.stat}</span></div>)}</div><PlatformGrid /></div></section>

    {/* ── 03 · AUDIENCE — sans table métriques (remplacée par la mosaïque) ── */}
    <section id="combat-audience" data-combat-section="combat-audience" className="cbt-section cbt-section-alt"><div className="cbt-max"><SectionHeader className="cbt-rv" showLine eyebrow="03 · Audience et impact" title="Une audience rare, active et politiquement alignée" body="Cette audience ne lit pas la presse payante, consomme l'information sur plateformes courtes, partage ce qui la représente et finance les médias en qui elle a confiance." /><div className="cbt-rv cbt-d1"><div className="cbt-audience-wrap"><div className="cbt-audience-reach">{mosaicStats.slice(0, 4).map((item) => <div key={item.label} className="cbt-reach-card cbt-interactive"><span className="cbt-reach-num grad-text" data-count={item.count} data-format={item.format} data-suffix={item.suffix} data-float={item.float ? 'true' : undefined}>0</span><div className="cbt-card-label cbt-card-label-wrap">{item.icon && <span style={{ flexShrink: 0 }}>{item.icon}</span>}{item.label}</div><div className="cbt-card-sub">{item.sub}</div></div>)}</div><div className="cbt-audience-profile">{mosaicStats.slice(4).map((item) => <div key={item.label} className="cbt-profile-card cbt-interactive">{item.label === 'Dons mensuels' ? <span className="cbt-profile-num grad-text">{formatStatValue(item.count, item.suffix)}</span> : <span className="cbt-profile-num grad-text" data-count={item.count} data-format={item.format} data-suffix={item.suffix} data-float={item.float ? 'true' : undefined}>0</span>}<div className="cbt-card-label cbt-card-label-wrap">{item.icon && <span style={{ flexShrink: 0 }}>{item.icon}</span>}{item.label}</div><div className="cbt-card-sub">{item.sub}</div></div>)}</div></div></div><div className="cbt-demo-redesign cbt-rv cbt-d1"><div className="cbt-demo-left"><p className="cbt-demo-title">Démographie de l'audience</p><div>{AUDIENCE_BARS.map((item) => <div key={item.label} className="cbt-demo-bar-item"><div className="cbt-demo-bar-row"><span className="cbt-demo-bar-label">{item.label}</span><span className="cbt-demo-bar-value" data-count={item.value} data-float="true">0</span></div><div className="cbt-demo-bar-track"><div className="cbt-demo-bar-fill" data-width={item.value} /></div></div>)}</div></div><div className="cbt-demo-right"><EngagementBenchmarkGraph /></div></div><div className="cbt-rv cbt-d2"><SectionHeader showLine eyebrow="03.1 · Croissance" title="Multiplication par 14 en 13 mois" body="10 000 abonné·es en 19 jours, 25 000 en 3 mois, 40 000 en 7 mois, 47 000+ en 13 mois. Sans budget d'acquisition, sans promotion payante." style={{ marginTop: 64 }} /><GrowthChart /></div><div className="cbt-rv cbt-d2"><SectionHeader showLine eyebrow="03.2 · Seuil viral" title="Quand une vidéo sort de la bulle communautaire" body="Au-delà de 1,0 %, le share rate fait basculer une vidéo vers le flux algorithmique de masse." style={{ marginTop: 64 }} /><div className="cbt-viral-grid"><div className="cbt-viral-head"><span>Vidéo</span><span>Share rate</span><span style={{ textAlign: 'right' }}>SR</span><span style={{ textAlign: 'right' }}>Vues</span></div>{VIRAL_ITEMS.map((item) => <div key={item.title} className="cbt-viral-row cbt-interactive"><span className="cbt-viral-title">{item.title}</span><div className="cbt-viral-bar-wrap"><div className="cbt-viral-bar" data-width={(item.sr / 6.2) * 100} /></div><span className="cbt-viral-sr grad-text">{item.sr.toFixed(1).replace('.', ',')} %</span><span className="cbt-viral-views">{item.views}</span></div>)}</div><div className="cbt-threshold"><span className="grad-line" />Seuil viral constaté à 1,0 % - en dessous, bulle communautaire - au-delà, diffusion de masse</div></div><div className="cbt-grid-2 cbt-rv cbt-d3"><div className="cbt-panel cbt-interactive"><div className="cbt-panel-kicker">Impact qualitatif</div><h3 className="cbt-panel-title">Loi Yadan : la vidéo de référence</h3><div className="cbt-rich-text"><p>La vidéo du 31 mars 2026 a dépassé 546k vues avec un share rate de 2,6 %. Elle a circulé dans des réseaux militants et s'est imposée comme référence dans la search TikTok sur la loi Yadan avant le vote de l'Assemblée nationale du 16 avril.</p></div></div><div className="cbt-panel cbt-panel-surface cbt-interactive"><div className="cbt-panel-kicker">Communauté engagée</div><h3 className="cbt-panel-title">Le soutien précède déjà le financement structurel</h3><div className="cbt-rich-text"><p>91 donateurs·trices récurrents sans réduction fiscale constituent une preuve d'adhésion éditoriale plus solide que n'importe quelle croissance de reach.</p><p>Chaque don mensuel est ici un acte de confiance politique, pas une optimisation fiscale.</p></div></div></div></div></section>

    {/* ── 04 · FINANCES — snapshot visuel remplace la table revenus ── */}
    <section id="combat-finances" data-combat-section="combat-finances" className="cbt-section"><div className="cbt-max"><SectionHeader className="cbt-rv" showLine eyebrow="04 · Modèle économique actuel" title="Une preuve de soutien, pas encore un modèle soutenable" body="Le média a validé son utilité éditoriale et sa capacité à convertir la confiance en dons. Le blocage est maintenant très concret : les revenus récurrents ne couvrent pas le temps de travail nécessaire pour tenir dans la durée." /><div className="cbt-hero-stats cbt-rv cbt-d1" style={{ marginTop: 0, marginBottom: 48 }}>{finStats.map((item) => <div key={item.label} className="cbt-card cbt-hero-card cbt-interactive"><span className="cbt-hero-num grad-text">{item.value}</span><span className="cbt-card-label">{item.label}</span><span className="cbt-card-sub">{item.sub}</span></div>)}</div><DonationHistory liveDonors={liveDonors} liveMonthlyAmount={liveMonthlyAmount} error={donProgressError} /><div className="cbt-fin-clarity cbt-rv cbt-d1">{FINANCE_POINTS.map((item) => <div key={item.kicker} className="cbt-fin-point cbt-interactive"><div className="cbt-panel-kicker">{item.kicker}</div><h3>{item.title}</h3><p>{item.body}</p></div>)}</div><div className="cbt-fin-grid cbt-rv cbt-d1"><div><p className="cbt-compare-title">Lecture du besoin mensuel minimal</p><div className="cbt-compare-list">{compareRows.map((row) => <div key={row.label}><div className="cbt-compare-label"><span>{row.label}</span><span>{row.value}</span></div><div className="cbt-compare-track"><div className={`cbt-compare-fill${row.gradient ? ' cbt-gradient' : ''}${row.dark ? ' cbt-dark' : ' cbt-dim'}`} data-width={row.pct} /></div></div>)}</div><div className="cbt-fin-quote cbt-rv cbt-d2">&ldquo;Le coût de production reste faible grâce au bénévolat de l'équipe et à une chaîne technique maîtrisée. Ce faible coût prouve l'efficacité du modèle ; il ne justifie pas que le bénévolat devienne permanent.&rdquo;</div></div><div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}><BulletPanel title="Ce qui est déjà validé" items={LISTS.works} /><BulletPanel title="Ce qui bloque encore" items={LISTS.gaps} /></div></div></div></section>

    {/* ── 05 · DEMANDE — ventilation budget visuelle remplace la table ── */}
    <section id="combat-demande" data-combat-section="combat-demande" className="cbt-section cbt-section-alt cbt-section-pivot"><div className="cbt-max"><SectionHeader className="cbt-rv" showLine eyebrow="05 · La demande" title="Un soutien structurel sur 12 mois" body="Base de travail : 93 100 EUR pour couvrir deux postes salariés à temps plein (2 000€ net chacun) et les frais de production indispensables à la stabilisation du média." /><div className="cbt-proof-strip cbt-rv cbt-d1"><div className="cbt-proof-teaser-copy"><span className="cbt-panel-kicker">Pourquoi cette demande est crédible</span><strong>La preuve existe déjà. Le financement sert à rendre la production tenable.</strong></div>{PROOF_POINTS.map((item) => <div key={item.label} className="cbt-proof-item cbt-interactive"><span className="cbt-proof-value grad-text">{item.value}</span><span className="cbt-proof-label">{item.label}</span><p>{item.body}</p></div>)}</div><div className="cbt-highlight-panel cbt-rv cbt-d1"><div className="cbt-panel-kicker">Montant sollicité</div><div className="cbt-highlight-value grad-text">93 100 EUR</div><p className="cbt-highlight-copy">Deux postes salariés à temps plein (2 000€ net chacun) sur 12 mois, plus les frais de production. Ajustable selon la forme du soutien.</p></div><div className="cbt-ask-grid cbt-rv cbt-d1">{ASK_ITEMS.map((item) => <div key={item.idx} className="cbt-ask-card cbt-interactive"><div className="cbt-ask-idx">{item.idx}</div><div className="cbt-ask-title">{item.title}</div><p className="cbt-ask-body">{item.body}</p></div>)}</div><div className="cbt-sec-head cbt-roadmap-head cbt-rv"><div className="cbt-eyebrow"><span className="grad-line" />Livrables financés sur 12 mois</div></div><div className="cbt-deliverable-grid cbt-rv cbt-d1">{DELIVERABLE_ITEMS.map((item) => <div key={item.idx} className="cbt-deliverable-card cbt-interactive"><div className="cbt-roadmap-idx">{item.idx}</div><div className="cbt-roadmap-title">{item.title}</div><p className="cbt-roadmap-body">{item.body}</p></div>)}</div><div className="cbt-rv cbt-d2" style={{ marginBottom: 48 }}><BlockingLoop /></div><div className="cbt-budget-ledger cbt-rv cbt-d2"><div className="cbt-budget-ledger-head"><span className="cbt-panel-kicker">Ventilation du budget</span><strong>93 100 EUR / an</strong><p>Une enveloppe concentrée sur la sortie du tout-bénévolat, avec des frais de production volontairement contenus.</p></div><div className="cbt-budget-lines">{BUDGET_SUMMARY.map((item) => <div key={item.label} className={`cbt-budget-line${item.primary ? ' cbt-budget-line-primary' : ''}`}><div><span>{item.label}</span><p>{item.note}</p></div><strong>{item.amount}</strong></div>)}</div><div className="cbt-budget-total"><span>Total sur 12 mois</span><strong>93 100 EUR</strong></div></div><div className="cbt-rv cbt-d2"><Table headers={['Trimestre', 'Usage prioritaire']} rows={TABLES.timeline} /></div><div className="cbt-sec-head cbt-roadmap-head cbt-rv"><div className="cbt-eyebrow"><span className="grad-line" />Ce que ce soutien débloque concrètement</div></div><div className="cbt-roadmap-grid cbt-rv cbt-d2">{ROADMAP_ITEMS.map((item) => <div key={item.idx} className="cbt-roadmap-card cbt-interactive"><div className="cbt-roadmap-idx">{item.idx}</div><div className="cbt-roadmap-title">{item.title}</div><p className="cbt-roadmap-body">{item.body}</p></div>)}</div></div></section>

    {/* ── 06 · PERSPECTIVES — stat cards remplacent la table objectifs ── */}
    <section id="combat-perspectives" data-combat-section="combat-perspectives" className="cbt-section"><div className="cbt-max"><SectionHeader className="cbt-rv" showLine eyebrow="06 · Perspectives et plan" title="Un levier d'autonomie, pas une perfusion" body="Le soutien demandé ne vise pas une dépendance durable à un financeur unique. Il sert à rendre possible une diversification réelle des ressources à 12 et 24 mois." /><div className="cbt-hero-stats cbt-rv cbt-d1" style={{ marginTop: 0, marginBottom: 48 }}>{GOAL_STATS.map((item) => <div key={item.label} className="cbt-card cbt-hero-card cbt-interactive"><span className="cbt-hero-num grad-text">{item.value}</span><span className="cbt-card-label">{item.label}</span><span className="cbt-card-sub">{item.sub}</span></div>)}</div><div className="cbt-rv cbt-d1"><SectionHeader showLine eyebrow="06.1 · Projection abonnés" title="L'écart que crée le financement" body="Deux trajectoires à partir de mai 2026. Sans financement : croissance organique au rythme actuel, 20 à 50 abonnés par jour entre les spikes. Avec financement : production structurée, formats viraux exécutés, campagnes de dons actives." style={{ marginTop: 64 }} /><ProjectionChart /></div><div className="cbt-rv cbt-d2"><BulletPanel title="Objectifs à 24 mois (fin 2027)" items={LISTS.goals24} /></div><div className="cbt-sec-head cbt-roadmap-head cbt-rv"><div className="cbt-eyebrow"><span className="grad-line" />Stratégie de diversification</div></div><div className="cbt-grid-3 cbt-rv cbt-d2"><div className="cbt-panel cbt-interactive"><div className="cbt-panel-kicker">Dons grand public</div><div className="cbt-rich-text"><p>Campagne de recrutement avec UTM tracking. Objectif : 220 donateurs·trices fin 2026 puis 350 fin 2027.</p></div></div><div className="cbt-panel cbt-interactive"><div className="cbt-panel-kicker">Aides publiques</div><div className="cbt-rich-text"><p>Dépôt CPPAP pour ouvrir l'accès aux aides structurelles à la presse après 12 mois de publication régulière.</p></div></div><div className="cbt-panel cbt-interactive"><div className="cbt-panel-kicker">Partenariats éditoriaux rémunérés</div><div className="cbt-rich-text"><p>Structuration d'une convention Mediapart et identification d'autres rédactions compatibles sur des sujets prioritaires.</p></div></div></div></div></section>

    {/* ── 07 · PREUVES ── */}
    <section id="combat-preuves" data-combat-section="combat-preuves" className="cbt-section cbt-section-alt"><div className="cbt-max cbt-evidence-max"><SectionHeader className="cbt-rv" showLine eyebrow="07 · Dossier de preuves" title="Les éléments vérifiables derrière la synthèse" body="Cette section détaille les chiffres résumés avant la demande : collaborations exécutées, relation éditoriale en cours, soutien communautaire et vidéos de référence." /><div className="cbt-grid-2 cbt-rv cbt-d1"><div className="cbt-panel cbt-evidence-panel cbt-interactive"><div className="cbt-panel-kicker">Collaboration Le Média (janvier - mars 2026)</div><div className="cbt-rich-text"><p>11 épisodes Fokus co-produits sur le plateau du Média, distribués en cross-post TikTok. La collaboration a validé la capacité de Sans Transition à produire dans un cadre partenarial tout en conservant sa performance éditoriale.</p><p>La rupture est intervenue sur la question de la rémunération après présentation d'un bilan chiffré complet et de deux scénarios de paiement. Le désaccord a été documenté et géré stratégiquement.</p></div></div><Table headers={['Résultat', 'Valeur']} rows={TABLES.collab} /></div><div className="cbt-grid-2 cbt-rv cbt-d2"><div className="cbt-panel cbt-panel-surface cbt-evidence-panel cbt-interactive"><div className="cbt-panel-kicker">Partenariat Mediapart (en cours de structuration)</div><div className="cbt-rich-text"><p>Un pitch de collaboration formel a été transmis à la rédaction de Mediapart. La proposition porte sur un cycle test de 4 épisodes Fokus à trois voix, basés sur des enquêtes Mediapart et cross-postés sur les deux comptes TikTok.</p><p>La relation éditoriale informelle existe déjà depuis plusieurs mois via une journaliste référente. Le sujet n'est pas de créer un lien ex nihilo, mais de formaliser une compatibilité déjà observée.</p></div></div><div className="cbt-panel cbt-evidence-panel cbt-interactive"><div className="cbt-panel-kicker">Soutien financier communautaire</div><div className="cbt-rich-text"><p>Les transactions HelloAsso agrégées servent à documenter les pics d'acquisition. La mesure la plus importante reste la base mensuelle active : elle dépasse 300 EUR depuis février 2026 et la valeur actuelle est chargée automatiquement depuis HelloAsso.</p><p>Ce socle reste encore trop faible pour financer un poste, mais il confirme la légitimité du modèle et sa capacité à convertir la confiance en soutien concret.</p></div></div></div><div className="cbt-grid-2 cbt-rv cbt-d3"><Table headers={['Vidéos de référence', 'Performance']} rows={TABLES.references} /><Table headers={['Dons HelloAsso', 'Agrégat anonymisé']} rows={TABLES.donations} /></div></div></section>

    {/* ── 08 · ANNEXES ── */}
    <section id="combat-annexes" data-combat-section="combat-annexes" className="cbt-section"><div className="cbt-max"><SectionHeader className="cbt-rv" showLine eyebrow="08 · Annexes" title="Documents disponibles sur demande" body="Les pièces suivantes peuvent être transmises pour vérifier les chiffres, les statuts, les projections et les collaborations mentionnées dans ce dossier." /><div className="cbt-grid-2 cbt-rv cbt-d1"><BulletPanel title="Pièces disponibles" items={LISTS.annexes} /><div className="cbt-panel cbt-panel-surface cbt-interactive"><div className="cbt-panel-kicker">Ce que ce dossier cherche à établir</div><div className="cbt-rich-text"><p>Sans Transition n'a plus besoin de prouver qu'il peut construire une audience. Le point de bascule concerne maintenant la stabilisation de la production et la sortie du tout-bénévolat.</p><p>Le soutien demandé vise à rendre possible une transition structurelle : du média militant qui tient grâce au sacrifice, vers le média militant qui tient parce qu'il est enfin soutenu à hauteur de son utilité politique.</p></div></div></div></div></section>

    {/* ── CONTACT ── */}
    <section id="combat-contact" data-combat-section="combat-contact" className="cbt-contact"><div className="cbt-contact-wrap"><SectionHeader className="cbt-rv" showLine eyebrow="Contact" title="Ouvrir une discussion." body="Sans Transition cherche un soutien structurel, aligné avec son utilité politique et éditoriale. L'étape suivante est un échange concret sur la forme, le calendrier et les conditions du financement." centered /><a href="mailto:contact@sanstransition.fr" className="cbt-contact-link cbt-interactive">contact@sanstransition.fr</a><p className="cbt-contact-meta">Hedi - Fondateur et directeur éditorial - Sans Transition</p><p className="cbt-contact-meta">@sanstransition (TikTok) - SansTransitionMedia (YouTube) - @sanstransition__ (Instagram) - @sans_transition (Twitch)</p></div></section>
    <footer className="cbt-footer">Association loi 1901 - Fondée le 27 février 2025 - Document confidentiel - Mai 2026 - sanstransition.fr</footer></div></>
}


