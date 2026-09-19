# Newsletter Sans Transition

Les campagnes sont rédigées en Markdown. Leur mise en forme est appliquée par
`scripts/mailing-list.js` avec le design actuel de sanstransition.fr.

## Aperçu

```powershell
node scripts/mailing-list.js preview `
  --subject "Objet de la newsletter" `
  --text-file data/campaigns/ma-campagne.txt `
  --out data/campaigns/ma-campagne.preview.html
```

L’aperçu remplace le lien personnel de désinscription par une URL factice. Il
n’envoie aucun email.

## Envoi test

```powershell
npm run mailing-list:send -- `
  --subject "Objet de la newsletter" `
  --text-file data/campaigns/ma-campagne.txt `
  --test-to test@example.com
```

Le mode test n’interroge pas la liste des abonnés, limite l’envoi à l’adresse
indiquée et préfixe l’objet avec `[TEST]`. Son lien de désinscription est
volontairement factice afin de ne désinscrire personne pendant la recette.

## Syntaxe éditoriale

- `# Titre`, `## Section`, `### Sous-section`
- `**gras**`, `*italique*`
- listes avec `-` ou `*`
- liens avec `[Libelle](https://exemple.com)`
- separateur avec `---`
- bouton avec `[button:Libellé](https://exemple.com)`
- miniature vidéo cliquable avec `[video:Texte alternatif](https://image.jpg|https://video)`
- carte avec le bloc suivant :

```md
:::card Titre de la carte
Texte court de presentation.

[button:Voir la publication](https://exemple.com)
:::
```

Chaque campagne doit contenir `{{unsubscribe_url}}`. Le moteur le remplace par
le lien personnel du destinataire au moment de l’envoi.

## Règles de design

- Ne pas ajouter de couleurs, de polices ou de HTML dans les fichiers de campagne.
- Utiliser une seule balise `#` pour le titre principal.
- Garder les cartes courtes : un titre, un resume et une action principale.
- Réserver le gradient violet, rose et orange aux appels à l’action et au filet de marque.
- Les fonds, bordures, rayons, espacements et styles mobiles sont gérés par le moteur.

Le template email reprend le design actuel : fond `#08080e`, surfaces
`#0d0d18`, bordures fines, rayons de 2 à 3 px, typographie Space Grotesk avec
fallbacks compatibles et mise en page en tables pour Gmail, Apple Mail et
Outlook.
