'use strict';

const {DataTypes} = require("sequelize");
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('partsOfSpeech', {
      ID: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
      },
      NAME: {
        type: DataTypes.STRING(20),
        allowNull: false,
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
    await queryInterface.dropTable('partsOfSpeech');

  }
};
