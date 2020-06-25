import { Component, OnInit, Input } from '@angular/core';
import { MoviesService } from '../../services/movies.service';
import { PeliculaDetalle, Cast } from '../../models/interfaces/interfaces';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.scss'],
})
export class DetalleComponent implements OnInit {

  @Input() id: number;
  pelicula: PeliculaDetalle;
  actores: Cast[] = [];
  // va a tener 150 caracteres el texto
  cortarTexto = 150;

  slideOpts = {
    // se va a ver un slide y un poquito del otro
    slidesPerView: 3.3,
    freeMode: true,
    spaceBetween: -5
  };
  constructor(private moviesService: MoviesService,
              private modalCtrl: ModalController) { }

  ngOnInit() {
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

}
