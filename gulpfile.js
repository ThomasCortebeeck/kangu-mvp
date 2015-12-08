//Creating all required variables needed to run the tasks
var gulp = require('gulp'),
    sass = require('gulp-sass'),
    plumber = require('gulp-plumber'),
    connect = require('gulp-connect-php'),
    concat = require('gulp-concat'),
    minifyCSS = require('gulp-minify-css'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    runSequence = require('run-sequence'),
    autoprefixer = require('gulp-autoprefixer'),
    livereload = require('gulp-livereload');

// Setting up the server
gulp.task('connect', function() {
    console.log('starting localhost server at port 8080')
    connect.server({ base: 'public', port: 8080 });
});

// Moving all of the required image and icon assets from the resources folder to the public folder
gulp.task('move-image-icon-dependencies', function() {
    console.log('Moving all of the required image and icon assets from the resources folder to the public folder');
    gulp.src('resources/assets/**/*')
        .pipe(plumber())
        .pipe(gulp.dest('public/assets'));
});

// Moving and concatinating all of the required js dependencies of foundation 6
gulp.task('move-concat-foundation-js-dependencies', function() {
    console.log('Moving and concatinating all of the required js dependencies of foundation 6');
    gulp.src([
        ('bower_components/jquery/dist/jquery.js'),
        ('bower_components/foundation-sites/dist/foundation.js'),
        ('bower_components/what-input/what-input.js')
        ]).pipe(plumber())
            .pipe(concat('thirdparty.js'))
            .pipe(gulp.dest('resources/js/thirdparty'));
});

// Compiling all sass files of the mvp
gulp.task('sass', function () {
    console.log('Compiling all sass files of the resources folder');
    gulp.src('resources/scss/minimum-viable-product.scss')
        .pipe(plumber())
        .pipe(sass())
        .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
        .pipe(gulp.dest('public/css'))
        .pipe(livereload())
        .pipe(gulp.dest('resources/temp_css'))
        .pipe(livereload());
});

// Minifying all css files in the public folder
gulp.task('minify-css', function() {
  return gulp.src('resources/temp_css/minimum-viable-product.css')
    .pipe(minifyCSS())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('public/css'));
});

// Minifying all js files in the public js folder
gulp.task('minify-js', function() {
  return gulp.src([
        ('resources/js/thirdparty/*.js'),
        ('resources/js/custom/*.js')
        ]).pipe(uglify())
          .pipe(rename({ extname: '.min.js' }))
          .pipe(gulp.dest('public/js'));
});

// Watching the scss src folder for changes
gulp.task('watch', function () {
    console.log("Watching for changes");
    livereload.listen();
    gulp.watch("resources/scss/**/*.scss", ['sass']);
});

// Run all tasks in the particular order
gulp.task('default', function () {
    gulp.start('compile', 'watch');
});

gulp.task('compile', function () {
    gulp.start('connect', 'move-image-icon-dependencies', 'move-concat-foundation-js-dependencies', 'sass', 'minify-css', 'minify-js');
});