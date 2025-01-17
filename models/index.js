'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const process = require('process');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV;
const config = require(__dirname + '/../config/config')[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (
      file.indexOf('.') !== 0 &&
      file !== basename &&
      file.slice(-3) === '.js' &&
      file.indexOf('.test.js') === -1
    );
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.curriculum.hasMany(db.grade, { foreignKey: 'CURRICULUM_ID', onDelete: 'CASCADE', as: "CURRICULUM" });
db.grade.belongsTo(db.curriculum, { foreignKey: 'CURRICULUM_ID', as: "CURRICULUM" });

db.grade.hasMany(db.unit, { foreignKey: 'GRADE_ID', onDelete: 'CASCADE', as: "GRADE" });
db.unit.belongsTo(db.grade, { foreignKey: 'GRADE_ID', as: "GRADE" });

db.partsOfSpeech.hasMany(db.vocabulary, {foreignKey: "PARTS_OF_SPEECH_ID", onDelete: "SET NULL", as: "PARTS_OF_SPEECH"})
db.vocabulary.belongsTo(db.partsOfSpeech, {foreignKey: "PARTS_OF_SPEECH_ID", as: "PARTS_OF_SPEECH"})

db.unit.hasMany(db.vocabulary, {foreignKey: "UNIT_ID", onDelete: "CASCADE", as: "UNIT"})
db.vocabulary.belongsTo(db.unit, {foreignKey: "UNIT_ID", as: "UNIT"})

module.exports = db;
