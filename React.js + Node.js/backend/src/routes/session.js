const express = require('express');
const SessionController = require('../controllers/session');

const router = express.Router();

router.post('/login', SessionController.login);
router.get('/authenticate', SessionController.authenticate);

module.exports = router;
