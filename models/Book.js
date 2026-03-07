const mongoose = require('mongoose');

// Schéma pour une note
const ratingSchema = mongoose.Schema({
  userId: { type: String, required: true },
  grade: { type: Number, required: true }
});

// Schéma principal du livre
const bookSchema = mongoose.Schema({

  userId: { type: String, required: true },

  title: { type: String, required: true },

  author: { type: String, required: true },

  imageUrl: { type: String, required: true },

  year: { type: Number, required: true },

  genre: { type: String, required: true },

  // tableau contenant toutes les notes des utilisateurs
  // chaque élément du tableau respecte ratingSchema
  ratings: [ratingSchema],

  // moyenne des notes du livre
  averageRating: { type: Number, required: true }

});

// Création du modèle Book. Transforme le schéma en modèle utilisable
module.exports = mongoose.model('Book', bookSchema);