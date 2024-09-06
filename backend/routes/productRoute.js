const express = require("express");
const {
  createProduct,
  getAllProduct,
  updateProduct,
} = require("../controllers/productController");

const router = express.Router();

router.route("/product/new").post(createProduct);
router.route("/product/:id").put(updateProduct);
router.route("/products").get(getAllProduct);

module.exports = router;
