const mongoose = require('mongoose');
const menuSchema = require('../schemas/menuSchema');

const menuModel = mongoose.model('menus', menuSchema);

module.exports = menuModel;
