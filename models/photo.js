'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Photo extends Model {
    static associate(models) {
      Photo.belongsTo(models.User, { foreignKey: 'userId', targetKey: 'id' });
      Photo.hasMany(models.HashTag, { foreignKey: 'id', sourceKey: 'hashTagId' });
      Photo.hasMany(models.Reply, { foreignKey: 'photoId', sourceKey: 'id' });
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