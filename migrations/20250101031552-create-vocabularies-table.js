'use strict';

const {DataTypes} = require("sequelize");
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('vocabularies', {
      ID: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
      },
      WORD: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      DEFINITION: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      TRANSCRIPTION: {
        type: DataTypes.STRING(100),
      },
      PARTS_OF_SPEECH_ID: {
        type: DataTypes.UUID,
        references: {
          model: 'partsOfSpeech',
          key: 'ID',
        },
        onDelete: 'CASCADE',
      },
      UNIT_ID: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: 'units',
          key: 'ID',
        },
        onDelete: 'CASCADE',
      },
      NOTES: {
        type: DataTypes.STRING(),
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
    await queryInterface.dropTable('vocabularies');
  }
};
