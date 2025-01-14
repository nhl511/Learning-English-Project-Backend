'use strict';

const {DataTypes} = require("sequelize");
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('curriculums', {
      ID: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
      },
      NAME: {
        type: DataTypes.STRING(64),
        allowNull: false,
        validate: {len: [1, 64]}
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
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('curriculums');
  }
};
