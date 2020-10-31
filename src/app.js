const express = require('express');
const cookieParser = require('cookie-parser');
const router = require('./routes/router');

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use('/api', router);

module.exports = app;
