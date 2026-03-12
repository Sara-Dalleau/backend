// Import du modèle Book pour interagir avec la base de données
const Book = require('../models/Book');

const fs = require('fs');


// GET: récupérer les livres les mieux notés
exports.getBestRatedBooks = (req, res, next) => {

  Book.find()

    // trier par note décroissante
    .sort({ averageRating: -1 })

    // limiter aux 3 meilleurs
    .limit(3)

    .then(books => res.status(200).json(books))
    .catch(error => res.status(400).json({ error }));

};

// GET : récupérer tous les livres
exports.getAllBooks = (req, res, next) => {

  // Recherche tous les livres dans la base de données
  Book.find()

    .then(books => res.status(200).json(books))
    .catch(error => res.status(400).json({ error }));

};

// GET : récupérer un livre par son id.
exports.getOneBook = (req, res, next) => {

  // Recherche un livre grâce à son id
  Book.findOne({ _id: req.params.id })

    .then(book => res.status(200).json(book))
    .catch(error => res.status(404).json({ error }));

};

// POST : créer un nouveau livre
exports.createBook = (req, res, next) => {

  // Conversion de la chaîne JSON reçue en objet JavaScript
  const bookObject = JSON.parse(req.body.book);

  // Suppression des champs envoyés par le client pour éviter toute modification
  delete bookObject._id;
  delete bookObject._userId;

  // Création du nouveau livre avec l'utilisateur authentifié et l'URL de l'image
  const book = new Book({
    ...bookObject,
    userId: req.auth.userId,
    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
  });

  // Sauvegarde du livre dans la base de données
  book.save()
    .then(() => res.status(201).json({ message: 'Livre enregistré !' }))
    .catch(error => res.status(400).json({ error }));
};

// Fonction ajout note à un livre
exports.rateBook = (req, res, next) => {

  // récupère l'id de l'utilisateur depuis le token JWT
  const userId = req.auth.userId;
  // récupère la note envoyée dans le body
  const grade = req.body.rating;

  // recherche le livre dans la base avec son id
  Book.findOne({ _id: req.params.id })

    .then(book => {
      // vérifier si l'utilisateur a déjà noté
      const alreadyRated = book.ratings.find(
        rating => rating.userId === userId
      );

      // si l'utilisateur a déjà noté on bloque
      if (alreadyRated) {
        return res.status(400).json({ message: "Livre déjà noté par cet utilisateur" });
      }

      // ajouter la nouvelle note dans ratings []
      book.ratings.push({
        userId: userId,
        grade: grade
      });

      // calcule la somme de toutes les notes
      const total = book.ratings.reduce((sum, rating) => sum + rating.grade, 0);
      // calcule la moyenne
      book.averageRating = total / book.ratings.length;

      // sauvegarde livre dans la base
      book.save()
        // renvoie le livre mis à jour
        .then(updatedBook => res.status(200).json(updatedBook))
        .catch(error => res.status(400).json({ error }));

    })
    // erreur si le livre n'est pas trouvé
    .catch(error => res.status(404).json({ error }));
};


// PUT : modifier un livre
exports.modifyBook = (req, res, next) => {

  // Si une nouvelle image est envoyée on la traite, sinon on garde les données existantes
  const bookObject = req.file
    ? {
        ...JSON.parse(req.body.book),
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
      }
    : { ...req.body };

  // Empêche la modification du propriétaire
  delete bookObject._userId;

  // Vérifie que l'utilisateur est bien le propriétaire du livre
  Book.findOne({ _id: req.params.id })
    .then((book) => {
      if (book.userId != req.auth.userId) {
        res.status(401).json({ message: 'Non autorisé' });
      } else {
        // Mise à jour du livre
        Book.updateOne(
          { _id: req.params.id },
          { ...bookObject, _id: req.params.id }
        )
          .then(() => res.status(200).json({ message: 'Livre modifié !' }))
          .catch(error => res.status(401).json({ error }));
      }
    })
    .catch(error => res.status(400).json({ error }));
};

// DELETE: supprimer un livre
exports.deleteBook = (req, res, next) => {

  Book.findOne({ _id: req.params.id })

    .then(book => {
      // Vérifie que l'utilisateur est bien le propriétaire
      if (book.userId != req.auth.userId) {
        res.status(401).json({ message: 'Non autorisé' });

      } else {
        // Récupère le nom du fichier image
        const filename = book.imageUrl.split('/images/')[1];
        // Supprime l'image du dossier images
        fs.unlink(`images/${filename}`, () => {
          // Supprime le livre dans MongoDB
          Book.deleteOne({ _id: req.params.id })

            .then(() => res.status(200).json({ message: 'Livre supprimé !' }))
            .catch(error => res.status(400).json({ error }));
        });
      }
    })
    .catch(error => res.status(500).json({ error }));
};