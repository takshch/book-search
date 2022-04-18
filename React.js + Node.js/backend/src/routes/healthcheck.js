const express = require('express');

const router = express.Router();

router.get('/', (_, res) => {
  const data = { now: Date.now() };
  res.status(200).send(data);
});

module.exports = router;