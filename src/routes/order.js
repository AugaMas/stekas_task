const express = require('express');

const router = express.router();

router.post('/', async (req, res, next) => {
  res.send('test');
});

module.exports = router;
