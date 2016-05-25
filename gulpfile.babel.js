'use strict';

import gulp from 'gulp';
import connect from 'gulp-connect';
import concat from 'gulp-concat';
import babel from 'gulp-babel';
import sourcemaps from 'gulp-sourcemaps';

gulp.task('connect', () => {
    connect.server({
        root: '.',
        port: 3000,
        host: '127.0.0.1',
        fallback: 'index.html',
        livereload: true
    });
});

gulp.task('js-dev', () => {
    return gulp.src(['app/**/*.module.js', 'app/**/*.js'])
        .pipe(sourcemaps.init())
        .pipe(babel())
        .pipe(concat('main.js'))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('public/js'))
        .pipe(connect.reload());
});

gulp.task('watch-dev', () => {
    gulp.watch('app/**/*.js', gulp.series('js-dev'));
});

gulp.task('default', gulp.series('js-dev', gulp.parallel('connect', 'watch-dev')));