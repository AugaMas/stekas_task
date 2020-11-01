const express = require('express');
const apiUtil = require('../utils/api-util');
const { route } = require('./router');
const userServices = require('../services/userServices');

const router = express.Router();

router.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    apiUtil.validateId(id);
    const user = await userServices.getUser(id);
    res.json(user);
  } catch (e) {
    next(e);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const user = req.body;
    apiUtil.validateJSON(user, userServices.userRegistrationJsonSchema);
    const createdUser = await userServices.createUser(user);
    res.json(createdUser);
  } catch (e) {
    next(e);
  }
});

module.exports = router;
