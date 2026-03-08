// Import du modèle Book pour interagir avec la base de données
const Book = require('../models/Book');


// GET : récupérer tous les livres

// si quelqu'un appelle GET /api/books alors execute la fonction getAllBooks du controller
exports.getAllBooks = (req, res, next) => {

  Book.find() // utilise le model

    .then(books => res.status(200).json(books))
    .catch(error => res.status(400).json({ error }));

};


// GET : récupérer un livre par son id
exports.getOneBook = (req, res, next) => {

  Book.findOne({ _id: req.params.id })

    .then(book => res.status(200).json(book))
    .catch(error => res.status(404).json({ error }));

};


// POST : créer un nouveau livre
exports.createBook = (req, res, next) => {

  // On supprime l'id envoyé par le frontend
  delete req.body._id;

  const book = new Book({
    ...req.body
  });

  book.save()

    .then(() => res.status(201).json({ message: 'Livre enregistré !' }))
    .catch(error => res.status(400).json({ error }));

};


// PUT : modifier un livre
exports.modifyBook = (req, res, next) => {

  Book.updateOne(
    { _id: req.params.id },
    { ...req.body, _id: req.params.id }
  )

  .then(() => res.status(200).json({ message: 'Livre modifié !' }))
  .catch(error => res.status(400).json({ error }));

};


// DELETE: supprimer un livre
exports.deleteBook = (req, res, next) => {

  Book.deleteOne({ _id: req.params.id })

    .then(() => res.status(200).json({ message: 'Livre supprimé !' }))
    .catch(error => res.status(400).json({ error }));

};