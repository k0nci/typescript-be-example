import 'source-map-support/register';
import 'dotenv/config';
import http from 'http';
import { app } from '../app';
import { getLogger } from '../utils';

if (!process.env['NODE_CONFIG_DIR']) {
  process.env['NODE_CONFIG_DIR'] = `${process.cwd()}/config`;
}
import config from 'config';

const LOGGER = getLogger();

function normalizePort(val: string = '8000') {
  const port = parseInt(val, 10);

  if (isNaN(port) || port <= 0) {
    LOGGER.warn('SERVER_PORT must be number greater then zero. WARNING: Replaced with 8000');
    return 8000;
  }
  return port;
}

// Get port from environment
const SERVER_PORT = normalizePort(config.get('service.port'));

// Create HTTP server.
const server = http.createServer(app.callback());

function onError(error: Error & { code: string }) {
  switch (error.code) {
    case 'EADDRINUSE': {
      LOGGER.error(`${SERVER_PORT} is already in use`);
      process.exit(1);
    }
    default:
      throw error;
  }
}
server.on('error', onError);

server.listen(SERVER_PORT, () => {
  LOGGER.info(`Listening on port ${SERVER_PORT}`);
});
