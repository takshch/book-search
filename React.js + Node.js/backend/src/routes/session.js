const express = require('express');
const SessionController = require('../controllers/session');

const router = express.Router();

router.post('/login', SessionController.login);

module.exports = router;
