/* eslint-disable import/no-extraneous-dependencies, no-console */

const Hapi = require('hapi');
const Inert = require('inert');
const Path = require('path');
const WebpackPlugin = require('hapi-webpack-plugin');

const routes = require('./src/server/routes/index');

/**
 * Create server
 */
const server = new Hapi.Server();
server.connection({
  host: 'localhost',
  port: 3000,
  routes: {
    files: {
      relativeTo: Path.join(__dirname, './src/server/views')
    }
  }
});

/**
 * Register plugins
 */
server.register([
  {
    register: WebpackPlugin,
    options: './webpack.config.js'
  },
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
