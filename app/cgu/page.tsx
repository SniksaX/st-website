import Link from "next/link";

export const metadata = {
  title: "Conditions Générales d’Utilisation | Sans Transition",
  description:
    "CGU du site sanstransition.fr : conditions d'accès et d'utilisation.",
};

export default function CGUPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-neutral-50 to-white dark:from-neutral-950 dark:to-neutral-950">
      {/* Hero */}
      <section className="border-b border-neutral-200/60 bg-gradient-to-r from-blue-50 to-cyan-50 backdrop-blur dark:border-neutral-800/60 dark:from-neutral-900 dark:to-neutral-950">
        <div className="mx-auto max-w-5xl px-4 py-16 text-center">
          <h1 className="text-4xl font-extrabold tracking-tight text-neutral-900 dark:text-white md:text-5xl">
            Conditions Générales d’Utilisation
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
            <h2 className="text-2xl font-semibold">1. Objet</h2>
            <p>
              Les présentes conditions générales d’utilisation (CGU) encadrent
              l’accès et l’utilisation du site{" "}
              <strong>sanstransition.fr</strong>. Toute navigation sur le site
              implique l’acceptation pleine et entière des présentes CGU.
            </p>

            <h2 className="mt-10 text-2xl font-semibold">2. Accès au site</h2>
            <p>
              Le site est accessible gratuitement à toute personne disposant
              d’une connexion Internet. Tous les frais liés à la connexion
              (matériel, logiciel, accès Internet) restent à la charge de
              l’utilisateur·rice.
            </p>

            <h2 className="mt-10 text-2xl font-semibold">3. Propriété intellectuelle</h2>
            <p>
              Les contenus (textes, images, vidéos, logos, podcasts, etc.)
              publiés sur le site sont protégés par le Code de la propriété
              intellectuelle. Toute reproduction ou utilisation sans
              autorisation écrite préalable est interdite.
            </p>

            <h2 className="mt-10 text-2xl font-semibold">4. Contributions externes</h2>
            <p>
              Les témoignages, commentaires ou contenus envoyés par les
              utilisateur·rices doivent respecter la loi. Sans Transition se
              réserve le droit de modérer ou de supprimer tout contenu
              inapproprié ou manifestement illicite.
            </p>

            <h2 className="mt-10 text-2xl font-semibold">5. Données personnelles</h2>
            <p>
              Les informations concernant la gestion des données personnelles
              sont disponibles dans notre{" "}
              <Link href="/confidentialite">Politique de confidentialité</Link>.
            </p>

            <h2 className="mt-10 text-2xl font-semibold">6. Responsabilités</h2>
            <p>
              Sans Transition ne peut être tenue responsable en cas de dommages
              directs ou indirects liés à l’utilisation du site, à une
              interruption ou à l’apparition d’un bug. Les liens hypertextes
              peuvent renvoyer vers des sites tiers, sur lesquels Sans
              Transition n’a aucun contrôle.
            </p>

            <h2 className="mt-10 text-2xl font-semibold">7. Évolution des CGU</h2>
            <p>
              Sans Transition se réserve le droit de modifier à tout moment les
              présentes CGU afin de les adapter à l’évolution du site et/ou de
              son exploitation.
            </p>

            <h2 className="mt-10 text-2xl font-semibold">8. Droit applicable</h2>
            <p>
              Les présentes CGU sont régies par le droit français. En cas de
              litige, compétence exclusive est donnée aux juridictions
              françaises.
            </p>
          </div>
        </article>
      </section>
    </main>
  );
}
