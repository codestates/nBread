'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user_content extends Model {

    static associate(models) {

    }
  }
  user_content.init({

  }, {
    sequelize,
    modelName: 'user_content',
  });
  return user_content;
};