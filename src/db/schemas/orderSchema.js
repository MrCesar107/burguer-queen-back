const mongoose = require('mongoose');
const { Schema } = mongoose;

const orderSchema = new Schema({
  items: [{
    type: Schema.Types.ObjectId,
    ref: "items",
  }],

  total: {
    type: Number,
    required: true,
  },
});

module.exports = orderSchema;
