const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {

  try {
    // récupérer le token dans le header Authorization
    const token = req.headers.authorization.split(' ')[1];

    // vérifier le token
    const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');

    // récupérer le userId
    const userId = decodedToken.userId;

    // ajouter l'id utilisateur à la requête
    req.auth = {
      userId: userId
    };

    next();
  } catch(error) {
    res.status(401).json({ error });
  }
};