var gulp = require('gulp'),
postcss = require('gulp-postcss'),
autoprefixer = require('autoprefixer'),
cssvars = require('postcss-simple-vars'),
nested = require('postcss-nested');

function html(done) {
    console.log("Imagine something done to html here!.");
    done();
}

function styles() {
    return gulp.src('app/assets/styles/style.css')
        .pipe(postcss([cssvars, nested, autoprefixer]))
        .pipe(gulp.dest('app/temp/assets/styles'));
}

exports.default = function () {
    gulp.watch('app/index.html', html);
    gulp.watch('app/assets/styles/**/*.css', styles);
};