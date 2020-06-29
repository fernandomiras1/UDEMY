import { Pelicula } from './../models/interfaces/interfaces';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtroImagen'
})
export class FiltroImagenPipe implements PipeTransform {

  transform( peliculas: Pelicula[] ): any[] {
    console.log(peliculas);
    return peliculas.filter(peli => peli.backdrop_path);
  }

}
