const mongoose = require("mongoose");

const customizeCakeSchema = new mongoose.Schema(
  {
    customerName: {
      type: String,
      required: true,
      trim: true,
    },

    phone: {
      type: String,
      required: true,
      trim: true,
    },

    weight: {
      type: String,
      required: true,
    },

    flavour: {
      type: String,
      required: true,
    },

    cakeMessage: {
      type: String,
      default: "",
      trim: true,
    },

    instructions: {
      type: String,
      default: "",
      trim: true,
    },

    deliveryDate: {
      type: Date,
      required: true,
    },

    deliveryTime: {
      type: String,
      required: true,
    },

    referenceImage: {
      type: String,
      default: "",
    },

    status: {
      type: String,
      enum: ["Pending", "Confirmed", "Preparing", "Delivered"],
      default: "Pending",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("CustomizeCake", customizeCakeSchema);