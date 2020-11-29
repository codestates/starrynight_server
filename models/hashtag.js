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
    subject: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'HashTag',
  });
  return HashTag;
};