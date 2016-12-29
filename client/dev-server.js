/* eslint-disable import/no-extraneous-dependencies, no-console */

const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const config = require('./webpack.dev.config');

new WebpackDevServer(webpack(config), {
  publicPath: config.output.publicPath,
  hot: true,
  historyApiFallback: true,
  proxy: {
    '/api': {
      target: 'http://localhost:4000'
    },
    '/assets': {
      target: 'http://localhost:4000'
    }
  }
}).listen(3000, '0.0.0.0', (err) => {
  if (err) {
    return console.log(err);
  }

  console.log('Listening at http://localhost:3000/');

  return true;
});
