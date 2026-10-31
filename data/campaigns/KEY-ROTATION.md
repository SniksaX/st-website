# Changement de cle sans maintenance ni migration des abonnes

L'ancienne procedure de remplacement des documents Sanity est abandonnee.
Le script rotate-key est desormais un audit en lecture seule. --apply est refuse.

## Fonctionnement

- MAILING_LIST_ACTIVE_SECRET_KEY signe les nouveaux liens.
- MAILING_LIST_SECRET_KEY reste INCHANGEE sur Netlify : elle permet de verifier
  les anciens liens, meme si personne ne peut lire sa valeur dans l'interface.
- Sans cle active, le site conserve le fonctionnement historique.
- Les abonnes existants sont retrouves par adresse dans Sanity avant de creer
  leur identifiant. Leurs identifiants et desinscriptions ne sont pas migres.
- Une inscription explicite peut reactiver un abonnement, comme auparavant.
- La desinscription attend la confirmation Sanity avant d'afficher un succes.

## Ordre de deploiement, site ouvert

1. Executer les tests, lint et build. Lancer
   `node scripts/rotate-mailing-list-key.js --backup` pour verifier et sauvegarder
   la liste dans data/private (ignore par Git).
2. Deployer d'abord le code compatible avec les DEUX cles sur Netlify,
   sans ajouter encore MAILING_LIST_ACTIVE_SECRET_KEY. Attendre la fin du
   deploiement. Tester avec un lien de desinscription d'une adresse de test,
   puis verifier son statut dans Sanity et se reinscrire explicitement.
3. Ajouter sur Netlify MAILING_LIST_ACTIVE_SECRET_KEY avec la nouvelle valeur
   locale du meme nom, pour les fonctions. Ne pas remplacer ou supprimer
   MAILING_LIST_SECRET_KEY. Redeployer et attendre la fin du deploiement.
   Ne pas envoyer de campagne entre ces deux deploiements.
4. Tester un nouveau lien et l'ancien lien avec une adresse de test. Verifier
   la persistance Sanity, une seule fiche par adresse et les effectifs.
   Utiliser alors la nouvelle cle active pour les campagnes locales.

Ne pas retirer l'ancienne cle tant que les anciens liens doivent fonctionner.
Les anciens fichiers locaux chiffres necessitent toujours cette ancienne cle
pour etre dechiffres ; cette procedure ne pretend pas les recuperer.
Une sauvegarde Sanity ne contient pas cette cle.

## Retour arriere

Avant l'envoi de tout nouveau lien, la cle active peut etre retiree pour revenir
aux signatures historiques. Apres emission de nouveaux liens, garder les deux
cles et le code compatible pour ne pas invalider ces liens.

Les tests locaux utilisent des donnees fictives et aucun envoi SMTP.
La verification reelle des anciens liens reste a faire sur Netlify car l'ancienne
cle n'est pas disponible localement.
