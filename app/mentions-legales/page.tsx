

export const metadata = {
  title: "Mentions légales | Sans Transition",
  description:
    "Mentions légales de sanstransition.fr, conformément à la loi LCEN du 21 juin 2004.",
};

export default function MentionsLegalesPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-neutral-50 to-white dark:from-neutral-950 dark:to-neutral-950">
      {/* Hero */}
      <section className="border-b border-neutral-200/60 bg-gradient-to-r from-pink-50 to-purple-50 backdrop-blur dark:border-neutral-800/60 dark:from-neutral-900 dark:to-neutral-950">
        <div className="mx-auto max-w-5xl px-4 py-16 text-center">
          <h1 className="text-4xl font-extrabold tracking-tight text-neutral-900 dark:text-black md:text-5xl">
            Mentions légales
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
              Conformément à la loi n°2004-575 du 21 juin 2004 pour la confiance
              dans l’économie numérique (LCEN), sont précisées ci-dessous les informations
              légales relatives au site <strong>sanstransition.fr</strong>.
            </p>

            <h2 className="mt-10 text-2xl font-semibold">Éditeur du site</h2>
            <ul className="list-disc pl-6">
              <li>
                Association : <strong>Sans Transition</strong> (association loi 1901 déclarée)
              </li>
              <li>
                Siège social : <em>[ADRESSE DU SIÈGE OU DOMICILIATION OFFICIELLE]</em>
              </li>
              <li>
                Contact : {" "}
                <a href="mailto:contact@sanstransition.fr">contact@sanstransition.fr</a>
              </li>
              <li>Responsable de la publication : l’association Sans Transition</li>
            </ul>

            <h2 className="mt-10 text-2xl font-semibold">Hébergement</h2>
            <ul className="list-disc pl-6">
              <li>
                Hébergeur : <em>[NOM DE L’HÉBERGEUR]</em>
              </li>
              <li>
                Adresse : <em>[ADRESSE POSTALE DE L’HÉBERGEUR]</em>
              </li>
              <li>
                Téléphone : <em>[NUMÉRO DE L’HÉBERGEUR]</em>
              </li>
              <li>
                (Optionnel) N° RCS / SIREN : <em>[RÉFÉRENCE LÉGALE DE L’HÉBERGEUR]</em>
              </li>
            </ul>

            <h2 className="mt-10 text-2xl font-semibold">Contact</h2>
            <p>
              Pour toute question relative au site ou à son contenu, vous pouvez nous écrire à l’adresse : {" "}
              <a href="mailto:contact@sanstransition.fr">contact@sanstransition.fr</a>.
            </p>

            <h2 className="mt-10 text-2xl font-semibold">Propriété intellectuelle</h2>
            <p>
              L’ensemble des contenus présents sur le site (textes, images, vidéos, logos, éléments graphiques, podcasts, mises en page, etc.)
              est la propriété exclusive de l’association Sans Transition ou fait l’objet d’autorisations d’utilisation. Toute reproduction,
              représentation, adaptation ou réutilisation, totale ou partielle, sans autorisation écrite préalable est interdite et constituerait
              une contrefaçon au sens du Code de la propriété intellectuelle.
            </p>

            <h2 className="mt-10 text-2xl font-semibold">Responsabilité</h2>
            <p>
              L’association Sans Transition s’efforce de fournir des informations exactes et à jour. Elle ne saurait toutefois être tenue responsable
              des erreurs ou omissions, ni des éventuels dysfonctionnements, indisponibilités ou dommages résultant de l’utilisation du site ou de tout
              site tiers accessible par lien hypertexte.
            </p>

            <h2 className="mt-10 text-2xl font-semibold">Signalement de contenus illicites</h2>
            <p>
              Tout·e utilisateur·rice peut signaler un contenu manifestement illicite en écrivant à {" "}
              <a href="mailto:contact@sanstransition.fr">contact@sanstransition.fr</a> en précisant l’URL concernée, la description du contenu et les motifs du signalement.
              Les contenus manifestement illicites pourront être retirés sans préavis.
            </p>

            <h2 className="mt-10 text-2xl font-semibold">Données personnelles</h2>
            <p>
              Pour les informations relatives au traitement des données personnelles, veuillez consulter notre page dédiée « Politique de confidentialité ».
            </p>

            <h2 className="mt-10 text-2xl font-semibold">Crédits</h2>
            <p>
              Sauf mention contraire, les créations graphiques et éditoriales sont réalisées par l’association Sans Transition. Les marques et logos cités restent la propriété de leurs détenteurs respectifs.
            </p>

            <h2 className="mt-10 text-2xl font-semibold">Droit applicable</h2>
            <p>
              Le présent site et ses mentions légales sont soumis au droit français. En cas de litige, compétence exclusive est attribuée aux juridictions françaises.
            </p>

          </div>
        </article>

        
      </section>
    </main>
  );
}
