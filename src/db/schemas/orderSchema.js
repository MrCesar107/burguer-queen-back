const mongoose = require('mongoose');
const { Schema } = mongoose;

const orderSchema = new Schema({
  total: Number,
  required: true,
});

module.exports = orderSchema;
