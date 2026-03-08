// Import du framework Express depuis node_modules
const express = require('express');
// Création de l'application Express
const app = express();
// Import de mongoose pour communiquer avec MongoDB
const mongoose = require('mongoose');
// Charge les variables d'environnement du fichier .env
require('dotenv').config();
// Import des routes liées aux livres
const bookRoutes = require('./routes/books');

const userRoutes = require('./routes/user');


// CONNEXION A MONGODB ATLAS
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log('Connexion à MongoDB réussie !')) // Si la connexion fonctionne
.catch(() => console.log('Connexion à MongoDB échouée !')); // Si la connexion échoue

// MIDDLEWARE JSON : permet de lire le JSON envoyé dans les requêtes
app.use(express.json());

// MIDDLEWARE: permet au frontend (localhost:4200) de communiquer avec le backend (localhost:3000)
app.use((req, res, next) => {

  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization'
  );
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, DELETE, PATCH, OPTIONS'
  );
  // On passe au middleware suivant
  next();
});

// ROUTES DE L'API
app.use('/api/books', bookRoutes); // si quelqu'un appelle /api/books, envoie la requête au router
app.use('/api/auth', userRoutes);


// Export de l'application, pour pouvoir l'utiliser dans server.js
module.exports = app;