const mongoose = require('mongoose');
const { Schema } = mongoose;

const WaiterSchema = new Schema({
  name: {
    type: String,
    required: true,
  },

  lastName: {
    type: String,
    required: true,
  },

  employeeNumber: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
  },

  password: {
    type: String,
    required: true,
  },

  orders: [{
    type: Schema.Types.ObjectId,
    ref: "orders",
  }],
});

mongoose.Types.ObjectId.prototype.valueOf = () => {
  return this.toString();
}

module.exports = WaiterSchema;
