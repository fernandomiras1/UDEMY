import { Component, OnInit, Input } from '@angular/core';
import { MoviesService } from '../../services/movies.service';
import { PeliculaDetalle, Cast } from '../../models/interfaces/interfaces';
import { ModalController } from '@ionic/angular';
import { DataLocalService } from '../../services/data-local.service';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.scss'],
})
export class DetalleComponent implements OnInit {

  @Input() id: number;
  pelicula: PeliculaDetalle;
  actores: Cast[] = [];
  estrellaName= 'star-outline';
  // va a tener 150 caracteres el texto
  cortarTexto = 150;

  slideOpts = {
    // se va a ver un slide y un poquito del otro
    slidesPerView: 3.3,
    freeMode: true,
    spaceBetween: -5
  };
  constructor(private moviesService: MoviesService,
              private modalCtrl: ModalController,
              private dataLocal: DataLocalService) { }

  ngOnInit() {
    this.dataLocal.existePelicula(this.id).then(existe => {
      this.estrellaName = (existe) ? 'star' : 'star-outline';
    });

    this.moviesService.getPeliculaDetalle(this.id).subscribe(resu => {
      this.pelicula = resu;
    });
  
    this.moviesService.getActoresPelicula(this.id).subscribe(resu => {
      this.actores = resu.cast;
    });
  }

  regresar() {
    this.modalCtrl.dismiss();
  }

  favorito() {
    this.dataLocal.guardarPelicula(this.pelicula).subscribe(existe => {
      console.log('existe', existe);
      this.estrellaName = (existe) ? 'star' : 'star-outline';
    });
  }
}
