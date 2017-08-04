var gulp = require('gulp'),
  imagemin = require('gulp-imagemin'), // 图片压缩
  gulp_config = require('./gulp_config'),
  connect = require('gulp-connect'), // 页面同步刷新
  imgSrc = gulp_config.imgSrc,
  imgDest = gulp_config.imgDest;

gulp.task('imagesDev', function() {
  return gulp.src(imgSrc)
    .pipe(connect.reload());
});

// 压缩 Images
gulp.task('images', function() {
  return gulp.src(imgSrc)
    .pipe(imagemin({
      optimizationLevel: 3, // png,1~7
      progressive: true, // jpg
      interlaced: true // gif
    }))
    .pipe(gulp.dest(imgDest));
});
