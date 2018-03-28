

var gulp          = require("gulp"),
    fs            = require('fs'),
    spawn          = require('child_process').spawn,
    toml          = require('toml'),
    babel         = require('gulp-babel'),
    sass          = require("gulp-sass"),
    autoprefixer  = require("gulp-autoprefixer"),
    gutil         = require('gulp-util'),
    concat        = require("gulp-concat"),
    strreplace    = require("gulp-string-replace"),
    del           = require("del"),
    minimist      = require('minimist'),
    zip           = require('gulp-zip');
    
const json = JSON.stringify;

// const THEME_NAME = yaml.safeLoad(fs.readFileSync('./config.yml', 'utf8')).theme
const THEME_NAME = toml.parse(fs.readFileSync('../../pointyfar-site/config.toml', 'utf8')).theme;
const THEME_DIR = toml.parse(fs.readFileSync('../../pointyfar-site/config.toml', 'utf8')).themesDir ? 
                  toml.parse(fs.readFileSync('../../pointyfar-site/config.toml', 'utf8')).themesDir :
                  "themes";
const HUGO_ROOT = "../../pointyfar-site";
const THEME_PATH = __dirname.concat(THEME_DIR); // path.join(__dirname, 'themes', THEME_NAME);
const WEBPACK_BIN = './node_modules/.bin/webpack';

gulp.task('test',(done)=>{
  // gutil.log('theme name:', THEME_NAME, 'theme dir:', THEME_DIR, 'theme path:', THEME_PATH );
  gutil.log(__dirname)
  done();
})

// Run hugo server and webpack --watch simultaneously, with merged output
gulp.task('dev', (cb) => {
  spawn(WEBPACK_BIN, ['--watch'], { stdio: 'inherit' }, (err) => {
    if (err) return cb(err)
    cb()
});

  spawn('hugo', ['server'], { cwd: HUGO_ROOT, stdio: 'inherit' }, (err) => {
    if (err) return cb(err)
    cb()
  })
});

gulp.task('assets:build', (cb) => {
  spawn(WEBPACK_BIN, ['--config', 'webpack.config.js'], { stdio: 'inherit' }, (err) => {
    if (err) return cb(err)
    cb()
  })
  cb();
});















gulp.task('assets:styles', function(done)  {
  gutil.log('STARTED GULP TASK: BUILDING ASSETS');
  
  gulp.src('./src/pointyblog.scss')
      .pipe(sass({outputStyle : "compressed", includePaths: './node_modules/'}))
      .pipe(autoprefixer({browsers : ["last 20 versions"]}))
      .pipe(gulp.dest('./static'))
      .on('end', done);
      
  
})

gulp.task('assets:scripts', function(done) {
  gulp.src('./src/mdc.js')
        .pipe(babel({
            presets: ['env']
        }))
        .pipe(gulp.dest('./static'))
        .on('end', done);
        
})





/*





gulp.task("themes:scss", function(done){
  gutil.log('STARTED TASK: BUILDING SCSS');
  
  var path_list = THEMES.map( function(theme){return theme} )
                        .map( function(tl){return PATHS(tl)});
  
  for(var i = 0; i< path_list.length; i++){
    if(i === path_list.length - 1){
      gulp.src(path_list[i].themes.styles.src)
          .pipe(sass({outputStyle : "compressed"}))
          .pipe(autoprefixer({browsers : ["last 20 versions"]}))
          .pipe(gulp.dest(path_list[i].themes.styles.dest))
          .on('end', done)
    } else {
      gulp.src(path_list[i].themes.styles.src)
          .pipe(sass({outputStyle : "compressed"}))
          .pipe(autoprefixer({browsers : ["last 10 versions"]}))
          .pipe(gulp.dest(path_list[i].themes.styles.dest));
    }
  }
});*/