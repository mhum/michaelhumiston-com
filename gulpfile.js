/* eslint-disable import/no-extraneous-dependencies */

const gulp = require('gulp');
const del = require('del');
const gzip = require('gulp-gzip');
const eslint = require('gulp-eslint');
const webpack = require('webpack-stream');
const webpackConfig = require('./webpack.prod.config.js');

gulp.task('clean', () =>
  del([
    'dist/**/*'
  ])
);

gulp.task('js-lint', () =>
    gulp.src(['src/**/*.jsx', '**/*.js', '!node_modules/**', '!dist/**'])
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failAfterError())
);

gulp.task('lint-soft', () =>
    gulp.src(['src/**/*.jsx', '**/*.js', '!node_modules/**', '!dist/**'])
        .pipe(eslint())
        .pipe(eslint.format())
);

gulp.task('test', ['js-lint']);

gulp.task('build-assets', ['test', 'clean'], () =>
  gulp.src('src/index.jsx')
    .pipe(webpack(webpackConfig))
    .pipe(gulp.dest('dist/assets/'))
);

gulp.task('copy-images', ['clean'], () =>
    gulp.src('./assets/images/**/*')
    .pipe(gulp.dest('./dist/assets/images'))
);

gulp.task('compress-js', ['build-assets'], () =>
    gulp.src('dist/assets/*.js')
    .pipe(gzip())
    .pipe(gulp.dest('./dist/assets'))
);

gulp.task('compress-css', ['build-assets'], () =>
    gulp.src('dist/assets/css/*')
    .pipe(gzip())
    .pipe(gulp.dest('./dist/assets/css'))
);

gulp.task('compress-html', ['build-assets'], () =>
    gulp.src('dist/*.html')
    .pipe(gzip())
    .pipe(gulp.dest('./dist'))
);

gulp.task('compress', ['compress-js', 'compress-css', 'compress-html']);

gulp.task('build', ['copy-images', 'compress']);
