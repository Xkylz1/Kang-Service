// Technician model
'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Technician extends Model {
    static associate(models) {
      // Define association with User
      Technician.belongsTo(models.User, {
        foreignKey: 'userId', // Add userId to Technician model
        as: 'user'
      });
    }
  }
  Technician.init({
    username: DataTypes.STRING,
    name: DataTypes.STRING,
    password: DataTypes.STRING,
    expertise: DataTypes.STRING,
    serviceQueue: DataTypes.INTEGER,
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Users', // Assuming your user table is named 'Users'
        key: 'id'
      }
    }
  }, {
    sequelize,
    modelName: 'Technician',
  });
  return Technician;
};
