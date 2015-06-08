var
    gulp = require('gulp'),
    nodemon = require('gulp-nodemon'),
    sass = require('gulp-sass'),
    browserSync = require('browser-sync'),
    uglify = require('gulp-uglify'),
    header = require('gulp-header'),
    csso = require('gulp-csso'),
    sourcemaps = require('gulp-sourcemaps'),
    myth = require('gulp-myth'),
    mainBowerFiles = require('main-bower-files'),
    concat = require('gulp-concat'),
    package = require('./package.json');


var banner = [
    '/*!\n' +
    ' * <%= package.name %>\n' +
    ' * <%= package.title %>\n' +
    ' * <%= package.url %>\n' +
    ' * @author <%= package.author %>\n' +
    ' * @version <%= package.version %>\n' +
    ' * Copyright ' + new Date().getFullYear() + '.\n' +
    ' */',
    '\n'
].join('');


gulp.task('css', function() {
    gulp.src('./assets/scss/style.scss')
        .pipe(sourcemaps.init())
        .pipe(sass({errLogToConsole: true}))
        .pipe(myth())
        .pipe(csso())
        .pipe(header(banner, {package: package}))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('./public/css/'))
        .pipe(browserSync.reload({
            stream: true
        }));
});

gulp.task('js', function() {
  gulp.src(['./assets/js/states/*.js', './assets/js/entities/*.js', './assets/js/helpers/*.js', './assets/js/app.js'])
    .pipe(sourcemaps.init())
    .pipe(concat('app.js'))
    .pipe(uglify())
    .pipe(header(banner, {package: package}))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('./public/js/'));
});

gulp.task('bower', function() {
    gulp.src(mainBowerFiles())
        .pipe(concat('libs.js'))
        .pipe(uglify())
        .pipe(gulp.dest('./public/js/'));
});

var BROWSER_SYNC_RELOAD_DELAY = 500;
gulp.task('nodemon', function(cb) {
    var called = false;
    return nodemon({
            script: './app.js',
            ignore: ['assets/', 'public/', 'node_modules/']
        })
        .on('start', function onStart() {
            if (!called) {
                cb();
            }
            called = true;
        })
        .on('restart', function onRestart() {
            setTimeout(function reload() {
                browserSync.reload({
                    stream: false
                });
            }, BROWSER_SYNC_RELOAD_DELAY);
        });
});

gulp.task('browser-sync', ['nodemon'], function() {
    browserSync.init({
        files: ['./views/**/*.hbs'],
        proxy: 'http://localhost:3000',
        port: 4000,
        open: false
    });
});

gulp.task('bs-reload', function () {
  browserSync.reload();
});


gulp.task('default', ['browser-sync', 'bower', 'css', 'js'],
    function() {
        gulp.watch("./assets/scss/**/*.scss", ['css']);
        gulp.watch("./assets/js/**/*.js", ['js', 'bs-reload']);
    }
);
