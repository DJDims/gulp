const { src, dest, watch, parallel, series } = require('gulp');
const scss = require('gulp-sass')(require('sass'));
const concat = require('gulp-concat');
const uglify = require('gulp-uglify-es').default;
const browserSync = require('browser-sync').create();
const autoprefixer = require('gulp-autoprefixer');
const clean = require('gulp-clean');
const avif = require('gulp-avif');
const webp = require('gulp-webp');
const imagemin = require('gulp-imagemin');
const svg = require('gulp-svg-sprite');
const newer = require('gulp-newer');
const fonter = require('gulp-fonter');
const ttf2woff2 = require('gulp-ttf2woff2');
const include = require('gulp-include');

//compile styles
function styles() {
    return src('app/scss/style.scss')
        .pipe(autoprefixer({overrideBrowserslist: ['last 10 version']}))
        .pipe(concat('style.min.css'))
        .pipe(scss({outputStyle: "compressed"}))
        .pipe(dest('app/css'))
        .pipe(browserSync.stream())
}

//compile scripts
function scripts() {
    return src('app/js/main.js')
        .pipe(concat('main.min.js'))
        .pipe(uglify())
        .pipe(dest('app/js'))
        .pipe(browserSync.stream())
}

//compile images
function images() {
    return src(['app/images/src/*.*', '!app/images/src/*.svg'])
        .pipe(newer('app/images/dist'))
        .pipe(avif({quality: 50}))
        
        .pipe(src('app/images/src/*.*'))
        .pipe(newer('app/images/dist'))
        .pipe(webp())
        
        .pipe(src('app/images/src/*.*'))
        .pipe(newer('app/images/dist'))
        .pipe(imagemin())

        .pipe(dest('app/images/dist'))
}

//compile svg sprite
function sprite() {
    return src('app/images/dist/*.svg')
        .pipe(svg({
            mode: {
                stack: {
                    sprite: '../sprite.svg',
                    example: true
                }
            }
        }))
        .pipe(dest('app/images/dist'))
}

//compile fonts
function fonts() {
    return src('app/fonts/src/*.*')
        .pipe(fonter({
            formats: ['woff', 'ttf']
        }))
        .pipe(src('app/fonts/*.ttf'))
        .pipe(ttf2woff2())
        .pipe(dest('app/fonts/dist'))
}

//build pages
function pages() {
    return src('app/pages/*.html')
        .pipe(include({
            includePaths: 'app/components'
        }))
        .pipe(dest('app'))
        .pipe(browserSync.stream())
}

//watch for a changes
function watching() {
    browserSync.init({
        server: {
            baseDir: 'app/'
        }
    });

    watch(['app/scss/style.scss'], styles);
    watch(['app/js/main.js'], scripts);
    watch(['app/images/src'], images);
    watch(['app/fonts/src'], fonts);
    watch(['app/pages/*', 'app/components/*'], pages);
    watch(['app/*.html']).on('change', browserSync.reload);
}

//clean dist folder
function cleanDist() {
    return src('dist')
        .pipe(clean())
}

//buld dist folder
function building() {
    return src([
        'app/css/style.min.css',
        'app/js/main.min.js',
        'app/**/*.html',
        'app/images/dist/*.*',
        '!app/images/dist/*.svg',
        'app/images/dist/sprite.svg',
        '!app/images/dist/stack',
        'app/fonts/dist/*.*'
    ], {base: 'app'})
        .pipe(dest('dist'))
}

exports.default = parallel(styles, scripts, images, fonts, pages, watching)
exports.build = series(cleanDist, building);
exports.sprite = sprite