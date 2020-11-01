const Order = require('../models/Order');
const apiUtil = require('../utils/api-util');

const orderJsonSchema = {
  type: 'object',
  properties: {
    name: { type: 'string', minLength: 2 },
    lastName: { type: 'string', minLength: 2 },
    date: { type: 'string', format: 'date' },
    products: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          name: { type: 'string', minLength: 2 },
          count: { type: 'number', minimum: 1 },
        },
      },
      minItems: 1,
    },
  },
  required: ['name', 'lastName', 'products', 'date'],
};

async function createOrder(order, user) {
  const createdOrder = new Order({ ...order, customer: user._id });
  await createdOrder.save();
  return createdOrder;
}

async function updateOrder(newOrder, id) {
  const order = await Order.findByIdAndUpdate(id, newOrder, { new: true });
  return order;
}

async function deleteOrder(id) {
  await Order.findByIdAndRemove(id);
}

async function getOrders(query, user) {
  const paging = apiUtil.getPaging(query);
  console.log(paging);
  const orders = await Order.find({ customer: user._id })
    .lean()
    .limit(size)
    .skip(page * size);
  return orders;
}

async function getOrderById(id) {
  const order = await Order.findById(id).lean();
  return order;
}

module.exports = {
  orderJsonSchema,
  createOrder,
  updateOrder,
  deleteOrder,
  getOrderById,
  getOrders,
};
