'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Photo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
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