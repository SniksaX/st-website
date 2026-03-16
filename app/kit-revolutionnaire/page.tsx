"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Plus } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

// ─── DATA ────────────────────────────────────────────────────────────────────

const MODULES = [
  {
    num: "01",
    tag: "Vidéo",
    title: "Filmer sans budget",
    desc: "Un iPhone, une app pro, un micro sans-fil. Le reste est superflu.",
    items: [
      {
        label: "BlackMagic Camera — pourquoi pas l\u2019app native",
        para: "On filme sur iPhone 15 Pro avec BlackMagic Camera, pas l\u2019app native. L\u2019app native fait des choix automatiques à ta place — compression agressive, exposition qui fluctue entre deux plans, balance des blancs qui part en live. BlackMagic Camera te donne le contrôle manuel total sur tout ça, gratuitement. On tourne en 4K 60fps, directement en vertical 9:16. Le 60fps donne une latitude si on veut ralentir une séquence à l\u2019export.",
      },
      {
        label: "DJI Mic 3 — le workflow son",
        para: "On utilise le DJI Mic 3. Un émetteur sur la personne filmée, un receiver branché sur l\u2019iPhone — le son arrive directement dans BlackMagic Camera, synchronisé à l\u2019image. Pas de piste à réaligner au montage. Le Mic 3 enregistre aussi en local sur l\u2019émetteur : si le signal saute, on a une sécurité.",
      },
      {
        label: "Lumière — deux situations, deux réflexes",
        para: "En extérieur : lumière naturelle. Le sujet face à la lumière, jamais dos — sinon le visage est dans l\u2019ombre et l\u2019image inexploitable. En intérieur : panneau LED SmallRig placé dans l\u2019axe de la caméra, légèrement en hauteur. Setup face cam ST : iPhone sur trépied, DJI Mic branché, panneau LED dans l\u2019axe. En place en deux minutes.",
      },
      {
        label: "SSD direct — le workflow rushs",
        para: "BlackMagic Camera enregistre directement sur un SSD externe relié à l\u2019iPhone. Aucun fichier ne passe par la pellicule, aucun cloud intermédiaire. Pour l\u2019envoi au monteur, les rushs transitent via SwissTransfer — chiffré, gratuit jusqu\u2019à 50 Go, sans compte obligatoire.",
      },
      {
        label: "Export DaVinci pour TikTok",
        para: "On exporte en MOV depuis DaVinci Resolve en 4K vertical (2160x3840), 60fps, et on uploade depuis le navigateur sur tiktok.com — pas depuis l\u2019iPhone. Dans DaVinci, on reste sur l\u2019essentiel : coupes et habillage texte. Pas d\u2019étalonnage — on ne touche pas aux couleurs.",
      },
    ],
  },
  {
    num: "02",
    tag: "Écriture",
    title: "Écrire pour percuter",
    desc: "L\u2019accroche qui retient. La chute qui agit. La phrase qui reste.",
    items: [
      {
        label: "L\u2019accroche par contradiction",
        para: "On ne commence jamais par se présenter. On attaque directement. L\u2019accroche, c\u2019est le point où quelque chose ne tourne pas rond : une réalité que l\u2019audience reconnaît mais n\u2019a jamais entendue formulée aussi directement. La contradiction entre ce qu\u2019on nous dit et ce qu\u2019on vit est le carburant de l\u2019attention.",
      },
      {
        label: "La stat comme coup de poing humain",
        para: "Les chiffres bruts ne touchent personne. La traduction humaine d\u2019une stat, c\u2019est lui donner un corps, une vie quotidienne, un visage que l\u2019audience projette sur quelqu\u2019un qu\u2019elle connaît. Le chiffre prouve. L\u2019image fait ressentir. Les deux ensemble, c\u2019est un verdict.",
      },
      {
        label: "Accumulation sans conjonctions",
        para: "Quand on écrit \"et puis\", \"mais aussi\", \"de plus\", on ralentit. L\u2019accumulation sèche — sujet, verbe, point. Sujet, verbe, point. — crée un rythme de rafale qui ne laisse pas d\u2019espace au désengagement. Chaque phrase est un argument. Empilés, ils font masse.",
      },
      {
        label: "La chute comme acte politique",
        para: "Une conclusion résume. Une chute politique agit. Elle ne dit pas \"en somme, voilà le problème\". Elle nomme un responsable, ouvre une piste, retourne la question vers l\u2019audience. La dernière phrase d\u2019une vidéo ST doit être celle que les gens citent dans les commentaires.",
      },
      {
        label: "Voix collective ou voix propre",
        para: "Les scripts s\u2019écrivent dans Google Docs, en collectif ou seul selon le format. Avant le tournage, une validation rapide sur Discord ou Telegram : pas de retour long, juste \"c\u2019est bon\" ou \"change ça\". Ce qui ne change pas : on n\u2019écrit jamais neutre sur un sujet qu\u2019on couvre.",
      },
    ],
  },
  {
    num: "03",
    tag: "Algo",
    title: "L\u2019algorithme n\u2019est pas notre patron",
    desc: "On publie 3 à 5 fois par semaine. On ne recule pas sur un sujet. On adapte la forme, jamais le fond.",
    items: [
      {
        label: "On n\u2019attend pas la permission",
        para: "On n\u2019a jamais censuré un sujet par peur de l\u2019algorithme. Pas une seule fois. On publie 3 à 5 fois par semaine, on checke les stats après chaque vidéo, mais le choix des sujets ne vient jamais de là. On adapte la forme si besoin. Jamais le fond.",
      },
      {
        label: "Les 3 premières secondes",
        para: "TikTok mesure la rétention initiale : le pourcentage de gens qui ne swipent pas dans les trois premières secondes. Pas d\u2019intro, pas de générique, pas de \"salut c\u2019est moi\". On attaque. La première image, la première phrase doivent déjà contenir quelque chose d\u2019inachevé.",
      },
      {
        label: "Rétention vs viralité",
        para: "Une vidéo très regardée jusqu\u2019au bout construit une communauté fidèle. Une vidéo massivement partagée élargit l\u2019audience mais ne fidélise pas. Ce ne sont pas les mêmes contenus, pas les mêmes objectifs. Il faut choisir avant d\u2019écrire — pas après avoir vu les stats.",
      },
      {
        label: "Le ratio save/share comme boussole",
        para: "Les likes sont un indicateur de surface. Ce qui compte vraiment : les sauvegardes et les partages. Une sauvegarde dit \"je veux revenir là-dessus\". Un partage dit \"je veux que quelqu\u2019un d\u2019autre voie ça\". L\u2019analyse en profondeur génère des saves, le coup de gueule génère des shares.",
      },
      {
        label: "TikTok d\u2019abord, le reste suit",
        para: "ST est présent sur TikTok, Instagram, YouTube et X. Mais la priorité est claire : TikTok d\u2019abord, le reste est secondaire. Ce choix de concentration sur une plateforme principale n\u2019est pas un manque de stratégie : c\u2019est ce qui permet de tenir le rythme sans s\u2019épuiser.",
      },
    ],
  },
  {
    num: "04",
    tag: "Structure",
    title: "Organiser un collectif",
    desc: "Sans organigramme horizontal qui s\u2019effondre en trois semaines.",
    items: [
      {
        label: "Loi 1901 : pourquoi l\u2019asso",
        para: "L\u2019association loi 1901 n\u2019a pas de capital social, pas d\u2019actionnaire, pas de logique de profit. Les décisions éditoriales ne peuvent pas être dictées par une rentabilité à court terme. Pour monter une asso : trois fondateurs minimum, des statuts déposés en préfecture, une déclaration en ligne.",
      },
      {
        label: "Répartir les rôles sans hiérarchie déguisée",
        para: "Chez ST : chaque membre est souverain sur son format. La décision finale sur un sujet appartient à celui ou celle qui porte le format. Ce qui reste collectif, c\u2019est la réunion hebdomadaire. La transparence sur qui fait quoi est la meilleure protection contre le ressentiment.",
      },
      {
        label: "Discord + Telegram — deux outils, deux usages",
        para: "Discord structure le travail éditorial : un channel par format. C\u2019est là que les scripts vivent, que les retours se font. Telegram sert à la coordination générale — les échanges rapides, les urgences, la logistique. Trois outils avec trois périmètres définis.",
      },
      {
        label: "Pipeline : idée → script → validation → tournage → montage → diffusion",
        para: "Le pipeline chez ST varie selon l\u2019urgence : parfois 24h de bout en bout sur un sujet chaud, parfois plusieurs jours sur un format plus construit. Ce qui ne change pas : les rushs partent via SwissTransfer, le brief au monteur se fait à l\u2019oral.",
      },
      {
        label: "Éviter le burnout militant",
        para: "La plupart des médias militants meurent d\u2019épuisement, pas de répression. 3 à 5 vidéos par semaine, pas plus. Une réunion hebdo qui n\u2019est pas qu\u2019opérationnelle. Et une règle : si le projet ne peut pas fonctionner sans toi un mois, le projet est fragile.",
      },
    ],
  },
  {
    num: "05",
    tag: "Sécurité",
    title: "Sécurité numérique",
    desc: "Filmer en manif, protéger ses sources, chiffrer ce qui doit l\u2019être.",
    items: [
      {
        label: "Filmer en manifestation — les bons réflexes",
        para: "On filme en espace public, donc pas de floutage systématique. Le DJI Mic 3 isole la voix de l\u2019interviewé du bruit ambiant. Le bruit de fond est assumé : il dit qu\u2019on est là, il situe.",
      },
      {
        label: "Telegram : pratique mais pas chiffré par défaut",
        para: "ST utilise Telegram pour tout. Mais il faut savoir ce que Telegram est : les messages standards ne sont pas chiffrés de bout en bout. Pour un collectif qui traite des sujets politiques, c\u2019est une limite à connaître. Si ton contexte est plus exposé que le nôtre, Signal s\u2019impose.",
      },
      {
        label: "Métadonnées : ce que tes photos révèlent",
        para: "Chaque photo prise avec un smartphone embarque des données invisibles : coordonnées GPS, heure exacte, modèle d\u2019appareil. Des outils comme ExifTool (desktop) ou Scrambled Exif (Android) suppriment ces données avant partage.",
      },
      {
        label: "Droits face aux forces de l\u2019ordre",
        para: "En France, filmer dans l\u2019espace public est légal. Les forces de l\u2019ordre n\u2019ont pas le droit de t\u2019obliger à effacer tes images. Si on t\u2019y contraint, note les numéros RIO, le lieu, l\u2019heure. Avoir ces réflexes avant d\u2019en avoir besoin, c\u2019est ce qui permet de garder son calme.",
      },
      {
        label: "Sauvegardes et accès partagé",
        para: "ST a le double facteur d\u2019authentification activé sur tous ses comptes. Les accès aux comptes réseaux doivent être partagés avec au moins une deuxième personne de confiance. Ce n\u2019est pas de la méfiance. C\u2019est de la résilience.",
      },
    ],
  },
  {
    num: "06",
    tag: "Financement",
    title: "Financer sans se vendre",
    desc: "Rester libre tout en dégageant des ressources. C\u2019est un équilibre, pas un miracle.",
    items: [
      {
        label: "HelloAsso — la base sans frais",
        para: "HelloAsso est la plateforme principale de financement de ST. Contrairement à GoFundMe, elle ne prend pas de commission sur les dons. Les dons chez ST sont majoritairement récurrents et mensuels : une base de soutien régulier, pas uniquement des pics sur campagne.",
      },
      {
        label: "Partenariats — un critère simple",
        para: "La règle chez ST est simple : pas de marque privée. On travaille uniquement avec des structures associatives ou publiques. Ce critère clair évite la plupart des ambiguïtés — les offres incompatibles se filtrent d\u2019elles-mêmes.",
      },
      {
        label: "Subventions publiques",
        para: "ST n\u2019a pas encore sollicité de subventions publiques. C\u2019est une piste réelle : le Fonds pour une Presse Libre, les aides du ministère de la Culture via le FDVA, les subventions des collectivités. Ces financements ne créent pas de dépendance éditoriale.",
      },
      {
        label: "Monétisation TikTok/YouTube",
        para: "TikTok Creativity Program et YouTube Partner Program peuvent générer des revenus, mais leurs conditions sont contraignantes et leurs montants imprévisibles. Ces revenus ne doivent jamais être le pilier d\u2019un modèle économique. Ils en sont un appoint, pas une garantie.",
      },
      {
        label: "Transparence financière comme bouclier",
        para: "ST publie le nombre de donateurs et le montant mensuel collecté sur son site. Ce n\u2019est pas une obligation légale pour une petite asso : c\u2019est un choix politique. Quand on nous accuse d\u2019être financés par X ou Y, on sort les chiffres.",
      },
    ],
  },
  {
    num: "07",
    tag: "Communauté",
    title: "Une communauté, pas une audience",
    desc: "21% d\u2019engagement. Pas un hasard. La différence se joue hors des vidéos.",
    items: [
      {
        label: "Audience vs communauté : la vraie différence",
        para: "Une audience regarde. Une communauté participe. ST affiche un taux d\u2019engagement moyen de 21% — dans un contexte où la moyenne TikTok tourne autour de 5 à 8%. Cet écart vient de deux choses : on est un média incarné, et on traite des sujets qui touchent les gens dans leur vie quotidienne.",
      },
      {
        label: "Les lives comme espace de contact réel",
        para: "ST fait des lives réguliers en Q&A : la communauté pose des questions, on répond en direct. Le live ne performe pas, il contacte. Il transforme des spectateurs en personnes investies dans ce qu\u2019on construit.",
      },
      {
        label: "La cohérence éditoriale comme facteur de fidélité",
        para: "Les gens qui suivent ST savent ce qu\u2019ils vont trouver — une position claire, un traitement rigoureux, une ligne qui ne change pas. Cette prévisibilité permet à l\u2019audience de recommander ST à quelqu\u2019un d\u2019autre avec confiance.",
      },
      {
        label: "Les commentaires comme matière éditoriale",
        para: "ST répond aux commentaires utiles ou intéressants. Un commentaire qui mérite une réponse est souvent un prochain sujet, un angle à retravailler, une colère à prendre au sérieux. Les commentaires sont une source d\u2019information éditoriale.",
      },
      {
        label: "Ne pas confondre croissance et profondeur",
        para: "Un pic de vues sur une vidéo virale n\u2019est pas une communauté. C\u2019est du trafic. Les indicateurs qui comptent ne sont pas les abonnés mais les récurrents. Les abonnés sont un chiffre. La communauté, c\u2019est ce qui tient quand l\u2019algorithme ne favorise plus.",
      },
    ],
  },
];

const PRINCIPES = [
  {
    n: "I.",
    titre: "Prendre parti",
    desc: "La neutralité est une position politique. On ne fait pas semblant d\u2019être au-dessus. On dit depuis où on parle.",
  },
  {
    n: "II.",
    titre: "Nommer les structures",
    desc: "Pas des individus responsables, des systèmes. Le capitalisme, l\u2019impérialisme, le patriarcat : des mots qui décrivent des réalités.",
  },
  {
    n: "III.",
    titre: "Parler à l\u2019audience",
    desc: "Pas au-dessus. La vulgarisation n\u2019est pas une concession intellectuelle. C\u2019est du respect.",
  },
  {
    n: "IV.",
    titre: "La continuité",
    desc: "Un post viral ne construit rien. Une communauté fidèle, si. La durée est révolutionnaire.",
  },
  {
    n: "V.",
    titre: "Prendre soin du collectif",
    desc: "Le burn-out militant détruit plus de projets que la répression. L\u2019organisation, c\u2019est aussi ça.",
  },
];

const OUTILS = [
  {
    cat: "Caméra",
    name: "BlackMagic Camera",
    desc: "App iOS gratuite. Contrôle manuel complet, H.264 haute qualité, enregistrement direct sur SSD externe.",
    tag: "Gratuit",
    free: true,
  },
  {
    cat: "Son",
    name: "DJI Mic 3",
    desc: "Micro-cravate sans-fil. Son direct dans BlackMagic Camera, synchronisé à l\u2019image. Pas de piste à réaligner.",
    tag: "~180\u202f€",
    free: false,
  },
  {
    cat: "Montage",
    name: "DaVinci Resolve",
    desc: "Coupes, habillage texte, export MOV pour TikTok. Gratuit, professionnel.",
    tag: "Gratuit",
    free: true,
  },
  {
    cat: "Transfert",
    name: "SwissTransfer",
    desc: "Transfert chiffré jusqu\u2019à 50 Go, sans compte obligatoire, sans trace inutile.",
    tag: "Gratuit",
    free: true,
  },
  {
    cat: "Coordination",
    name: "Discord + Telegram",
    desc: "Discord pour le travail éditorial. Telegram pour la coordination quotidienne. Deux outils, deux périmètres.",
    tag: "Gratuit",
    free: true,
  },
  {
    cat: "Dons",
    name: "HelloAsso",
    desc: "Plateforme française, sans frais pour l\u2019asso. Plus de 50 donateurs récurrents en moins d\u2019un an.",
    tag: "Sans frais",
    free: true,
  },
];

const WORDS = ["Filmer", "Organiser", "Diffuser", "Tenir", "Résister", "Construire"];

// ─── GRAD STYLE helper ────────────────────────────────────────────────────────

const gradStyle: React.CSSProperties = {
  backgroundImage: "linear-gradient(90deg,#ff4dd8 0%,#8a7bff 50%,#ff8a3d 100%)",
  WebkitBackgroundClip: "text",
  backgroundClip: "text",
  WebkitTextFillColor: "transparent",
  color: "transparent",
};

const gradStyleShort: React.CSSProperties = {
  backgroundImage: "linear-gradient(90deg,#ff4dd8,#8a7bff)",
  WebkitBackgroundClip: "text",
  backgroundClip: "text",
  WebkitTextFillColor: "transparent",
  color: "transparent",
};

// ─── MODULE CARD ─────────────────────────────────────────────────────────────

function ModuleCard({ mod }: { mod: (typeof MODULES)[0] }) {
  const [open, setOpen] = useState(false);
  const [openItem, setOpenItem] = useState<number | null>(null);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.4, ease: [0, 0, 0.2, 1] }}
      className="group border border-border bg-card transition-colors hover:bg-muted/30"
    >
      {/* Head */}
      <div className="flex items-start justify-between p-6 pb-0">
        <span
          className="text-5xl font-black leading-none text-pink-500/10 transition-colors group-hover:text-pink-500/20"
          style={{ fontFamily: "var(--font-barbra)" }}
        >
          {mod.num}
        </span>
        <span className="rounded-full border border-pink-500/30 bg-pink-500/10 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.2em] text-pink-500">
          {mod.tag}
        </span>
      </div>

      {/* Body */}
      <div className="px-6 pb-4 pt-3">
        <h3 className="text-lg font-black uppercase tracking-wide text-foreground">{mod.title}</h3>
        <p className="mt-1 text-sm text-muted-foreground">{mod.desc}</p>
      </div>

      {/* Items */}
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="items"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0, 0, 0.2, 1] }}
            className="overflow-hidden"
          >
            <div className="px-6">
              {mod.items.map((item, idx) => (
                <div key={idx} className="border-t border-border/50">
                  <button
                    onClick={() => setOpenItem(openItem === idx ? null : idx)}
                    className="flex w-full items-start gap-3 py-3 text-left"
                  >
                    <span
                      className="mt-0.5 font-mono text-xs text-pink-500 transition-transform duration-200"
                      style={{
                        display: "inline-block",
                        transform: openItem === idx ? "rotate(90deg)" : "none",
                      }}
                    >
                      →
                    </span>
                    <span className="text-xs font-bold uppercase tracking-wide text-muted-foreground transition-colors hover:text-foreground">
                      {item.label}
                    </span>
                  </button>
                  <AnimatePresence initial={false}>
                    {openItem === idx && (
                      <motion.p
                        key="para"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden pl-6 pb-4 text-xs leading-relaxed text-muted-foreground"
                      >
                        {item.para}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer toggle */}
      <button
        onClick={() => {
          setOpen(!open);
          if (open) setOpenItem(null);
        }}
        className="flex w-full items-center justify-between border-t border-border/40 px-6 py-3 transition-colors hover:bg-muted/40"
      >
        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-pink-500">
          Voir le détail
        </span>
        <motion.span animate={{ rotate: open ? 45 : 0 }} transition={{ duration: 0.25 }}>
          <Plus className="h-4 w-4 text-pink-500" />
        </motion.span>
      </button>
    </motion.div>
  );
}

// ─── SECTION LABEL ────────────────────────────────────────────────────────────

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="mb-3 flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.4em] text-pink-500">
      {children}
      <span className="h-px w-5 bg-pink-500/50" aria-hidden />
    </p>
  );
}

// ─── PAGE ─────────────────────────────────────────────────────────────────────

export default function KitRevolutionnaire() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />

      {/* ── HERO ────────────────────────────────────────────── */}
      <section className="relative grid min-h-[90vh] grid-cols-1 items-center overflow-hidden border-b border-border pt-20 lg:grid-cols-2">
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute -left-24 top-1/4 h-64 w-64 rounded-full bg-pink-500/10 blur-3xl" />
          <div className="absolute right-0 bottom-0 h-80 w-80 rounded-full bg-fuchsia-500/[0.08] blur-[120px]" />
        </div>

        {/* Left */}
        <div className="flex flex-col justify-center border-b border-border px-6 py-16 sm:px-12 lg:border-b-0 lg:border-r lg:py-24">
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8 font-mono text-[10px] uppercase tracking-[0.35em] text-pink-500"
          >
            Sans Transition présente
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-[clamp(48px,8vw,100px)] font-black leading-[0.92] tracking-tight text-foreground"
          >
            Kit du{" "}
            <em className="not-italic" style={gradStyle}>
              Révolu-
              <br />
              tionnaire
            </em>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-8 max-w-md text-base leading-relaxed text-muted-foreground"
          >
            Tout ce qu&apos;on a appris depuis qu&apos;on a lancé ST. Comment filmer, organiser,
            diffuser, tenir. Pour celles et ceux qui veulent construire quelque chose qui dure.
          </motion.p>
        </div>

        {/* Right — badge */}
        <div className="flex items-center justify-center px-6 py-16 lg:py-0">
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2, type: "spring", stiffness: 120 }}
            className="relative flex h-48 w-48 flex-col items-center justify-center rounded-full border border-pink-500/30"
          >
            <div className="absolute inset-0 scale-110 rounded-full border border-pink-500/10" />
            <span className="text-6xl font-black leading-none" style={gradStyleShort}>
              7
            </span>
            <span className="mt-2 text-center font-mono text-[10px] uppercase leading-relaxed tracking-[0.2em] text-muted-foreground">
              modules
              <br />
              pratiques
            </span>
          </motion.div>
        </div>
      </section>

      {/* ── MARQUEE ─────────────────────────────────────────── */}
      <div className="overflow-hidden border-b border-border bg-gradient-to-r from-pink-500 via-fuchsia-500 to-orange-400">
        <div className="flex animate-scroll-x whitespace-nowrap">
          {[...WORDS, ...WORDS, ...WORDS].map((w, i) => (
            <span
              key={i}
              className="inline-block border-r border-black/10 px-8 py-3 font-mono text-xs font-black uppercase tracking-[0.25em] text-white"
            >
              {w}
            </span>
          ))}
        </div>
      </div>

      {/* ── MODULES ─────────────────────────────────────────── */}
      <section id="modules" className="px-4 py-20 sm:px-8 lg:px-12">
        <SectionLabel>Les modules</SectionLabel>
        <h2 className="mb-4 text-[clamp(32px,5vw,60px)] font-black leading-none tracking-tight text-foreground">
          Sept blocs.{" "}
          <em className="not-italic" style={gradStyleShort}>
            Un arsenal.
          </em>
        </h2>
        <p className="mb-14 max-w-xl text-base leading-relaxed text-muted-foreground">
          Pas de théorie abstraite. Chaque module est construit depuis l&apos;expérience concrète de
          Sans Transition. On partage ce qui a marché, ce qui a foiré, et pourquoi.
        </p>
        <div className="grid gap-px bg-border sm:grid-cols-2 lg:grid-cols-3">
          {MODULES.map((mod) => (
            <ModuleCard key={mod.num} mod={mod} />
          ))}
        </div>
      </section>

      {/* ── PRINCIPES ───────────────────────────────────────── */}
      <section id="principes" className="px-4 py-20 sm:px-8 lg:px-12">
        <SectionLabel>Ce qu&apos;on croit</SectionLabel>
        <h2 className="mb-14 text-[clamp(32px,5vw,60px)] font-black leading-none tracking-tight text-foreground">
          Pas une charte.{" "}
          <em className="not-italic" style={gradStyleShort}>
            Des positions.
          </em>
        </h2>
        <div className="divide-y divide-border border border-border">
          {PRINCIPES.map((p, i) => (
            <motion.div
              key={p.n}
              initial={{ opacity: 0, x: -12 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.4, delay: i * 0.07 }}
              className="grid grid-cols-[56px_1fr] transition-colors hover:bg-pink-500/[0.03] sm:grid-cols-[56px_1fr_1fr]"
            >
              <div className="border-r border-border p-5 font-mono text-sm font-black italic text-pink-500/40">
                {p.n}
              </div>
              <div className="border-r border-border p-5">
                <p className="text-sm font-black uppercase tracking-wider text-foreground">
                  {p.titre}
                </p>
              </div>
              <div className="hidden p-5 sm:block">
                <p className="text-sm leading-relaxed text-muted-foreground">{p.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── OUTILS ──────────────────────────────────────────── */}
      <section id="outils" className="bg-muted/20 px-4 py-20 sm:px-8 lg:px-12">
        <SectionLabel>La boîte à outils</SectionLabel>
        <h2 className="mb-14 text-[clamp(32px,5vw,60px)] font-black leading-none tracking-tight text-foreground">
          Ce qu&apos;on utilise{" "}
          <em className="not-italic" style={gradStyleShort}>
            vraiment.
          </em>
        </h2>
        <div className="grid gap-px bg-border sm:grid-cols-2 lg:grid-cols-3">
          {OUTILS.map((o) => (
            <motion.div
              key={o.name}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.4 }}
              className="group relative overflow-hidden bg-card p-7 transition-colors hover:bg-muted/30"
            >
              <div className="absolute left-0 top-0 bottom-0 w-[3px] origin-top scale-y-0 bg-gradient-to-b from-pink-500 to-fuchsia-500 transition-transform duration-300 group-hover:scale-y-100" />
              <p className="mb-2 font-mono text-[10px] uppercase tracking-[0.28em] text-pink-500">
                {o.cat}
              </p>
              <h3 className="mb-2 text-lg font-black uppercase tracking-wide text-foreground">
                {o.name}
              </h3>
              <p className="text-xs leading-relaxed text-muted-foreground">{o.desc}</p>
              <span
                className={`mt-4 inline-block rounded-full border px-3 py-1 font-mono text-[9px] uppercase tracking-[0.15em] ${
                  o.free
                    ? "border-pink-500/30 text-pink-500"
                    : "border-border text-muted-foreground"
                }`}
              >
                {o.tag}
              </span>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── CTA ─────────────────────────────────────────────── */}
      <section className="relative overflow-hidden border-t border-border px-4 py-28 sm:px-8 lg:px-12">
        <div
          aria-hidden
          className="pointer-events-none absolute right-[-2%] top-1/2 -translate-y-1/2 select-none text-[clamp(120px,20vw,240px)] font-black leading-none text-foreground/[0.03]"
        >
          AGIR
        </div>
        <div className="relative z-10">
          <SectionLabel>Et maintenant</SectionLabel>
          <h2 className="mb-6 max-w-xl text-[clamp(38px,6vw,80px)] font-black leading-[0.95] tracking-tight text-foreground">
            Tu veux{" "}
            <em className="not-italic" style={gradStyleShort}>
              construire&nbsp;?
            </em>
          </h2>
          <p className="mb-10 max-w-md text-sm leading-relaxed text-muted-foreground">
            Ce kit est open source. Partage-le. Adapte-le. Améliore-le. Et si tu veux échanger avec
            l&apos;équipe ST sur ton projet, on répond.
          </p>
          <div className="flex flex-wrap gap-4">
            <a
              href="mailto:contact@sanstransition.fr"
              className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-pink-500 via-fuchsia-500 to-orange-400 px-6 py-3 text-sm font-bold uppercase tracking-[0.2em] text-white shadow-lg transition hover:-translate-y-0.5"
            >
              Écrire à ST
              <ArrowRight className="h-4 w-4" />
            </a>
            <a
              href="https://tiktok.com/@sanstransition"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-2xl border border-border bg-muted/40 px-6 py-3 text-sm font-bold uppercase tracking-[0.2em] text-muted-foreground transition hover:border-foreground hover:text-foreground"
            >
              @sanstransition
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
