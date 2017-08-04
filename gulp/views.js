var gulp = require('gulp'),
  gulp_config = require('./gulp_config'),
  connect = require('gulp-connect'), // 页面同步刷新
  htmlmin = require('gulp-htmlmin'), // html 压缩
  htmlSrc = gulp_config.htmlSrc,
  htmlDest = gulp_config.htmlDest;

gulp.task('htmlDev', function() {
  return gulp.src(htmlSrc)
    .pipe(connect.reload());
});

// 从开发目录复制html文件到编译目录，压缩html
gulp.task('html', function() {
  return gulp.src(htmlSrc)
    .pipe(htmlmin({
      collapseWhitespace: true,
      collapseBooleanAttributes: true,
      removeComments: true
    }))
    .pipe(gulp.dest(htmlDest));
});
