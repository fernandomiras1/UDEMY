import { Injectable } from '@angular/core';

import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase';


@Injectable({
  providedIn: 'root'
})
export class CargarImagenesService {

  private CARPETA_IMAGENES = 'img';
  constructor( private db: AngularFirestore ) { }

  private guardarImagen( imagen: { nombre: string, url: string } ) {
   // Guardamos la imagen en FireBase
   this.db.collection(`/${ this.CARPETA_IMAGENES }`).add( imagen );

  }
}
