import Link from "next/link";

export const metadata = {
  title: "Politique de confidentialité | Sans Transition",
  description:
    "Politique de confidentialité (RGPD) de sanstransition.fr : données collectées, finalités, droits et cookies.",
};

export default function ConfidentialitePage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-neutral-50 to-white dark:from-neutral-950 dark:to-neutral-950">
      {/* Hero */}
      <section className="border-b border-neutral-200/60 bg-gradient-to-r from-emerald-50 to-teal-50 backdrop-blur dark:border-neutral-800/60 dark:from-neutral-900 dark:to-neutral-950">
        <div className="mx-auto max-w-5xl px-4 py-16 text-center">
          <h1 className="text-4xl font-extrabold tracking-tight text-neutral-900 dark:text-white md:text-5xl">
            Politique de confidentialité
          </h1>
          <p className="mt-3 text-lg text-neutral-600 dark:text-neutral-400">
            Dernière mise à jour : 21 septembre 2025
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="mx-auto max-w-4xl px-4 py-12">
        <article className="rounded-2xl border border-neutral-200 bg-white/80 p-8 shadow-lg backdrop-blur dark:border-neutral-800 dark:bg-neutral-900/80">
          <div className="prose prose-lg prose-neutral max-w-none dark:prose-invert">
            <p>
              La présente politique décrit la manière dont <strong>Sans Transition</strong> collecte et traite vos données personnelles lorsque vous utilisez le site <strong>sanstransition.fr</strong>.
            </p>

            <h2 className="mt-10 text-2xl font-semibold">1. Responsable du traitement</h2>
            <p>
              Association <strong>Sans Transition</strong> (loi 1901). Contact : {" "}
              <a href="mailto:contact@sanstransition.fr">contact@sanstransition.fr</a>. Voir aussi les {" "}
              <Link href="/mentions-legales">Mentions légales</Link>.
            </p>

            <h2 className="mt-10 text-2xl font-semibold">2. Données collectées</h2>
            <ul className="list-disc pl-6">
              <li>
                <strong>Formulaires</strong> (contact, témoignages, newsletter) : nom, prénom, email, message, et informations que vous choisissez de fournir.
              </li>
              <li>
                <strong>Données de navigation</strong> : pages consultées, appareil, navigateur, approximations techniques d’IP (si mesure d’audience), cookies/traceurs.
              </li>
            </ul>

            <h2 className="mt-10 text-2xl font-semibold">3. Finalités et bases légales</h2>
            <ul className="list-disc pl-6">
              <li>
                <strong>Répondre à vos demandes</strong> (formulaire/contact) — base légale : exécution de mesures précontractuelles/intérêt légitime.
              </li>
              <li>
                <strong>Envoi d’informations</strong> (newsletter opt‑in) — base légale : consentement (retirable à tout moment).
              </li>
              <li>
                <strong>Statistiques d’audience</strong> et amélioration du site — base légale : intérêt légitime ou consentement selon l’outil utilisé.
              </li>
            </ul>

            <h2 className="mt-10 text-2xl font-semibold">4. Durées de conservation</h2>
            <ul className="list-disc pl-6">
              <li>Contacts : jusqu’à 3 ans après le dernier échange.</li>
              <li>Newsletter : tant que vous êtes inscrit·e (suppression dès désinscription).</li>
              <li>Mesure d’audience : durée conforme au paramétrage de l’outil (généralement 13 mois max pour les cookies non exemptés).</li>
            </ul>

            <h2 className="mt-10 text-2xl font-semibold">5. Destinataires et sous‑traitants</h2>
            <p>
              Les données sont destinées à l’association Sans Transition et à ses éventuels sous‑traitants techniques chargés de l’hébergement, de l’emailing ou de la mesure d’audience. Aucun partage commercial, aucune revente.
            </p>

            <h2 className="mt-10 text-2xl font-semibold">6. Vos droits (RGPD)</h2>
            <p>
              Vous disposez des droits d’accès, de rectification, d’effacement, de limitation, d’opposition et de portabilité. Pour les exercer : {" "}
              <a href="mailto:contact@sanstransition.fr">contact@sanstransition.fr</a>. Une réponse vous sera apportée sous un mois.
            </p>

            <h2 className="mt-10 text-2xl font-semibold">7. Cookies et traceurs</h2>
            <p>
              Le site peut déposer des cookies nécessaires au fonctionnement ainsi que, le cas échéant, des cookies de mesure d’audience. Vous pouvez configurer votre navigateur pour les bloquer. Si un bandeau de consentement est mis en place, vous pouvez y gérer vos préférences.
            </p>

            <h2 className="mt-10 text-2xl font-semibold">8. Sécurité</h2>
            <p>
              Nous mettons en œuvre des mesures techniques et organisationnelles raisonnables pour protéger vos données contre tout accès non autorisé, altération ou divulgation.
            </p>

            <h2 className="mt-10 text-2xl font-semibold">9. Transferts hors UE</h2>
            <p>
              Si certains outils impliquent un transfert de données hors de l’Union européenne, nous veillerons à l’existence de garanties appropriées (clauses contractuelles types, pays reconnus adéquats, etc.).
            </p>

            <h2 className="mt-10 text-2xl font-semibold">10. Contact & réclamations</h2>
            <p>
              Pour toute question ou réclamation relative à vos données, écrivez‑nous à {" "}
              <a href="mailto:contact@sanstransition.fr">contact@sanstransition.fr</a>. Vous pouvez également saisir la CNIL sur cnil.fr.
            </p>

            <h2 className="mt-10 text-2xl font-semibold">11. Mise à jour de la politique</h2>
            <p>
              Nous pouvons modifier la présente politique pour des raisons légales, techniques ou opérationnelles. La version en vigueur est celle publiée sur cette page à la date indiquée en tête.
            </p>

          </div>
        </article>
      </section>
    </main>
  );
}
