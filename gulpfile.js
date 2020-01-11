const gulp = require('gulp');
const autopref = require('gulp-autoprefixer');
const bs = require('browser-sync').create();
const csso = require('gulp-csso');
const htmlminify = require('gulp-html-minifier');
const jsmin = require('gulp-jsmin');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const babel = require('gulp-babel');

gulp.task('jsgood', function(e) {
    return gulp.src('./src/script.js')
        .pipe(sourcemaps.init())
        .pipe(babel())
        .pipe(jsmin())
        .pipe(sourcemaps.write("."))
        .pipe(gulp.dest('dist'));
});

gulp.task('htmlmin', function(e) {
    return gulp.src('./src/*.html')
        .pipe(htmlminify({collapseWhitespace: true}))
        .pipe(gulp.dest('./dist'));
})

gulp.task('sass', function(e) {
    return gulp.src('./src/main.sass')
        .pipe(sass())
        .pipe(autopref())
        .pipe(gulp.dest('./src'))
        .pipe(csso())
        .pipe(gulp.dest('./dist'))
        .pipe(bs.stream());
});


gulp.task('dev-server', function(e) {

    gulp.parallel('htmlmin', 'sass', 'jsgood');

    bs.init({
        server: './src'
    });

    gulp.watch('src/*.html', gulp.parallel('htmlmin')).on('change', bs.reload);
    gulp.watch('src/main.sass', gulp.parallel('sass'));
    gulp.watch('src/*.js', gulp.parallel('jsgood')).on('change', bs.reload);

});

gulp.task('default', gulp.parallel('htmlmin', 'sass', 'jsgood', 'dev-server'));







