const express = require('express');
const apiUtil = require('../utils/api-util');
const sessionService = require('../services/sessionServices');
const userServices = require('../services/userServices');

const router = express.Router();

router.get('/', sessionService.authMiddleware, async (req, res, next) => {
  res.json(req.user);
});

router.post('/', async (req, res, next) => {
  try {
    const userCredentials = req.body;
    apiUtil.validateJSON(
      userCredentials,
      userServices.userCredentialsJsonSchema
    );

    const user = await userServices.checkUserCredentials(userCredentials);

    if (user) {
      const token = sessionService.createToken(user);
      res.json({ user, token });
    }
  } catch (e) {
    next(e);
  }
});

router.get('/logout', sessionService.authMiddleware, async (req, res) => {
  req.user = undefined;
  res.sendStatus(200);
});

module.exports = router;
