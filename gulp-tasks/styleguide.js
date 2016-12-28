// Imports

var gulp = require('gulp');
var sass = require('gulp-sass');
var styleguide = require('sc5-styleguide');

// Path definitions

var sourcePath = 'assets';
var styleSourcePath = sourcePath + '/styles';
var scssWild = styleSourcePath + '/**/*.scss';
var scssRoot = styleSourcePath + '/main.scss';
var overviewPath = styleSourcePath + '/README.md';

var buildPath = 'dev-area';
var styleguideAppRoot = '/styleguide';
var styleguideBuildPath = buildPath + styleguideAppRoot;



// Building styleguide for static hosting to be displayed as a part of the application
//
// Here we build the styleguide so it can be included in a web folder within the app.
// The benefit for including the styleguide at /styleguide path of the app is that
// everyone can always find a master copy of the style guide. Another benefit is that
// this copy will be load balanced by the web server, so it can handle heavy loads.
// All interactive features are disabled to prevent users from tampering with the
// styles.

gulp.task('sc5_full-styleguide:generate', function() {
  return gulp.src(scssWild)
    .pipe(styleguide.generate({
        title: 'My First Development Styleguide',
        sideNav : true,
        server: false,
        port : 7000,
        rootPath: styleguideBuildPath,
        appRoot: styleguideAppRoot,
        overviewPath: overviewPath,
        disableEncapsulation : true,
        extraHead: [
          '<link type="text/css" rel="stylesheet" href="/dist/styles/main.css">'
      ],
      afterBody: [
        '<script src="/dist/scripts/jquery.js"></script>',
        '<script src="/dist/scripts/components.js"></script>',
        '<script src="/dist/scripts/plugins.js"></script>',
        '<script src="/dist/scripts/styleguide.js"></script>'
      ]
      }))
    .pipe(gulp.dest(styleguideBuildPath));
});

gulp.task('sc5_full-styleguide:applystyles', function() {
  return gulp.src(scssRoot)
    .pipe(sass({
      errLogToConsole: true
    }))
    .pipe(styleguide.applyStyles())
    .pipe(gulp.dest(styleguideBuildPath));
});

gulp.task('sc5_full-styleguide', ['sc5_full-styleguide:generate', 'sc5_full-styleguide:applystyles']);


// The basic build task
