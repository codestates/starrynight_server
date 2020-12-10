"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Reply extends Model {
    static associate(models) {
      Reply.belongsTo(models.Photo, {
        foreignKey: "photoId",
        targetKey: "id",
      });
    }
  }
  Reply.init(
    {
      photoId: DataTypes.INTEGER,
      commentId: DataTypes.INTEGER,
      comment: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Reply",
    }
  );
  return Reply;
};
