'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class users extends Model {
    static associate(models) {
      // define association here
    }
  }

  users.init({
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    verification_token: {
      type: DataTypes.STRING,
      allowNull: true // peut être null après vérification
    },
    is_verified: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false // compte non vérifié par défaut
    }
  }, {
    sequelize,
    modelName: 'users',
  });

  return users;
};