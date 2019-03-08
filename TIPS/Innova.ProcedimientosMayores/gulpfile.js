/// <binding ProjectOpened='installTipsComun' />
var gulp = require('gulp');
var clean = require('gulp-clean');
var replace = require('gulp-replace');
var sequence = require('run-sequence');
var fs = require('fs');
var jeditor = require("gulp-json-editor");
var tap = require("gulp-tap");
var path = require('path');
var typescript = require('gulp-tsc');
var ngc = require('gulp-ngc');
var shell = require('gulp-shell')
var numeroCompilado = 0
var frontConfig = require('./src/front.config.json');

gulp.task('buildAssets', function () { //tarea que agrega assets al index.html en base a configuracion en front.config.json
  var indexHTML = fs.readFileSync('./src/index.html', 'utf-8');
  var cssLinks = "";
  var jsScripts = "";
  var urlBase = frontConfig.assets.urlBase;
  frontConfig.assets.styles.forEach(function (style) {
    cssLinks = cssLinks + '<link rel="stylesheet" href="' + urlBase + style + '">\n'
  });
  frontConfig.assets.scripts.forEach(function (script) {
    jsScripts = jsScripts + '<script type="text/javascript" src="' + urlBase + script + '"></script>\n'
  });

  var auxCommentsIndex = indexHTML.indexOf("TipsCSS:build");
  if (auxCommentsIndex < 0) {
    indexHTML = indexHTML.replace("</head>", '<!-- TipsCSS:build -->\n<!-- end:TipsCSS -->\n</head>')
  }
  auxCommentsIndex = indexHTML.indexOf("TipsScripts:build");
  if (auxCommentsIndex < 0) {
    indexHTML = indexHTML.replace("</body>", '<!-- TipsScripts:build -->\n<!-- end:TipsScripts -->\n</body>')
  }

  indexHTML = indexHTML.replace(/(<!-- TipsCSS:build -->)(.|\n)*?(<!-- end:TipsCSS -->)/, '<!-- TipsCSS:build -->\n' + cssLinks + '<!-- end:TipsCSS -->')
  indexHTML = indexHTML.replace(/(<!-- TipsScripts:build -->)(.|\n)*?(<!-- end:TipsScripts -->)/, '<!-- TipsScripts:build -->\n' + jsScripts + '<!-- end:TipsScripts -->')
  fs.writeFileSync('./src/index.html', indexHTML);
});

gulp.task('carpetaNPM', function () {

    return gulp.src('./src/app/**/*.*').pipe(gulp.dest('./dist_npm'));

});
gulp.task('cambiarTemplateInline', function () {

    return gulp.src('./dist_npm/**/*.ts')
            .pipe(tap(function (file, t) {

                var nombre = path.basename(file.path)

                fs.stat(file.path.replace('.ts', '.html'), function (err, stat) {
                    if (err == null) {
                        console.log(file.path)
                        file.contents = new Buffer(String(file.contents)
                               .replace("templateUrl: './" + nombre.replace('.ts', '.html') + "'", 'template: `' + fs.readFileSync(file.path.replace('.ts', '.html'), 'utf-8') + '`' )
                           );
                        return gulp.src(file.path)
                                .pipe(replace("templateUrl: './" + path.basename(file.path).replace('.ts', '.html') + "'", 'template: `' + fs.readFileSync(file.path.replace('.ts', '.html'), 'utf-8') + '`' ))
                                .pipe(gulp.dest('./dist_npm/' + (file.path.replace(file.base, "")).replace(path.basename(file.path), "")))
                    } else {
                        return {};
                    }
                });
            }))
})
gulp.task('compilarTEST', function () {

    return gulp.src('./src/app/menu/menu.component.html')
            .pipe(tap(function (file, t) {

                var nombre = path.basename(file.path)

                fs.stat(file.path, function (err, stat) {
                    if (err == null) {

                        file.contents = new Buffer(String(file.contents)
                               .replace(/<span> Compilacion:(.*)<\/span>/g, '<span> Compilacion: 123' + new Date() + '</span>')
                           );
                        var currentdate = new Date();
                        //var datetime = "Ultimo deploy: " + currentdate.getDate() + "/"
                        var datetime = currentdate.getDate() + "/"
                        + (currentdate.getMonth() + 1) + "/"
                        + currentdate.getFullYear() + " @ "
                        + currentdate.getHours() + ":"
                        + currentdate.getMinutes() + ":"
                        + currentdate.getSeconds();
                        return gulp.src(file.path)
                                .pipe(replace(/<span(.*)> Build:(.*)<\/span>/g, '<span> Build: ' + numeroCompilado + ' Fecha: ' + datetime + '</span>'))
                                .pipe(gulp.dest('./src/app/menu/', { overwrite: true }))
                    } else {
                        return {};
                    }
                });
            }))
})

gulp.task('esconderCompilacion', function () {

    return gulp.src('./src/app/menu/menu.component.html')
            .pipe(tap(function (file, t) {

                var nombre = path.basename(file.path)

                fs.stat(file.path, function (err, stat) {
                    if (err == null) {


                        return gulp.src(file.path)
                                .pipe(replace(/<span(.*)> Build:(.*)<\/span>/g, '<span *ngIf="1==2"> Build: </span>'))
                                .pipe(gulp.dest('./src/app/menu/', { overwrite: true }))
                    } else {
                        return {};
                    }
                });
            }))
})

gulp.task('packageJsonVersion', function () {

    gulp.src("./package.json")
         .pipe(jeditor(function (json) {
             json.compilacion = Number(json.compilacion) + 1;
             numeroCompilado = json.compilacion
             return json;
         }))
         .pipe(gulp.dest("./"));

});


gulp.task('comandoAngular2CMD', shell.task([
'ng build --prod --env=test --aot=false',
]))

gulp.task('RunServer', shell.task([
  'ng serve --open',
]))
gulp.task('installTipsComun', shell.task([
    'npm run tipscomun',
]))


//  gulp.task('deployTEST', function(cb) {
//    sequence(
//        'packageJsonVersion',
//        'compilarTEST',
//        'comandoAngular2CMD',
//      'esconderCompilacion',
//      cb);
//});



gulp.task('limpiarHTML', function () {

    return gulp.src('./dist_npm/**/*.html', { read: false })
          .pipe(clean());

});

gulp.task('prepararCarpetaNPM', function () {

    return gulp.src('./dist_npm/**/*')
          .pipe(gulp.dest('paquete_npm_temp/componentes'))
});

gulp.task('crearIndex', function () {

    return gulp.src('./paquete_npm_temp/**/*')
         .pipe(tap(function (file, t) {
             var nombre = path.basename(file.path)
             if (!nombre.includes("app")) {
                 if (nombre.includes("module")) {
                     var nombreExportable = file.path.replace(file.base, "")
                     nombreExportable = nombreExportable.replace(/\\/g, "/")
                     nombreExportable = nombreExportable.replace(".ts", "")
                     fs.appendFile('paquete_npm_temp/index.ts', "export * from './" + nombreExportable + "'" + '\n');
                 }
             }
         }))
});


gulp.task('compilarTSC', function () {
    gulp.src(['paquete_npm_temp/**/*.ts'])
      .pipe(typescript(
      {
          target: "es5",
          module: "es2015",
          sourceMap: true,
          moduleResolution: "node",
          emitDecoratorMetadata: true,
          experimentalDecorators: true,
          declaration: true

      ,
          exclude: [
          "node_modules",
          "*spec.ts*",
          "*test*"
          ]
      }))
      .pipe(gulp.dest('paquete_npm'))
});

gulp.task('compilarAngularAOT', function () {
    return ngc('tsconfig-aot.json');
});

gulp.task('packageJson', function () {

    gulp.src("./package.json")
         .pipe(jeditor(function (json) {
             json.scripts = {};
             json.devDependencies = {};
             json.dependencies = {};
             json.private = false;
             return json;
         }))
         .pipe(gulp.dest("./paquete_npm"));

});

gulp.task('borrarCarpetasTemp', function () {
    return gulp.src('./paquete_npm_temp', { read: false }).pipe(clean());
});

gulp.task('borrarCarpetaDist_NPM', function () {
    return gulp.src('./dist_npm', { read: false })
      .pipe(clean());
});

gulp.task('publicarNPM', function (cb) {
    sequence(
        'carpetaNPM',
        'cambiarTemplateInline',
        'limpiarHTML',
        'prepararCarpetaNPM',
        'crearIndex',
        'compilarAngularAOT',
        'packageJson',

        cb);
});

gulp.task('limpiarCarpetas', function (cb) {
    sequence(
        'borrarCarpetasTemp',
        'borrarCarpetaDist_NPM',
        cb);
});
