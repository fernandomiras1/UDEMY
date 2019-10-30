const gulp = require('gulp'),
  consolidate = require('gulp-consolidate'),
  iconfont = require('gulp-iconfont');
const rootDir = path.join(__dirname, '../../..');
const libDir = path.join(rootDir, 'src/lib');
const fontName = 'iconsFont'
gulp.task('iconfont', function () {
  return gulp.src(`${libDir}/assets/icons/svg/*.svg`)
    .pipe(plugins.iconfont({
      fontName: fontName,
      appendUnicode: true,
      formats: ['ttf', 'eot', 'woff']
    })).on('glyphs', function (glyphs) {
      gulp.src(`${libDir}/build-tools/templates/icon-template.scss`)
        .pipe(plugins.consolidate('lodash', {
          glyphs: glyphs,
          fontName: fontName,
          fontPath: `${libDir}/assets/fonts`,
          className: 'myfont'
        }))
        .pipe(plugins.rename(`_${fontName}.scss`))
        .pipe(gulp.dest(`${libDir}/assets/icons/font/`));
    })
    .pipe(gulp.dest(`${libDir}/assets/icons/font/`));
});
