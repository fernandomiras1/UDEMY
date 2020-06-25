import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { PeliculaDetalle } from '../models/interfaces/interfaces';
import { ToastController } from '@ionic/angular';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataLocalService {

  peliculas: PeliculaDetalle[] = [];
  constructor(private storage: Storage,
              private toastCtrl: ToastController) {
                this.cargarFavoritos();
              }
              

  guardarPelicula(pelicula: PeliculaDetalle) {

    let peliculasExiste = this.peliculas.find(peli => peli.id === pelicula.id);
    let mensaje = '';

    if (peliculasExiste) {
      this.peliculas = this.peliculas.filter(peli => peli.id !== pelicula.id);
      mensaje = 'Removido de favoritos';
    } else {
      mensaje = 'Agregada a favoritos';
      this.peliculas.push(pelicula);
    }

    this.presentToast(mensaje);
    // guardamos en el storage.
    this.storage.set('peliculas', this.peliculas );

    return of(!peliculasExiste);
  }

  async presentToast(message: string) {
    const toast = await this.toastCtrl.create({
      message,
      duration: 2000
    });
    toast.present();
  }

  async cargarFavoritos() {
    const peliculas = await this.storage.get('peliculas');
    return this.peliculas = peliculas || [];
  }

  async existePelicula(id: number) {
    await this.cargarFavoritos();
    const existe =  this.peliculas.find( peli=> peli.id === id);
    return (existe) ? true : false;
  }
}
