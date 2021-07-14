const Product = require("../models/Product.model");
const Manufacturer = require("../models/Manufacturer.model");
const { QueryTypes } = require("sequelize");

const routes = {
  // get all products
  getProducts: async (req, res) => {
    try {
      let products = await Product.findAll({
        include: [{ association: Product.Manufacturer }],
      });
      return res.status(200).json(products);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  // get the details of a product by product id
  getProduct: async (req, res) => {
    const id = req.params.id;
    try {
      let product = await Product.findAll({
        include: { model: Manufacturer },
        where: { id },
      });
      return res.status(200).json(product);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  // get the manufacturers
  getManufacturers: async (req, res) => {
    try {
      let products = await Manufacturer.findAll();
      return res.status(200).json(products);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  // get a manufacturer's products according to the manufacturer's ID
  getManufacturerProducts: async (req, res) => {
    const id = req.params.id;
    try {
      let products = await Product.findAll({
        include: [{ model: Manufacturer, as: "manufacturer" }],
        where: { "$manufacturer.id$": id },
      });
      return res.status(200).json(products);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  // get the matching products from a search
  getSearchProducts: async (req, res) => {
    const key = req.params.key;
    try {
      let products = await Product.sequelize.query(
        "SELECT p.id,p.product,p.rating,p.price,m.manufacturer FROM manufacturers as m INNER JOIN products as p ON p.manufacturerId = m.id WHERE m.manufacturer REGEXP $1 OR p.product REGEXP $1",
        {
          bind: [key],
          type: QueryTypes.SELECT,
        }
      );
      return res.status(200).json(products);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },
};
module.exports = routes;
