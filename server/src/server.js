/* eslint-disable no-console */

const Hapi = require('hapi');
const Inert = require('inert');
const Path = require('path');

const config = require('./config');
const routes = require('./routes/index');

/**
 * Create server
 */
const server = new Hapi.Server();
server.connection({
  host: config.web.host,
  port: config.web.port,
  routes: {
    files: {
      relativeTo: Path.join(__dirname, '.')
    }
  }
});

/**
 * Register plugins
 */
server.register([
  {
    register: Inert
  }
],
(error) => {
  if (error) {
    return console.error(error);
  }
  return '';
});

/**
 * Add routes
 */
if (config.env === 'development') {
  server.route({
    method: 'GET',
    path: '/assets/{param*}',
    handler: {
      directory: {
        path: '../../assets'
      }
    }
  });
}

server.route(routes);

/**
 * Start server
 */
server.start((err) => {
  if (err) {
    throw err;
  }
  console.log('Server running at:', server.info.uri);
});
