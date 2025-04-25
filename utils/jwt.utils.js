const jwt = require('jsonwebtoken'); // On importe le module jsonwebtoken

module.exports = {
  // 🛠️ Génération d’un token JWT pour un utilisateur
  generateTokenForUser: function (userData) {
    return jwt.sign(
      {
        userId: userData.id,  // L'ID de l'utilisateur
        email: userData.email // L'email de l'utilisateur
      },
      process.env.JWT_SECRET, // Assure-toi que la variable d'environnement JWT_SECRET est définie
      {
        expiresIn: '24h' // Le token expire au bout de 24 heures
      }
    );
  },

  // 👤 Récupération de l'ID de l'utilisateur à partir du token JWT
  getUserId: function (authorization) {
    try {
      // On récupère le token qui se trouve après le mot "Bearer" dans l'en-tête Authorization
      const token = authorization?.split(' ')[1];
      
      // On décode et vérifie le token à l'aide de la clé secrète JWT
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      
      // On renvoie l'ID de l'utilisateur contenu dans le token décodé
      return decoded.userId;
    } catch (err) {
      // Si une erreur survient (token invalide ou expiré), on renvoie -1
      return -1;
    }
  }
};