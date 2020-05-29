var gulp = require('gulp');
var data = require('gulp-data');

var nunjucksRender = require('gulp-nunjucks-render');
gulp.task('nunjucks', function(done) {
	gulp.src(['src/pages/**/*', '!src/pages/**/*.+(html|njk)']).pipe(gulp.dest('build'));
	gulp.src('src/pages/**/*.+(html|njk)')
	    .pipe(data(function() {
	      return require('./src/data.json')
	    }))
		.pipe(nunjucksRender({
			path: ['src/templates']
		}))
		.pipe(gulp.dest('build'));
	done();
});


var prettify = require('gulp-html-prettify');
var htmlmin = require('gulp-htmlmin');
gulp.task('clean', function () {
	gulp.src(['build/**/*', 'build/**/*.+!(html)']).pipe(gulp.dest('dist'));
	return gulp.src('build/**/*.html')
		.pipe(prettify({indent_char: ' ', indent_size: 2}))
		.pipe(htmlmin({ collapseWhitespace: true }))
		.pipe(gulp.dest('dist'));
});

var imagemin= require('gulp-imagemin');
var path = require('path');
gulp.task('imagemin', function () {
    return gulp.src( 'src/images/**/*.jpg' )
        .pipe(imagemin())
        .pipe(gulp.dest('build/'));
});

var run = gulp.series('nunjucks');

var watch = require('gulp-watch');
gulp.task('watch', function (done) {
	watch('src/**/*', function () {
		run();
	});
	done();
});


gulp.task('default', function (done) {
	run();
	done();
});
