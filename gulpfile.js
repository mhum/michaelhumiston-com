/* eslint-disable import/no-extraneous-dependencies */

const gulp = require('gulp');
const del = require('del');
const gzip = require('gulp-gzip');
const eslint = require('gulp-eslint');
const webpack = require('webpack-stream');
const webpackConfig = require('./client/webpack.prod.config.js');

gulp.task('clean', () =>
  del([
    'dist/**/*'
  ])
);

gulp.task('js-lint', () =>
    gulp.src(['src/client/**/*.jsx', '**/*.js', '!node_modules/**', '!dist/**'])
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failAfterError())
);

gulp.task('lint-soft', () =>
    gulp.src(['src/client/**/*.jsx', '**/*.js', '!node_modules/**', '!dist/**'])
        .pipe(eslint())
        .pipe(eslint.format())
);

gulp.task('test', ['js-lint']);

gulp.task('build-assets', ['test', 'clean'], () =>
  gulp.src('src/client/index.jsx')
    .pipe(webpack(webpackConfig))
    .pipe(gulp.dest('dist/client/assets/'))
);

gulp.task('copy-images', ['clean'], () =>
    gulp.src('./assets/images/**/*')
    .pipe(gulp.dest('./dist/client/assets/images'))
);

gulp.task('copy-server', ['clean'], () =>
    gulp.src('./src/server/**/*')
    .pipe(gulp.dest('./dist/server'))
);

gulp.task('compress-js', ['build-assets'], () =>
    gulp.src('dist/client/assets/*.js')
    .pipe(gzip())
    .pipe(gulp.dest('./dist/client/assets'))
);

gulp.task('compress-css', ['build-assets'], () =>
    gulp.src('dist/client/assets/css/*')
    .pipe(gzip())
    .pipe(gulp.dest('./dist/client/assets/css'))
);

gulp.task('compress-html', ['build-assets'], () =>
    gulp.src('dist/client/*.html')
    .pipe(gzip())
    .pipe(gulp.dest('./dist/client'))
);

gulp.task('compress', ['compress-js', 'compress-css', 'compress-html']);

gulp.task('build', ['copy-images', 'copy-server', 'compress']);
