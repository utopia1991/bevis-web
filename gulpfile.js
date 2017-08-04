var gulp = require('gulp'),
  connect = require('gulp-connect'), // 页面同步刷新
  runSequence = require('run-sequence'),
  del = require('del'), // 删除文件
  nodemon = require('gulp-nodemon'),
  browserSync = require('browser-sync').create(),
  requireDir = require('require-dir'),
  gulp_config = require('./gulp/gulp_config'),
  devConfig = require('./config'),
  port = gulp_config.port || 2001,
  htmlSrc = gulp_config.htmlSrc,
  cssSrc = gulp_config.cssSrc,
  jsSrc = gulp_config.jsSrc,
  imgSrc = gulp_config.imgSrc;

// 递归引入gulp/tasks目录下的文件
requireDir('./gulp', {
  recurse: true
});

// 清除打包文件
gulp.task('clean', function() {
  return del(['assets/*']);
});

// 编译资源文件
// gulp.task('build', function(done) {
//   runSequence(['clean'], ['images'], ['css'], ['js'], ['html'], done);
// });

gulp.task('connect', function() {
  connect.server({
    name: 'App',
    root: ['web'],
    port: port,
    livereload: true
  });
});

gulp.task('watch', function() {
  gulp.watch([htmlSrc], ['htmlDev']);
  gulp.watch([cssSrc], ['cssDev']);
  gulp.watch([jsSrc], ['jsDev']);
  gulp.watch([imgSrc], ['imagesDev']);
});

gulp.task('init', ['connect', 'less', 'watch']);

// 启动 Server
gulp.task('node', function() {
  // 启动 node express
  nodemon({
    script: 'index.js',
    env: {
      'NODE_ENV': 'development'
    }
  });
});

// 文件变化监控
gulp.task('start', ["node", "init"], function() {
  var files = [
    'views/**/*.html',
    'views/**/*.hbs',
    'public/**/*.*'
  ];

  browserSync.init(files, {
    proxy: 'http://localhost:' + devConfig.port,
    browser: 'chrome',
    notify: false
  });
});
