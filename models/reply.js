"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Reply extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Reply.belongsTo(models.Photo, {
        foreignKey: "photoId",
        targetKey: "id",
      });
    }
  }
  Reply.init(
    {
      photoId: DataTypes.INTEGER,
      writerId: DataTypes.INTEGER,
      comment: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Reply",
    }
  );
  return Reply;
};
