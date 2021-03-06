var fs = require("fs"),
    gulp = require("gulp"),
   // jshint = require("gulp-jshint"),
   // less = require("gulp-less"),
   // autoprefixer = require("gulp-autoprefixer"),
   exec = require("child_process").exec;

var jsFiles = ["js/*.js"];
var lessFiles = ["less/*.less"];

gulp.task("compile-less", function() {
  gulp.src(lessFiles)
  .pipe(less())
  .pipe(autoprefixer("last 2 versions", "> 1%", "ie 8"))
  .pipe(gulp.dest("css"));
});

gulp.task("lint-js", function() {
  gulp.src(jsFiles)
  .pipe(jshint())
  .pipe(jshint.reporter("default"));
});

gulp.task("watch", function() {
  gulp.watch(lessFiles, ["compile-less"]);
  gulp.watch(jsFiles, ["lint"]);
});

gulp.task("serve", function() {
	exec("node server.js", function(err, stdin, stdout) {
    if (err) console.error(err);
  });
});

gulp.task("default", ["lint-js", "compile-less"]);
gulp.task("dev", ["default", "watch", "serve"]);
