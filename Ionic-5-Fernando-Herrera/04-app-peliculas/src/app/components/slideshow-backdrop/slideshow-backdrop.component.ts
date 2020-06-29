import { Component, OnInit, Input } from '@angular/core';
import { Pelicula } from '../../models/interfaces/interfaces';
import { ModalController } from '@ionic/angular';
import { DetalleComponent } from '../detalle/detalle.component';

@Component({
  selector: 'app-slideshow-backdrop',
  templateUrl: './slideshow-backdrop.component.html',
  styleUrls: ['./slideshow-backdrop.component.scss']
})
export class SlideshowBackdropComponent implements OnInit {

  @Input() peliculas: Pelicula[] = [];

  slideOpts = {
    // se va a ver un slide y un poquito del otro
    slidesPerView: 1.1,
    freeMode: true
  };

  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {
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
