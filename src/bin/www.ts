import 'source-map-support/register';
import 'dotenv/config';
import config from 'config';
import http from 'http';
import { app } from '../app';
import { getLogger } from '../utils';

const LOGGER = getLogger();

function normalizePort(val: string = '8000') {
  const port = parseInt(val, 10);

  if (isNaN(port) || port <= 0) {
    LOGGER.warn('SERVER_PORT must be number greater then zero. WARNING: Replaced with 8000');
    return 8000;
  }
  return port;
}

if (!process.env['NODE_CONFIG_DIR']) {
  process.env['NODE_CONFIG_DIR'] = `${process.cwd()}/config`;
}

// Get port from environment and store it in Express
const SERVER_PORT = normalizePort(config.get('service.port'));
app.set('port', SERVER_PORT);

// Create HTTP server.
const server = http.createServer(app);

// TODO: Add on error action

server.listen(SERVER_PORT, () => {
  LOGGER.info(`Listening on port ${SERVER_PORT}`);
});
