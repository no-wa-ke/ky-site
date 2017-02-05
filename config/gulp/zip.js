import conf from '../config.json';
import gulp from 'gulp';
import zip from 'gulp-zip';
import runSequence from 'run-sequence';
import git from 'gulp-git';

gulp.task('delivery', function (cb){
  'use strict';
  runSequence('compile', 'zip:compile', cb);
});

gulp.task('zip:build', function () {
  'use strict';
  git.exec({args : 'describe --tags'}, function (err, stdout) {
    var name = stdout.replace(/\r?\n|\r/g,'');
    return gulp.src([conf.base.build + '*', conf.base.build + '.*'])
    .pipe(zip('release-build' + name + '.zip'))
    .pipe(gulp.dest('.'));
  });
});

gulp.task('zip:compile', function () {
  'use strict';
  git.exec({args : 'describe --tags'}, function (err, stdout) {
    var name = stdout.replace(/\r?\n|\r/g,'');
    return gulp.src([conf.base.compile + '*', conf.base.compile + '.*'])
    .pipe(zip('release-compile' + name + '.zip'))
    .pipe(gulp.dest('.'));
  });
});
