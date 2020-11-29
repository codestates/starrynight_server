'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class LoginPlatform extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  LoginPlatform.init({
    item: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'LoginPlatform',
  });
  return LoginPlatform;
};