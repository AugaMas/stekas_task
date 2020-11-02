const express = require('express');
const apiUtil = require('../utils/api-util');
const orderService = require('../services/orderServices');

const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const query = req.query;
    const orders = await orderService.getOrders(query, req.user);
    const ordersCount = await orderService.getOrdersCount(req.user);
    res.setHeader('X-Total-Count', ordersCount);
    res.json(orders);
  } catch (e) {
    next(e);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const id = req.params.id;
    apiUtil.validateId(id);
    const order = await orderService.getOrderById(id);
    res.json(order);
  } catch (e) {
    next(e);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const order = req.body;
    apiUtil.validateJSON(order, orderService.orderJsonSchema);
    const createdOrder = await orderService.createOrder(order, req.user);
    res.json(createdOrder);
  } catch (e) {
    next(e);
  }
});

router.put('/:id', async (req, res, next) => {
  try {
    const order = req.body;
    const id = req.params.id;
    apiUtil.validateId(id);
    apiUtil.validateJSON(order, orderService.orderJsonSchema);
    const updatedOrder = await orderService.updateOrder(order, id);
    res.sendStatus(204);
  } catch (e) {
    next(e);
  }
});

module.exports = router;
