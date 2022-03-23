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
    user_id: DataTypes.INTEGER,
    content_id: DataTypes.INTEGER
  }, {
    sequelize,
    freezeTableName: true,
    timestamps: false,
    modelName: 'user_content',
    underscored: true
  });
  return user_content;
};