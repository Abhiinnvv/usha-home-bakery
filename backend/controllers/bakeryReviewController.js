const BakeryReview = require("../models/BakeryReview");

// Create Review
const createReview = async (req, res) => {
  try {
    const review = await BakeryReview.create(req.body);

    res.status(201).json({
      success: true,
      message: "Review submitted successfully. Waiting for admin approval.",
      data: review,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get Approved Reviews
const getReviews = async (req, res) => {
  try {
    const reviews = await BakeryReview.find({
      approved: true,
    }).sort({ createdAt: -1 });

    res.json(reviews);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get All Reviews (Admin)
const getAllReviews = async (req, res) => {
  try {
    const reviews = await BakeryReview.find().sort({
      createdAt: -1,
    });

    res.json(reviews);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Approve Review
const approveReview = async (req, res) => {
  try {
    const review = await BakeryReview.findByIdAndUpdate(
      req.params.id,
      {
        approved: true,
      },
      {
        new: true,
      }
    );

    res.json({
      success: true,
      message: "Review approved.",
      data: review,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete Review
const deleteReview = async (req, res) => {
  try {
    await BakeryReview.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: "Review deleted successfully.",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createReview,
  getReviews,
  getAllReviews,
  approveReview,
  deleteReview,
};