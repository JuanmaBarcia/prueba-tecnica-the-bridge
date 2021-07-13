const { Model, DataTypes } = require("sequelize");
const sequelize = require("../db");
const Manufacturer = require("./Manufacturer.model");

class Product extends Model {}
Product.init(
  {
    product: DataTypes.STRING(50),
    image: DataTypes.STRING(255),
    rating: DataTypes.INTEGER,
    price: DataTypes.FLOAT,
    manufacturerId: DataTypes.INTEGER,
  },
  {
    sequelize,
    modelName: "product",
  }
);

Product.Manufacturer = Product.belongsTo(Manufacturer);

module.exports = Product;
