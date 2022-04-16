const http = require('http');
const app = require('./app');
const config = require('config');

const PORT = config.get('PORT');

const server = http.createServer(app);

server.listen(PORT);

server.on('listening', () => {
  console.log(`Server started listening on PORT:${PORT}`);
});

server.on('error', (err) => {
  console.log(err);
});