var gulp = require('gulp'),
    concat = require('gulp-concat')
    
gulp.task('concat', function () {
    return gulp.src('specs/*.js')
          .pipe(concat('all.js'))
          .pipe(gulp.dest('./'))
})

gulp.task('default', ['concat'])