/* eslint-disable import/no-extraneous-dependencies */

const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackTemplate = require('html-webpack-template');

module.exports = {
  entry: [
    'babel-polyfill',
    'whatwg-fetch',
    './src/index'
  ],
  output: {
    path: path.join(__dirname, 'dist'),
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
      inject: false,
      template: HtmlWebpackTemplate,
      title: 'Home - Michael Humiston',
      links: [
        'https://maxcdn.bootstrapcdn.com/bootstrap/latest/css/bootstrap.min.css',
        'https://maxcdn.bootstrapcdn.com/font-awesome/4.6.1/css/font-awesome.min.css',
        'https://fonts.googleapis.com/css?family=Lato|Pacifico'
      ],
      filename: '../index.html',
      mobile: true,
      appMountId: 'main',
      googleAnalytics: {
        trackingId: 'UA-18739556-2',
        pageViewOnLoad: true
      },
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
    root: [path.join(__dirname, './src')],
    extensions: ['', '.js', '.jsx']
  }
};
