/// Gulp configuration for Typescript, SASS and Live Reload

'use strict';

var gulp = require('gulp'),
    plumber = require('gulp-plumber'),
    del = require('del'),

    sass = require('gulp-sass'),

    typescript = require('gulp-typescript'),
    sourcemaps = require('gulp-sourcemaps'),
    tsConfigGlob = require('tsconfig-glob'),
    merge = require('merge2'),

    webserver = require('gulp-webserver'),
    config = require('./gulpfile.config.json'),
    packageConfig = require('./package.json'),
    errorHandler = function (error) {
        console.log(error);
        this.emit('end');
    };

var tsProject = typescript.createProject('./tsconfig.json', { sortdest: true });

gulp.task('clean', function (done) {
    return del(config.app.dest, done);
});

gulp.task('ref', function () {
    return tsConfigGlob();
});

gulp.task('install', ['clean', 'ref'], function (done) {
    return Object.keys(packageConfig.overrides)
        .map(function (libraryName) {
            try {
                var library = packageConfig.overrides[libraryName];
                if (Array.isArray(library)) {
                    var files = library.map(function (filePath) {
                        console.log('Copied: ', filePath);
                        return config.lib.source + "/" + libraryName + "/" + filePath;
                    });
                    return gulp.src(files)
                        .pipe(plumber(errorHandler))
                        .pipe(gulp.dest(config.lib.dest));
                }
                else {
                    var file = config.lib.source + "/" + libraryName + "/" + library;
                    console.log('Copied: ', library);
                    return gulp.src(file)
                        .pipe(plumber(errorHandler))
                        .pipe(gulp.dest(config.lib.dest));
                }
            }
            catch (exception) {
                console.error('Failed to load package: ', libraryName);
            }
        });
});

gulp.task('compile:sass', function () {
    return gulp.src(config.app.source + "/**/*.scss")
        .pipe(plumber(errorHandler))
        .pipe(sass())
        .pipe(gulp.dest(config.app.dest));
});

gulp.task('compile:ts', function () {
    var tsResult = tsProject.src()
        .pipe(sourcemaps.init())
        .pipe(plumber(errorHandler))
        .pipe(typescript(tsProject));

    tsResult.js
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest(config.app.dest));
});

gulp.task('copy', function () {
    gulp.src(config.app.source + "/**/!(*.ts|*.scss)", { base: config.app.source })
        .pipe(plumber(errorHandler))
        .pipe(gulp.dest(config.app.dest));
});

gulp.task('watch', function () {
    gulp.watch(config.app.source + "/**/*.scss", ['compile:sass']);
    gulp.watch(config.app.source + "/**/*.ts", ['compile:ts']);
    gulp.watch(config.app.source + "/**/!(*.ts|*.scss)", ['copy']);
});

gulp.task('build', ['compile:sass', 'compile:ts', 'copy']);
gulp.task('default', ['build', 'watch'], function () {
    return gulp.src(config.app.dest)
        .pipe(plumber(errorHandler))
        .pipe(webserver({
            host: config.server.host,
            port: config.server.port,
            directoryListing: config.server.directoryListing,
            https: config.server.https,
            livereload: {
                enable: true,
                liveCSS: true
            },
            fallback: config.server.fallback
        }));
});