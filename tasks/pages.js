const { src, dest } = require('gulp');
const pug = require('gulp-pug');


function pages() {
    return src('src/pug/*.pug')
        .pipe(pug())
        .pipe(dest('dist'))
}

module.exports = pages;