const express = require('express');
const { authenticate } = require('../middlewares/authentication');

const router = express.Router();

router.post('/search/save', authenticate);

module.exports = router;
