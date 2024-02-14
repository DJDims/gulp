const { src, dest } = require('gulp');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify-es').default;

function scripts() {
    return src('src/js/main.js')
        .pipe(concat('main.min.js'))
        .pipe(uglify())
        .pipe(dest('dist/js'))
}

module.exports = scripts;