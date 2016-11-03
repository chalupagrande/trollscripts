'use strict';

var gulp = require('gulp')
var browserSync = require('browser-sync')
var babel = require('gulp-babel')


// Static Server + watching scss/html files
gulp.task('serve', ['compile-js'], function() {

    browserSync.init({
        server: {
            baseDir: "./"
        }
    });
    gulp.watch(['./src/*.js'] , ['compile-js'])
    gulp.watch(["./*.html", "./views/*.html", "./src/*.js"]).on('change', browserSync.reload);
});

gulp.task('compile-js', function(){
  return gulp.src(['./src/*.js'])
             .pipe(babel({
               presets: ['es2015']
             }))
             .pipe(gulp.dest('./scripts'))
})

// Compile sass into CSS & auto-inject into browsers
gulp.task('default', ['serve']);