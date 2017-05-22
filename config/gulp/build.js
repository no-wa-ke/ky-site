import gulp from 'gulp';
import runSequence from 'run-sequence';
import rsync from 'gulp-rsync';

gulp.task('build', function (cb){
  'use strict';
  return runSequence('clean', ['copy:build', 'pug:build', 'sass', 'js:build','js:vendor-build'], cb);
});
gulp.task('build-prod', function (cb){
  'use strict';

  const deploy = ()=>{
    rsync({
      root: 'build/',
      hostname: 'aws',
      destination: '/var/www/html/',
      chmod: 'a+rwx'
    })
  }
  return runSequence('clean', ['copy:build', 'pug:build', 'sass', 'js:build-prod','js:vendor-build'], rsync);
});
