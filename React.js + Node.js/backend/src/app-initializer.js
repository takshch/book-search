const cookieParser = require('cookie-parser');
const express = require('express');
const boom = require('express-boom');
const cors = require('cors');
const config = require('config');

const origin = config.get('Access-Control-Allow-Origin');

const appInitializer = (app) => {
  // allow all cors requests
  app.use(cors({ origin, credentials: true }));

  // adds boom to res object eg: res.boom.badRequest()
  app.use(boom());

  app.use(cookieParser());
  app.use(express.json());
};

module.exports = appInitializer;
