# Backend API

Ce projet est une API Node.js avec Express et MongoDB, incluant l'authentification JWT et la gestion des livres.

## Prérequis

Avant d'installer le projet, assurez-vous d'avoir installé :

- [Node.js](https://nodejs.org/) (version recommandée : 18.x ou supérieure)
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) ou un serveur MongoDB local
- [Git](https://git-scm.com/) (optionnel, pour cloner le projet)

## Installation

1. **Cloner le dépôt** :

   ```sh
   git clone https://github.com/rakazakben/backend.git
   cd backend
   ```

2. **Installer les dépendances** :

   ```sh
   npm install
   ```

## Configuration

Créez un fichier `.env` à la racine du projet avec le contenu suivant :

```env
# Lien de connexion MongoDB
DB_LINK=mongodb+srv://USERNAME:PASSWORD@cluster0.igwdz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0

# Clé secrète JWT
JWT_SECRET=VOTRE_CLE_SECRETE
```

- **Remplacez** `USERNAME` et `PASSWORD` par vos identifiants MongoDB Atlas.
- **Ne partagez jamais** votre fichier `.env` publiquement !

## Lancement du serveur

### En mode développement

Pour lancer l'API :

```sh
npm run dev
```

### En mode production

```sh
npm start
```
## Utilisation de l'API

L'API propose plusieurs routes pour gérer les livres et l'authentification.

### Exemple d'une requête GET avec cURL :

```sh
curl -X GET http://localhost:3000/api/books
```

### Routes disponibles

- `GET /api/books` : Récupérer tous les livres
- `GET /api/books/:id` : Récupérer un livre par ID
- `POST /api/books` : Ajouter un livre (authentification requise)
- `PUT /api/books/:id` : Modifier un livre (authentification requise)
- `DELETE /api/books/:id` : Supprimer un livre (authentification requise)

## Auteur

- **Ryan Benmessaoud**

## Licence

Ce projet est sous licence MIT. Vous pouvez l'utiliser librement.

