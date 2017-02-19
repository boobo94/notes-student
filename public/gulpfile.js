var gulp = require('gulp'),
    sass = require('gulp-sass');

var src = 'app/assets';

gulp.task('sass', function () {
    gulp.src(src + '/sass/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest(src + '/css/'))
        //todo: implement minified css
});

//Watch task
gulp.task('default', function () {
    gulp.watch(src + 'sass/**/*.scss', ['styles']);
});