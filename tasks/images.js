const { src, dest } = require('gulp');
const newer = require('gulp-newer');
const webp = require('gulp-webp');
const imagemin = require('gulp-imagemin');

function images() {
    return src(['src/images/*.*', '!src/images/*.svg'])
        
        .pipe(src('src/images/*.*'))
        .pipe(newer('dist/images'))
        .pipe(webp())
        
        .pipe(src('src/images/*.*'))
        .pipe(newer('dist/images'))
        .pipe(imagemin())

        .pipe(dest('dist/images'))
}

module.exports = images;