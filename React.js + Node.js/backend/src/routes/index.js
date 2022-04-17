const express = require('express');
const bookRouter = require('./book');
const sessionRouter = require('./session');

const router = express.Router();

router.use('/book', bookRouter);
router.use('/session', sessionRouter);

module.exports = router;
