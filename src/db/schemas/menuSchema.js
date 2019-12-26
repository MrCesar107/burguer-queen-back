const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const MenuSchema = new Schema({
  name: {
    type: String,
    trim: true,
    required: true,
  },
});

mongoose.Types.ObjectId.prototype.valueOf = () => {
  return this.toString();
}

module.exports = MenuSchema;
