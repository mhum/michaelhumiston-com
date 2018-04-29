/* eslint-disable no-console */

const Hapi = require('hapi');
const Inert = require('inert');
const Path = require('path');

const config = require('./config');
const routes = require('./routes/index');

/**
 * Create server
 */
const server = Hapi.server({
  host: config.web.host,
  port: config.web.port,
  routes: {
    files: {
      relativeTo: Path.join(__dirname, '.')
    }
  }
});

/**
 * Start server
 */
const init = async () => {
  await server.register(Inert);

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

  await server.start();
  console.log(`Server running at: ${server.info.uri}`);
};

process.on('unhandledRejection', (err) => {
  console.log(err);
  process.exit(1);
});

init();
