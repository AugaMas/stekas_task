const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  products: [{ name: String, count: Number }],
  name: String,
  lastName: String,
  date: Date,
  customer: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
});

const Order = new mongoose.model('Order', orderSchema);

module.exports = Order;
