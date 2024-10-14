'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ServiceRequest extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  ServiceRequest.init({
    description: DataTypes.STRING,
    status: DataTypes.STRING,
    userId: DataTypes.INTEGER,
    deviceModel: DataTypes.STRING,
    problemComplexity: DataTypes.STRING,
    assignedTechnicianId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'ServiceRequest',
  });
  return ServiceRequest;
};