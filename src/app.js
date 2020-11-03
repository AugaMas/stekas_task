const express = require('express');
const cookieParser = require('cookie-parser');
const router = require('./routes/router');
const path = require('path');
const middleware = require('./utils/middleware');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.use('/api', router);

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, '../client', 'build', 'index.html'));
    })
}

app.use(middleware.unknownEndpoint);

app.use(middleware.errorHandler);

module.exports = app;
