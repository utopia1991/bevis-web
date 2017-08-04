var gulp = require('gulp'),
  gulp_config = require('./gulp_config'),
  connect = require('gulp-connect'), // 页面同步刷新
  eslint = require('gulp-eslint'), //语法检查
  jsSrc = gulp_config.jsSrc,
  jsDevDest = gulp_config.jsDevDest,
  jsDest = gulp_config.jsDest;

gulp.task('jsDev', function() {
  // ESLint ignores files with "node_modules" paths.
  return gulp.src([jsSrc, '!public/js/libs/**'])
    .pipe(eslint({
      rules: {
        // 使用 === 替代 == allow-null允许null和undefined
        "eqeqeq": [2, "allow-null"],
        'no-eq-null': 0,
        "no-eval": 2,
        'guard-for-in': 1,
        'no-use-before-define': 0,
        'no-obj-calls': 2,
        'no-unused-vars': 0,
        'no-shadow': 0,
        'no-invalid-regexp': 2,
        'comma-dangle': 2,
        'no-new': 1,
        'no-debugger': 2,
        'no-caller': 1,
        'quotes': 0,
        // 禁止在return、throw、continue 和 break语句之后出现不可达代码
        'no-unreachable': 2
      },
      globals: [
        'jQuery',
        '$'
      ],
      envs: [
        'browser'
      ]
    }))
    .pipe(eslint.format())
    .pipe(connect.reload());
});

// 从开发目录复制js文件到编译目录
gulp.task('js', function() {
  return gulp.src(jsSrc)
    .pipe(gulp.dest(jsDest));
});
