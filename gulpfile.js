'use strict';

var gulp = require('gulp'),
    plumber = require('gulp-plumber'),
    bower = require('gulp-bower'),
    mainBowerFiles = require('main-bower-files'),
    del = require('del'),

    sass = require('gulp-sass'),

    inject = require('gulp-inject'),
    typescript = require('gulp-tsc'),
    tsConfig = require('tsconfig-glob'),
    merge = require('merge2'),

    connect = require('gulp-connect'),
    config = require('./gulpfile.config.json'),
    errorHandler = function (error) {
        console.log(error);
        this.emit('end');
    };

gulp.task('clean:bower', function (done) {
    return del(['./bower_components', './lib'], done);
});

gulp.task('clean:sass', function (done) {
    return del(config.sass.output, done);
});

gulp.task('clean:ts', function (done) {
    return del(config.ts.output, done);
});

gulp.task('clean:html', function (done) {
    return del(config.html.output + '/**/*.html', done);
});

gulp.task('bower:download', ['clean:bower'], function () {
    return bower();
});

gulp.task('bower:install', ['bower:download'], function () {
    var filterCss = gulp.src(mainBowerFiles({ filter: /.*\.css$/i }))
        .pipe(gulp.dest(config.lib.css)),

        filterJs = gulp.src(mainBowerFiles({ filter: /.*\.js$/i }))
            .pipe(gulp.dest(config.lib.js)),

        filterFonts = gulp.src(mainBowerFiles({ filter: /.*\.ttf$/i }))
            .pipe(gulp.dest(config.lib.fonts));

    return merge([filterCss, filterJs, filterFonts]);
});

gulp.task('compile:sass', ['clean:sass'], function () {
    return gulp.src(config.sass.input)
        .pipe(plumber(errorHandler))
        .pipe(sass())
        .pipe(gulp.dest(config.sass.output))
        .pipe(connect.reload());
});

gulp.task('generate-references', ['clean:ts'], function () {
    return tsConfig();
});

gulp.task('compile:ts', ['generate-references'], function () {
    return gulp.src(config.ts.input)
        .pipe(plumber(errorHandler))
        .pipe(typescript({
            target: "es5",
            module: "system",
            declaration: false,
            noImplicitAny: false,
            removeComments: false,
            inlineSourceMap: true,
            outDir: config.ts.output
        }))
        .pipe(gulp.dest(config.ts.output))
        .pipe(connect.reload());
});

gulp.task('copy:html', ['clean:html'], function () {
    gulp.src(config.html.input, { base: config.html.base })
        .pipe(plumber(errorHandler))
        .pipe(gulp.dest(config.html.output));
});

gulp.task('serve', ['compile:sass', 'compile:ts', 'copy:html'], function () {
    connect.server({
        root: config.server.root,
        host: config.server.host,
        port: config.server.port,
        fallback: config.server.fallback,
        livereload: true
    });
});

gulp.task('server:reload', ['copy:html'], function () {
    gulp.src(config.html.input)
        .pipe(connect.reload())
        .pipe(plumber(errorHandler));
});

gulp.task('watch', function () {
    gulp.watch(config.sass.input, ['compile:sass']);
    gulp.watch(config.ts.input, ['compile:ts']);
    gulp.watch(config.html.input, ['server:reload']);
});

gulp.task('build', ['serve', 'watch']);
