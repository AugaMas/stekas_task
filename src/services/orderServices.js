const Order = require('../models/Order');

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
};

async function createOrder(order) {}

async function updateOrder(newOrder) {}

async function deleteOrder(id) {}

module.exports = { orderJsonSchema, createOrder, updateOrder, deleteOrder };
