"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Photo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Photo.hasMany(models.Reply, {
        foreignKey: "id",
        sourceKey: "id",
      });

      Photo.hasMany(models.HashTag, {
        foreignKey: "photoId",
        sourceKey: "id",
      });

      Photo.belongsTo(models.User, { foreignKey: "userId" });

      Photo.belongsTo(models.Favorite, { foreignKey: "id" });
    }
  }
  Photo.init(
    {
      userId: DataTypes.INTEGER,
      photoTitle: DataTypes.STRING,
      hashtagId: DataTypes.INTEGER,
      photoPath: DataTypes.STRING,
      location: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Photo",
    }
  );
  return Photo;
};
