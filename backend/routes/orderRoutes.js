const express = require("express");

const {
  createOrder,
  getMyOrders,
  getAllOrders,
  updateOrderStatus,
} = require("../controllers/orderController");

const {
  protect,
  admin,
} = require("../middleware/authMiddleware");

const {
  paymentUpload,
} = require("../middleware/uploadMiddleware");

const router = express.Router();

router.post(
  "/",
  protect,
  paymentUpload.single("paymentScreenshot"),
  createOrder
);

router.get(
  "/my-orders",
  protect,
  getMyOrders
);

router.get(
  "/admin/all",
  protect,
  admin,
  getAllOrders
);

router.put(
  "/admin/:id",
  protect,
  admin,
  updateOrderStatus
);

module.exports = router;