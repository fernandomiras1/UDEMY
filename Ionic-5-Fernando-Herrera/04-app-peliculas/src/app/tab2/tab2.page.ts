import { Component } from '@angular/core';
import { MoviesService } from '../services/movies.service';
import { Pelicula } from '../models/interfaces/interfaces';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  textoBuscar = '';
  peliculas: Pelicula[] = [];
  ideas: string[] = ['fernando', 'emilianmo', 'El señor de los anillos'];
  constructor(private moviesService: MoviesService) {}


  buscar(event) {
    const {value} = event.detail;
    this.moviesService.buscarPelicula(value).subscribe(resu => {
      this.peliculas = resu['results'];
    });
  }

}
