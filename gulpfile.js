var gulp = require('gulp'),
postcss = require('gulp-postcss'),
autoprefixer = require('autoprefixer'),
cssvars = require('postcss-simple-vars'),
nested = require('postcss-nested'),
cssImport = require('postcss-import'),
mixins = require('postcss-mixins'),
svgSprite = require('gulp-svg-sprite'),
rename = require('gulp-rename'),
clean = require('gulp-clean'),
replace = require('gulp-replace'),
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

function createSprite() {
    return gulp.src('./app/assets/images/icons/**/*.svg')
        .pipe(svgSprite(config))
        .pipe(gulp.dest('./app/'));
}

function copySpriteGraphic() {
    return gulp.src('./app/temp/sprite/css/**/*.svg')
        .pipe(gulp.dest('./app'));
}

function copySpriteCSS() {
    return gulp.src('./app/temp_sprite.css')
        .pipe(rename('_sprite.css'))
        .pipe(replace('assets', '/assets'))
        .pipe(gulp.dest('./app/assets/styles/modules'))    
}

function cleanTempSpriteCSS() {
    return gulp.src('app/temp_sprite.css')
        .pipe(clean());
}

var config = {
    mode: {
        css: {
            dest: "./assets",
            common: "icon",
            sprite: "images/sprites/sprite.svg",
            prefix: ".icon--",
            render: {
                css: {
                    dest: "../temp_sprite.css"
                }
            }
        }
    }
}

exports.icons = gulp.series(createSprite, copySpriteCSS, cleanTempSpriteCSS);

exports.watch = function() {
    browserSync.init({
        server: {
            baseDir: "app"
        }
    });

    gulp.watch('app/index.html', html);
    gulp.watch('app/assets/styles/**/*.css', gulp.series(styles, cssInject));
};