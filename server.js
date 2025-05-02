// On importe les modules nécessaires
const express = require('express'); // Express pour gérer les routes et le serveur
const bodyParser = require('body-parser'); // Body-parser pour parser les requêtes HTTP
const cors = require('cors');
const apiRouter = require('./apiRouter').router; // On importe le routeur API de l'application

require('./db.js');  // Charger la connexion à la base de données

require('dotenv').config(); // Charger les variables d'environnement depuis un fichier .env

// On crée une instance d'Express pour notre serveur
const server = express();

// Active CORS pour toutes les requêtes
server.use(cors());  // Permet toutes les origines

// CORS Configuration
const corsOptions = {
    origin: 'http://127.0.0.1:5500', // Ton URL Frontend
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type'],
  };
  
// const authController = require('./controllers/authController');

// Configuration de body-parser pour analyser les données envoyées dans les requêtes
server.use(bodyParser.urlencoded({ extended: true })); // Pour analyser les données encodées dans l'URL
server.use(bodyParser.json()); // Pour analyser les données envoyées en JSON

// Définition de la route principale (racine)
server.get('/', function(req, res) {
    // On définit le type de contenu de la réponse en HTML
    res.setHeader('Content-Type', 'text/html');
    
    // On renvoie un message de bienvenue
    res.status(200).send('<h4>Bienvenue</h4>');
});

// server.get('/verify', authController.verifyEmail);

// On utilise le routeur API pour les routes commençant par "/api/"
server.use('/api/', apiRouter);

// On démarre le serveur sur le port 8080 et on affiche un message dans la console
server.listen(8080, function () {
    console.log('Le serveur est en écoute sur le port 8080 !');
});
