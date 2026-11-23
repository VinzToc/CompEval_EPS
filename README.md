# CompEval – Évaluer par compétences en EPS

Application de l'ensemble **Mes Apps EPS** : créer ses propres grilles d'évaluation par compétences et évaluer les élèves d'un simple clic.

Adresse : https://vinztoc.github.io/CompEval_EPS/

Thème : couleurs du logo (bleu roi `#025198`, bleu nuit `#012953`, orange `#fc8e01`, doré `#f5bd22`, cyan `#67d8fd`).

## Fonctionnement
1. **Mes grilles** : créer une grille en choisissant le nombre de **compétences** (lignes) et de **niveaux** (colonnes), puis saisir les indicateurs de réussite dans chaque case.
   - Couleur de chaque colonne (niveau).
   - Barème au choix :
     - **% du total** : chaque compétence vaut un nombre de points, chaque niveau rapporte un pourcentage de ces points ;
     - **Points** : chaque niveau rapporte un nombre de points (réglé pour toute la colonne, ajustable case par case).
   - Note ramenée sur une valeur choisie (ex. /20) et arrondi (0,1 · 0,25 · 0,5 · 1).
   - Dupliquer, exporter / importer une grille (.json) pour la partager avec des collègues.
2. **Évaluer** : choisir la grille, la classe et la date, puis cliquer sur la case du niveau atteint par l'élève (un second clic annule). Statut Présent / Absent / Dispensé, commentaire facultatif, navigation élève précédent / suivant.
3. **Résultats** : tableau de la classe (niveau par compétence, note, %), répartition des niveaux par compétence, moyenne, export .xlsx et impression.

## Intégration à Mes Apps EPS (eps-core.js v2.4)
- Identifiant d'application : `compeval`.
- Élèves : `EPS.all()` ; si la base est vide, bouton « Charger la liste » (`EPS.importFile`, .xlsx ou .csv de Mes Apps EPS).
- Enregistrement en mode « lignes » : une ligne par élève, par grille et par date, mise à jour à chaque clic (`EPS.setExt('compeval', id, {lignes})`). Colonnes : `Date`, `Évaluation`, `Activité`, `Statut`, `1. <compétence>` … (nom du niveau atteint), `Note`, `Sur`, `Réussite`, `Items évalués`, `Commentaire`.
- Export : `EPS.exportXLSX({ids, apps:['compeval']})` → feuille `compeval` du classeur Mes Apps EPS.
- Les saisies déjà présentes dans Mes Apps EPS (autre appareil, fichier compilé importé) sont reprises automatiquement dans CompEval.

Les définitions de grilles sont conservées dans le navigateur (localStorage). Aucune donnée n'est envoyée sur Internet.
