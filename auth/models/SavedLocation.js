"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class SavedLocation extends Model {
    static associate(models) {
      SavedLocation.belongsTo(models.User, {
        as: "user",
        foreignKey: "user_id",
      });
    }
  }
  SavedLocation.init(
    {
      label: DataTypes.STRING,
      address: DataTypes.TEXT,
      latitude: DataTypes.DOUBLE,
      longitude: DataTypes.DOUBLE,
      user_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "SavedLocation",
    }
  );
  return SavedLocation;
};
