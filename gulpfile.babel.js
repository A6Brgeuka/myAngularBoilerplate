'use strict';

import gulp from 'gulp';
import connect from 'gulp-connect';
import concat from 'gulp-concat';
import babel from 'gulp-babel';
import sourcemaps from 'gulp-sourcemaps';
import sass from 'gulp-sass';
import del from 'del';
import templateCache from 'gulp-angular-templatecache';
import gulpIf from 'gulp-if';
import inject from 'gulp-inject';
import uglify from 'gulp-uglify';

const isDevelopment = !process.env.NODE_ENV || process.env.NODE_ENV == 'development';

const paths = {
    scripts: {
        srcModule: 'app/**/*.module.js',
        src: 'app/**/*.js',
        dest: 'public/assets/js'
    },
    style: {
        src: 'app/**/*.scss',
        dest: 'public/assets/css'
    },
    templates: {
        src: 'app/**/*.html',
        dest: 'public/assets/templates'
    }
};

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
        // .pipe(uglify())
        .pipe(concat('main.js'))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('public/assets/js'))
        .pipe(connect.reload());
});

gulp.task('dev:styles', () => {
    return gulp.src('app/**/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(concat('main.css'))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('public/assets/css'))
        .pipe(connect.reload());
});

gulp.task('dev:templates', ()=> {
    return gulp.src('app/**/*.html')
        .pipe(templateCache({
            standalone: true
        }))
        .pipe(gulp.dest('public/assets/templates'))
        .pipe(connect.reload());
});

gulp.task('dev:inject', () => {
    const target = gulp.src('index.html');

    const js = gulp.src('public/**/*.js', {read: true});
    const css = gulp.src('public/**/*.css');
    const templates = gulp.src('public/**/templates/*.js');

    return target
        .pipe(inject(templates, {
            ignorePath: 'public/'
        }))
        .pipe(inject(css))
        .pipe(inject(js))
        .pipe(gulp.dest('.'))
});

gulp.task('dev:watch', () => {
    gulp.watch('app/**/*.js', gulp.series('dev:js'));
    gulp.watch('app/**/*.scss', gulp.series('dev:styles'));
    gulp.watch('app/**/*.html', gulp.series('dev:templates'));
});

gulp.task('clean', () => {
    return del('public');
});

gulp.task('dev:build', gulp.series('clean', gulp.parallel('dev:js', 'dev:styles', 'dev:templates'), 'dev:inject'));

gulp.task('dev', gulp.parallel('connect', gulp.series('dev:build', 'dev:watch')));

gulp.task('default', () => {
    console.log('no actions. Please use \'dev\' or \'prod\' tasks ')
});