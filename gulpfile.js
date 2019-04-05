var gulp = require('gulp');
//
// var rename = require("gulp-rename");
//
// var htmlreplace = require('gulp-html-replace');
//
// var imagemin = require('gulp-imagemin');

const sass = require('gulp-sass');

var browserSync = require('browser-sync').create();



gulp.task('sass', function () {
    return gulp.src('./sass/**/*.scss')
        //.pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        // .pipe(autoprefixer({
        //     browsers: ['cover 99.5%'],
        // }))
        //.pipe(sourcemaps.write())
        .pipe(gulp.dest('.'))
        .pipe(browserSync.stream());
});


gulp.task('serve', function () {
    browserSync.init({
        server: '.',
    });
    gulp.watch('./*.js').on('change', browserSync.reload);
    gulp.watch('./sass/**/*.scss', ['sass']).on('change', browserSync.reload);
    // gulp.watch('./resources/sass/**/*.scss', ['sass']);
    // gulp.watch('./resources/js/**/*.js', ['scripts']);
});

gulp.task('default', ['serve']);