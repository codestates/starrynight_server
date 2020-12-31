'use strict';
const { Model } = require('sequelize');
const crypto = require('crypto');

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

  User.addHook('beforeCreate', data => {
    let shasum = crypto.createHmac('sha512', process.env.SECRET_KEY);
    shasum.update(data.password);
    data.password = shasum.digest('hex');
  });

  User.addHook('beforeFind', data => {
    let shasum = crypto.createHmac('sha512', process.env.SECRET_KEY);

    if (data.where.password) {
      shasum.update(data.where.password);
      data.where.password = shasum.digest('hex');
    }
  })
  return User;
};