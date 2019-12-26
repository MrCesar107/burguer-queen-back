const mongoose = require('mongoose');
const itemSchema = require('../schemas/waiterSchema');

const itemModel = mongoose.model('items', itemSchema);

module.exports = itemModel;
