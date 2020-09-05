"use strict";

var gulp = require("gulp");
var plumber = require("gulp-plumber");
var sourcemap = require("gulp-sourcemaps");
var rename = require("gulp-rename");
var server = require("browser-sync").create();
var sass = require("gulp-sass");
var postcss = require("gulp-postcss");
var autoprefixer = require("autoprefixer");
var csso = require("gulp-csso");
var imagemin = require("gulp-imagemin");
var webp = require("gulp-webp");
var svgstore = require("gulp-svgstore");
var posthtml = require("gulp-posthtml");
var include = require("posthtml-include");

var del = require("del");
var htmlmin = require("gulp-htmlmin");
var uglify = require("gulp-uglify");
var pipeline = require('readable-stream').pipeline;
var concat = require("gulp-concat");

/*Создаёт css файл и минимализирует его*/
gulp.task("css", function () {
  return gulp.src("source/sass/style.scss")
    .pipe(plumber())
    .pipe(sourcemap.init())
    .pipe(sass())
    .pipe(postcss([
      autoprefixer()
    ]))
    .pipe(gulp.dest("build/css"))
    .pipe(csso())
    .pipe(rename("style.min.css"))
    .pipe(sourcemap.write("."))
    .pipe(gulp.dest("build/css"))
    .pipe(server.stream());
});

/*Запускает сервер*/
gulp.task("server", function () {
  server.init({
    server: "build/",
    notify: false,
    open: true,
    cors: true,
    ui: false
  });

  gulp.watch("source/sass/**/*.scss", gulp.series("css"));
  gulp.watch("source/img/{icon,logo}-*.svg", gulp.series("sprite", "html", "refresh"));
  gulp.watch("source/js/*.js", gulp.series("alljs", "refresh"));
  gulp.watch("source/*.html", gulp.series("html", "refresh"));
});

/*Обновляет страницу сервера*/
gulp.task("refresh", function () {
  server.reload();
  done();
});

/*Оптимизирует картинки*/
gulp.task("images", function () {
  return gulp.src("source/img/**/*.{png,jpg,svg}")
    .pipe(imagemin([
      imagemin.optipng({optimizationLevel:3}),
      imagemin.mozjpeg({quality: 75, progessive: true}),
      imagemin.svgo({
        plugins: [
          {removeViewBox: false},
          {convertPathData: true}]
      })
      ]))
    .pipe(gulp.dest("source/img"));
});

/*Создаёт WebP изображения*/
gulp.task("webp", function () {
  return gulp.src("source/img/**/*.{png,jpg}")
    .pipe(webp({qulity: 90}))
    .pipe(gulp.dest("source/img"));
});

/*Создаём спрайт из иконок*/
gulp.task("sprite", function () {
  return gulp.src("source/img/{icon,logo}-*.svg")
    .pipe(svgstore({
      inlineSvg: true
    }))
    .pipe(rename("sprite.svg"))
    .pipe(gulp.dest("build/img"));
})

/*Вставляем svg-sprite в include и минимализирует html*/
gulp.task("html", function () {
  return gulp.src("source/*.html")
    .pipe(posthtml([
      include()
    ]))
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest("build"));
})

/*Собирает js файлы в один*/
gulp.task("alljs", function() {
  return gulp.src("source/js/*.js")
    .pipe(concat("all.js"))
    .pipe(gulp.dest("build/js"));
});

// /*Минимализирует и собирает js файлы в один*/
// gulp.task("alljs", function () {
//   return pipeline(
//     gulp.src("source/js/*.js"),
//     uglify(),
//     concat("all.js"),
//     gulp.dest("build/js")
//   );
// });

/*Копируем все файлы в build*/
gulp.task("copy", function () {
  return gulp.src([
    "source/fonts/**/*.{woff,woff2}",
    "source/img/**",
    "source/*.ico",
    "source/technomart/**",
    "source/pink/**",
    "source/keksobooking/**"
    ], {
      base: "source"
    })
  .pipe(gulp.dest("build"));
});

/*Удаляет файлы в build*/
gulp.task("clean", function () {
  return del("build");
});

gulp.task("build", gulp.series("clean", "copy", "css", "alljs", "sprite", "html"));
gulp.task("start", gulp.series("build", "server"));
