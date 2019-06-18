 const gulp = require('gulp');
 const autoprefixer = require('gulp-autoprefixer');
 const sass = require('gulp-sass');

//  Creamos una tarea

gulp.task('sass', () => {
    // que carpeta va a contener los archivos originales
    gulp.src('scss/app.scss')
    // Ejecuta lo que esta dentro del pipe.
    // lo primero que haga es el autoprefixer
    .pipe(autoprefixer({
        browsers: ['last 2 versions'],
        cascade: false
    }) )
    // el segundo pipe, que haga las tareas de sass
    .pipe(sass({
        // ponemos en nombre de la carpeta lo que esta en []
        includePaths: ['scss']
    }) )
    // ultima tarea: Espesificamos donde se van a guardar los archivos compilados de este app.scss
    .pipe(gulp.dest('css'));
});

// toma una tarea que se ejecuque antes que watch en este caso sass. Se va a ejecutar antes que watch
gulp.task('watch', ['sass'], () => {
    // Archicos que este escuchando por sus cambios 
    // le ponemos el * porque quiero que me escuhce todo el contendio de esa carpeta. 
    gulp.watch(['scss/*.scss'], ['sass']);
});