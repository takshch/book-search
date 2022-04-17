const AuthService = require('../services/auth');

const COOKIE_OPTIONS = {
  maxAge: 1000 * 24 * 60 * 60 * 1000,
  httpOnly: true,
  sameSite: 'None',
  secure: true
};

const login = async (req, res) => {
  const { credential } = req.body;
  if (!credential) {
    res.boom.unauthorized();
    return;
  }

  try {
    await AuthService.verify(credential);
    res.cookie('book', credential, COOKIE_OPTIONS);
    res.status(200).send();
  } catch (e) {
    res.boom.unauthorized();
  }
};


// Validates Google token received from cookie
const authenticate = async (req, res) => {
  const credential = req.cookies['book'];
  if (!credential) {
    res.boom.unauthorized();
    return;
  }

  try {
    await AuthService.verify(credential);
    res.status(200).send();
  } catch (e) {
    res.boom.unauthorized();
  }
};

module.exports = { login, authenticate };
