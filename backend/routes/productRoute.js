const express = require("express");
const {
  createProduct,
  getAllProduct,
  updateProduct,
  deleteProduct,
  getProductDetails,
} = require("../controllers/productController");

const router = express.Router();

router.route("/product/new").post(createProduct);
router
  .route("/product/:id")
  .put(updateProduct)
  .delete(deleteProduct)
  .get(getProductDetails);
router.route("/products").get(getAllProduct);

module.exports = router;
