var gulp = require('gulp')
const sass = require('gulp-sass')(require('sass'));
// 일반 컴파일
gulp.task('sass', function () {
  return gulp.src('./*.scss')  // 입력 경로
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./dist/css'));  // 출력 경로
});

// 런타임 중 파일 감시
gulp.task('sass:watch', function () {
  gulp.watch('./*.scss', ['sass']);  // 입력 경로와 파일 변경 감지 시 실행할 Actions(Task Name)
});