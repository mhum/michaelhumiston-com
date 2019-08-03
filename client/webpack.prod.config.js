/* eslint-disable import/no-extraneous-dependencies */

const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'production',
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
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false
    })
  ],
  module: {
    rules: [{
      test: /\.jsx?$/,
      loader: 'babel-loader'
    }, {
      test: /\.less$/,
      use: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: ['css-loader', 'less-loader']
      })
    }]
  },
  resolve: {
    modules: [
      path.join(__dirname, '.'),
      'node_modules'
    ],
    extensions: ['.js', '.jsx']
  },
  resolveLoader: {
    modules: [
      path.join(__dirname, 'node_modules')
    ]
  }
};
