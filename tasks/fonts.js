const { src, dest } = require('gulp');
const fonter = require('gulp-fonter');
const ttf2woff2 = require('gulp-ttf2woff2');

function fonts() {
    return src('src/fonts/src/*.*')
        .pipe(fonter({
            formats: ['woff', 'ttf']
        }))
        .pipe(src('src/fonts/*.ttf'))
        .pipe(ttf2woff2())
        .pipe(dest('src/fonts/dist'))
}

module.exports = fonts;