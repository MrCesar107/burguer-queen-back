const jwt = require('jsonwebtoken');
const Order = require('../db/models/order');
const Waiter = require('../db/models/waiter');

const addOrderToWaiters = (orderData, waiterData) => {
  return new Promise((resolve, reject) => {
    Waiter.findByIdAndUpdate(
      waiterData.id,
      { $push: { orders: orderData._id } },
      { new: true }
    ).exec()
     .then()
     .catch(err => reject(err));
  });
}

const removeOrderToWaiters = (orderData, waiterData) => {
  return new Promise((resolve, reject) => {
    Waiter.findByIdAndUpdate(
      waiterData.id,
      { $pull: { orders: orderData._id } },
      { new: true }
    ).exec()
     .then()
     .catch(err => reject(err));
  });
}

module.exports = {
  index: async (req, res) => {
    const orders = await Order.find();
    res.json({ orders: orders });
  },

  create: async (req, res) => {
    const { total } = req.body;
    const { authorization } = req.headers;
    const token = authorization.substr(7);
    const newOrder = new Order({ total });
    await newOrder.save();
    addOrderToWaiters(newOrder, jwt.decode(token));
    res.json(newOrder);
  },

  update: async (req, res) => {
    const { total } = req.body
    const newOrder = { total };
    await Order.findByIdAndUpdate(req.params.orderId, newOrder);
    res.json({ message: 'Order has been updated' });
  },

  delete: async (req, res) => {
    const order = await Order.findByIdAndDelete(req.params.orderId);
    const { authorization } = req.headers;
    const token = authorization.substr(7);
    removeOrderToWaiters(order, jwt.decode(token));
    res.json({ message: 'Order has beed deleted' });
  },
};
