'use strict';

const {DataTypes} = require("sequelize");
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('units', {
      ID: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
      },
      UNIT_NUMBER: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          isInt: true,
          min: 1,
          max: 99,
        }
      },
      UNIT_NAME: {
        type: DataTypes.STRING(64),
        allowNull: false,
        validate: {len: [1, 64]}
      },
      GRADE_ID:{
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: 'grades',
          key: 'ID',
        },
        onDelete: 'CASCADE',
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
    await queryInterface.dropTable('units');

  }
};
