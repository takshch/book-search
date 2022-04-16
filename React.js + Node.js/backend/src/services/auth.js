const config = require('config');
const { OAuth2Client } = require('google-auth-library');

const CLIENT_ID = config.get('google_client_id');

const client = new OAuth2Client(CLIENT_ID);

const verify = async () => {
  const ticket = await client.verifyIdToken({
    idToken: token,
    audience: CLIENT_ID,
  });

  const payload = ticket.getPayload();
  console.log(payload);
};

module.exports = { verify };
