var gulp = require('gulp');
var data = require('gulp-data');

var nunjucksRender = require('gulp-nunjucks-render');
gulp.task('nunjucks', function() {
	gulp.src(['src/pages/**/*', '!src/pages/**/*.+(html|njk)']).pipe(gulp.dest('build'));
	return gulp.src('src/pages/**/*.+(html|njk)')
	    .pipe(data(function() {
	      return require('./src/data.json')
	    }))
		.pipe(nunjucksRender({
			path: ['src/templates']
		}))
		.pipe(gulp.dest('build'));
});


// var prettify = require('gulp-html-prettify');
var htmlmin = require('gulp-htmlmin');
gulp.task('clean', function () {
	gulp.src(['build/**/*', '!build/**/*.+(html)']).pipe(gulp.dest('dist'));
	return gulp.src('build/**/*.html')
		.pipe(htmlmin({ collapseWhitespace: true }))
		.pipe(gulp.dest('dist'));
});

var imagemin = require('gulp-imagemin');
gulp.task('imagemin', function () {
	return gulp.src( 'src/images/**/*.jpg' )
        .pipe(imagemin())
        .pipe(gulp.dest('build/'));
});

var run = gulp.series('nunjucks', 'clean');

var watch = require('gulp-watch');
gulp.task('watch', function () {
	return watch('src/**/*', function () {
		return run();
	});
});

gulp.task('default', function (done) {
	return run();
});
