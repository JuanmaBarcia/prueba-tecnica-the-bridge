const Product = require("../models/Product.model");

const routes = {
  getProducts: async (req, res) => {
    try {
      let products = await Product.getAllProducts();
      return res.status(200).json(products);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },
  getProduct: async (req, res) => {
    const id = req.params.id;
    try {
      let product = await Product.getProduct(id);
      return res.status(200).json(product);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },
  getManufacturers: async (req, res) => {
    try {
      let products = await Product.getAllManufacturers();
      return res.status(200).json(products);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },
  getManufacturerProducts: async (req, res) => {
    const id = req.params.id;

    try {
      let products = await Product.getManufacturerProducts(id);
      return res.status(200).json(products);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },
};
module.exports = routes;
