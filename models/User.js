const mongoose = require('mongoose');
// Import du plugin de validation
const uniqueValidator = require('mongoose-unique-validator');

// Création du schéma utilisateur
const userSchema = mongoose.Schema({

  // email obligatoire et unique
  email: { type: String, required: true, unique: true },
  // mot de passe obligatoire
  password: { type: String, required: true }
});

// Plugin qui vérifie l'unicité des emails
userSchema.plugin(uniqueValidator);

// Export du modèle User
module.exports = mongoose.model('User', userSchema);