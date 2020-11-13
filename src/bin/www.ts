import 'source-map-support/register';
import { app } from '../app';
import http from 'http';

// Get port from environment and store in Express.
// TODO: Normalize port
const SERVER_PORT = process.env.PORT || '8000';
app.set('port', SERVER_PORT);

// Create HTTP server.
const server = http.createServer(app);

// TODO: Add on error action

server.listen(SERVER_PORT, () => {
  console.log(`Listening on port ${SERVER_PORT}`);
});
