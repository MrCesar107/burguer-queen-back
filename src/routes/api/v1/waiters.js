const express = require('express');
const router = express.Router();

// Waiters controllers
const waitersController = require('../../../controllers/waitersController')

// @route POST api/v1/waiters/register
// @desc Register waiter
// @access Public
router.post("/register", (req, res) => {
  waitersController.create(req, res);
});

// @route POST api/v1/waiters/login
// @desc Login user and return JWT token
// @access Public
router.post("/login", (req, res) => {
  waitersController.authenticate(req, res);
});

module.exports = router;
