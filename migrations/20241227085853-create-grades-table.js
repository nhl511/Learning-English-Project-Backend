'use strict';

const {DataTypes} = require("sequelize");
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('grades', {
      ID: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
      },
      NAME: {
        type: DataTypes.STRING(100),
        allowNull: false,
        validate: {len: [1, 10]}
      },
      CURRICULUM_ID:{
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: 'curriculums',
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
    await queryInterface.dropTable('grades');
  }
};
