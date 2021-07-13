const { Model, DataTypes } = require("sequelize");
const sequelize = require("../db");

class Manufacturer extends Model {}
Manufacturer.init(
  {
    manufacturer: DataTypes.STRING(50),
    cif: DataTypes.STRING(9),
    address: DataTypes.STRING(255),
  },
  {
    sequelize,
    modelName: "manufacturer",
  }
);

module.exports = Manufacturer;
