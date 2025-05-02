const models = require('../models');

module.exports = {
  // Vérification de l'email
verifyEmail: async (req, res) => {
    const { token } = req.query;
  
    try {
      // Recherche de l'utilisateur avec le token de vérification et qui n'est pas encore vérifié
      const user = await models.users.findOne({
        where: {
          verification_token: token,
          is_verified: false
        }
      });
  
      // Si l'utilisateur n'existe pas ou est déjà vérifié
      if (!user) {
        return res.status(400).send('Lien invalide ou compte déjà vérifié.');
      }
  
      // Mise à jour de l'utilisateur pour le marquer comme vérifié
      await user.update({
        is_verified: true,
        verification_token: null // On retire le token après la vérification
      });
  
      // Retourner un message de succès
      res.send('Ton compte a été vérifié avec succès !');
    } catch (error) {
      console.error(error);
      res.status(500).send('Erreur lors de la vérification.');
    }
  }
};