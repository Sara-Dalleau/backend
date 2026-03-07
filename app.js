const express = require('express'); // On importe express depuis node_modules.
const app = express(); // On créer une app express.
const mongoose = require('mongoose');

const Book = require('./models/Book');

// Connexion à la base de données MongoDB Atlas.
mongoose.connect('mongodb+srv://sara_mongoDB:mdpmongoDBatlas123@cluster0.ga5ywej.mongodb.net/?appName=Cluster0')
// Si la connexion fonctionne :
.then(() => console.log('Connexion à MongoDB réussie !'))
// Si la connexion échoue :
.catch(() => console.log('Connexion à MongoDB échouée !'));

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
app.get('/api/books', (req, res, next) => {

  Book.find()

    .then(books => res.status(200).json(books))

    .catch(error => res.status(400).json({ error }));
});

//ROUTE GET PAR id
app.get('/api/books/:id', (req, res, next) => {

  Book.findOne({ _id: req.params.id })

    .then(book => res.status(200).json(book))

    .catch(error => res.status(404).json({ error }));

});

// ROUTE POST : créer un livre
app.post('/api/books', (req, res, next) => {

  delete req.body._id;

  const book = new Book({
    ...req.body
  });

  book.save()
    .then(() => res.status(201).json({ message: 'Livre enregistré !' }))
    .catch(error => res.status(400).json({ error }));

});

module.exports = app; //export de l'app pour pouvoir y accéder depuis autres fichiers.