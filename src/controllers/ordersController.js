const jwt = require('jsonwebtoken');
const Order = require('../db/models/order');
const Waiter = require('../db/models/waiter');
const Item = require('../db/models/item');

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

const addItemsToOrder = (itemsData, orderData) => {
  return new Promise((resolve, reject) => {
    itemsData.forEach(item => {
      Order.findByIdAndUpdate(
        orderData.id,
        { $push: { items: item.id } },
        { new: true }
      ).exec()
       .then()
       .catch((err) => reject(err));
    });
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

  getOrder: async(req, res) => {
    const order = await Order.findById(req.params.orderId);
    const items = await Item.find({
      '_id': {
        $in: order.items,
      }
    }).catch((err) => { res.status(500).json({ "error": err }) });

    order.items = items;

    if(order) {
      res.json({order: order})
    } else {
      json.status(400).json({ error: 'Order not found' });
    }
  },

  create: async (req, res) => {
    const { total, items } = req.body;
    const { authorization } = req.headers;
    const token = authorization.substr(7);
    const newOrder = new Order({ total });
    await newOrder.save();
    addItemsToOrder(items, newOrder)
    addOrderToWaiters(newOrder, jwt.decode(token));
    res.json(newOrder);
  },

  update: async (req, res) => {
    const { total, items } = req.body
    await Order.findByIdAndUpdate(req.params.orderId,
      { $set: { items: [] } },
      { multi: true }
    ).catch(err => res.status(500).json({ error: err }));
    await Order.findByIdAndUpdate(req.params.orderId,
      { total: total,
        $push: { items: { $each: items } }
      }
    ).catch(err => res.status(500).json({ error: err }));
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
