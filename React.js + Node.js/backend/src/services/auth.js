const config = require('config');
const { OAuth2Client } = require('google-auth-library');

const CLIENT_ID = config.get('google_client_id');

const client = new OAuth2Client(CLIENT_ID);

const verify = async (token) => {
  const ticket = await client.verifyIdToken({
    idToken: token,
    audience: CLIENT_ID,
  });

  const payload = ticket.getPayload();
  return payload;
};

module.exports = { verify };
