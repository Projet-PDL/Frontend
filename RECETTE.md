# Cahier de Recette

Le cahier de recette présente les tests fonctionnels permettant de valider la conformité du projet **LinkedIn2CV** avec les exigences fonctionnelles et techniques décrites dans le cahier des charges.

---

## Objectif de la recette

L’objectif de cette phase est de :
- Vérifier que chaque fonctionnalité du système fonctionne conformément aux spécifications.
- Identifier les anomalies et les corriger avant la mise en production.
- Garantir une expérience fluide pour les utilisateurs finaux.

---

##  Environnement de test

| Élément | Détail |
|----------|--------|
| **Environnement** | Local / Développement |
| **Navigateurs testés** | Chrome, Firefox, Edge |
| **Backend** | Fastify |
| **Base de données** | PostgreSQL |
| **Frontend** | Vue.js + Bootstrap |
| **Génération PDF** | Puppeteer |
| **Conteneurisation** | Docker / Docker Compose |
| **CI/CD** | GitHub Actions |
| **Outil de test** | Jest, Swagger |

---

## Scénarios de test fonctionnels

### 1. Authentification et gestion de profil

| ID | Fonctionnalité | Étapes de test | Résultat attendu | Statut |
|----|----------------|----------------|------------------|---------|
| F01 | Création de compte utilisateur | Accéder à la page d'inscription → remplir le formulaire → valider | Le compte est créé et l’utilisateur est redirigé vers la page de création CV | ✅  |
| F02 | Connexion utilisateur | Accéder à la page de connexion → entrer identifiants → valider | Accès autorisé à la page de création CV |✅|
| F03 | Connexion via Google / Apple | Cliquer sur “Login with Google/Apple” | Authentification OAuth réussie | ❌ Non implémentée |
| F04 | Import de profil LinkedIn (URL ou fichier .json) | Importer un profil depuis LinkedIn | Données importées sans erreur | ✅  |

---

### 2. Gestion des informations personnelles

| ID | Fonctionnalité | Étapes de test | Résultat attendu | Statut |
|----|----------------|----------------|------------------|---------|
| F05 | Récupération des infos personnelles | Importer profil → vérifier affichage du nom, photo, titre | Données exactes et bien affichées |✅  |
| F06 | Récupération des expériences | Importer profil → vérifier la section “Expériences” | Les expériences sont listées correctement |✅|
| F07 | Récupération des formations | Importer profil → vérifier la section “Formations” | Les formations apparaissent avec diplôme et dates | ✅  |
| F08 | Récupération des compétences/langues | Vérifier l’import complet | Compétences et langues bien affichées | ✅  |
| F09 | Gestion d’erreur d’import | Importer un fichier invalide | Message d’erreur clair et non bloquant | ✅ |

---

### 3. Personnalisation du CV

| ID | Fonctionnalité | Étapes de test | Résultat attendu | Statut |
|----|----------------|----------------|------------------|---------|
| F10 | Modification manuelle des informations | Modifier une expérience ou un titre | Modification visible dans l’aperçu | ✅  |
| F11 | Ajout manuel d’une expérience | Cliquer sur “Ajouter une expérience” → remplir les champs | L’expérience apparaît dans la liste | ✅  |
| F12 | Choix du modèle de CV | Choisir un style parmis les templates disponibles| Le template sélectionné s’applique immédiatement | ✅  |

---

### 4. Génération et gestion des CV

| ID | Fonctionnalité | Étapes de test | Résultat attendu | Statut |
|----|----------------|----------------|------------------|---------|
| F13 | Génération du CV en PDF | Cliquer sur “Télécharger” | Le CV se télécharge au format PDF avec la bonne mise en page | ✅  |
| F14 | Consultation d’un CV existant | Ouvrir un CV enregistré | Le CV s’affiche avec les données correctes | ✅  |
| F15 | Mise à jour d’un CV | Modifier un CV existant | Les changements sont sauvegardés | ✅ |
| F16 | Suppression d’un CV | Cliquer sur “Supprimer” | Le CV disparaît de la liste | ✅ |

---

### 5. Consultation et historique

| ID | Fonctionnalité | Étapes de test | Résultat attendu | Statut |
|----|----------------|----------------|------------------|---------|
| F17 | Affichage de la liste des CV | Accéder à “Mes CV” | Liste complète avec date de création | ✅ |
| F18 | Visualisation d’un CV | Cliquer sur un CV dans la liste | Aperçu du CV affiché correctement | ✅ |

---

## Tests techniques

| Type de test | Description | Statut |
|---------------|--------------|---------|
| **Performance** | Génération du CV en < 5 secondes | ⚠️ Plus ou moins satisfaisant |
| **Compatibilité mobile** | Interface responsive (mobile/tablette) | ✅  |
| **Accessibilité** | Textes lisibles et contrastes respectés | ✅ |



>  **Remarque :**  
> Ce document sera mis à jour après chaque livraison pour inclure les nouveaux tests fonctionnels, les corrections d’anomalies.
