import conf from '../config.json';
import gulp from 'gulp';
import usemin from 'gulp-usemin';
import uglify from 'gulp-uglify';
import cleanCss from 'gulp-clean-css';
import rev from 'gulp-rev';


gulp.task('usemin', function() {
  'use strict';
  return gulp.src(conf.base.build + '*.html')
    .pipe(usemin({
      css: [ cleanCss, 'concat', rev ],
      js: [ uglify, rev ]
    }))
    .pipe(gulp.dest(conf.base.compile));
});
