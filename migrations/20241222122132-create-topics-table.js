'use strict';

const {DataTypes} = require("sequelize");
/** @type {import('sequelize-cli').Migration} */
module.exports = {
 up: async (queryInterface, Sequelize) => {
   await queryInterface.createTable('topics', {
     ID: {
       type: DataTypes.UUID,
       primaryKey: true,
       defaultValue: DataTypes.UUIDV4
     },
     TITLE: {
       type: DataTypes.STRING(100),
       allowNull: false,
       validate: { len: [1, 100] }
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
    await queryInterface.dropTable('topics');
  }
};
