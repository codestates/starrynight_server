'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.belongsTo(models.LoginPlatform, {
        foreignKey: 'loginPlatformId',
        targetKey: 'id'
      });

      User.belongsToMany(models.Favorite, {
        through: 'Photo',
        foreignKey: 'userId'
      })
    };
  };

  User.init({
    email: DataTypes.STRING,
    profilePath: DataTypes.STRING,
    nickname: DataTypes.STRING,
    password: DataTypes.STRING,
    mobile: DataTypes.STRING,
    loginPlatformId: DataTypes.INTEGER,
    refreshToken: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};