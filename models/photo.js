'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Photo extends Model {
    static associate(models) {
      Photo.hasMany(models.Reply, {
        foreignKey: 'id',
        sourceKey: 'id'
      });

      Photo.hasMany(models.HashTag, {
        foreignKey: 'hashTagId',
        sourceKey: 'id'
      });

      Photo.belongsTo(models.User, { foreignKey: 'userId' });
      Photo.belongsTo(models.Favorite, { foreignKey: 'id' });
    };
  };
  Photo.init({
    userId: DataTypes.INTEGER,
    photoTitle: DataTypes.STRING,
    latitude: DataTypes.FLOAT,
    hardness: DataTypes.FLOAT,
    hashTagId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Photo',
  });
  return Photo;
};