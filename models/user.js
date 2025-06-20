'use strict';
const { Model} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init({
    fname: DataTypes.STRING,
    lname: DataTypes.STRING,
    age: DataTypes.INTEGER,
    gender: DataTypes.STRING,
    status: {
      type: DataTypes.INTEGER,
      defaultValue: 1, // Active by default
      validate: {
        isIn: [[0, 1, 2]]
      }
    }
  },
  {
    sequelize,
    modelName: 'User',
  });
  return User;
};