const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const itemSchema = new Schema({
  name: {
    type: String,
    trip: true,
    required: true,
  },

  description: {
    type: String,
    trip: false,
    required: false,
  },

  price: {
    type: Number,
    required: true,
  },

  total_units: {
    type: Number,
    required: true,
  },
});

mongoose.Types.ObjectId.prototype.valueOf = () => {
  return this.toString();
}

module.exports = itemSchema;


