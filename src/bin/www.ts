import 'source-map-support/register';
import { app } from '../app';
import http from 'http';
import { getLogger } from '../utils';

const LOGGER = getLogger();

function normalizePort(val: string = '8000') {
  const port = parseInt(val, 10);

  if (isNaN(port) || port <= 0) {
    LOGGER.warn('PORT must be number greater then zero. Replaced with 8000');
    return 8000;
  }
  return port;
}

// Get port from environment and store it in Express
const SERVER_PORT = normalizePort(process.env.PORT);
app.set('port', SERVER_PORT);

// Create HTTP server.
const server = http.createServer(app);

// TODO: Add on error action

server.listen(SERVER_PORT, () => {
  LOGGER.info(`Listening on port ${SERVER_PORT}`);
});
