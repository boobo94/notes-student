var gulp = require('gulp'),
    sass = require('gulp-sass'),
    cleanCSS = require('gulp-clean-css'),
    rename = require('gulp-rename');

var src = 'app/assets';

gulp.task('sass', function () {
    // css unminified
    gulp.src(src + '/sass/**/*.scss')
        .pipe(sass({errLogToConsole: true}))
        .pipe(gulp.dest(src + '/css/'));
    //css minified
    gulp.src(src + '/sass/**/*.scss')
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(rename({ extname: '.min.css' }))
        .pipe(gulp.dest(src + '/css/'));
});

//todo: add minification task for js

//Watch task
gulp.task('watch', function () {
    gulp.watch(src + '/sass/**/*.scss', ['sass']);
});