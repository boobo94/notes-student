var sass = require('./public/gulp-sass');


var $src = './public/app/assets';

//todo:  implement gulp
gulp.task('task', () => {

})


gulp.task('build', [dependences], () => {

})


gulp.task('sass', function () {
    gulp.src($src + '/sass/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest($src + '/css'));
});
