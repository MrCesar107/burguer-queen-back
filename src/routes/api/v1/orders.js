const express = require('express');
const router = express.Router();

// Orders controller
const ordersController = require('../../../controllers/ordersController');

// @route GET /api/v1/orders/
// @desc Get all orders
// @access Private
router.get('/', (req, res) => {
  ordersController.index(req, res);
});

// @route GET /api/v1/orders/:orderId/
// @desc Get an order
// @access Private
router.get('/:orderId', (req, res) => {
  ordersController.getOrder(req, res);
});

// @route POST /api/v1/orders/create/:orderId/
// @desc Create an order
// @access Private
router.post('/create', (req, res) => {
  ordersController.create(req, res);
});

// @route PUT /api/v1/orders/update/:orderId/
// @desc Update an unique order
// @access Private
router.put('/update/:orderId', (req, res) => {
  ordersController.update(req, res);
});

// @route DELETE /api/v1/orders/delete/:orderId/
// @desc Delete an unique order
// @access Private
router.delete('/delete/:orderId', (req, res) => {
  ordersController.delete(req, res);
});

module.exports = router;
