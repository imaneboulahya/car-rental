# 🏎️ LuxeDrive - Système de Gestion de Location de Véhicules de Prestige

**LuxeDrive** est une plateforme web moderne dédiée à la location de véhicules de luxe, offrant une expérience utilisateur premium et une gestion sécurisée des réservations. Ce projet a été développé dans le cadre d'un Projet de Fin d'Études (PFE).

---

## 🏗️ Architecture du Projet

Le projet repose sur une architecture **Full-Stack** découplée, garantissant performance et scalabilité :

*   **Frontend** : Développé avec **React.ts** (TypeScript) et **Vite.js**. Utilisation de **GSAP** pour les animations fluides et **Lucide React** pour l'iconographie moderne.
*   **Backend** : API REST développée en **Python** avec le framework **Flask**.
*   **Base de Données** : Système de gestion de base de données relationnelle **PostgreSQL**.
*   **ORM** : Utilisation de **SQLAlchemy** pour une gestion robuste des modèles de données.

---

## 🔒 Sécurité & Bonnes Pratiques

La sécurité a été une priorité absolue dans le développement de ce projet :

1.  **Hachage des mots de passe (Bcrypt)** : Chaque mot de passe est haché avec l'algorithme spécialisé **Bcrypt**. Contrairement aux méthodes classiques, Bcrypt intègre un "salt" progressif, rendant les identifiants imprenables même en cas d'accès à la base de données.
2.  **Gestion des Secrets (.env)** : Toutes les informations sensibles (configuration SMTP, accès DB, clés secrètes) sont isolées dans un fichier `.env`. Le projet utilise `python-dotenv` pour charger ces variables de manière sécurisée.
3.  **Protection CORS** : Configuration rigoureuse du partage de ressources (CORS) pour restreindre l'accès à l'API uniquement au domaine autorisé.

---

## 🛠️ Guide d'Installation (Étape par étape)

### 1. Préparation de la Base de Données
1. Installez **PostgreSQL**.
2. Créez une nouvelle base de données nommée `test26_db`.
3. Importez la structure à partir du fichier `database.sql` :
   ```bash
   psql -U postgres test26_db < database.sql
   ```

### 2. Configuration du Backend (Flask)
1. Installez les dépendances Python :
   ```bash
   pip install flask flask-sqlalchemy flask-cors flask-bcrypt python-dotenv psycopg2
   ```
2. Créez un fichier `.env` à la racine (copiez le contenu de `.env.example`).
3. Modifiez les accès à la base de données dans le fichier `.env`.
4. Lancez le serveur : `python src/backend/app.py`

### 3. Configuration du Frontend (React)
1. Installez les modules **Node.js** :
   ```bash
   npm install
   ```
2. Lancez l'application :
   ```bash
   npm run dev
   ```

---

## 🚀 Fonctionnalités Clés
*   **Gestion de flotte** : Interface administrative pour piloter les actifs du groupe.
*   **Réservations dynamiques** : Workflow complet de sélection et confirmation.
*   **Espace Client** : Suivi des réservations passées et actuelles.
*   **Intégration Email** : Envoi de notifications automatiques pour le support et les réservations.
