const express =
  require("express");

const {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  addReview,
} = require("../controllers/productController");

const {
  protect,
  admin
} = require(
  "../middleware/authMiddleware"
);

const router =
  express.Router();

router.get("/", getProducts);
const {
  productUpload,
} = require("../middleware/uploadMiddleware");

router.get(
  "/:id",
  getProductById
);

router.post(
  "/",
  protect,
  admin,
  productUpload.single("image"),
  createProduct
);

router.put(
  "/:id",
  protect,
  admin,
  productUpload.single("image"),
  updateProduct
);

router.delete(
  "/:id",
  protect,
  admin,
  deleteProduct
);
router.post(
  "/:id/reviews",
  protect,
  addReview
);
module.exports = router;