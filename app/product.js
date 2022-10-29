'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Product.init({
    users_id: DataTypes.INTEGER,
    nama: DataTypes.STRING,
    price: DataTypes.STRING,
    stock: DataTypes.INTEGER,
    status: DataTypes.BOOLEAN,
    image_url: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};