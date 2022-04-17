const express = require('express');
const { authenticate } = require('../middlewares/authentication');
const BookController = require('../controllers/book');

const router = express.Router();

router.get('/search/save', BookController.save);

module.exports = router;
