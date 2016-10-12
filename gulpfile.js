/* eslint-disable import/no-extraneous-dependencies */

const gulp = require('gulp');
const gzip = require('gulp-gzip');
const eslint = require('gulp-eslint');
const webpack = require('webpack-stream');
const webpackConfig = require('./webpack.prod.config.js');

gulp.task('js-lint', () =>
    gulp.src(['src/**/*.jsx'])
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failAfterError())
);

gulp.task('test', ['js-lint']);

gulp.task('build-assets', ['test'], () =>
  gulp.src('src/index.jsx')
    .pipe(webpack(webpackConfig))
    .pipe(gulp.dest('assets/js/'))
);

gulp.task('compress-js', () =>
    gulp.src('assets/js/*')
    .pipe(gzip())
    .pipe(gulp.dest('./assets/js'))
);

gulp.task('compress-css', () =>
    gulp.src('assets/css/*')
    .pipe(gzip())
    .pipe(gulp.dest('./assets/css'))
);

gulp.task('compress', ['compress-js', 'compress-css']);

gulp.task('build', ['compress']);
