import { Injectable } from '@angular/core';
// import { AngularFirestore } from 'angularfire2/firesotre';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase';
// import { firebase } from '@firebase/app';

import { FileItem } from '../model/file-item';

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

          // ejecutamos la tarea ( Quiero que se dispare esto aca vez q el estado cambie por eso STATE_CHANGED)
          uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
             // varios callbak que recibo.  // me indica cual es el progreso de item   
            (snapshot: firebase.storage.UploadTaskSnapshot) => item.progreso = (snapshot.bytesTransferred / snapshot.totalBytes) * 100,    
            (error) => console.error('Error al subir', error),    
            () => {
              // Cuando a todo lo hace correcamente        
              console.log('Imagen cargada');
              uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
              item.url = downloadURL;
              item.estaSubiendo = false;
              this.guardarImagen({
                nombre: item.nombreArchivo,
                url: item.url
              });
            });    
          });
    }

  }

  private guardarImagen( imagen: { nombre: string, url: string } ) {
   // Guardamos la imagen en FireBase
    this.db.collection(`/${ this.CARPETA_IMAGENES }`).add( imagen );


  }
}
