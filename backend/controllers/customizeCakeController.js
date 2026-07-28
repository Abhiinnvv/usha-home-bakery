const CustomizeCake = require("../models/CustomizeCake");

// Create a new custom cake request
const createCustomizeCake = async (req, res) => {
  try {
    const cake = await CustomizeCake.create(req.body);

    res.status(201).json({
      success: true,
      message: "Custom cake request submitted successfully.",
      data: cake,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get all custom cake requests
const getCustomizeCakes = async (req, res) => {
  try {
    const cakes = await CustomizeCake.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: cakes,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get single custom cake request
const getCustomizeCake = async (req, res) => {
  try {
    const cake = await CustomizeCake.findById(req.params.id);

    if (!cake) {
      return res.status(404).json({
        success: false,
        message: "Request not found",
      });
    }

    res.status(200).json({
      success: true,
      data: cake,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Update request
const updateCustomizeCake = async (req, res) => {
  try {
    const cake = await CustomizeCake.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!cake) {
      return res.status(404).json({
        success: false,
        message: "Request not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Request updated successfully.",
      data: cake,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete request
const deleteCustomizeCake = async (req, res) => {
  try {
    const cake = await CustomizeCake.findByIdAndDelete(req.params.id);

    if (!cake) {
      return res.status(404).json({
        success: false,
        message: "Request not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Request deleted successfully.",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createCustomizeCake,
  getCustomizeCakes,
  getCustomizeCake,
  updateCustomizeCake,
  deleteCustomizeCake,
};