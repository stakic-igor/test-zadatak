'use strict';

const gulp = require('gulp');
const sass = require("gulp-sass")(require("node-sass"));
const autoprefixer = require('gulp-autoprefixer');
const sourcemaps = require('gulp-sourcemaps');
const del = require('del');
const cssmin = require('gulp-cssmin');
const rename = require('gulp-rename');
const runSequence = require('gulp4-run-sequence');

// Configure sass
gulp.task('sass', () => {
    return gulp.src('scss/**/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass({
        outputStyle: 'expanded'
    })
    .on('error', sass.logError))
    .pipe(sourcemaps.write('sourceMap'))
    .pipe(gulp.dest('css'))
});

// Configure autoprefixer
gulp.task('autoprefixer', () => {
    return gulp.src(['css/**/*.css'])
    .pipe(autoprefixer({
        cascade: false
    }))
    .pipe(gulp.dest('css/'))
});

// Configure clean task
gulp.task('clean:css', () => {
    return del(['css/**']);
    // return gulp.src('css/**')
    // .pipe(clean())
});

// Configure css min
var cssMinifyLocation = ['css/**/*.css', '!css/**/*.min.css'];
gulp.task('css:min', () => {
    return gulp.src(cssMinifyLocation)
    .pipe(autoprefixer())
    .pipe(cssmin())
    .pipe(rename(
        { suffix: '.min' }
    ))
    .pipe(gulp.dest('css'))
});

// Run build task
gulp.task('build', (callback) => {
    runSequence(
        'clean:css',
        'sass',
        'autoprefixer',
        ['css:min'],
        callback
    );
});
