var gulp = require('gulp'),
    imagemin = require('gulp-imagemin'),            // 图片压缩
    rev = require('gulp-rev'),                      // 对文件名加MD5后缀

    _srcname = './client',
    _dirname = './assets',
    _rev = './rev',
    imgSrc = _srcname + '/images/**/*',
    imgDest = _dirname + '/client/images';

// 压缩 Images, 生成版本号
gulp.task('images', function() {
    return gulp.src(imgSrc)
        .pipe(imagemin({
            optimizationLevel: 3,   // png,1~7
            progressive: true,      // jpg
            interlaced: true        // gif
        }))
        .pipe(rev())
        .pipe(gulp.dest(imgDest))
        .pipe(rev.manifest())
        .pipe(gulp.dest(_rev+'/images'));
});