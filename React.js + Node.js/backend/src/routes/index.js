const express = require('express');
const bookRouter = require('./book');
const sessionRouter = require('./session');
const healthCheckRouter = require('./healthcheck');

const router = express.Router();

router.use('/book', bookRouter);
router.use('/session', sessionRouter);
router.use('/healthcheck', healthCheckRouter);

module.exports = router;
