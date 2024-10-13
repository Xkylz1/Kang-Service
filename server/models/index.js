'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const process = require('process');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(path.join(__dirname, '/../config/config.js'))[env];
const db = {};

let sequelize;

try {
  // Check if `use_env_variable` is defined for database URL connection
  if (config.use_env_variable) {
    sequelize = new Sequelize(process.env[config.use_env_variable], config);
  } else {
    sequelize = new Sequelize(config.database, config.username, config.password, config);
  }
} catch (error) {
  console.error('Unable to connect to the database:', error);
  process.exit(1); // Exit the process with failure code
}

// Load all model files in the current directory, except for this file (index.js) and test files
fs.readdirSync(__dirname)
  .filter(file => (
    file.indexOf('.') !== 0 && // Ignore hidden files
    file !== basename && // Ignore this file (index.js)
    file.slice(-3) === '.js' && // Only include .js files
    file.indexOf('.test.js') === -1 // Exclude test files
  ))
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

// Associate models if applicable
Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

// Attach the Sequelize instance and Sequelize class to the `db` object
db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
