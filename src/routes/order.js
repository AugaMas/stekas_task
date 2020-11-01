const express = require('express');
const apiUtil = require('../utils/api-util');
const orderService = require('../services/orderServices');

const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const query = req.query;
    await orderService.getOrders(query, req.user);
    res.send('lala');
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

router.put('/:id', async (req, res, next) => {});

module.exports = router;
