import conf from '../config.json';
import gulp from 'gulp';
import runSequence from 'run-sequence';
import browserSync from 'browser-sync';
import historyApiFallback from 'connect-history-api-fallback';

browserSync.create()


gulp.task('browser-sync:build', function() {
  'use strict';
  browserSync.init({
    server: {
      baseDir: conf.base.build
    },
    reloadDebounce: 2000,
    middleware:[historyApiFallback()],
    notify: false,
    open:false
  });
});

gulp.task('browser-sync:compile', function() {
  'use strict';
  browserSync.init({
    server: {
      baseDir: conf.base.compile
    },
    reloadDebounce: 2000,
    middleware:[historyApiFallback()],
    notify: false,
    open:false
  });
});

gulp.task('watch', function () {
  'use strict';
  gulp.watch(conf.base.src + conf.path.sass + conf.files.sassAll, ['sass', browserSync.reload]);
  gulp.watch(conf.base.src + conf.path.js + conf.files.js, ['js:build', browserSync.reload]);
  gulp.watch(conf.base.src + conf.path.js + conf.files.tag, ['js:build', browserSync.reload]);
  gulp.watch(conf.base.src + conf.files.pug, ['pug:build', browserSync.reload]);
});
