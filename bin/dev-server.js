/* eslint-disable import/no-extraneous-dependencies, no-console */

const Hapi = require('hapi');
const WebpackPlugin = require('hapi-webpack-plugin');

/**
 * Create server
 */
const server = new Hapi.Server();
server.connection({
  host: 'localhost',
  port: 3000
});

/**
 * Register plugin and start server
 */
server.register({
  register: WebpackPlugin,
  options: './webpack.config.js'
},
(error) => {
  if (error) {
    return console.error(error);
  }
  return server.start(() => console.log('Server running at:', server.info.uri));
});
