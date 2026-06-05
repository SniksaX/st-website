'use client'

import { useState } from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

/* ── Icons ───────────────────────────────────────────── */

function ArrowIcon() {
  return (
    <svg width={11} height={11} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
      <path d="M3 8h10M9 4l4 4-4 4" />
    </svg>
  )
}

function PlusIcon({ open }: { open: boolean }) {
  return (
    <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden style={{ transform: open ? 'rotate(45deg)' : 'none', transition: 'transform 0.25s ease' }}>
      <path d="M12 5v14M5 12h14" />
    </svg>
  )
}

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden style={{ transform: open ? 'rotate(180deg)' : 'none', transition: 'transform 0.25s ease' }}>
      <path d="M6 9l6 6 6-9" />
    </svg>
  )
}

/* ── Data ─────────────────────────────────────────────── */

const MODULES = [
  {
    num: '01',
    tag: 'Vidéo',
    title: 'Filmer sans budget',
    desc: 'Un iPhone, une app pro, un micro sans-fil. Le reste est superflu.',
    items: [
      { label: 'BlackMagic Camera — pourquoi pas l\'app native', para: 'On filme sur iPhone 15 Pro avec BlackMagic Camera, pas l\'app native. L\'app native fait des choix automatiques à ta place — compression agressive, exposition qui fluctue entre deux plans, balance des blancs qui part en live. BlackMagic Camera te donne le contrôle manuel total sur tout ça, gratuitement. On tourne en 4K 60fps, directement en vertical 9:16. Le 60fps donne une latitude si on veut ralentir une séquence à l\'export.' },
      { label: 'DJI Mic 3 — le workflow son', para: 'On utilise le DJI Mic 3. Un émetteur sur la personne filmée, un receiver branché sur l\'iPhone — le son arrive directement dans BlackMagic Camera, synchronisé à l\'image. Pas de piste à réaligner au montage. Le Mic 3 enregistre aussi en local sur l\'émetteur : si le signal saute, on a une sécurité.' },
      { label: 'Lumière — deux situations, deux réflexes', para: 'En extérieur : lumière naturelle. Le sujet face à la lumière, jamais dos — sinon le visage est dans l\'ombre et l\'image inexploitable. En intérieur : panneau LED SmallRig placé dans l\'axe de la caméra, légèrement en hauteur. Setup face cam ST : iPhone sur trépied, DJI Mic branché, panneau LED dans l\'axe. En place en deux minutes.' },
      { label: 'SSD direct — le workflow rushs', para: 'BlackMagic Camera enregistre directement sur un SSD externe relié à l\'iPhone. Aucun fichier ne passe par la pellicule, aucun cloud intermédiaire. Pour l\'envoi au monteur, les rushs transitent via SwissTransfer — chiffré, gratuit jusqu\'à 50 Go, sans compte obligatoire.' },
      { label: 'Export DaVinci pour TikTok', para: 'On exporte en MOV depuis DaVinci Resolve en 4K vertical (2160x3840), 60fps, et on uploade depuis le navigateur sur tiktok.com — pas depuis l\'iPhone. Dans DaVinci, on reste sur l\'essentiel : coupes et habillage texte. Pas d\'étalonnage — on ne touche pas aux couleurs.' },
    ],
  },
  {
    num: '02',
    tag: 'Écriture',
    title: 'Écrire pour percuter',
    desc: 'L\'accroche qui retient. La chute qui agit. La phrase qui reste.',
    items: [
      { label: 'L\'accroche par contradiction', para: 'On ne commence jamais par se présenter. On attaque directement. L\'accroche, c\'est le point où quelque chose ne tourne pas rond : une réalité que l\'audience reconnaît mais n\'a jamais entendue formulée aussi directement. La contradiction entre ce qu\'on nous dit et ce qu\'on vit est le carburant de l\'attention.' },
      { label: 'La stat comme coup de poing humain', para: 'Les chiffres bruts ne touchent personne. La traduction humaine d\'une stat, c\'est lui donner un corps, une vie quotidienne, un visage que l\'audience projette sur quelqu\'un qu\'elle connaît. Le chiffre prouve. L\'image fait ressentir. Les deux ensemble, c\'est un verdict.' },
      { label: 'Accumulation sans conjonctions', para: 'Quand on écrit "et puis", "mais aussi", "de plus", on ralentit. L\'accumulation sèche — sujet, verbe, point. Sujet, verbe, point. — crée un rythme de rafale qui ne laisse pas d\'espace au désengagement. Chaque phrase est un argument. Empilés, ils font masse.' },
      { label: 'La chute comme acte politique', para: 'Une conclusion résume. Une chute politique agit. Elle ne dit pas "en somme, voilà le problème". Elle nomme un responsable, ouvre une piste, retourne la question vers l\'audience. La dernière phrase d\'une vidéo ST doit être celle que les gens citent dans les commentaires.' },
      { label: 'Voix collective ou voix propre', para: 'Les scripts s\'écrivent dans Google Docs, en collectif ou seul selon le format. Avant le tournage, une validation rapide sur Discord ou Telegram : pas de retour long, juste "c\'est bon" ou "change ça". Ce qui ne change pas : on n\'écrit jamais neutre sur un sujet qu\'on couvre.' },
    ],
  },
  {
    num: '03',
    tag: 'Algo',
    title: 'L\'algorithme n\'est pas notre patron',
    desc: 'On publie 3 à 5 fois par semaine. On ne recule pas sur un sujet. On adapte la forme, jamais le fond.',
    items: [
      { label: 'On n\'attend pas la permission', para: 'On n\'a jamais censuré un sujet par peur de l\'algorithme. Pas une seule fois. On publie 3 à 5 fois par semaine, on checke les stats après chaque vidéo, mais le choix des sujets ne vient jamais de là. On adapte la forme si besoin. Jamais le fond.' },
      { label: 'Les 3 premières secondes', para: 'TikTok mesure la rétention initiale : le pourcentage de gens qui ne swipent pas dans les trois premières secondes. Pas d\'intro, pas de générique, pas de "salut c\'est moi". On attaque. La première image, la première phrase doivent déjà contenir quelque chose d\'inachevé.' },
      { label: 'Rétention vs viralité', para: 'Une vidéo très regardée jusqu\'au bout construit une communauté fidèle. Une vidéo massivement partagée élargit l\'audience mais ne fidélise pas. Ce ne sont pas les mêmes contenus, pas les mêmes objectifs. Il faut choisir avant d\'écrire — pas après avoir vu les stats.' },
      { label: 'Le ratio save/share comme boussole', para: 'Les likes sont un indicateur de surface. Ce qui compte vraiment : les sauvegardes et les partages. Une sauvegarde dit "je veux revenir là-dessus". Un partage dit "je veux que quelqu\'un d\'autre voie ça". L\'analyse en profondeur génère des saves, le coup de gueule génère des shares.' },
      { label: 'TikTok d\'abord, le reste suit', para: 'ST est présent sur TikTok, Instagram, YouTube et X. Mais la priorité est claire : TikTok d\'abord, le reste est secondaire. Ce choix de concentration sur une plateforme principale n\'est pas un manque de stratégie : c\'est ce qui permet de tenir le rythme sans s\'épuiser.' },
    ],
  },
  {
    num: '04',
    tag: 'Structure',
    title: 'Organiser un collectif',
    desc: 'Sans organigramme horizontal qui s\'effondre en trois semaines.',
    items: [
      { label: 'Loi 1901 : pourquoi l\'asso', para: 'L\'association loi 1901 n\'a pas de capital social, pas d\'actionnaire, pas de logique de profit. Les décisions éditoriales ne peuvent pas être dictées par une rentabilité à court terme. Pour monter une asso : trois fondateurs minimum, des statuts déposés en préfecture, une déclaration en ligne.' },
      { label: 'Répartir les rôles sans hiérarchie déguisée', para: 'Chez ST : chaque membre est souverain sur son format. La décision finale sur un sujet appartient à celui ou celle qui porte le format. Ce qui reste collectif, c\'est la réunion hebdomadaire. La transparence sur qui fait quoi est la meilleure protection contre le ressentiment.' },
      { label: 'Discord + Telegram — deux outils, deux usages', para: 'Discord structure le travail éditorial : un channel par format. C\'est là que les scripts vivent, que les retours se font. Telegram sert à la coordination générale — les échanges rapides, les urgences, la logistique. Trois outils avec trois périmètres définis.' },
      { label: 'Pipeline : idée → script → validation → tournage → montage → diffusion', para: 'Le pipeline chez ST varie selon l\'urgence : parfois 24h de bout en bout sur un sujet chaud, parfois plusieurs jours sur un format plus construit. Ce qui ne change pas : les rushs partent via SwissTransfer, le brief au monteur se fait à l\'oral.' },
      { label: 'Éviter le burnout militant', para: 'La plupart des médias militants meurent d\'épuisement, pas de répression. 3 à 5 vidéos par semaine, pas plus. Une réunion hebdo qui n\'est pas qu\'opérationnelle. Et une règle : si le projet ne peut pas fonctionner sans toi un mois, le projet est fragile.' },
    ],
  },
  {
    num: '05',
    tag: 'Sécurité',
    title: 'Sécurité numérique',
    desc: 'Filmer en manif, protéger ses sources, chiffrer ce qui doit l\'être.',
    items: [
      { label: 'Filmer en manifestation — les bons réflexes', para: 'On filme en espace public, donc pas de floutage systématique. Le DJI Mic 3 isole la voix de l\'interviewé du bruit ambiant. Le bruit de fond est assumé : il dit qu\'on est là, il situe.' },
      { label: 'Telegram : pratique mais pas chiffré par défaut', para: 'ST utilise Telegram pour tout. Mais il faut savoir ce que Telegram est : les messages standards ne sont pas chiffrés de bout en bout. Pour un collectif qui traite des sujets politiques, c\'est une limite à connaître. Si ton contexte est plus exposé que le nôtre, Signal s\'impose.' },
      { label: 'Métadonnées : ce que tes photos révèlent', para: 'Chaque photo prise avec un smartphone embarque des données invisibles : coordonnées GPS, heure exacte, modèle d\'appareil. Des outils comme ExifTool (desktop) ou Scrambled Exif (Android) suppriment ces données avant partage.' },
      { label: 'Droits face aux forces de l\'ordre', para: 'En France, filmer dans l\'espace public est légal. Les forces de l\'ordre n\'ont pas le droit de t\'obliger à effacer tes images. Si on t\'y contraint, note les numéros RIO, le lieu, l\'heure. Avoir ces réflexes avant d\'en avoir besoin, c\'est ce qui permet de garder son calme.' },
      { label: 'Sauvegardes et accès partagé', para: 'ST a le double facteur d\'authentification activé sur tous ses comptes. Les accès aux comptes réseaux doivent être partagés avec au moins une deuxième personne de confiance. Ce n\'est pas de la méfiance. C\'est de la résilience.' },
    ],
  },
  {
    num: '06',
    tag: 'Financement',
    title: 'Financer sans se vendre',
    desc: 'Rester libre tout en dégageant des ressources. C\'est un équilibre, pas un miracle.',
    items: [
      { label: 'HelloAsso — la base sans frais', para: 'HelloAsso est la plateforme principale de financement de ST. Contrairement à GoFundMe, elle ne prend pas de commission sur les dons. Les dons chez ST sont majoritairement récurrents et mensuels : une base de soutien régulier, pas uniquement des pics sur campagne.' },
      { label: 'Partenariats — un critère simple', para: 'La règle chez ST est simple : pas de marque privée. On travaille uniquement avec des structures associatives ou publiques. Ce critère clair évite la plupart des ambiguïtés — les offres incompatibles se filtrent d\'elles-mêmes.' },
      { label: 'Subventions publiques', para: 'ST n\'a pas encore sollicité de subventions publiques. C\'est une piste réelle : le Fonds pour une Presse Libre, les aides du ministère de la Culture via le FDVA, les subventions des collectivités. Ces financements ne créent pas de dépendance éditoriale.' },
      { label: 'Monétisation TikTok/YouTube', para: 'TikTok Creativity Program et YouTube Partner Program peuvent générer des revenus, mais leurs conditions sont contraignantes et leurs montants imprévisibles. Ces revenus ne doivent jamais être le pilier d\'un modèle économique. Ils en sont un appoint, pas une garantie.' },
      { label: 'Transparence financière comme bouclier', para: 'ST publie le nombre de donateurs et le montant mensuel collecté sur son site. Ce n\'est pas une obligation légale pour une petite asso : c\'est un choix politique. Quand on nous accuse d\'être financés par X ou Y, on sort les chiffres.' },
    ],
  },
  {
    num: '07',
    tag: 'Communauté',
    title: 'Une communauté, pas une audience',
    desc: '21% d\'engagement. Pas un hasard. La différence se joue hors des vidéos.',
    items: [
      { label: 'Audience vs communauté : la vraie différence', para: 'Une audience regarde. Une communauté participe. ST affiche un taux d\'engagement moyen de 21% — dans un contexte où la moyenne TikTok tourne autour de 5 à 8%. Cet écart vient de deux choses : on est un média incarné, et on traite des sujets qui touchent les gens dans leur vie quotidienne.' },
      { label: 'Les lives comme espace de contact réel', para: 'ST fait des lives réguliers en Q&A : la communauté pose des questions, on répond en direct. Le live ne performe pas, il contacte. Il transforme des spectateurs en personnes investies dans ce qu\'on construit.' },
      { label: 'La cohérence éditoriale comme facteur de fidélité', para: 'Les gens qui suivent ST savent ce qu\'ils vont trouver — une position claire, un traitement rigoureux, une ligne qui ne change pas. Cette prévisibilité permet à l\'audience de recommander ST à quelqu\'un d\'autre avec confiance.' },
      { label: 'Les commentaires comme matière éditoriale', para: 'ST répond aux commentaires utiles ou intéressants. Un commentaire qui mérite une réponse est souvent un prochain sujet, un angle à retravailler, une colère à prendre au sérieux. Les commentaires sont une source d\'information éditoriale.' },
      { label: 'Ne pas confondre croissance et profondeur', para: 'Un pic de vues sur une vidéo virale n\'est pas une communauté. C\'est du trafic. Les indicateurs qui comptent ne sont pas les abonnés mais les récurrents. Les abonnés sont un chiffre. La communauté, c\'est ce qui tient quand l\'algorithme ne favorise plus.' },
    ],
  },
]

const PRINCIPES = [
  { n: 'I.', titre: 'Prendre parti', desc: 'La neutralité est une position politique. On ne fait pas semblant d\'être au-dessus. On dit depuis où on parle.' },
  { n: 'II.', titre: 'Nommer les structures', desc: 'Pas des individus responsables, des systèmes. Le capitalisme, l\'impérialisme, le patriarcat : des mots qui décrivent des réalités.' },
  { n: 'III.', titre: 'Parler à l\'audience', desc: 'Pas au-dessus. La vulgarisation n\'est pas une concession intellectuelle. C\'est du respect.' },
  { n: 'IV.', titre: 'La continuité', desc: 'Un post viral ne construit rien. Une communauté fidèle, si. La durée est révolutionnaire.' },
  { n: 'V.', titre: 'Prendre soin du collectif', desc: 'Le burn-out militant détruit plus de projets que la répression. L\'organisation, c\'est aussi ça.' },
]

const OUTILS = [
  { cat: 'Caméra', name: 'BlackMagic Camera', desc: 'App iOS gratuite. Contrôle manuel complet, H.264 haute qualité, enregistrement direct sur SSD externe.', tag: 'Gratuit', free: true },
  { cat: 'Son', name: 'DJI Mic 3', desc: 'Micro-cravate sans-fil. Son direct dans BlackMagic Camera, synchronisé à l\'image. Pas de piste à réaligner.', tag: '~180€', free: false },
  { cat: 'Montage', name: 'DaVinci Resolve', desc: 'Coupes, habillage texte, export MOV pour TikTok. Gratuit, professionnel.', tag: 'Gratuit', free: true },
  { cat: 'Transfert', name: 'SwissTransfer', desc: 'Transfert chiffré jusqu\'à 50 Go, sans compte obligatoire, sans trace inutile.', tag: 'Gratuit', free: true },
  { cat: 'Coordination', name: 'Discord + Telegram', desc: 'Discord pour le travail éditorial. Telegram pour la coordination quotidienne. Deux outils, deux périmètres.', tag: 'Gratuit', free: true },
  { cat: 'Dons', name: 'HelloAsso', desc: 'Plateforme française, sans frais pour l\'asso. Plus de 50 donateurs récurrents en moins d\'un an.', tag: 'Sans frais', free: true },
]

const WORDS = ['Filmer', 'Organiser', 'Diffuser', 'Tenir', 'Résister', 'Construire']

/* ── Hook: Scroll reveal ────────────────────────────────── */

function useScrollReveal() {
  // Désactivé temporairement - les éléments sont visibles par défaut
}

/* ── Components ───────────────────────────────────────── */

function ModuleCard({ mod, _index }: { mod: typeof MODULES[0]; _index: number }) {
  const [open, setOpen] = useState(false)
  const [openItem, setOpenItem] = useState<number | null>(null)

  return (
    <div style={{
      background: 'var(--surface)',
      border: '1px solid var(--border)',
      borderRadius: 3,
      overflow: 'hidden',
    }}>
      {/* Header horizontal */}
      <div
        onClick={() => {
          setOpen(!open)
          if (open) setOpenItem(null)
        }}
        style={{
          display: 'grid',
          gridTemplateColumns: 'auto 1fr auto',
          gap: 20,
          alignItems: 'center',
          padding: 'clamp(20px,3vw,32px)',
          cursor: 'pointer',
          borderBottom: open ? '1px solid var(--border)' : 'none',
          transition: 'background .2s ease',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = 'var(--surface2)'
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = 'var(--surface)'
        }}
      >
        <span style={{
          fontSize: 'clamp(32px,4vw,48px)',
          fontWeight: 700,
          lineHeight: 1,
          color: 'var(--border2)',
          fontFamily: 'var(--font-barbra)',
        }}>
          {mod.num}
        </span>
        <div>
          <p style={{ fontSize: 9, textTransform: 'uppercase', letterSpacing: '0.22em', color: 'var(--muted)', marginBottom: 4 }}>
            {mod.tag}
          </p>
          <h3 style={{
            fontSize: 'clamp(16px,2vw,20px)',
            fontWeight: 700,
            letterSpacing: '-0.02em',
            color: 'var(--fg)',
          }}>
            {mod.title}
          </h3>
        </div>
        <PlusIcon open={open} />
      </div>

      {/* Description */}
      <div style={{ padding: 'clamp(16px,2.5vw,24px) clamp(20px,3vw,32px)' }}>
        <p style={{ fontSize: 13, color: 'var(--fg2)', lineHeight: 1.65 }}>
          {mod.desc}
        </p>
      </div>

      {/* Expandable items */}
      {open && (
        <div style={{ borderTop: '1px solid var(--border)' }}>
          {mod.items.map((item, idx) => (
            <div key={idx} style={{ borderBottom: idx < mod.items.length - 1 ? '1px solid var(--border)' : 'none' }}>
              <button
                onClick={() => setOpenItem(openItem === idx ? null : idx)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  width: '100%',
                  padding: '16px clamp(20px,3vw,28px)',
                  background: openItem === idx ? 'var(--surface2)' : 'none',
                  border: 'none',
                  cursor: 'pointer',
                  gap: 12,
                  transition: 'background .2s ease',
                }}
                onMouseEnter={(e) => {
                  if (openItem !== idx) {
                    e.currentTarget.style.background = 'var(--surface2)'
                  }
                }}
                onMouseLeave={(e) => {
                  if (openItem !== idx) {
                    e.currentTarget.style.background = 'none'
                  }
                }}
              >
                <span style={{
                  fontSize: 10,
                  textTransform: 'uppercase',
                  letterSpacing: '0.18em',
                  color: openItem === idx ? 'var(--fg)' : 'var(--fg)',
                  fontWeight: 600,
                }}>
                  {item.label}
                </span>
                <ChevronIcon open={openItem === idx} />
              </button>
              {openItem === idx && (
                <div style={{
                  padding: '0 clamp(20px,3vw,28px) clamp(20px,3vw,28px)',
                  fontSize: 13,
                  color: 'var(--fg2)',
                  lineHeight: 1.7,
                }}>
                  {item.para}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

function PrincipeRow({ p, _index }: { p: typeof PRINCIPES[0]; _index: number }) {
  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: '56px 1fr',
      gap: 1,
      background: 'var(--border)',
    }}>
      <div style={{
        background: 'var(--surface)',
        padding: 'clamp(20px,2.5vw,28px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'var(--font-barbra)',
        fontSize: 22,
        fontWeight: 700,
        color: 'var(--muted)',
      }}>
        {p.n}
      </div>
      <div style={{
        background: 'var(--surface)',
        padding: 'clamp(20px,2.5vw,28px)',
        display: 'flex',
        flexDirection: 'column',
        gap: 6,
        justifyContent: 'center',
      }}>
        <p style={{
          fontSize: 13,
          fontWeight: 600,
          textTransform: 'uppercase',
          letterSpacing: '0.06em',
          color: 'var(--fg)',
        }}>
          {p.titre}
        </p>
        <p style={{ fontSize: 13, color: 'var(--fg2)', lineHeight: 1.65 }}>
          {p.desc}
        </p>
      </div>
    </div>
  )
}

function OutilCard({ o, _index }: { o: typeof OUTILS[0]; _index: number }) {
  return (
    <div>
      <div style={{
        background: 'var(--bg)',
        height: '100%',
        transition: 'background .2s ease',
      }}>
        <div style={{
          background: 'var(--surface)',
          border: '1px solid var(--border)',
          borderRadius: 0,
          padding: 'clamp(22px,3vw,32px)',
          display: 'flex',
          flexDirection: 'column',
          gap: 12,
          height: '100%',
          transition: 'all .2s ease',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = 'var(--border2)'
          e.currentTarget.style.background = 'var(--surface2)'
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = 'var(--border)'
          e.currentTarget.style.background = 'var(--surface)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{
              fontSize: 9,
              textTransform: 'uppercase',
              letterSpacing: '0.22em',
              color: 'var(--muted)',
            }}>
              {o.cat}
            </span>
            <span style={{
              fontSize: 9,
              textTransform: 'uppercase',
              letterSpacing: '0.15em',
              padding: '4px 12px',
              border: o.free ? '1px solid var(--grad)' : '1px solid var(--border2)',
              borderRadius: 2,
              color: o.free ? 'var(--fg)' : 'var(--muted)',
              background: o.free ? 'var(--grad)' : 'none',
              WebkitBackgroundClip: o.free ? 'text' : 'none',
              backgroundClip: o.free ? 'text' : 'none',
              WebkitTextFillColor: o.free ? 'transparent' : 'var(--muted)',
              fontWeight: 600,
            }}>
              {o.tag}
            </span>
          </div>
          <h3 style={{
            fontSize: 'clamp(16px,2vw,20px)',
            fontWeight: 700,
            color: 'var(--fg)',
            letterSpacing: '-0.02em)',
          }}>
            {o.name}
          </h3>
          <p style={{ fontSize: 12, color: 'var(--fg2)', lineHeight: 1.6, flex: 1 }}>
            {o.desc}
          </p>
        </div>
      </div>
    </div>
  )
}

/* ── Page ─────────────────────────────────────────────── */

export default function KitRevolutionnaire() {
  useScrollReveal()

  return (
    <div style={{ background: 'var(--bg)', color: 'var(--fg)', minHeight: '100vh' }}>
      <Header />

      {/* Hero */}
      <section style={{
        borderBottom: '1px solid var(--border)',
        padding: 'clamp(48px,7vw,96px) clamp(16px,4vw,48px)',
        background: 'var(--surface)',
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* Ambient glow */}
        <div style={{
          position: 'absolute',
          top: -100,
          right: -100,
          width: 400,
          height: 400,
          background: 'var(--grad)',
          borderRadius: '50%',
          opacity: 0.03,
          filter: 'blur(80px)',
          pointerEvents: 'none',
        }} />

        <div style={{ maxWidth: 1440, margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr auto',
            gap: 48,
            alignItems: 'center',
          }}>
            <div>
              <p style={{
                fontSize: 10,
                textTransform: 'uppercase',
                letterSpacing: '0.3em',
                color: 'var(--muted)',
                marginBottom: 20,
              }}>
                Sans Transition présente
              </p>
              <h1 style={{
                fontSize: 'clamp(42px,7vw,80px)',
                fontWeight: 700,
                lineHeight: 1.1,
                letterSpacing: '-0.03em',
                color: 'var(--fg)',
                marginBottom: 24,
              }}>
                Kit du{' '}
                <span className="grad-text">
                  Révolutionnaire
                </span>
              </h1>
              <p style={{
                fontSize: 'clamp(14px,1.6vw,17px)',
                color: 'var(--fg2)',
                lineHeight: 1.65,
                maxWidth: 520,
              }}>
                Tout ce qu&apos;on a appris depuis qu&apos;on a lancé ST. Comment filmer, organiser, diffuser, tenir. Pour celles et ceux qui veulent construire quelque chose qui dure.
              </p>
            </div>

            <div>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '40px 48px',
                background: 'var(--bg)',
                border: '1px solid var(--border)',
                borderRadius: 3,
                position: 'relative',
              }}>
                <div style={{
                  position: 'absolute',
                  inset: -4,
                  border: '1px solid var(--border2)',
                  borderRadius: 4,
                  opacity: 0.3,
                }} />
                <div style={{ textAlign: 'center' }}>
                  <span style={{
                    fontSize: 'clamp(56px,8vw,96px)',
                    fontWeight: 700,
                    lineHeight: 1,
                    fontFamily: 'var(--font-barbra)',
                    background: 'var(--grad)',
                    WebkitBackgroundClip: 'text',
                    backgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    color: 'transparent',
                  }}>
                    7
                  </span>
                  <p style={{
                    fontSize: 10,
                    textTransform: 'uppercase',
                    letterSpacing: '0.2em',
                    color: 'var(--muted)',
                    marginTop: 8,
                  }}>
                    modules pratiques
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Marquee */}
      <div style={{
        borderBottom: '1px solid var(--border)',
        background: 'var(--grad)',
        overflow: 'hidden',
      }}>
        <div className="animate-scroll-x" style={{
          display: 'flex',
          whiteSpace: 'nowrap',
        }}>
          {[...WORDS, ...WORDS, ...WORDS].map((w, i) => (
            <span
              key={i}
              style={{
                borderRight: '1px solid rgba(255,255,255,0.1)',
                padding: '14px 32px',
                fontSize: 11,
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.2em',
                color: '#fff',
              }}
            >
              {w}
            </span>
          ))}
        </div>
      </div>

      {/* Modules */}
      <section style={{
        padding: 'clamp(56px,7vw,96px) clamp(16px,4vw,48px)',
      }}>
        <div style={{ maxWidth: 1440, margin: '0 auto' }}>
          <div className="sec-head">
            <div className="sec-eyebrow">
              <span>01</span>
              <span>— Modules</span>
            </div>
            <h2 className="sec-title">
              Sept blocs. <span className="grad-text">Un arsenal.</span>
            </h2>
          </div>

          <p style={{
            fontSize: 'clamp(14px,1.6vw,17px)',
            color: 'var(--fg2)',
            lineHeight: 1.65,
            maxWidth: 520,
            marginBottom: 56,
          }}>
            Pas de théorie abstraite. Chaque module est construit depuis l&apos;expérience concrète de Sans Transition. On partage ce qui a marché, ce qui a foiré, et pourquoi.
          </p>

          <div style={{
            maxWidth: 800,
            display: 'flex',
            flexDirection: 'column',
            gap: 16,
          }}>
            {MODULES.map((mod, i) => (
              <ModuleCard key={mod.num} mod={mod} _index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Principes */}
      <section style={{
        borderTop: '1px solid var(--border)',
        background: 'var(--surface)',
        padding: 'clamp(64px,8vw,112px) clamp(16px,4vw,48px)',
      }}>
        <div style={{ maxWidth: 1440, margin: '0 auto' }}>
          <div className="sec-head">
            <div className="sec-eyebrow">
              <span>02</span>
              <span>— Principes</span>
            </div>
            <h2 className="sec-title">
              Pas une charte. <span className="grad-text">Des positions.</span>
            </h2>
          </div>

          <div style={{
            display: 'grid',
            gap: 1,
            background: 'var(--border)',
            border: '1px solid var(--border)',
            borderRadius: 3,
            overflow: 'hidden',
            maxWidth: 800,
          }}>
            {PRINCIPES.map((p, i) => (
              <PrincipeRow key={p.n} p={p} _index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Outils */}
      <section style={{
        borderTop: '1px solid var(--border)',
        padding: 'clamp(64px,8vw,112px) clamp(16px,4vw,48px)',
      }}>
        <div style={{ maxWidth: 1440, margin: '0 auto' }}>
          <div className="sec-head">
            <div className="sec-eyebrow">
              <span>03</span>
              <span>— Boîte à outils</span>
            </div>
            <h2 className="sec-title">
              Ce qu&apos;on utilise <span className="grad-text">vraiment.</span>
            </h2>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: 1,
            background: 'var(--border)',
            border: '1px solid var(--border)',
            borderRadius: 3,
            overflow: 'hidden',
          }}>
            {OUTILS.map((o, i) => (
              <OutilCard key={o.name} o={o} _index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{
        borderTop: '1px solid var(--border)',
        background: 'var(--surface)',
        padding: 'clamp(80px,10vw,128px) clamp(16px,4vw,48px)',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute',
          bottom: -150,
          left: '50%',
          transform: 'translateX(-50%)',
          width: 500,
          height: 500,
          background: 'var(--grad)',
          borderRadius: '50%',
          opacity: 0.02,
          filter: 'blur(100px)',
          pointerEvents: 'none',
        }} />

        <div style={{ maxWidth: 560, margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <p style={{
            fontSize: 10,
            textTransform: 'uppercase',
            letterSpacing: '0.3em',
            color: 'var(--muted)',
            marginBottom: 24,
          }}>
            04 — Et maintenant
          </p>
          <h2 style={{
            fontSize: 'clamp(32px,5vw,56px)',
            fontWeight: 700,
            lineHeight: 1.1,
            letterSpacing: '-0.03em',
            color: 'var(--fg)',
            marginBottom: 24,
          }}>
            Tu veux <span className="grad-text">construire</span> ?
          </h2>
          <p style={{
            fontSize: 15,
            color: 'var(--fg2)',
            lineHeight: 1.7,
            marginBottom: 48,
          }}>
            Ce kit est open source. Partage-le. Adapte-le. Améliore-le. Et si tu veux échanger avec l&apos;équipe ST sur ton projet, on répond.
          </p>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 16,
          }}>
            <a
              href="mailto:contact@sanstransition.fr"
              className="btn-grad"
              style={{ textDecoration: 'none' }}
            >
              Écrire à ST <ArrowIcon />
            </a>
            <a
              href="https://tiktok.com/@sanstransition"
              target="_blank"
              rel="noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                fontSize: 11,
                textTransform: 'uppercase',
                letterSpacing: '0.18em',
                color: 'var(--muted)',
                textDecoration: 'none',
                padding: '12px 24px',
                border: '1px solid var(--border)',
                borderRadius: 2,
                transition: 'all .2s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'var(--fg)'
                e.currentTarget.style.color = 'var(--fg)'
                e.currentTarget.style.background = 'var(--surface2)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'var(--border)'
                e.currentTarget.style.color = 'var(--muted)'
                e.currentTarget.style.background = 'none'
              }}
            >
              @sanstransition <ArrowIcon />
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
