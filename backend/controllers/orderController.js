import Order from "../models/Order.js";

// Create Order
export const createOrder = async (req, res) => {
  try {
    const order = new Order(req.body);
    const saved = await order.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json(err);
  }
};

// Get All Orders
export const getOrders = async (req, res) => {
  try {
    const orders = await Order.find();
    res.json(orders);
  } catch (err) {
    res.status(500).json(err);
  }
};

// Delete Order
export const deleteOrder = async (req, res) => {
  try {
    await Order.findByIdAndDelete(req.params.id);
    res.json("Order deleted");
  } catch (err) {
    res.status(500).json(err);
  }
};