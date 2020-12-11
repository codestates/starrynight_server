'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class HashTag extends Model {
    static associate(models) {
      HashTag.belongsTo(models.Photo, {
        foreignKey: 'hashTagId',
        targetKey: 'id'
      });
    }
  };
  HashTag.init({
    subject: DataTypes.STRING,
    photoId: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'HashTag',
  });
  return HashTag;
};