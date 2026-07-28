const express = require("express");

const {
  createCustomizeCake,
  getCustomizeCakes,
  getCustomizeCake,
  updateCustomizeCake,
  deleteCustomizeCake,
} = require("../controllers/customizeCakeController");

const router = express.Router();

// Create Custom Cake Request
router.post("/", createCustomizeCake);

// Get All Custom Cake Requests
router.get("/", getCustomizeCakes);

// Get Single Request
router.get("/:id", getCustomizeCake);

// Update Request
router.put("/:id", updateCustomizeCake);

// Delete Request
router.delete("/:id", deleteCustomizeCake);

module.exports = router;