import { Genre } from './../models/interfaces/interfaces';
import { Component, OnInit } from '@angular/core';
import { PeliculaDetalle } from '../models/interfaces/interfaces';
import { DataLocalService } from '../services/data-local.service';
import { MoviesService } from '../services/movies.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  peliculas: PeliculaDetalle[] = [];
  generos: Genre[] = [];
  favoritoGenero: {genero: string, pelis: PeliculaDetalle[]}[] = [{
    genero: '',
    pelis: []
  }];

  constructor(private dateLocalService: DataLocalService,
              private moviesService: MoviesService) {}


  // esto se va a disparar cada vez que la pagina vuelva a entrar
  async ionViewWillEnter() {
    this.peliculas =  await this.dateLocalService.cargarFavoritos();
    this.generos =  await this.moviesService.cargarGeneros();

    this.pelisPorGeneros(this.generos, this.peliculas);
  }

  pelisPorGeneros(generos: Genre[], peliculas: PeliculaDetalle[]) {
    this.favoritoGenero = [];
    generos.forEach(genero => {
      this.favoritoGenero.push({
        genero: genero.name,
        pelis: peliculas.filter(peli => {
          return peli.genres.find(genre => genre.id === genero.id);
        })
      });

    });

    console.log(this.favoritoGenero);
  }

}
