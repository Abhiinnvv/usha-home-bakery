const express = require("express");

const {
  getDashboard,
} = require("../controllers/dashboardController");

const {
  protect,
  admin,
} = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", protect, admin, getDashboard);

module.exports = router;