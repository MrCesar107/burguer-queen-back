const mongoose = require('mongoose');
const itemSchema = require('../schemas/itemSchema');

const itemModel = mongoose.model('items', itemSchema);

module.exports = itemModel;
