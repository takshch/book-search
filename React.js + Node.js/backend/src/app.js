const express = require('express');
const appInitializer = require('./app-initializer');
const router = require('./routes/index');

const app = express();
appInitializer(app);

app.use(router);

module.exports = app;
