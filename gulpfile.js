/// Gulp configuration for Typescript, SASS and Live Reload

'use strict';

var gulp = require('gulp'),
    plumber = require('gulp-plumber'),
    bower = require('gulp-bower'),
    mainBowerFiles = require('main-bower-files'),
    filter = require('gulp-filter'),
    del = require('del'),

    sass = require('gulp-sass'),

    typescript = require('gulp-typescript'),
    sourcemaps = require('gulp-sourcemaps'),
    tsConfigGlob = require('tsconfig-glob'),
    merge = require('merge2'),

    connect = require('gulp-connect'),
    config = require('./gulpfile.config.json'),
    errorHandler = function (error) {
        console.log(error);
        this.emit('end');
    };

var tsProject = typescript.createProject('./tsconfig.json', { sortdest: true });

gulp.task('clean', function (done) {
    return del([config.lib.source, config.lib.dest, config.app.dest], done);
});

gulp.task('bower:download', ['clean'], function () {
    return bower();
});

gulp.task('bower:install', ['bower:download'], function () {
    return gulp.src(mainBowerFiles({ base: config.lib.source }))
        .pipe(gulp.dest(config.lib.dest));
});

gulp.task('compile:sass', function () {
    return gulp.src(config.app.source + "/**/*.scss")
        .pipe(plumber(errorHandler))
        .pipe(sass())
        .pipe(gulp.dest(config.app.dest))
        .pipe(connect.reload());
});

gulp.task('generate-references', function () {
    return tsConfigGlob();
});

gulp.task('compile:ts', ['generate-references'], function () {
    var tsResult = tsProject.src()
        .pipe(sourcemaps.init())
        .pipe(plumber(errorHandler))
        .pipe(typescript(tsProject));

    tsResult.js
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest(config.app.dest))
        .pipe(connect.reload());
});

gulp.task('copy', function () {
    gulp.src([
        "!" + config.app.source + "/**/*.scss",
        "!" + config.app.source + "/**/*.ts",
        config.app.source + "/**/*.*"
    ], { base: config.app.source })
        .pipe(plumber(errorHandler))
        .pipe(gulp.dest(config.app.dest));
});

gulp.task('serve', ['compile:sass', 'compile:ts', 'copy'], function () {
    connect.server({
        root: config.server.root,
        host: config.server.host,
        port: config.server.port,
        fallback: config.server.fallback,
        livereload: true
    });
});

gulp.task('server:reload', ['copy'], function () {
    gulp.src([
        "!" + config.app.source + "/**/*.scss",
        "!" + config.app.source + "/**/*.ts",
        config.app.source + "/**/*.*"
    ])
        .pipe(connect.reload())
        .pipe(plumber(errorHandler));
});

gulp.task('watch', function () {
    gulp.watch(config.app.source + "/**/*.scss", ['compile:sass']);
    gulp.watch(config.app.source + "/**/*.ts", ['compile:ts']);
    gulp.watch([
        "!" + config.app.source + "/**/*.scss",
        "!" + config.app.source + "/**/*.ts",
        config.app.source + "/**/*.*"
    ], ['server:reload']);
});

gulp.task('default', ['serve', 'watch']);