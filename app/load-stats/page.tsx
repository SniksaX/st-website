import Image from "next/image";
import Link from "next/link";
import Section from "@/components/Section";
import { Download, Mail, ExternalLink, FileText, Palette, Image as ImageIcon, Users } from "lucide-react";

/* ========================================================================== */
/* 🧩 MÉTADONNÉES                                                             */
/* ========================================================================== */
export const metadata = {
  title: "Kit média | Sans Transition",
  description: "Logos, éléments de marque, photos presse et dossier complet du kit média de Sans Transition.",
};

/* ========================================================================== */
/* 📂 CONSTANTES                                                              */
/* ========================================================================== */
const KIT_PDF = "/Sans%20Transition%20%E2%80%93%20Kit%20M%C3%A9dia%20Septembre%202025.pdf";

const LOGOS = [
  { src: "/logo.png", label: "Logo glow (PNG)", w: 512, h: 512 },
  { src: "/logo-flat.png", label: "Logo flat (PNG)", w: 1024, h: 256 },
  { src: "/logo-fusee.png", label: "Symbole fusée (PNG)", w: 830, h: 300 },
] as const;

const TEAM = [
  { src: "/hedi.png", name: "Hedji", role: "Fondateur", file: "/hedi.png" },
  { src: "/amandine.png", name: "Amandine", role: "Chroniqueuse", file: "/amandine.png" },
  { src: "/louis.png", name: "Lucho", role: "Chroniqueur", file: "/louis.png" },
] as const;

const SOCIALS = [
  { href: "https://youtube.com/@SansTransitionMedia", label: "YouTube" },
  { href: "https://tiktok.com/@sanstransition", label: "TikTok" },
  { href: "https://twitch.tv/sans_transition", label: "Twitch" },
  { href: "https://x.com/sanstransition_", label: "X / Twitter" },
  { href: "https://instagram.com/sanstransition__", label: "Instagram" },
] as const;

const COLOR_VARS = [
  { name: "Dégradé principal", cssVar: "--grad-1", isGradient: true },
  { name: "Accent", cssVar: "--brand" },
  { name: "Accent 600", cssVar: "--brand-600" },
  { name: "Accent 300", cssVar: "--brand-300" },
] as const;

/* ========================================================================== */
/* 🧱 PAGE PRINCIPALE                                                         */
/* ========================================================================== */
export default function KitMediaPage() {
  const quickNav = [
    { href: "#presentation", label: "Présentation", icon: FileText },
    { href: "#logos", label: "Logos", icon: ImageIcon },
    { href: "#couleurs", label: "Couleurs", icon: Palette },
    { href: "#presse", label: "Photos presse", icon: Users },
    { href: "#contact", label: "Contacts", icon: Mail },
  ] as const;

  return (
    <main className="min-h-screen bg-neutral-950 text-neutral-50 selection:bg-white/10">
      {/* ====================================================================== */}
      {/* 🧭 HEADER / NAVIGATION                                                 */}
      {/* ====================================================================== */}
      <header className="sticky top-0 z-40 backdrop-blur supports-[backdrop-filter]:bg-neutral-950/60 border-b border-white/10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 font-semibold tracking-tight">
            <span className="relative inline-flex h-5 w-5 overflow-hidden rounded-md ring-1 ring-white/20">
              <Image src="/logo.png" alt="Sans Transition" fill className="object-contain" />
            </span>
            <span className="hidden sm:inline">Sans Transition</span>
          </Link>
          <nav className="hidden md:flex items-center gap-1">
            {quickNav.map(({ href, label }) => (
              <a
                key={href}
                href={href}
                className="text-sm text-white/80 hover:text-white px-3 py-1.5 rounded-lg hover:bg-white/5 transition"
              >
                {label}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <Link
              href={KIT_PDF}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-xl bg-white px-3 h-9 text-neutral-900 font-semibold hover:bg-neutral-100"
            >
              <Download className="size-4" />
              <span className="hidden sm:inline">Kit (PDF)</span>
            </Link>
            <a
              href="mailto:contact@sanstransition.fr?subject=Demande%20presse%20Sans%20Transition"
              className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-3 h-9 font-medium hover:bg-white/10"
            >
              <Mail className="size-4" />
              <span className="hidden sm:inline">Contacter</span>
            </a>
          </div>
        </div>
      </header>

      {/* ====================================================================== */}
      {/* 💫 HERO SECTION                                                        */}
      {/* ====================================================================== */}
      <section className="relative overflow-hidden">
        {/* Ambient gradients */}
        <div
          aria-hidden
          className="pointer-events-none absolute -top-24 left-1/2 h-[44rem] w-[44rem] -translate-x-1/2 rounded-full blur-3xl opacity-20"
          style={{ background: "var(--grad-1)" }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute bottom-0 right-0 h-[28rem] w-[28rem] translate-x-1/4 translate-y-1/4 rounded-full blur-3xl opacity-15"
          style={{ background: "var(--grad-1)" }}
        />
        <Section className="py-16 text-center">
          <p className="text-xs uppercase tracking-[0.22em] text-white/60">Kit média officiel</p>
          <GradientTitle level={1}>Sans Transition</GradientTitle>
          <p className="mt-4 text-neutral-300 max-w-2xl mx-auto">
            Logos, éléments de marque, photos presse et dossier complet — prêts à l’emploi, sans friction.
          </p>
          <div className="mt-8 flex items-center justify-center gap-3">
            <Link
              href={KIT_PDF}
              target="_blank"
              rel="noreferrer"
              className="rounded-2xl bg-white text-neutral-900 px-5 h-11 inline-flex items-center gap-2 font-semibold shadow hover:bg-neutral-100"
            >
              <Download className="size-4" /> Télécharger le kit (PDF)
            </Link>
            <a
              href="mailto:contact@sanstransition.fr?subject=Demande%20presse%20Sans%20Transition"
              className="rounded-2xl border border-white/15 bg-white/5 text-white px-5 h-11 inline-flex items-center gap-2 font-medium hover:bg-white/10"
            >
              <Mail className="size-4" /> Contacter l’équipe
            </a>
          </div>
        </Section>
      </section>

      <Separator />

      {/* ====================================================================== */}
      {/* 📖 PRÉSENTATION DÉTAILLÉE                                              */}
      {/* ====================================================================== */}
      <section id="presentation" className="scroll-mt-24">
        <Section>
          <SectionHeader title="Présentation détaillée" />
          <div className="grid gap-6 lg:grid-cols-12">
            <div className="lg:col-span-8 space-y-4">
              <GlassCard title="Présentation">
                <p>
                  Sans Transition est un média radical par et pour les minorités, lancé en février 2025 par une jeune
                  équipe basée à Paris. Sa mission : « politiser sans bullshit », via des formats courts qui décryptent
                  l’actualité sous un angle militant.
                </p>
                <p className="mt-2">
                  Le ton est direct, accessible et engagé — sans concession — pour informer la génération Z de manière
                  claire et percutante. Présence principale sur TikTok, avec développement de la chaîne YouTube et d’une
                  communauté Instagram/X.
                </p>
              </GlassCard>

              <GlassCard title="Édito & formats">
                <ul className="list-disc pl-5 space-y-1">
                  <li>
                    <strong>Fokus</strong> : décryptage politique (lois, institutions, lobbies, finance) + pistes d’action.
                  </li>
                  <li>
                    <strong>L’Œil d’Amandine</strong> : analyse féministe des rapports de pouvoir.
                  </li>
                  <li>
                    <strong>L’Œil de Lucho</strong> : histoire et politique (mémoire militante).
                  </li>
                  <li>
                    <strong>Hedito</strong> : éditos incarnés par Hedi (60–180 s), ton radical et personnel.
                  </li>
                  <li>
                    <strong>Interviews</strong> : entretiens longs avec personnalités et mouvements sociaux.
                  </li>
                  <li>
                    <strong>Mikro</strong> : micro-trottoirs et reportages terrain (manifs, piquets, forums).
                  </li>
                </ul>
              </GlassCard>

              <GlassCard title="Exemples de performances">
                <ul className="list-disc pl-5 space-y-1">
                  <li>« Sauvetage d’Élodie » (Fokus) — 234 878 vues : récit à forte charge émotionnelle et solidaire.</li>
                  <li>
                    « Fossé politique H/F chez les jeunes » (#Œil d’Amandine) — 233 677 vues : thématiques féministes
                    percutantes.
                  </li>
                  <li>« Aidez Abood » — 163 293 vues, +10 000 partages, 9 000 commentaires : forte mobilisation.</li>
                </ul>
              </GlassCard>

              <GlassCard title="Opportunités de partenariat">
                <ul className="list-disc pl-5 space-y-1">
                  <li>
                    <strong>Sponsoring</strong> (Fokus, Mikro) : intégration organique et authentique.
                  </li>
                  <li>
                    <strong>Co-création</strong> : vidéos dédiées ou séries spéciales alignées sur vos objectifs.
                  </li>
                  <li>
                    <strong>Couverture d’événement</strong> : terrain via Mikro/Interview.
                  </li>
                  <li>
                    <strong>Campagnes virales</strong> : call-to-action engageants.
                  </li>
                  <li>
                    <strong>Alignement éthique</strong> : féminisme, antiracisme, justice sociale, indépendance.
                  </li>
                </ul>
              </GlassCard>
            </div>

            <aside className="lg:col-span-4 space-y-4">
              <GlassMini title="Chiffres clés">
                <ul className="space-y-1 text-sm text-white/85">
                  <li>TikTok : 30 000+ abonnés</li>
                  <li>Vues cumulées : 3,3 M+</li>
                  <li>Engagement moyen : 20–25 %</li>
                  <li>YouTube : ~100 abonnés</li>
                </ul>
              </GlassMini>
              <GlassMini title="Audience">
                <ul className="space-y-1 text-sm text-white/85">
                  <li>Genre : ~77 % femmes, ~23 % hommes</li>
                  <li>France : ~78 % (BE ~4 %, CH ~2 %)</li>
                  <li>Pic d’activité : ~21 h (aussi ~12 h)</li>
                  <li>Profil : Gen Z, jeunes adultes</li>
                </ul>
              </GlassMini>
              <GlassMini title="Contact">
                <p className="text-sm text-white/85">contact@sanstransition.fr</p>
                <p className="text-sm text-white/85">Paris, France</p>
              </GlassMini>
            </aside>
          </div>
        </Section>
      </section>

      <Separator />

      {/* ====================================================================== */}
      {/* 🎨 LOGOS                                                               */}
      {/* ====================================================================== */}
      <section id="logos" className="scroll-mt-24">
        <Section>
          <SectionHeader title="Logos" subtitle="PNG optimisés • fond transparent" />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {LOGOS.map((a) => (
              <div key={a.src} className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
                <div className="relative mx-auto aspect-[3/1] max-w-[420px]">
                  <Image
                    src={a.src}
                    alt={a.label}
                    fill
                    className="object-contain"
                    sizes="(max-width: 768px) 100vw, 420px"
                  />
                </div>
                <div className="mt-4 flex items-center justify-between">
                  <p className="text-sm text-white/85">{a.label}</p>
                  <a href={a.src} download className="text-sm underline underline-offset-4 hover:text-white">
                    Télécharger
                  </a>
                </div>
              </div>
            ))}
          </div>
        </Section>
      </section>

      <Separator />

      {/* ====================================================================== */}
      {/* 🌈 COULEURS                                                            */}
      {/* ====================================================================== */}
      <section id="couleurs" className="scroll-mt-24">
        <Section>
          <SectionHeader title="Couleurs" subtitle="Aperçu rapide" />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {COLOR_VARS.map((c) => (
              <div key={c.cssVar} className="rounded-2xl border border-white/10 p-4 bg-white/[0.03]">
                <div
                  className="h-16 rounded-xl"
                  style={{ background: c.isGradient ? "var(--grad-1)" : `var(${c.cssVar})` }}
                />
                <p className="mt-3 text-sm text-white/85">{c.name}</p>
                <p className="text-xs text-white/60">{c.isGradient ? "var(--grad-1)" : c.cssVar}</p>
              </div>
            ))}
          </div>
        </Section>
      </section>

      <Separator />

      {/* ====================================================================== */}
      {/* 📸 PHOTOS PRESSE                                                       */}
      {/* ====================================================================== */}
      <section id="presse" className="scroll-mt-24">
        <Section>
          <SectionHeader title="Photos presse" subtitle="Utilisables avec crédit « Sans Transition »" />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {TEAM.map((p) => (
              <article key={p.src} className="rounded-2xl border border-white/10 bg-white/[0.03] overflow-hidden">
                <div className="relative w-full aspect-square bg-black/40">
                  <Image
                    src={p.src}
                    alt={p.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 360px"
                  />
                </div>
                <div className="p-4 flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-white">{p.name}</p>
                    <p className="text-xs text-white/70">{p.role}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <a
                      href={p.file}
                      download
                      className="inline-flex items-center gap-1 text-sm rounded-lg border border-white/15 bg-white/5 px-3 h-9 hover:bg-white/10"
                    >
                      <Download className="size-4" /> Télécharger
                    </a>
                    <Link
                      href={p.file}
                      target="_blank"
                      className="inline-flex items-center gap-1 text-sm rounded-lg border border-white/15 bg-white/5 px-3 h-9 hover:bg-white/10"
                    >
                      <ExternalLink className="size-4" /> Voir
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </Section>
      </section>

      <Separator />

      {/* ====================================================================== */}
      {/* ✉️ CONTACTS                                                            */}
      {/* ====================================================================== */}
      <section id="contact" className="scroll-mt-24">
        <Section>
          <SectionHeader title="Contacts presse" subtitle="Mail & réseaux" />
          <div className="flex flex-wrap gap-3">
            <Link
              href={KIT_PDF}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-xl bg-white text-neutral-900 px-4 h-10 font-semibold hover:bg-neutral-100 shadow"
            >
              <FileText className="size-4" /> Ouvrir le PDF du kit
            </Link>
            {SOCIALS.map((s) => (
              <a
                key={s.href}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-4 h-10 font-medium hover:bg-white/10"
              >
                <ExternalLink className="size-4" /> {s.label}
              </a>
            ))}
          </div>
        </Section>
      </section>

      <Separator dense />

      {/* ====================================================================== */}
      {/* ⚙️ FOOTER                                                              */}
      {/* ====================================================================== */}
      <footer className="py-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-white/70">
          <p>© {new Date().getFullYear()} Sans Transition — Média par et pour les minorités.</p>
          <div className="flex items-center gap-3">
            <a href={KIT_PDF} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 hover:text-white">
              <FileText className="size-4" /> Kit (PDF)
            </a>
            <a href="mailto:contact@sanstransition.fr" className="inline-flex items-center gap-1 hover:text-white">
              <Mail className="size-4" /> contact@sanstransition.fr
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}

/* ========================================================================== */
/* 🧩 COMPOSANTS INTERNES (HELPERS)                                           */
/* ========================================================================== */
function GradientTitle({ children, level = 2 }: { children: React.ReactNode; level?: 1 | 2 | 3 }) {
  const Tag = `h${level}` as keyof JSX.IntrinsicElements;
  return (
    <Tag className="text-4xl md:text-6xl font-extrabold tracking-tight bg-gradient-to-r from-white via-white to-white/70 bg-clip-text text-transparent">
      {children}
    </Tag>
  );
}

function SectionHeader({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div className="mb-6">
      {subtitle ? (
        <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-[11px] text-white/70 uppercase tracking-wide">
          <span>{subtitle}</span>
        </div>
      ) : null}
      <h2 className="mt-3 text-3xl font-bold tracking-tight bg-gradient-to-r from-[color:var(--brand-300)] via-white to-[color:var(--brand-600)] bg-clip-text text-transparent drop-shadow-sm">
        {title}
      </h2>
    </div>
  );
}

/* ========================================================================== */
/* 🔪 SEPARATOR (visuel & accessible)                                         */
/* ========================================================================== */
function Separator({ dense = false }: { dense?: boolean }) {
  return (
    <div className={dense ? "py-4" : "py-8"} aria-hidden="true" role="separator">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="h-px w-full bg-gradient-to-r from-transparent via-white/15 to-transparent" />
      </div>
    </div>
  );
}

function GlassCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/[0.04] p-5 shadow-sm">
      <h3 className="m-0 text-white font-semibold">
        <span className="bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">{title}</span>
      </h3>
      <div className="mt-2 text-white/90 leading-relaxed text-[15px]">{children}</div>
    </div>
  );
}

function GlassMini({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/[0.04] p-4">
      <h4 className="text-sm font-semibold text-white/90 m-0">
        <span className="bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">{title}</span>
      </h4>
      <div className="mt-2">{children}</div>
    </div>
  );
}
