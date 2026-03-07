// Import du framework Express
const express = require('express');

// Création d'un routeur Express
const router = express.Router();

// Import du controller qui contient la logique des livres
const booksCtrl = require('../controllers/books');


// ROUTE CRUD

// GET : récupérer tous les livres
router.get('/', booksCtrl.getAllBooks);

// GET : récupérer un livre spécifique
router.get('/:id', booksCtrl.getOneBook);

// POST : créer un nouveau livre
router.post('/', booksCtrl.createBook);

// PUT : modifier un livre
router.put('/:id', booksCtrl.modifyBook);

// DELETE : supprimer un livre
router.delete('/:id', booksCtrl.deleteBook);


// Export du routeur, pour pouvoir l'utiliser dans app.js
module.exports = router;