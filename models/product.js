'use strict';
const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    static associate(models) {
      // define associations here
    }
  }
  Product.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { notEmpty: true }
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { notEmpty: true }
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: { notEmpty: true }
    },
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};
