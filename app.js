const express = require('express'); // On importe express depuis node_modules.

const app = express(); // On créer une app express.

app.use((req, res, next) => {
  res.json({ message: 'Votre requête a bien été reçue !' });
});

module.exports = app;//export de l'app pour pouvoir y accéder depuis autres fichiers.