# Plan de mise à jour st-for-mediapart → pitch.md

**Date**: 22 juin 2026
**Objectif**: Aligner toutes les données du composant MediapartClient.tsx avec les informations exactes du pitch.md

---

## ✅ État des lieux : Conformités

Les éléments suivants sont **déjà corrects** dans le code actuel :
- `297 511` vues totales Électrochocs
- `91 %` des vues sur Instagram
- `92–98 %` de non-abonnés Instagram
- `27,4 %` de rétention TikTok (Hédito)
- `242K` vues IG pour le Hédito (23,720 + 241,969 = 265,689… à vérifier)
- `21,8 %` taux d'engagement moyen
- `78 %` audience France (code actuel) vs `77,1 %` (pitch) — différence mineure

---

## 🔧 Changements nécessaires

### 1. Timeline (TL) - `MediapartClient.tsx` lignes 64-72

**Actuel** : 7 jalons de fév. 2025 à mai 2026

**À modifier pour** : Ajouter le Festival Mediapart (juin 2026) comme preuve clé

| Position | Contenu actuel | Contenu cible (pitch.md §03) |
|----------|----------------|------------------------------|
| Après "Mai 2026 — Électrochocs" | Proposition de convention | **Festival Mediapart (juin 2026)** |
| - | - | "Le 6 juin 2026, ST assure la couverture du Festival Mediapart à Aubervilliers. Toutes les vidéos validées sans retouche. Prestation facturée (devis ST-2026-3)." |

**Action** : Remplacer l'entrée "Proposition de convention" par une entrée "Festival Mediapart" plus détaillée, puis ajouter "Proposition de convention" après.

---

### 2. Électrochocs data - `VIDEOS_ECT` lignes 133-137

**Actuel** :
- Hédito · Géraldine
- L'OeilDe Lucho · Histoire de l'ECT
- Fokus-témoignage · Géraldine

**À vérifier** : Les IDs TikTok sont-ils corrects ? Les chiffres correspondent-ils au pitch ?

| Video | TikTok | Instagram | Total | Pitch |
|-------|--------|-----------|-------|-------|
| Hédito Hedi | 23,720 | 241,969 | 265,689 | 241,969 IG mentionné |
| ODL Lucho | 1,794 | 14,721 | 16,515 | ✓ |
| Fokus-témoignage Amandine | 2,243 | 13,064 | 15,307 | ✓ |

**Note** : Le pitch mentionne "Géraldine" mais la table des métriques mentionne "Hedi". À vérifier/corriger pour cohérence.

---

### 3. Stats strip hero - lignes 756-773

**À vérifier** :
- `{ target: 2, ... label: 'séries produites ensemble' }` → Correct (2 séries)
- Chiffres en cohérence avec pitch

**Action** : Vérifier que tous les chiffres affichés correspondent exactement au pitch.

---

### 4. SHOWCASE_ITEMS - lignes 74-83

**Actuel** : 8 items dont `242K` vues IG — Hédito

**Problème** : 23,720 (TikTok) + 241,969 (IG) = 265,689 total, pas 242K

**À corriger** : Soit le chiffre, soit le calcul. Le pitch dit "241 969 vues Instagram" pour le Hédito.

**Action** : Changer `'242K'` pour `'265K'` OU vérifier que le 242K fait référence à autre chose.

---

### 5. PROOF_POINTS - lignes 93-97

**À vérifier** :
- `{ value: '297 K', label: 'vues — serie ECT' }` → Devrait être `'297 511'` pour exactitude
- `{ value: '92–98%', label: 'non-abonnés Instagram' }` → Correct
- `{ value: '27,4 %', label: 'rétention TikTok — Hédito' }` → Correct

---

### 6. Audience section - lignes 1226-1234

**Actuel** :
- `data-count={76}` → "Audience féministe 18–34"
- `data-count={78}` → "Audience France"

**Pitch** (lignes 20-26) :
- `81,4 %` des abonnés TikTok ST ont 18-34 ans (44,2 % de 18-24, 37,2 % de 25-34)
- `75 %` sont des femmes
- `77,1 %` sont en France

**Actions** :
1. Changer `data-count={76}` pour `data-count={75}` (femmes)
2. Changer `data-count={78}` pour `data-count={77.1}` (France)
3. Ajouter un item pour `81,4 %` 18-34 ans (ou détailler 44,2% + 37,2%)

---

### 7. PILOT_DATA - lignes 50-62

**À vérifier** : Ces données semblent être pour "Le Media" (pilote), pas pour Mediapart.

**Pitch note** : "Sur le pilote LeMedia : 546k vues · 2,62 % share rate · 96 % non-abonnés."

**Action** : Confirmer que ces données sont correctes pour la section "Histoire / Pilote".

---

### 8. Hero stats - lignes 756-773

**Actuel** :
```tsx
{ target: 297511, ... label: 'vues — Électrochocs' },
{ target: 91, ... label: '% vues Instagram' },
{ target: 27.4, ... label: '% rétention TikTok' },
{ target: 2, ... label: 'séries produites ensemble' },
{ target: 21.8, ... label: '% engagement moyen' },
```

**À vérifier** : Tous ces chiffres sont cohérents avec le pitch.

**Action** : Aucun changement nécessaire si les chiffres sont corrects.

---

### 9. Section CTA / Proposition - lignes 1360-1417

**Actuel** : Mentionne "Option A — Cycle test", "Option B — Série éditoriale", "Option C — Convention longue"

**Pitch** (section 06 - Le cadre du partenariat) :
- Convention de 3 mois renouvelable
- 1 à 2 séries par mois
- Base récurrente + options formats lourds
- Point de contact : Ana Ferrer

**Actions** :
1. Mettre à jour les 3 options pour refléter exactement le pitch
2. Ajouter mention d'Ana Ferrer comme contact
3. Préciser "3 mois renouvelable, non-exclusive"

---

### 10. Date du document - ligne 658 et 1422

**Actuel** : "Mai 2026" et "Avril 2026" (footer)

**Pitch** : "Juin 2026" (page header)

**Action** : Harmoniser toutes les dates à "Juin 2026".

---

## 📋 Résumé des fichiers à modifier

### `app/st-for-mediapart/MediapartClient.tsx`

1. **Lignes 64-72** (TL) : Ajouter Festival Mediapart (juin 2026)
2. **Lignes 74-83** (SHOWCASE_ITEMS) : Corriger chiffre Hédito IG si nécessaire
3. **Lignes 93-97** (PROOF_POINTS) : Formatage exact chiffres
4. **Lignes 1226-1234** (Audience) : 75% femmes, 77,1% France, 81,4% 18-34
5. **Lignes 1360-1417** (CTA) : Mettre à jour options convention
6. **Lignes 658, 1422** (Dates) : Harmoniser à "Juin 2026"

---

## ✅ Checklist de validation

- [ ] Timeline inclut Festival Mediapart (juin 2026)
- [ ] Chiffres Électrochocs exacts (297 511, 91% IG, 92-98% non-abonnés)
- [ ] Audience : 75% femmes, 77,1% France, 81,4% 18-34 ans
- [ ] Stats strip : tous les chiffres vérifiés
- [ ] CTA : options convention alignées avec pitch
- [ ] Dates cohérentes (Juin 2026)
- [ ] Noms cohérents (Hedi vs Géraldine)

---

## 🎯 Priorités

1. **Critique** : Timeline (ajouter Festival), Audience (75%, 77.1%, 81.4%)
2. **Important** : CTA options convention, dates
3. **Secondaire** : Vérification cohérence noms, formatage précis
