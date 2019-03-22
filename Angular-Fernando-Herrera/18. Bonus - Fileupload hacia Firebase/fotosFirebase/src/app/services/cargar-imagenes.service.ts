import { Injectable } from '@angular/core';
// import { AngularFirestore } from 'angularfire2/firesotre';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase';
import { FileItem } from '../model/file-item';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CargarImagenesService {

  private CARPETA_IMAGENES = 'img';
  constructor( private db: AngularFirestore ) { }

  cargarImagenFireBase( imagenes: FileItem[] ) {
    
    const storageRef = firebase.storage().ref();

    for ( const item of imagenes) {

        item.estaSubiendo = true;

        // verifico si el archivo ya se subio
        if ( item.progreso >= 100 ) {
          continue;
        }

        // Subir a FireBase
        const uploadTask: firebase.storage.UploadTask = 
        // almacenamos algo en una ubicacion definida
        storageRef.child(`${ this.CARPETA_IMAGENES }/${ item.nombreArchivo }`).put( item.archivo );

        // ejecutamos la tarea
       // uploadTask.on( firebase. )
    }

  }

  private guardarImagen( imagen: { nombre: string, url: string } ) {
   // Guardamos la imagen en FireBase
    this.db.collection(`/${ this.CARPETA_IMAGENES }`).add( imagen );


  }
}
