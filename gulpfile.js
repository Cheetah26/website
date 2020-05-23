var gulp = require('gulp');
var data = require('gulp-data');

var nunjucksRender = require('gulp-nunjucks-render');
gulp.task('nunjucks', function() {
	gulp.src('src/pages/**/*.+(js|css)').pipe(gulp.dest('raw'));
	return gulp.src('src/pages/**/*.+(html|njk|nujkucks)')
	    .pipe(data(function() {
	      return require('./src/data.json')
	    }))
		.pipe(nunjucksRender({
			path: ['src/templates']
		}))
		.pipe(gulp.dest('raw'));
});


var prettify = require('gulp-html-prettify');
var htmlmin = require('gulp-htmlmin');
gulp.task('clean', function () {
	gulp.src('raw/**/*.+(js|css)').pipe(gulp.dest('dist'));
	return gulp.src('raw/**/*.html')
		.pipe(prettify({indent_char: ' ', indent_size: 2}))
		.pipe(htmlmin({ collapseWhitespace: true }))
		.pipe(gulp.dest('dist'));
});

var run = gulp.series('nunjucks', 'clean');

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
