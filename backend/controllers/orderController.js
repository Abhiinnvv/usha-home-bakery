const Order = require("../models/Order");


const createOrder =
  async (req, res) => {
    const {
      shippingAddress,
      paymentMethod,
      totalPrice
    } = req.body;
    const items = JSON.parse(req.body.items);
    

    const order =
      await Order.create({
        user:
          req.user._id,
        items,
        shippingAddress,
        paymentMethod,
        totalPrice,
        paymentScreenshot:
          req.file
            ? req.file.path
            : ""
      });

    res.status(201).json(
      order
    );
  };

const getMyOrders =
  async (req, res) => {
    const orders =
      await Order.find({
        user:
          req.user._id
      }).populate(
        "items.product"
      );

    res.json(orders);
  };

const getAllOrders =
  async (req, res) => {
    const orders =
      await Order.find()
        .populate("user")
        .populate(
          "items.product"
        );

    res.json(orders);
  };

const updateOrderStatus =
  async (req, res) => {
    const order =
      await Order.findById(
        req.params.id
      );

    if (!order) {
      return res.status(404).json({
        message:
          "Order not found"
      });
    }

    order.orderStatus =
      req.body.orderStatus;

    await order.save();

    res.json(order);
  };

module.exports = {
  createOrder,
  getMyOrders,
  getAllOrders,
  updateOrderStatus
};