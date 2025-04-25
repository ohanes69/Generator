// ---------------------------
// 📦 IMPORTS
// ---------------------------
// On importe les modules nécessaires pour notre code
const bcrypt = require('bcrypt'); // Module pour hacher les mots de passe
const jwt = require('jsonwebtoken'); // Module pour générer et vérifier des tokens JWT
const models = require('../models'); // Accès à la base de données via Sequelize
const jwtUtils = require('../utils/jwt.utils'); // Outils pour gérer les tokens JWT

// ---------------------------
// 📌 CONSTANTES DE VALIDATION
// ---------------------------
// On définit des expressions régulières pour valider l'email et le mot de passe
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Vérifie que l'email a un format valide
const PASSWORD_REGEX = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d\W_]{8,}$/; // Mot de passe sécurisé : au moins 8 caractères, avec au moins une lettre et un chiffre

// ---------------------------
// 📡 ROUTES
// ---------------------------
module.exports = {
  
  // 📝 Enregistrement d’un nouvel utilisateur
  register: async function (req, res) {
    const { email, password } = req.body;

    // Vérifie que les deux champs sont bien remplis
    if (!email || !password) {
      return res.status(400).json({ error: 'paramètres manquants' });
    }

    // Vérifie que l’email a un format correct
    if (!EMAIL_REGEX.test(email)) {
      return res.status(400).json({ error: 'email invalide' });
    }

    // Vérifie que le mot de passe est sécurisé
    if (!PASSWORD_REGEX.test(password)) {
      return res.status(400).json({
        error: 'mot de passe invalide (doit contenir au moins 8 caractères, une lettre et un chiffre)'
      });
    }

    try {
      // Vérifie si l’utilisateur existe déjà dans la base de données
      const userFound = await models.users.findOne({ where: { email } });

      if (userFound) {
        return res.status(409).json({ error: 'utilisateur déjà existant' });
      }

      // Hachage du mot de passe avant de l'enregistrer dans la base de données
      const bcryptedPassword = await bcrypt.hash(password, 5);

      // Création du nouvel utilisateur dans la base de données
      const newUser = await models.users.create({
        email,
        password: bcryptedPassword
      });

      // Retourne l’ID du nouvel utilisateur
      return res.status(201).json({ userId: newUser.id });

    } catch (err) {
      console.error('Erreur lors de la création de l’utilisateur :', err);
      return res.status(500).json({ error: 'impossible d’ajouter l’utilisateur' });
    }
  },

  // 🔐 Connexion d’un utilisateur
  login: async function (req, res) {
    const { email, password } = req.body;
    console.log('📥 Données reçues :', { email, password });
  
    // Vérifie que l'email et le mot de passe sont fournis
    if (!email || !password) {
      console.log('❌ Paramètres manquants');
      return res.status(400).json({ error: 'paramètres manquants' });
    }
  
    // Vérifie que l'email a un format valide
    if (!EMAIL_REGEX.test(email)) {
      console.log('❌ Email invalide');
      return res.status(400).json({ error: 'email invalide' });
    }
  
    // Vérifie que le mot de passe est valide
    if (!PASSWORD_REGEX.test(password)) {
      console.log('❌ Mot de passe invalide');
      return res.status(400).json({
        error: 'mot de passe invalide (doit contenir au moins 8 caractères, une lettre et un chiffre)'
      });
    }
  
    try {
      // Cherche l'utilisateur dans la base de données avec l'email fourni
      const userFound = await models.users.findOne({ where: { email } });
      console.log('👤 Utilisateur trouvé :', userFound);
  
      if (!userFound) {
        console.log('❌ Utilisateur introuvable');
        return res.status(404).json({ error: 'utilisateur non trouvé' });
      }
  
      // Vérifie si le mot de passe correspond à celui stocké dans la base de données
      const valid = await bcrypt.compare(password, userFound.password);
      console.log('🔐 Mot de passe correspond ?', valid);
  
      if (!valid) {
        console.log('❌ Mot de passe incorrect');
        return res.status(403).json({ error: 'mot de passe incorrect' });
      }
  
      // Génère un token JWT pour l'utilisateur
      const token = jwtUtils.generateTokenForUser(userFound);
      console.log('🎟️ Token généré :', token);
  
      // Renvoie l'ID de l'utilisateur et le token
      return res.status(201).json({
        userId: userFound.id,
        token: token
      });
  
    } catch (err) {
      console.error('💥 Erreur dans la connexion :', err);
      return res.status(500).json({ error: 'impossible de connecter l’utilisateur' });
    }
  },

  // 👤 Récupération du profil utilisateur à partir du token
  getUserProfile: async function (req, res) {
    const headerAuth = req.headers['authorization']; // Récupère l'en-tête d'authentification
    let userId;

    try {
        // Utilise la méthode getUserId pour récupérer l'ID de l'utilisateur depuis le token
        userId = jwtUtils.getUserId(headerAuth);
    } catch (err) {
        return res.status(400).json({ error: 'token incorrect' });
    }

    try {
        // Cherche l'utilisateur dans la base de données avec l'ID récupéré du token
        const user = await models.users.findOne({
            attributes: ['id', 'email'],
            where: { id: userId }
        });

        if (!user) {
            return res.status(404).json({ error: 'utilisateur non trouvé' });
        }

        // Renvoie les informations de l'utilisateur
        return res.status(200).json(user); // Renvoie les infos de l'utilisateur
    } catch (err) {
        return res.status(500).json({ error: 'impossible de récupérer l’utilisateur' });
    }
  }
};