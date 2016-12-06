/* eslint-disable import/no-extraneous-dependencies */

const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: [
    'node_modules/babel-polyfill',
    'node_modules/whatwg-fetch',
    './client/src/index'
  ],
  output: {
    path: path.join(__dirname, 'dist/client'),
    filename: 'bundle.js',
    publicPath: 'assets'
  },
  plugins: [
    new webpack.ProvidePlugin({
      React: 'react'
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      },
      minimize: true,
      comments: false
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    }),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new ExtractTextPlugin('css/styles.css'),
    new HtmlWebpackPlugin({
      template: 'client/src/index.prod.html',
      inject: 'body',
      filename: '../index.html',
      hash: true
    })
  ],
  module: {
    loaders: [{
      test: /\.jsx?$/,
      loader: 'babel'
    }, {
      test: /\.less$/,
      loader: ExtractTextPlugin.extract('style-loader', 'css-loader!less-loader')
    }]
  },
  resolve: {
    root: [path.join(__dirname, '.')],
    extensions: ['', '.js', '.jsx']
  },
  resolveLoader: {
    root: path.join(__dirname, 'node_modules')
  }
};
