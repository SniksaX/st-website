# Changements à faire — st-for-mediapart

**Pour : Claude Code**
**Fichier principal : `app/st-for-mediapart/MediapartClient.tsx`** (sauf mention contraire)
**Objectif : éliminer les failles auto-infligées du dossier de pitch Mediapart avant envoi.**

Ce document est une liste de consignes. Il ne corrige rien lui-même. Chaque point indique le problème, l'emplacement, et l'action attendue. Les priorités sont en haut.

---

## PRIORITÉ 1 — Faiblesses de présentation (le plus dangereux)

### 1.1 — La grille des 11 vidéos Le Média expose une longue traîne faible

**Problème.** `VIDEOS_LEMEDIA` (lignes ~114-126) contient 11 vidéos. Une seule fait 546K (Loi Yadan), une fait 17K, les 9 autres sont entre 2 500 et 16 000 vues (médiane ~3 800). Affichées côte à côte via `VideoCardDeck`, elles donnent l'impression d'un seul succès isolé + une traîne de scores faibles. Le 546K devient un *outlier* qui écrase visuellement le reste. C'est l'argument du sceptique, fabriqué par nous-mêmes.

**Décision à prendre (demander à Hedi avant d'agir) :** choisir UNE des trois options.

- **Option A (recommandée) — Curation.** N'afficher que 4-5 vidéos représentatives dans le deck Le Média : le top (Loi Yadan), + 2-3 vidéos solides en engagement. Retirer les plus faibles de l'affichage (les garder en data si besoin pour les agrégats).
- **Option B — Agrégation.** Remplacer la grille de 11 cartes par un bloc synthétique : « 11 épisodes · X vues cumulées · 24 % d'engagement moyen · Y partages », + 1 carte vedette (Loi Yadan). Calculer les totaux à partir des données réelles.
- **Option C — Recadrage métrique.** Garder les 11 mais trier et mettre en avant l'engagement (`er`) et le share rate, pas les vues brutes — les petites vidéos brillent sur ces axes (24-28 % d'engagement).

**Action Claude Code :** une fois l'option choisie, modifier `VIDEOS_LEMEDIA` et/ou le composant `VideoCardDeck` (ligne ~1202) en conséquence. Ne pas inventer de chiffres : tout agrégat doit être calculé sur les données existantes.

### 1.2 — Le succès 546K repose sur un sujet, pas sur le format

**Problème.** Le 546K est « Loi Yadan / criminaliser la critique de l'État hébreu » — sujet Israël/Palestine à fort potentiel de partage militant. Présenté seul comme preuve de performance, il laisse penser « c'est le sujet qui a porté, pas la mécanique ST ».

**Action Claude Code :** dans le texte autour du pilote (section `mp-histoire`, lignes ~1159-1172) et dans `SHOWCASE_ITEMS` item 06 (ligne 81), ajouter une phrase de cadrage qui attribue la performance à la mécanique (hook, share rate) et pas seulement au sujet. Formulation à valider avec Hedi.

### 1.3 — Les scores TikTok bruts d'Électrochocs et Saint-Étienne sont faibles

**Problème.** `VIDEOS_ECT` (lignes 134-138) : 23K / 1 826 / 2 316 vues TikTok. `VIDEOS_MEDIAPART` (lignes 128-132) : 10 810 / 7 666 / 2 072. Affichés en vues TikTok brutes à côté du pilote, ça renforce l'impression que « TikTok ne décolle jamais ». La vraie histoire (Instagram = distribution, TikTok = engagement/communauté) doit précéder les chiffres.

**Action Claude Code :** s'assurer que chaque deck vidéo TikTok est introduit par une ligne de contexte expliquant que TikTok est le canal d'engagement et Instagram le canal de volume (déjà dit dans le pitch §03). Si les cartes n'affichent que les vues TikTok, ajouter l'engagement à l'affichage pour rééquilibrer.

---

## PRIORITÉ 2 — Incohérences chiffrées (prises gratuites données au lecteur)

Vérifier et harmoniser code ↔ `pitch.md`. Toute divergence entre la page et le pitch est un signal de manque de rigueur face à une rédaction d'enquête.

### 2.1 — Nom incohérent Hedi / Géraldine

- `pitch.md` ligne 75 + tableau métriques : **« Hedi »** (Hédito).
- Code `VIDEOS_ECT` lignes 135 et 137 : **« Géraldine »**.

**Action :** trancher le nom correct avec Hedi, puis l'uniformiser partout (code + pitch). Une enquête sérieuse ne se trompe pas sur ses propres noms.

### 2.2 — Vues Hédito : 242K vs 265K

- Calcul réel : 23 720 (TikTok) + 241 969 (IG) = **265 689**.
- `SHOWCASE_ITEMS` ligne 80 affiche déjà `265K` ✓ — mais vérifier qu'aucune autre occurrence n'affiche encore `242K`. Grep `242` dans tout le fichier.

**Action :** remplacer toute occurrence résiduelle de `242K` par `265K`. Vérifier que `VIDEOS_ECT` ligne 135 (`views: 23918`) est cohérent avec le 23 720 du pitch — écart à réconcilier (23 918 vs 23 720).

### 2.3 — Audience : pourcentages

- Pitch : **75 %** femmes, **77,1 %** France, **81,4 %** 18-34.
- Code section audience (lignes ~1226-1234 selon PLAN) : vérifier `data-count`. Le PLAN signalait `76` (femmes) et `78` (France) à corriger en `75` et `77,1`.

**Action :** mettre `data-count={75}` (femmes) et `data-count={77.1}` (France). `SHOWCASE_ITEMS` ligne 83 affiche déjà `77,1%` ✓. Confirmer la présence du 81,4 % 18-34.

### 2.4 — « 297 K » vs « 297 511 »

- `PROOF_POINTS` ligne 95 : `value: '297 K'`. Arrondir affaiblit l'argument de précision.

**Action :** passer à `297 511` (le body de la même ligne le mentionne déjà — aligner le `value`).

### 2.5 — Share rate Loi Yadan : 2,58 vs 2,62 vs 2,6

- `PILOT_DATA` ligne 51 : `sr: 2.58`.
- `SHOWCASE_ITEMS` ligne 81 : `2,62%`.
- `TOP_VIRAL` ligne 88 : `sr: 2.6`.

**Action :** trois valeurs pour le même chiffre. Identifier la bonne et uniformiser.

### 2.6 — Dates du document

- Pitch header : **Juin 2026**. Le PLAN signalait « Mai 2026 » (ligne ~658) et « Avril 2026 » (footer, ligne ~1422).

**Action :** harmoniser toutes les dates internes à Juin 2026. Grep `Avril 2026` et `Mai 2026` hors timeline.

---

## PRIORITÉ 3 — Risques de fond (à arbitrer, pas forcément à coder)

Ces points ne sont pas des bugs mais des angles d'attaque en négociation. À discuter avec Hedi ; certains peuvent justifier un ajout de texte dans la page.

### 3.1 — Le reach sans conversion
92-98 % de non-abonnés + 91 % sur Instagram peut se lire « beaucoup de vues, zéro abonné gagné ». Mediapart vend de l'abonnement.
**Suggestion :** ajouter, si data disponible, un signal de conversion (clics, abonnements ST gagnés, trafic) reliant les vues à un objectif business. Sinon, recadrer explicitement le bénéfice comme « notoriété de marque » et non « acquisition d'abonnés ».

### 3.2 — L'indépendance éditoriale déléguée
« ST tient le ton, la ligne et la responsabilité éditoriale » est une friction majeure pour un média d'enquête.
**Suggestion :** renforcer dans la section éthique/manifeste (`mp-manifesto`) le mécanisme de validation factuelle Mediapart et le droit de regard, pour désamorcer l'objection « vous prenez le contrôle de notre marque ».

### 3.3 — Terrains éditoriaux politiquement marqués
La liste (Palestine, extrême droite, violences d'État) positionne ST politiquement et suggère que ST fixe l'agenda.
**Suggestion :** reformuler pour que ces terrains apparaissent comme *réactifs aux enquêtes Mediapart publiées*, pas comme une ligne éditoriale ST autonome.

### 3.4 — Le Festival = prestation facturée, pas partenariat éditorial
« Validé sans retouche » est la meilleure preuve, mais c'était une presta événementielle ponctuelle (devis ST-2026-3), pas une délégation d'enquête.
**Suggestion :** garder la preuve mais ne pas la sur-vendre comme équivalent du partenariat proposé.

### 3.5 — Flou tarifaire
« Détail tarifaire présenté à la réunion » : pas de cadre budgétaire écrit.
**Statut :** choix stratégique défendable. À confirmer avec Hedi, pas de changement code par défaut.

---

## Vérification finale (à exécuter après changements)

1. `grep -n "242\|Géraldine\|297 K\|2.58\|2.6\b\|Avril 2026" MediapartClient.tsx` → doit ne plus rien retourner d'incohérent.
2. Recompter chaque agrégat de vues affiché à partir des données brutes `VIDEOS_*`.
3. Diff visuel : ouvrir la page, vérifier qu'aucun deck vidéo n'expose une traîne de scores faibles sans cadrage.
4. Relecture : la page et `pitch.md` doivent dire exactement les mêmes chiffres.
