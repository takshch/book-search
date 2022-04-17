const { verify } = require('../services/auth');

const { assign } = Object;

const authenticate = async (req, res, next) => {
  const token = req.cookies['book'];

  if(!token) {
    res.boom.unauthorized();
    return;
  }

  try {
    const { email } = await verify(token);
    assign(req, { user: { email } });
    next();
  } catch (e) {
    console.log(e);
    res.boom.unauthorized();
  }
};

module.exports = { authenticate };
