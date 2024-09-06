const express = require("express");
const {
  createProduct,
  getAllProduct,
} = require("../controllers/productController");

const router = express.Router();

router.route("/product/new").post(createProduct);

router.route("/products").get(getAllProduct);

module.exports = router;
