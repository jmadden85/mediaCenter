var gulp = require('gulp');
var bower = require('gulp-bower');

//Set default destination
gulp.task('bower', function () {
  return bower()
    .pipe(gulp.dest('public/lib/dependencies'))
});

gulp.task('default', ['bower']);