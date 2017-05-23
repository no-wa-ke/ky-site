import conf from '../config.json';
import options from './options';
import gulp from 'gulp';
// import scp from 'gulp-rsync';
import runSequence from 'run-sequence';
import rsync from 'gulp-rsync';

gulp.task('rsync', function() {
  // return gulp.src(options.src)
  // .pipe(rsync({
  //   root: conf.base.compile,
  //   hostname: options.host,
  //   username: 'webadmin',
  //   destination: options.dest,
  //   archive: true,
  //   silent: false,
  //   compress: true
  // }))
  return rsync({
    root: 'build/',
    hostname: 'aws',
    destination: '/var/www/html/',
    chmod: 'a+rwx'
  })
  .on('error', function(err) {
    console.log(err);
  });
});
