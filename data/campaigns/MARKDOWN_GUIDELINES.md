# Newsletter Markdown Guidelines

Ce fichier documente la syntaxe supportee par `scripts/mailing-list.js` quand tu envoies un mail avec `--text-file` sans `--html-file`.

## 1) Bases

- `# Titre`, `## Section`, `### Sous-section`
- Paragraphes: une ligne = un paragraphe
- Listes:
  - `- item`
  - `* item`
- Separateur: `---`
- Gras / italique / code inline:
  - `**gras**`
  - `*italique*`
  - `` `code` ``

## 2) Liens

- Lien Markdown: `[Texte](https://exemple.com)`
- URL brute: `https://exemple.com`

## 3) Boutons CTA

Deux syntaxes equivalentes:

- `[button:Voir le site](https://sanstransition.fr)`
- `[btn:Faire un don](https://sanstransition.fr/don)`

## 4) Cards

Bloc card:

```md
:::card Titre optionnel
Texte dans la card.
- item
[button:Action](https://exemple.com)
:::
```

Tu peux aussi omettre le titre:

```md
:::card
Contenu libre
:::
```

## 5) Variable systeme

- `{{unsubscribe_url}}` : injecte le lien perso de desinscription.

## 6) Exemple complet

```md
# Sans Transition - Edition

Salut,

:::card A la une
- Nouveau format video
- Live vendredi 20h
[btn:Voir les contenus](https://sanstransition.fr)
:::

:::card Soutenir le media
Ton soutien finance un media indep.
[button:Faire un don](https://sanstransition.fr/don)
:::

Se desinscrire:
{{unsubscribe_url}}
```
