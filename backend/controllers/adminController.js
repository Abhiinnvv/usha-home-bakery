const User = require("../models/User");
const Product = require("../models/Product");
const Order = require("../models/Order");

const getDashboard = async (req, res) => {
  try {
    const totalCustomers = await User.countDocuments({
      role: "user",
    });

    const totalProducts = await Product.countDocuments();

    const totalOrders = await Order.countDocuments();

    const revenue = await Order.aggregate([
      {
        $group: {
          _id: null,
          total: { $sum: "$totalPrice" },
        },
      },
    ]);

    res.json({
      totalCustomers,
      totalProducts,
      totalOrders,
      totalRevenue: revenue.length
        ? revenue[0].total
        : 0,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

module.exports = {
  getDashboard,
};