'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class LoginPlatform extends Model {
    static associate(models) {
      LoginPlatform.hasMany(models.User, { foreignKey: 'loginPlatformId', sourceKey: 'id' });
    };
  };
  LoginPlatform.init({
    item: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'LoginPlatform',
  });
  return LoginPlatform;
};