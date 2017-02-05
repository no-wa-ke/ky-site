import conf from '../config.json';
import gulp from 'gulp';
import del from 'del';

gulp.task('clean', function (cb) {
  'use strict';
  return del([conf.base.build, conf.base.compile], cb);
});
