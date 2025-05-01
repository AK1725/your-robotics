import Order from '../models/Order.js';
export const createOrder = async (req, res) => {
  const order = await Order.create({ ...req.body, user: req.user.id });
  res.status(201).json(order);
};
export const listOrders = async (req, res) => {
  const orders = await Order.find({ user: req.user.id }).populate('products.product');
  res.json(orders);
};
