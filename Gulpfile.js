var gulp = require('gulp');
var concat = require('gulp-concat');
var handlebars = require('gulp-ember-handlebars');
var es6ModuleTranspiler = require('gulp-es6-module-transpiler');

var es = require('event-stream');

gulp.task('scripts', function() {
  return es.concat(
    gulp.src(['./lib/templates/*.hbs'])
      .pipe(handlebars({outputType: 'amd'})),
    gulp.src(['./lib/main.js'])
      .pipe(es6ModuleTranspiler({type: 'amd', moduleName: 'ti-cloudinary'})),
    gulp.src(['./lib/initializer.js'])
      .pipe(es6ModuleTranspiler({type: 'amd', moduleName: 'ti-cloudinary/initializer'}))
  ).pipe(concat('ti-cloudinary.js')).pipe(gulp.dest('./dist'));
});

gulp.task('default', ['scripts']);
