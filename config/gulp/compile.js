import gulp from 'gulp';
import runSequence from 'run-sequence';

gulp.task('compile', function (cb){
  'use strict';
  runSequence('build', ['copy:compile', 'imagemin:compile'], 'usemin', cb);
});
