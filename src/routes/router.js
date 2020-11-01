const express = require('express');
const userRoute = require('./user');
const sessionRoute = require('./session');
const orderRoute = require('./order');
const sessionService = require('../services/sessionServices');

const router = express.Router();

router.use('/user', userRoute);
router.use('/session', sessionRoute);
router.use('/order', sessionService.authMiddleware, orderRoute);

module.exports = router;
