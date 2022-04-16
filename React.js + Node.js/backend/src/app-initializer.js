const express = require('express');

const appInitializer = (app) => {
  app.use(express.json());
};

module.exports = appInitializer;
