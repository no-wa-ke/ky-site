import conf from '../config.json';
import gulp from 'gulp';
import webpack from 'gulp-webpack';
import eslint from 'gulp-eslint';
import webpackConfig from '../webpack.conf';
import webpackProdConfig from '../webpack.prod.conf';

/*
gulp.task('js:riot',()=>{
  'use strict';
  return gulp.src([conf.base.src + conf.files.tag])
  .pipe(riot({
    template: 'jade'
  }))
  .pipe(gulp.dest(conf.base.tmp));
})
*/

gulp.task('js:vendor-build',function(){
  'use strict';
  return gulp.src([conf.base.src + conf.files.vendor_js])
  .pipe(webpack({

    loaders :[{
      test: /\.js$/,
      loader: 'babel-loader',
      exclude: /node_modules/,
      query: {
        presets: ['es2015','stage-0','stage-2'],
        plugins: ['external-helpers-2'],
      }
    }],
      output:{
        filename: 'vendor.js'
      },
    }))
  .pipe(gulp.dest(conf.base.build + conf.path.js));
})

gulp.task('js:build', function() {
  'use strict';
  return gulp.src
  ([conf.base.src + conf.path.js+conf.files.bundle_js,
    // conf.base.src + conf.files.tag
    // conf.base.tmp + conf.files.js
  ])
  // .pipe(eslint({configFile: './.eslintrc.json'}))
  // .pipe(eslint.format())
  .pipe(webpack(webpackConfig))
  .pipe(gulp.dest(conf.base.build + conf.path.js));
});

gulp.task('js:build-prod', function() {
  'use strict';
  return gulp.src
  ([conf.base.src + conf.path.js+conf.files.bundle_js,
    // conf.base.src + conf.files.tag
    // conf.base.tmp + conf.files.js
  ])
  // .pipe(eslint({configFile: './.eslintrc.json'}))
  // .pipe(eslint.format())
  .pipe(webpack(webpackProdConfig))
  .pipe(gulp.dest(conf.base.build + conf.path.js));
});
