const { src, dest } = require('gulp');
const svg = require('gulp-svg-sprite');

function sprite() {
    return src('src/images/dist/*.svg')
        .pipe(svg({
            mode: {
                stack: {
                    sprite: '../sprite.svg',
                    example: true
                }
            }
        }))
        .pipe(dest('src/images/dist'))
}

module.exports = sprite;