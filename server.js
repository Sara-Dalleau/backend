const http = require('http'); //Import module HTTP natif de Node, permet de créer serveur HTTP.
const app = require('./app'); // Import de notre application Express depuis le fichier app.js.

// On définit le port sur lequel le serveur va écouter.
// Si une variable d'environnement PORT existe > on l'utilise sinon > on utilise le port 3000.
const port = process.env.PORT || 3000;

// On enregistre le port dans la configuration de l'application Express.
// Express peut ensuite récupérer cette information si besoin.
app.set('port', port);

// Création serveur HTTP Node. On lui donne notre application Express pour gérer les requêtes.
const server = http.createServer(app);

//Démarrage serveur, le serveur écoute les requêtes sur le port défini.
server.listen(port);