import conf from '../config.json';
import gulp from 'gulp';
import sass from 'gulp-sass';
import sassLint from 'gulp-sass-lint';
import autoprefixer from 'gulp-autoprefixer';
import sourcemaps from 'gulp-sourcemaps';

function handleError(err) {
  console.log(err.toString());
  this.emit('end');
}

gulp.task('sass', function () {
  'use strict';

  gulp.src([
    conf.base.src + conf.path.sass + conf.files.sassAll,
    '!' + conf.base.src + conf.path.sass + '**/_mixins.scss'
  ])
  // .pipe(sassLint({configFile: './.sass-lint.yml'}))
  // .pipe(sassLint.format());

  return gulp.src(conf.base.src + conf.path.sass + conf.files.sass)
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({
        browsers: ['last 3 versions'],
        // cascade: false
    }))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(conf.base.build + conf.path.css));
});
