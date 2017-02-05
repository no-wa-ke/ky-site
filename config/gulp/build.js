import gulp from 'gulp';
import runSequence from 'run-sequence';

gulp.task('build', function (cb){
  'use strict';
  return runSequence('clean', ['copy:build', 'pug:build', 'sass', 'js:build','js:vendor-build'], cb);
});
