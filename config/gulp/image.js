import conf from '../config.json';
import gulp from 'gulp';
import imagemin from 'gulp-imagemin';

gulp.task('imagemin:compile', function() {
  'use strict';
  return gulp.src([conf.base.src + conf.path.images + conf.files.images], {base: './' + conf.base.src})
  .pipe(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true }))
  .pipe(gulp.dest(conf.base.compile));
});
