const mongoose = require('mongoose');
const { Schema } = mongoose;

const orderSchema = new Schema({
  total: {
    type: Number,
    required: true,
  },
});

module.exports = orderSchema;
