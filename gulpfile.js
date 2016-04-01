// *************************************
//
//   Solomon - Gulp Setup
//
// *************************************

'use strict';

// -------------------------------------
//   Foundation
// -------------------------------------

// ----- Requires ----- //

var gulp = require("gulp"),
    connect = require ("gulp-connect"),
    imageOptim = require('gulp-imageoptim'),
    nunjucksRender = require('gulp-nunjucks-render'),
    sass = require("gulp-sass"),
    sourcemaps = require('gulp-sourcemaps');

// ----- Task: Default ----- //

gulp.task("default", ["connect", "watch"]);

// -------------------------------------
//   Server
// -------------------------------------

gulp.task("connect", function() {
  connect.server({
    root: "build",
    livereload: true
  });
});

// -------------------------------------
//   Assets
// -------------------------------------

gulp.task("images", function() {
  gulp.src("./source/assets/images/*")
    .pipe(imageOptim.optimize())
    .pipe(gulp.dest("./build/assets/images"))
    .pipe(connect.reload());
});

gulp.task("styles", function() {
  gulp.src("./source/assets/stylesheets/*.sass")
    .pipe(sourcemaps.init())
    .pipe(sass({outputStyle: 'compressed'}).on("error", sass.logError))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest("./build/assets"))
    .pipe(connect.reload());
});

gulp.task("scripts", function() {
  gulp.src("./source/assets/javascripts/*.js")
    .pipe(gulp.dest("./build/assets"))
    .pipe(connect.reload());
});

gulp.task("template", function() {
  gulp.src("./source/**/*.html")
    .pipe(nunjucksRender({
      path: ["./source/shared"]
    }))
    .pipe(gulp.dest("./build"))
    .pipe(connect.reload());
});

gulp.task("watch", ["images", "styles", "scripts", "template"], function() {
  gulp.watch(["./source/**/*.html"], ["template"]);
  gulp.watch(["./source/assets/images/**/*"], ["images"]);
  gulp.watch(["./source/assets/javascripts/**/*"], ["scripts"]);
  gulp.watch(["./source/assets/stylesheets/**/*"], ["styles"]);
});