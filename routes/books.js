// Import du framework Express
const express = require('express');
// Création d'un routeur Express
const router = express.Router();
// Import du controller qui contient la logique des livres
const booksCtrl = require('../controllers/books');
// Middleware qui vérifie l'authentification de l'utilisateur via le token JWT
const auth = require('../middleware/auth');
// Middleware multer qui gère l'upload des images envoyées dans les requêtes
const multer = require('../middleware/multer-config');


// ROUTE CRUD

// GET: récuperer les "meilleurs livres"
router.get('/bestrating', booksCtrl.getBestRatedBooks);

// GET : récupérer tous les livres
router.get('/',booksCtrl.getAllBooks); // appelle la fonction du controller

// GET : récupérer un livre spécifique
router.get('/:id',booksCtrl.getOneBook);

// POST : créer un nouveau livre
router.post('/', auth, multer, booksCtrl.createBook);

// POST : ajouter une note à un livre
router.post('/:id/rating', auth, booksCtrl.rateBook);

// PUT : modifier un livre
router.put('/:id', auth, booksCtrl.modifyBook);

// DELETE : supprimer un livre
router.delete('/:id', auth, booksCtrl.deleteBook);


// Export du routeur, pour pouvoir l'utiliser dans app.js
module.exports = router;