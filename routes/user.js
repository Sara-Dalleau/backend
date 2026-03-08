// Import d'express
const express = require('express');
// Création du router
const router = express.Router();
// Import du controller user
const userCtrl = require('../controllers/user');


// Route pour créer un compte
router.post('/signup', userCtrl.signup);

// Route pour se connecter
router.post('/login', userCtrl.login);


// Export du router
module.exports = router;