const { src } = require('gulp');
const clean = require('gulp-clean');

function clear() {
    return src('dist')
        .pipe(clean())
}

module.exports = clear;