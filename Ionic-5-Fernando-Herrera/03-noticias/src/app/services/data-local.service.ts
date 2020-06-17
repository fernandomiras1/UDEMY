import { Injectable } from '@angular/core';
// guarda la info en indexDB
import { Storage } from '@ionic/storage';
import { Article } from '../models/interface';

@Injectable({
  providedIn: 'root'
})
export class DataLocalService {

  noticias: Article[] = [];
  constructor(private storage: Storage) { }

  guardarNoticia(noticia: Article) {

    const existe = this.noticias.find(noticia => noticia.title === noticia.title);
    console.log(existe);
    if (!existe) {
      // unshift: lo agrega al inicio del arreglo
      this.noticias.unshift(noticia);
      this.storage.set('favoritos', this.noticias);
    }
  }

  // leer mi storage y ver si hay info y cargar las notcias
  cargarFavoritos() {

  }
}
