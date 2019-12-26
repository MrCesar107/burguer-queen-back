const express = require('express');
const router = express.Router();

// Items controller
const itemsController = require('../../../controllers/itemsController');

// @route GET api/v1/items/
// @desc Get all items
// @access Private
router.get('/', (req, res) => {
  itemsController.index(req, res);
});

// @route POST api/v1/items/create/
// @desc Create an item
// @access Private
router.post('/create', (req, res) => {
  itemsController.create(req, res);
});

// @route PUT api/v1/items/update/:itemId/
// @desc Update an unique item
// @access Private
router.put('/update/:itemId', (req, res) => {
  itemsController.update(req, res);
});

// @rooute DELETE api/v1/items/delete/:itemId/
// @desc Delete an unique item
// @access Private
router.delete('/delete/:itemId', (req, res) => {
  itemsController.delete(req, res);
});

module.exports = router;
