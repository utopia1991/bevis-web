// 载入需要的依赖和插件
var gulp = require('gulp'),
    less = require('gulp-less'),                    // less 编译成 css
    minifyCss = require('gulp-minify-css'),         // css 压缩
    rev = require('gulp-rev'),                      // 对文件名加MD5后缀
    revCollector = require('gulp-rev-collector'),   // 路径替换
    del = require('del'),                           // 删除文件

    _srcname = './client',
    _dirname = './assets',
    _rev = './rev',
    cssSrc = _srcname + '/less/**/*',
    cssRevSrc = _srcname + '/less/revCss',
    cssDest = _dirname + '/client/less';

// 压缩,合并 CSS,生成版本号
gulp.task('miniCss', function () {
    return gulp.src(cssRevSrc + '/**/*')
        .pipe(less())                       // less 转 css
        .pipe(minifyCss())                  // 压缩 css 文件
        .pipe(rev())                        // 文件名加 MD5 后缀
        .pipe(gulp.dest(cssDest))           // 直接输出到目标路径
        .pipe(rev.manifest())               // 生成一个 rev-manifest.json
        .pipe(gulp.dest(_rev + '/less'));   // 将 rev-manifest.json 保存到 rev 目录内
});

gulp.task('revCss', function () {
    return gulp.src([_rev + '/**/*.json', cssSrc])
        .pipe(revCollector())
        .pipe(gulp.dest(cssRevSrc));
});

gulp.task('delRevCss', function(){
    del([
        cssRevSrc,
        _rev
    ]);
});

gulp.task('css',['miniCss','revCss']);