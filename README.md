# Mon Vieux Grimoire - API Backend

## Description

Mon Vieux Grimoire est une API REST sécurisée permettant aux utilisateurs de gérer une bibliothèque de livres.  
L’application inclut un système d’authentification, de gestion d’images et de notation des livres.

---

## Objectifs du projet

- Créer une API REST avec Node.js et Express
- Mettre en place une authentification sécurisée avec JWT
- Gérer une base de données MongoDB
- Implémenter un système CRUD complet
- Gérer l’upload et la suppression d’images
- Empêcher les actions non autorisées

---

## Stack technique

- Node.js
- Express
- MongoDB (Mongoose)
- JSON Web Token (JWT)
- Bcrypt
- Multer
- Dotenv

---

## Compétences développées

- Création d’une API REST
- Structuration backend (routes, controllers, models)
- Authentification sécurisée (hash + token)
- Gestion des permissions utilisateurs
- Manipulation de fichiers (images)
- Gestion des erreurs et sécurité

---

## Sécurité mise en place

- Hash des mots de passe avec Bcrypt
- Authentification via JWT
- Protection des routes sensibles
- Vérification de l’utilisateur avant modification/suppression
- Empêchement des doublons dans les notations

---

## Installation

```bash
git clone https://github.com/Sara-Dalleau/backend.git
cd backend
npm install
npm start