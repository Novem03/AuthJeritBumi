"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("PickupRequests", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      imageUrl: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      classificationType: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      address: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      latitude: {
        type: Sequelize.DOUBLE,
        allowNull: false,
      },
      longitude: {
        type: Sequelize.DOUBLE,
        allowNull: false,
      },
      weight: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      schedule: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      status: {
        type: Sequelize.STRING,
        defaultValue: "pending",
        allowNull: false,
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Users",  // pastikan nama tabel Users sesuai
          key: "id",
        },
        onDelete: "CASCADE", // jika user dihapus, request ini juga akan dihapus
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("PickupRequests");
  },
};