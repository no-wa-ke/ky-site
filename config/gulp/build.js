import gulp from 'gulp';
import runSequence from 'run-sequence';
var rsync = require('gulp-rsync');

gulp.task('build', function (cb){
  'use strict';
  return runSequence('clean', ['copy:build', 'pug:build', 'sass', 'js:build','js:vendor-build'], cb);
});


gulp.task('deploy', function (cb){
  'use strict';
  return runSequence('clean', ['copy:build', 'pug:build', 'sass', 'js:build-prod','js:vendor-build'], 'rsync');

});
