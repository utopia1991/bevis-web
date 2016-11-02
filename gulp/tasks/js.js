// 载入需要的依赖和插件
var gulp = require('gulp'),
    less = require('gulp-less'),                    // less 编译成 css
    uglify = require('gulp-uglify'),                // js 压缩
    del = require('del'),                           // 删除文件
    rev = require('gulp-rev'),                      // 对文件名加MD5后缀

    _srcname = './client',
    _dirname = './assets',
    _rev = './rev',
    jsSrc = _srcname + '/js/**/*',
    jsDest = _dirname + '/client/js';

// 压缩 JS, 生成版本号
gulp.task('js', function() {
    return gulp.src(jsSrc)
        .pipe(uglify())
        .pipe(rev())
        .pipe(gulp.dest(jsDest))
        .pipe(rev.manifest())
        .pipe(gulp.dest(_rev+'/js'));
});