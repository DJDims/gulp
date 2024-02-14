const { src, dest, watch, parallel, series } = require('gulp');
const browserSync = require('browser-sync').create();

//tasks
const clear = require('./tasks/clear.js');
const fonts = require('./tasks/fonts.js');
const images = require('./tasks/images.js');
const pages = require('./tasks/pages.js');
const scripts = require('./tasks/scripts.js');
const sprite = require('./tasks/sprite.js');
const styles = require('./tasks/styles.js');

// //watch for a changes
function watching() {
    browserSync.init({
        server: {
            baseDir: 'dist/'
        }
    });

    watch(['src/scss/style.scss'], styles);
    watch(['src/js/main.js'], scripts);
    watch(['src/images/'], images);
    watch(['src/fonts/'], fonts);
    watch(['src/pug/**/*.pug'], pages);
    watch(['dist/**/*.*']).on('all', browserSync.reload);
}

exports.default = parallel(styles, scripts, images, fonts, pages, watching)