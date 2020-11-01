const express = require('express');
const apiUtil = require('../utils/api-util');
const sessionService = require('../services/sessionServices');
const userServices = require('../services/userServices');

const router = express.Router();

router.get('/', sessionService.authMiddleware, async (req, res, next) => {
  res.send('test');
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
      const cookie = sessionService.createCookie(token);
      res.setHeader('Set-Cookie', cookie);
      res.json(user);
    }
  } catch (e) {
    next(e);
  }
});

router.get('/logout', sessionService.authMiddleware, async (req, res) => {
  req.user = undefined;
  res.setHeader('Set-Cookie', 'Authorization=; Max-age=0');
  res.sendStatus(200);
});

module.exports = router;
