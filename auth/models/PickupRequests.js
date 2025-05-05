"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class PickupRequest extends Model {
    static associate(models) {
      PickupRequest.belongsTo(models.User, {
        as: "user",
        foreignKey: "user_id",
      });
    }
  }

  PickupRequest.init(
    {
      imageUrl: DataTypes.STRING,
      classificationType: DataTypes.STRING,
      address: DataTypes.TEXT,
      latitude: DataTypes.DOUBLE,
      longitude: DataTypes.DOUBLE,
      weight: DataTypes.INTEGER,
      schedule: DataTypes.STRING,
      status: {
        type: DataTypes.STRING,
        defaultValue: "pending", 
      },
      user_id: DataTypes.INTEGER, 
    },
    {
      sequelize,
      modelName: "PickupRequest", 
    }
  );

  return PickupRequest;
};