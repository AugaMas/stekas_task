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
  const order = await Order.findOneAndUpdate({ _id: id }, newOrder, {
    new: true,
  });
  return order;
}

async function deleteOrder(id) {
  await Order.findByIdAndRemove(id);
}

async function getOrders(query, user) {
  const { size, page } = apiUtil.getPaging(query);
  const filter = query.filter;
  const name = query.name;

  let orderQuery = { customer: user._id };
  if (name) {
    orderQuery.name = { $regex: name, $options: 'i' };
  }

  const orders = await Order.find(orderQuery)
    .lean()
    .limit(size)
    .skip(page * size)
    .sort(filter);
  return orders;
}

async function getOrderById(id) {
  const order = await Order.findById(id).lean();
  return orderDTO(order);
}

async function getOrdersCount(user, query) {
  let orderQuery = { customer: user._id };
  const name = query.name;
  if (name) {
    orderQuery.name = { $regex: name, $options: 'i' };
  }
  const count = await Order.countDocuments(orderQuery);
  return count;
}

function orderDTO(order) {
  return {
    date: order.date,
    lastName: order.lastName,
    name: order.name,
    products: order.products,
  };
}

module.exports = {
  orderJsonSchema,
  createOrder,
  updateOrder,
  deleteOrder,
  getOrderById,
  getOrders,
  getOrdersCount,
};
