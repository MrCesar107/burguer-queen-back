const mongoose = require('mongoose');
const WaiterSchema = require('../schemas/waiterSchema');

const WaiterModel = mongoose.model("waiters", WaiterSchema);

module.exports = WaiterModel;
