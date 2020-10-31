const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = new mongoose.Schema({
  email: { type: String, unique: true },
  name: String,
  lastName: String,
  passwordHash: String,
});

userSchema.plugin(uniqueValidator);
const User = new mongoose.model('User', userSchema);

module.exports = User;
