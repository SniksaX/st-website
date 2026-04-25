import Section from "@/components/Section";
import SectionHeader from "./SectionHeader";
import GlassCard from "./GlassCard";
import GlassMini from "./GlassMini";

export default function Presentation() {
  return (
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
  );
}
