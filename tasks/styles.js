const { src, dest } = require('gulp');
const autoprefixer = require('gulp-autoprefixer');
const concat = require('gulp-concat');
const scss = require('gulp-sass')(require('sass'));


function styles() {
    return src('src/scss/style.scss')
        .pipe(autoprefixer({overrideBrowserslist: ['last 10 version']}))
        .pipe(concat('style.min.css'))
        .pipe(scss({outputStyle: "compressed"}))
        .pipe(dest('dist/css'))
}

module.exports = styles