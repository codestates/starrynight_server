'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Favorite extends Model {
    static associate(models) {
      Favorite.belongsToMany(models.User, {
        through: 'Photo',
        foreignKey: 'id'
      });
    };
  };
  Favorite.init({
    photoId: DataTypes.INTEGER,
    pickerId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Favorite',
  });
  return Favorite;
};