import { Injectable } from '@angular/core';
// guarda la info en indexDB
import { Storage } from '@ionic/storage';
import { Article } from '../models/interface';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class DataLocalService {

  noticias: Article[] = [];
  constructor(private storage: Storage,
              private toastCtrl: ToastController) {
    this.cargarFavoritos();
  }

  async presentToast(message: string) {
    const toast = await this.toastCtrl.create({
      message,
      duration: 2000
    });
    toast.present();
  }

  guardarNoticia(noticia: Article) {
    const existe = this.noticias.find(items => items.title === noticia.title);
    if (!existe) {
      // unshift: lo agrega al inicio del arreglo
      this.noticias.unshift(noticia);
      this.storage.set('favoritos', this.noticias);
      this.presentToast('Agregado a Favorito');
    }
  }

  // leer mi storage y ver si hay info y cargar las notcias
  async cargarFavoritos() {
    const favoritos = await this.storage.get('favoritos');

    if (favoritos) {
      this.noticias = favoritos;
    }
  }

  borrarNoticia(noticia: Article) {
    this.noticias = this.noticias.filter(items => items.title !== noticia.title);
    this.storage.set('favoritos', this.noticias);
    this.presentToast('Borrado de Favoritos');
  }

}
