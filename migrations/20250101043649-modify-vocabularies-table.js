'use strict';

const {DataTypes} = require("sequelize");
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.changeColumn('vocabularies', 'PARTS_OF_SPEECH_ID', {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: 'partsOfSpeech',
        key: 'ID',
      },
      onDelete: 'SET NULL',
    });
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
