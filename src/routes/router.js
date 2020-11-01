const express = require('express');
const userRoute = require('./user');
const sessionRoute = require('./session');

const router = express.Router();

router.use('/user', userRoute);
router.use('/session', sessionRoute);

module.exports = router;
