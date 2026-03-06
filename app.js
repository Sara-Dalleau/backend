const express = require('express'); // On importe express depuis node_modules.

const app = express(); // On créer une app express.

// Middleware qui permet de lire le JSON envoyé dans les requêtes
app.use(express.json());

// Middleware CORS : permet au frontend (localhost:4200) de communiquer avec le backend (localhost:3000)
app.use((req, res, next) => {

  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization'
  );
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, DELETE, PATCH, OPTIONS'
  )
  next(); // on passe au middleware suivant
});

// ROUTE GET : récupérer les livres
app.use('/api/books', (req, res, next) => {

  const books = [
    {
      _id: "1",
      title: "Premier livre",
      author: "Auteur",
      imageUrl: "https://picsum.photos/200",
      year: 2023,
      genre: "Roman",
      ratings: []
    }
  ];
  res.status(200).json(books);
});

// ROUTE POST : créer un livre
app.post('/api/books', (req, res, next) => {
  console.log(req.body); // affiche les données envoyées par le frontend

  res.status(201).json({
    message: 'Livre créé !'
  });

});

module.exports = app; //export de l'app pour pouvoir y accéder depuis autres fichiers.