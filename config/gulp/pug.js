import conf from '../config.json';
import pkg from '../../package.json';
import gulp from 'gulp';
import puglint from 'gulp-pug-lint';
import pug from 'gulp-pug';
import inject from 'gulp-inject';

 let handleError = (err)=>{
  console.log(err.toString());
  this.emit('end');
}

gulp.task('pug:build', ()=>{
  'use strict';
    let myLocals = {
    'appName': pkg.name
  };

  return gulp.src([conf.base.src + conf.files.pug])
    .pipe(puglint())
    .pipe(pug({
      locals: myLocals,
      pretty: true
    }))
    .on('error', handleError)
    .pipe(inject(gulp.src(conf.vendor.js, {read: false}), {addRootSlash: false}))
    .pipe(gulp.dest(conf.base.build));
});
