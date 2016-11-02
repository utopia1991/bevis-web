var gulp = require('gulp'),
    htmlmin = require('gulp-htmlmin'),              // html 压缩
    revCollector = require('gulp-rev-collector'),   // 路径替换

    _dirname = './assets',
    _rev = './rev',
    htmlSrc = './views';

// Html 引入文件版本, 压缩html
gulp.task('html', function () {
    return gulp.src([_rev+'/**/*.json', htmlSrc+'/*'])
        .pipe(revCollector())
        .pipe(htmlmin({
            collapseWhitespace: true,
            collapseBooleanAttributes: true,
            removeComments: true
        }))
        .pipe(gulp.dest(_dirname+'/views'));
});