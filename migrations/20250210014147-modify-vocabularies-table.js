'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.removeColumn('vocabularies', 'PARTS_OF_SPEECH_ID');

  },

  async down (queryInterface, Sequelize) {
    return queryInterface.addColumn('vocabularies', 'PARTS_OF_SPEECH_ID', {
      type: Sequelize.UUID,
      allowNull: true,
      references: {
        model: 'partsOfSpeech',
        key: 'ID',
      },
      onDelete: 'SET NULL',

    });
  }
};
