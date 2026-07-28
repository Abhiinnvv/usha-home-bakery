const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    items: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
        },
        quantity: {
          type: Number,
          required: true,
        },
      },
    ],

    shippingAddress: {
      type: String,
      required: true,
    },

    paymentMethod: {
      type: String,
      enum: ["COD", "QR"],
      default: "COD",
    },

    paymentScreenshot: {
      type: String,
    },

    totalPrice: {
      type: Number,
      required: true,
    },

    orderStatus: {
      type: String,
      enum: [
        "Pending",
        "Confirmed",
        "Preparing",
        "Out For Delivery",
        "Delivered",
        "Cancelled",
      ],
      default: "Pending",
    },

    // Review Status
    reviewGiven: {
      type: Boolean,
      default: false,
    },

    reviewId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "BakeryReview",
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Order", orderSchema);