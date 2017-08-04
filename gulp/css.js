var gulp = require('gulp'),
  less = require('gulp-less'), // less 编译成 css
  minifyCSS = require('gulp-csso'), // 压缩 css
  connect = require('gulp-connect'), // 页面同步刷新
  gulp_config = require('./gulp_config'),
  autoprefixer = require('gulp-autoprefixer'),
  cssSrc = gulp_config.cssSrc,
  cssDevDest = gulp_config.cssDevDest,
  cssDest = gulp_config.cssDest,
  browsersLists = [
    'last 2 version', // 主流浏览器最近2个版本
    '> 0.1%', // 全球统计有超过0.1%的使用率
    'Firefox > 20' // 火狐版本大于20
  ];

gulp.task('less', function() {
  return gulp.src(cssSrc)
    .pipe(less()) // less 转 css
    .pipe(autoprefixer({
      browsers: browsersLists,
      cascade: true // 是否对齐属性值
    }))
    .pipe(gulp.dest(cssDevDest));
});

// 编译less为css，开发环境
gulp.task('cssDev', function() {
  return gulp.src(cssSrc)
    .pipe(less()) // less 转 css
    .pipe(autoprefixer({
      browsers: browsersLists,
      cascade: true
    }))
    .pipe(gulp.dest(cssDevDest)) // 输出 css 文件
    .pipe(connect.reload());
});

// css 资源转移
gulp.task('css', function() {
  return gulp.src(cssSrc)
    .pipe(less()) // less 转 css
    .pipe(autoprefixer({
      browsers: browsersLists,
      cascade: true
    }))
    .pipe(gulp.dest(cssDest)); // 输出 css 文件
});
