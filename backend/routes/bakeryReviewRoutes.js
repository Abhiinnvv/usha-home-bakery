const express = require("express");

const {
  createReview,
  getReviews,
  getAllReviews,
  approveReview,
  deleteReview,
} = require("../controllers/bakeryReviewController");

const router = express.Router();

// Public Routes
router.post("/", createReview);
router.get("/", getReviews);

// Admin Routes
router.get("/admin", getAllReviews);
router.put("/approve/:id", approveReview);
router.delete("/:id", deleteReview);

module.exports = router;
router.get("/", (req, res, next) => {
  console.log("GET /api/reviews called");
  next();
}, getReviews);