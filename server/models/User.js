// User model
'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      // Define association with Technician
      User.hasOne(models.Technician, {
        foreignKey: 'userId', // Assuming you will create userId in Technician
        as: 'technician'
      });
    }
  }
  User.init({
    username: DataTypes.STRING,
    name: DataTypes.STRING,
    password: DataTypes.STRING,
    role: DataTypes.STRING // You can use this to check if it's 'technician'
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};
