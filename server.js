const express = require('express')

const bodyParser = require('body-parser')

const apiRouter = require('./apiRouter').router

require('./db.js');  // Charger la connexion à la base de données

require('dotenv').config();

const server = express()

// Body Parser configuration
server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());

server.get('/', function(req, res) {
    res.setHeader('Content-Type', 'text/html')
    res.status(200).send('<h4>Bienvenue</h4>')
})

server.use('/api/', apiRouter);

server.listen(8080, function () {
    console.log('Server en écoute !')
})