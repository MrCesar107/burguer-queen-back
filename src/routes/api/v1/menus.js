const express = require('express');
const router = express.Router();

// Menus contoller
const menusController = require('../../../controllers/menusController');

// @route GET api/v1/menus/
// @desc get all menus
// @access Private
router.get('/', (req, res) => {
  menusController.index(req, res);
});

// @route POST api/v1/menus/create/
// @desc create a menu
// @access Private
router.post('/create', (req, res) => {
  menusController.create(req, res);
});

// @route PUT api/v1/menus/update/:menu_id/
// @desc update an existing menu
// @access Private
router.put('/update/:menuId', (req, res) => {
  menusController.update(req, res);
});

// @route DELETE api/v1/menus/delete/:menu_id/
// @desc delete an existing menu
// @access Private
router.delete('/delete/:menuId', (req, res) => {
  menusController.delete(req, res);
});

module.exports = router;
