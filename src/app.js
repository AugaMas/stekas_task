const express = require('express');
const cookieParser = require('cookie-parser');
const router = require('./routes/router');
const middleware = require('./utils/middleware');

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use('/api', router);

app.use(middleware.unknownEndpoint);

app.use(middleware.errorHandler);

module.exports = app;
