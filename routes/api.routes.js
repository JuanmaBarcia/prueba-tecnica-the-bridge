const router = require("express").Router();
const products = require("../controllers/products.controller");

router.get("/products", products.getProducts);
router.get("/product", products.getProduct);

router.all("*", (req, res) =>
  res.status(404).json({ message: "La ruta no existe", app: "API-Routes" })
);

module.exports = router;
