var gulp = require('gulp');
var data = require('gulp-data');

var nunjucksRender = require('gulp-nunjucks-render');
gulp.task('nunjucks', function(done) {
	gulp.src(['src/pages/**/*', '!src/pages/**/*.+(html|njk)']).pipe(gulp.dest('build'));
	return gulp.src('src/pages/**/*.+(html|njk)')
	    .pipe(data(function() {
	      return require('./src/data.json')
	    }))
		.pipe(nunjucksRender({
			path: ['src/templates']
		}))
		.pipe(gulp.dest('build'));
	// done();
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

var imagemin = require('gulp-imagemin');
// var fs = require('fs');
gulp.task('imagemin', function () {
	// var images = [];
	return gulp.src( 'src/images/**/*.jpg' )
        .pipe(imagemin())
		// .pipe(function (file) {
		// 	images += {'name':file.basename, 'path':file.dirname};
		// 	return file;
		// })
        .pipe(gulp.dest('build/'));
	// for (image in images) {
	// 	fs.writeFile(image.path + 'images.json', , 'utf8', callback);
	// }
});

var run = gulp.series('nunjucks');

var watch = require('gulp-watch');
gulp.task('watch', function () {
	return watch('src/**/*', function () {
		return run();
	});
});


gulp.task('default', function (done) {
	return run();
});
