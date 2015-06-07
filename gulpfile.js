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
    gutil = require('gulp-util'),
    source = require('vinyl-source-stream'),
    buffer = require('vinyl-buffer'),
    browserify = require('browserify'),
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
        .pipe(sass({
            errLogToConsole: true
        }))
        .pipe(myth())
        .pipe(csso())
        .pipe(header(banner, {
            package: package
        }))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('./public/css'))
        .pipe(browserSync.reload({
            stream: true
        }));
});

gulp.task('js', function() {
    browserify('./assets/js/app.js', {
            debug: true
        })
        .bundle()
        .on('error', gutil.log.bind(gutil, 'Browserify Error'))
        .pipe(source('app.js'))
        .pipe(buffer())
        .pipe(sourcemaps.init({
            loadMaps: true
        }))
        .pipe(uglify())
        .pipe(header(banner, {
            package: package
        }))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('./public/js/'));
});

var BROWSER_SYNC_RELOAD_DELAY = 500;

gulp.task('nodemon', function (cb) {
  var called = false;
  return nodemon({
    script: 'app.js',
    ignore: ['assets/', 'public/', 'node_modules/']
  })
    .on('start', function onStart() {
      if (!called) { cb(); }
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

gulp.task('browser-sync', ['nodemon'], function () {
  browserSync.init({
    files: ['public/js/*.*', 'views/**/*.*'],
    proxy: 'http://localhost:3000',
    port: 4000,
    open: false
  });
});



gulp.task('default', ['browser-sync', 'css', 'js'],
    function() {
        gulp.watch("./assets/scss/**/*.scss", ['css']);
        gulp.watch("./assets/js/**/*.js", ['js']);
    }
);
