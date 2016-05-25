'use strict';

import gulp from 'gulp';
import connect from 'gulp-connect';
import concat from 'gulp-concat';
import babel from 'gulp-babel';
import sourcemaps from 'gulp-sourcemaps';
import sass from 'gulp-sass';
import del from 'del';

gulp.task('connect', () => {
    connect.server({
        root: '.',
        port: 3000,
        host: '127.0.0.1',
        fallback: 'index.html',
        livereload: true
    });
});

gulp.task('dev:js', () => {
    return gulp.src(['app/**/*.module.js', 'app/**/*.js'])
        .pipe(sourcemaps.init())
        .pipe(babel())
        .pipe(concat('main.js'))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('public/assets/js'))
        .pipe(connect.reload());
});

gulp.task('dev:styles', () => {
    return gulp.src('app/**/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(concat('main.css'))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('public/assets/css'))
        .pipe(connect.reload());
});

gulp.task('dev:templates', ()=> {
    return gulp.src(['app/**/*.html'])
        .pipe(gulp.dest( 'public/assets/templates'));
});

gulp.task('dev:watch', () => {
    gulp.watch('app/**/*.js', gulp.series('dev:js'));
    gulp.watch('app/**/*.scss', gulp.series('dev:styles'));
});

gulp.task('clean', function () {
    return del('public');
});

gulp.task('dev:build', gulp.series('clean', gulp.parallel('dev:js', 'dev:styles', 'dev:templates')));

gulp.task('dev', gulp.parallel('connect', gulp.series('dev:build', 'dev:watch')));

gulp.task('default', () => {
    console.log('no actions. Please use \'dev\' or \'prod\' tasks ')
});