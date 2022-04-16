const { verify } = require('../services/auth');

const authenticate = async (req, res, next) => {
  try {
    await verify();
    next();
  } catch (e) {
    console.log(e);
  }
};

module.exports = { authenticate };
