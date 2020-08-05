const gulp = require('gulp');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');

function css() {
    return gulp
        .src('scss/app.scss') // en q parte va a encotrar el archivo para correr ese css
        .pipe(autoprefixer() )
        .pipe(sass({ outputStyle: "expanded" })) // como se va a compilar ( nested, compac, expanded, compressed )
        .pipe(gulp.dest("css")) // donde se va almacenar los archivos.
}

// esta revisando algunos archivos, le decis cuales.
function watchFiles() {
    gulp.watch('scss/*.scss', css);
    gulp.watch('index.html')
}

// tasks
gulp.task('css', css); // nombre que le queremos dar y despues el nombre de la funcion
gulp.task("watch", gulp.parallel(watchFiles)); // parallel va a estar escuchando varios archivos de forma asincrona