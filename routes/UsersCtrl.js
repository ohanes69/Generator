// Imports
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const models = require('../models');

// Constants
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PASSWORD_REGEX = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d\W_]{8,}$/;

// Routes
module.exports = {
    register: async function (req, res) {
        const { email, password } = req.body;
    
        if (!email || !password) {
          return res.status(400).json({ error: 'missing parameters' });
        }
    
        if (!EMAIL_REGEX.test(email)) {
          return res.status(400).json({ error: 'email is not valid' });
        }
    
        // Validation mot de passe avec ta regex
        if (!PASSWORD_REGEX.test(password)) {
          return res.status(400).json({
            error: 'password invalid (must be at least 8 characters long, include at least one letter and one number)'
          });
        }
    
        try {
          const userFound = await models.users.findOne({ where: { email } });
    
          if (userFound) {
            return res.status(409).json({ error: 'Utilisateur déjà existant' });
          }
    
          const bcryptedPassword = await bcrypt.hash(password, 5);
    
          const newUser = await models.users.create({
            email,
            password: bcryptedPassword
          });
    
          return res.status(201).json({ userId: newUser.id });
    
        } catch (err) {
            console.error('Erreur lors de la création de l’utilisateur :', err);
            return res.status(500).json({ error: 'Cannot add user' });
          }
      },

      login: async function (req, res) {
        const { email, password } = req.body;
    
        if (!email || !password) {
          return res.status(400).json({ error: 'missing parameters' });
        }
    
        // Validation email avec la regex
        if (!EMAIL_REGEX.test(email)) {
          return res.status(400).json({ error: 'email is not valid' });
        }
    
        // Validation mot de passe avec la même regex que dans le register
        if (!PASSWORD_REGEX.test(password)) {
          return res.status(400).json({
            error: 'password invalid (must be at least 8 characters long, include at least one letter and one number)'
          });
        }
    
        try {
          const userFound = await models.users.findOne({ where: { email } });
    
          if (!userFound) {
            return res.status(404).json({ error: 'user not exist in DB' });
          }
    
          const valid = await bcrypt.compare(password, userFound.password);
    
          if (!valid) {
            return res.status(403).json({ error: 'invalid password' });
          }
    
          return res.status(201).json({
            userId: userFound.id,
            token: jwt.generateTokenForUser(userFound)
          });
    
        } catch (err) {
          return res.status(500).json({ error: 'cannot log on user' });
        }
      },

  getUserProfile: async function (req, res) {
    const headerAuth = req.headers['authorization'];
    const userId = jwt.getUserId(headerAuth);

    if (userId < 0) {
      return res.status(400).json({ error: 'wrong token' });
    }

    try {
      const user = await models.users.findOne({
        attributes: ['id', 'email'],
        where: { id: userId }
      });

      if (!user) {
        return res.status(404).json({ error: 'user not found' });
      }

      return res.status(201).json(user);
    } catch (err) {
      return res.status(500).json({ error: 'cannot fetch user' });
    }
  }
};