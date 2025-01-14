'use strict';

const {DataTypes} = require("sequelize");
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('users', {
      ID: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
      },
      EMAIL: {
        type: DataTypes.STRING(320),
        unique: true,
        allowNull: false,
      },
      PASSWORD: {
        type: DataTypes.STRING(),
        allowNull: false,
      },
      FIRST_NAME: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },
      LAST_NAME: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },
      ADMIN: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      },
      ACTIVE: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
      },
      CREATED_AT: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
      UPDATED_AT: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      }
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('users');
  }
};
