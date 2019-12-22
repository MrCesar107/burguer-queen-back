const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const Schema = mongoose.Schema;
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
});

mongoose.Types.ObjectId.prototype.valueOf = () => {
  return this.toString();
}

WaiterSchema.pre("save", next => {
  let waiter = this;
  if(!waiter.isModified("password")) { return next(); }
  bcrypt.genSalt(10, (error, salt) => {
    bcrypt.hash(waiter.password, salt, (error, hash) => {
      if(error) return next(error)
      waiter.password = hash;
      next();
    })
  });
});

module.exports = WaiterSchema;
