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
    addsrc = require('gulp-add-src'),
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
    gulp.src('assets/scss/style.scss')
        .pipe(sourcemaps.init())
        .pipe(sass({errLogToConsole: true}))
        .pipe(myth())
        .pipe(csso())
        .pipe(header(banner, {package: package}))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('public/css/'))
        .pipe(browserSync.reload({
            stream: true
        }));
});

gulp.task('js', ['bs-reload'], function() {
  gulp.src(['assets/js/states/*', 'assets/js/entities/*', 'assets/js/helpers/*', 'assets/js/app.js'])
    .pipe(sourcemaps.init())
    .pipe(concat('app.js'))
    .pipe(uglify())
    .pipe(header(banner, {package: package}))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('public/js/'));

    gulp.src('assets/js/libs.js')
    .pipe(gulp.dest('public/js/'));
});

gulp.task('js-build', ['bs-reload'], function() {
  gulp.src(['assets/js/states/*', 'assets/js/entities/*', 'assets/js/helpers/*', 'assets/js/app.js'])
    .pipe(sourcemaps.init())
    .pipe(concat('app.js'))
    .pipe(uglify())
    .pipe(addsrc.prepend('assets/js/libs.js'))
    .pipe(concat('app.js'))
    .pipe(header(banner, {package: package}))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('public/js/'));
});

gulp.task('bower', ['js'], function() {
    gulp.src(mainBowerFiles())
        .pipe(concat('libs.js'))
        .pipe(uglify())
        .pipe(gulp.dest('assets/js/'));
});

gulp.task('nodemon', function () {
  nodemon({
    script: 'app.js',
    ext: 'js',
    ignore: ['assets/', 'public/', 'node_modules/'],
    tasks: ['bs-reload'],
    env: { 'DEBUG': 'http' }
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


gulp.task('default', ['browser-sync', 'bower', 'css'],
    function() {
        gulp.watch("assets/scss/**/*.scss", ['css']);
        gulp.watch("assets/js/**/*.js", ['js']);
    }
);