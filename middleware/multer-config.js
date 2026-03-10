// Import multer
const multer = require('multer');

// Types d'images autorisés et leur extension
const MIME_TYPES = {
  'image/jpg': 'jpg',
  'image/jpeg': 'jpg',
  'image/png': 'png'
};

// Configuration du stockage des fichiers sur le serveur
const storage = multer.diskStorage({

  // Dossier où les images seront enregistrées
  destination: (req, file, callback) => {
    callback(null, 'images');
  },

  // Création du nom du fichier (nom original + timestamp)
  filename: (req, file, callback) => {
    const name = file.originalname.split(' ').join('_');
    const extension = MIME_TYPES[file.mimetype];
    callback(null, name + Date.now() + '.' + extension);
  }
});

// Export du middleware multer pour gérer un seul fichier nommé "image"
module.exports = multer({ storage: storage }).single('image');