const express = require('express');
const cookieParser = require('cookie-parser');
const router = require('./routes/router');
const path = require('path');
const middleware = require('./utils/middleware');
const cors = require('cors');

const buildPath = path.join(__dirname.substring(0, __dirname.lastIndexOf('\\')), 'client', 'build');
const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.use('/api', router);

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(buildPath));

    app.get('*', (req, res) => {
        res.sendFile(path.join(buildPath, 'index.html'))
    })
}

app.use(middleware.unknownEndpoint);

app.use(middleware.errorHandler);

module.exports = app;
