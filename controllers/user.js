// Import de bcrypt pour chiffrer les mots de passe
const bcrypt = require('bcrypt');
// Import du modèle User
const User = require('../models/User');
// Import de jwt pour créer tokens
const jwt = require('jsonwebtoken');

// Création utilisateur
exports.signup = (req, res, next) => {

  bcrypt.hash(req.body.password, 10)

    // dans .then on recoit le hash
    .then(hash => { 
      //On crée l’utilisateur
      const user = new User({
        email: req.body.email,
        password: hash
      });

      user.save() // On enregistre dans MongoDB

        .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
        .catch(error => res.status(400).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));
};

// Permet de verifier si utilisateur existe dans la base et si connexion utilisateur est valide
exports.login = (req, res, next) => {

  User.findOne({ email: req.body.email }) // On cherche l'utilisateur dans la base

    .then(user => {
      // Si aucun utilisateur trouvé, 401 authentification refusée
      if (!user) {
        return res.status(401).json({
          message: 'Paire login/mot de passe incorrecte'
        });
      }
      // Si utilisateur existe: bcrypt verifie si password envoyé = password qui a généré ce hash
      bcrypt.compare(req.body.password, user.password)


        //Si password est faux, 401 authentification refusée
        .then(valid => {
          if (!valid) {
            return res.status(401).json({
              message: 'Paire login/mot de passe incorrecte'
            });
          }
          // Si le login est correct
          res.status(200).json({
            userId: user._id,
            token: jwt.sign(
              { userId: user._id},
              'RANDOM_TOKEN_SECRET',
              {expiresIn:'24h'}
            )
          });
        })

        .catch(error => res.status(500).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));

};