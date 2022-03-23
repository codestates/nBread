'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class recruitment_content extends Model {

    static associate(models) {

    }
  }
  recruitment_content.init({
    user_id: DataTypes.INTEGER,
    address: DataTypes.STRING,
    category_food: DataTypes.INTEGER,
    delivery_fee: DataTypes.INTEGER,
    recruitment_personnel: DataTypes.INTEGER,
    restaurant_name: DataTypes.STRING,
    body: DataTypes.STRING,
    closed: DataTypes.INTEGER
  }, {
    sequelize,
    freezeTableName: true,
    timestamps: false,
    modelName: 'recruitment_content',
    underscored: true
  });
  return recruitment_content;
};