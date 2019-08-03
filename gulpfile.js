/* eslint-disable import/no-extraneous-dependencies */

const {
  dest, src, parallel, series
} = require('gulp');
const del = require('del');
const gzip = require('gulp-gzip');
const eslint = require('gulp-eslint');
const webpack = require('webpack');
const webpackStream = require('webpack-stream');
const webpackConfig = require('./client/webpack.prod.config.js');

const eslintFiles = ['client/src/**/*.jsx', '**/*.js',
  '!dist/**', '!node_modules/**',
  '!client/node_modules/**', '!client/dist/**',
  '!server/node_modules/**'];

const jsLint = () => src(eslintFiles)
  .pipe(eslint())
  .pipe(eslint.format())
  .pipe(eslint.failAfterError());

const lintSoft = () => src(eslintFiles)
  .pipe(eslint())
  .pipe(eslint.format());

const clean = () => del([
  'dist/**/*'
]);

const copyImages = () => src('./assets/images/**/*')
  .pipe(dest('./dist/client/assets/images'));

const copyServer = () => src(['./server/src/**/*', './server/package.json', './server/yarn.lock'])
  .pipe(dest('./dist/server'));

const buildAssets = () => src('client/src/index.jsx')
  .pipe(webpackStream(webpackConfig, webpack))
  .pipe(dest('dist/client/assets/'));

const compressJS = () => src('dist/client/assets/*.js')
  .pipe(gzip())
  .pipe(dest('./dist/client/assets'));

const compressCSS = () => src('dist/client/assets/css/*')
  .pipe(gzip())
  .pipe(dest('./dist/client/assets/css'));

const compressHTML = () => src('dist/client/*.html')
  .pipe(gzip())
  .pipe(dest('./dist/client'));

exports.lintSoft = lintSoft;
exports.test = jsLint;
exports.build = series(
  clean,
  parallel(
    copyImages,
    copyServer
  ),
  jsLint,
  buildAssets,
  parallel(
    compressJS,
    compressCSS,
    compressHTML
  )
);
