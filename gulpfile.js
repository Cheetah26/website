var gulp = require('gulp');

var pug = require('gulp-pug');
gulp.task('build_html', function() {
  return gulp.src('./src/pages/**/*.pug')
    .pipe(pug({
      extension: 'html',
      basedir: `${__dirname}/public`
    }))
    .pipe(gulp.dest('./dist'))
});

gulp.task('build_css', function() {
  return gulp.src('./src/styles/**/*.css')
    .pipe(gulp.dest('./dist/styles'))
})

gulp.task('copy_files', function() {
  return gulp.src(['./src/**/*.*', '!./src/**/*.css', '!./src/**/*.pug'])
    .pipe(gulp.dest('./dist/'))
})

gulp.task('build', gulp.series('build_html', 'build_css', 'copy_files'));

var browserSync = require('browser-sync').create();
gulp.task('serve', function() {
  browserSync.init({
    server: {
      baseDir: 'dist',
    },
  });
  browserSync.watch('./src/**/*.*', {}, gulp.series('build', browserSync.reload));
})


gulp.task('default', gulp.series('serve'));