const Order = require('../db/models/order');

module.exports = {
  index: async (req, res) => {
    const orders = await Order.find();
    res.json({ orders: orders });
  },

  create: async (req, res) => {
    const { total } = req.body;
    const newOrder = new Order({ total });
    await newOrder.save();
    res.json(newOrder);
  },

  update: async (req, res) => {
    const { total } = req.body
    const newOrder = { total };
    await Order.findByIdAndUpdate(req.params.orderId, newOrder);
    res.json({ message: 'Order has been updated' });
  },

  delete: async (req, res) => {
    await Order.findByIdAndDelete(req.params.orderId);
    res.json({ message: 'Order has beed deleted' });
  },
};
