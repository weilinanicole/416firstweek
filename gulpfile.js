var gulp = require('gulp');
var scss = require('gulp-sass');
var minCss = require('gulp-clean-css');
var minHtml = require('gulp-htmlmin');
var minJs = require('gulp-uglify');
var server = require('gulp-webserver');
gulp.task('minCss', function() {
    gulp.src(['src/css/*.css', '!src/css/*.min.css'])
        .pipe(scss())
        .pipe(minCss())
        .pipe(gulp.dest('dist/css'))
});
var options = {
    removeComments: true, //清除HTML注释
    collapseWhitespace: true, //压缩HTML
    collapseBooleanAttributes: true, //省略布尔属性的值 <input checked="true"/> ==> <input />
    removeEmptyAttributes: true, //删除所有空格作属性值 <input id="" /> ==> <input />
    removeScriptTypeAttributes: true, //删除<script>的type="text/javascript"
    removeStyleLinkTypeAttributes: true, //删除<style>和<link>的type="text/css"
    minifyJS: true, //压缩页面JS
    minifyCSS: true, //压缩页面CSS
}
gulp.task('minHtml', function() {
    gulp.src('src/*.html')
        .pipe(minHtml(options))
        .pipe(gulp.dest('dist'))
});
gulp.task('minJs', function() {
    gulp.src(['src/js/*.js', '!src/js/*.min.js'])
        .pipe(minJs())
        .pipe(gulp.dest('dist/js'))
});
gulp.task('server', function() {
    gulp.src('src')
        .pipe(server({
            port: 8080,
            open: true,
            livereload: true,
            middleware: function(req, res, next) {
                next()
            }
        }))
})
gulp.task('default', ['minCss', 'minHtml', 'minJs', 'server'])