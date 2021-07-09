const Product = require("../models/Product.model");

const routes = {
  getProducts: async (req, res) => {
    console.log(req);
    res.status(200).json({ prueba: "getProducts" });
  },
  addProduct: async (req, res) => {
    console.log(req);
    res.status(200).json({ prueba: "addProduct" });
  },
};
module.exports = routes;
