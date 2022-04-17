const express = require('express');
const { authenticate } = require('../middlewares/authentication');
const BookController = require('../controllers/book');

const router = express.Router();

router.post('/search/save', authenticate, BookController.save);

module.exports = router;
