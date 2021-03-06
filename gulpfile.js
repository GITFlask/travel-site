var gulp = require('gulp'),
postcss = require('gulp-postcss'),
autoprefixer = require('autoprefixer'),
cssvars = require('postcss-simple-vars'),
nested = require('postcss-nested'),
cssImport = require('postcss-import'),
mixins = require('postcss-mixins'),
browserSync = require('browser-sync').create();

function html(done) {
    browserSync.reload();
    done();
}

function styles() {
    return gulp.src('app/assets/styles/styles.css')
        .pipe(postcss([cssImport, mixins, cssvars, nested, autoprefixer]))
        .on('error', function(errorInfo) {
            console.log(errorInfo.toString());
            this.emit('end');
        })
        .pipe(gulp.dest('app/temp/assets/styles'));
}

function cssInject() {
    return gulp.src('./app/temp/assets/styles/styles.css')
    .pipe(browserSync.stream());
}

exports.watch = function() {
    browserSync.init({
        server: {
            baseDir: "app"
        }
    });

    gulp.watch('app/index.html', html);
    gulp.watch('app/assets/styles/**/*.css', gulp.series(styles, cssInject));
};