const router = require("express").Router();
const products = require("../controllers/products.controller");

router.get("/products", products.getProducts);
router.get("/product/:id", products.getProduct);
router.get("/manufacturers", products.getManufacturers);
router.get("/manufacturer/:id", products.getManufacturerProducts);

router.all("*", (req, res) =>
  res.status(404).json({ message: "La ruta no existe", app: "API-Routes" })
);

module.exports = router;
