import { Component } from '@angular/core';
import { MoviesService } from '../services/movies.service';
import { Pelicula } from '../models/interfaces/interfaces';
import { DetalleComponent } from '../components/detalle/detalle.component';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  buscando = false;
  textoBuscar = '';
  peliculas: Pelicula[] = [];
  ideas: string[] = ['fernando', 'emilianmo', 'El señor de los anillos'];
  constructor(private moviesService: MoviesService,
              private modalCtrl: ModalController) {}


  buscar(event) {
    const {value} = event.detail;
    if (value.length === 0) {
      this.buscando = false;
      this.peliculas = [];
      return;
    }

    this.buscando = true;
    this.moviesService.buscarPelicula(value).subscribe(resu => {
      this.buscando = false;
      this.peliculas = resu['results'];
    });
  }

  async verDetalle(id: number) {
    const modal = await this.modalCtrl.create({
      component: DetalleComponent,
      componentProps: {
        id
      }
    });

    modal.present();
  }

}
