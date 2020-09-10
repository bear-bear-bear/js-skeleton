const gulp = require("gulp");
const babel = require("gulp-babel");

// 걸프 의존성 쓰는 곳

gulp.task("default", (done) => {
  // 노드 소스
  gulp.src("es6/**/*.js").pipe(babel()).pipe(gulp.dest("dist"));

  // 브라우저 소스
  gulp.src("public/es6/**/*.js").pipe(babel()).pipe(gulp.dest("public/dist"));

  done();
});
