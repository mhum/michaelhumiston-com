const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const config = require('./webpack.config');

new WebpackDevServer(webpack(config), {
  publicPath: config.output.publicPath,
  historyApiFallback: true
}).listen(3000, '0.0.0.0', (err) => {
  if (err) {
    return console.log(err);
  }

  console.log('Listening at http://localhost:3000/');

  return true;
});
