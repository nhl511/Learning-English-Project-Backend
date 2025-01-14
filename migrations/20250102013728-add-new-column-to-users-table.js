'use strict';

const {DataTypes} = require("sequelize");
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('users', 'EMAIL_VERIFIED_AT', {
        type: DataTypes.DATE,

    });
    await queryInterface.sequelize.query(`
      ALTER TABLE users
      MODIFY COLUMN EMAIL_VERIFIED_AT TIMESTAMP
      AFTER ACTIVE;
   `);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('users', 'EMAIL_VERIFIED_AT');
  }
};
