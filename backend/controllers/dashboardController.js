const Product = require("../models/Product");
const Order = require("../models/Order");

const getDashboard = async (req, res) => {
  try {
    const totalProducts = await Product.countDocuments();

    const totalOrders = await Order.countDocuments();

    const pendingOrders = await Order.countDocuments({
      orderStatus: "Pending",
    });

    const deliveredOrders = await Order.find({
      orderStatus: "Delivered",
    });

    const totalRevenue = deliveredOrders.reduce(
      (sum, order) => sum + order.totalPrice,
      0
    );

    const lowStock = await Product.find({
      stock: { $lt: 5 },
    });

    const recentOrders = await Order.find()
      .populate("user")
      .sort({ createdAt: -1 })
      .limit(5);

    res.json({
      totalProducts,
      totalOrders,
      pendingOrders,
      totalRevenue,
      lowStock,
      recentOrders,
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