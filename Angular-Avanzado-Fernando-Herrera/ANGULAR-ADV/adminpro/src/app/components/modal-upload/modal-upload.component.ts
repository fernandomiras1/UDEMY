import { Component, OnInit } from '@angular/core';
import { SubirArchivoService, ModalUploadService } from 'src/app/services/service.index';

@Component({
  selector: 'app-modal-upload',
  templateUrl: './modal-upload.component.html',
  styles: []
})
export class ModalUploadComponent implements OnInit {

  // usuario: Usuario;
  imagenSubir: File;
  imagenTemp: string;
  constructor(public _subirArchivoService: SubirArchivoService, public _modalUploadService: ModalUploadService) { }

  ngOnInit() {
  }

  seleccionImagen(archivo: File) {


    if (!archivo) {
      this.imagenSubir = null;
      return;
    }

    // Verificamos que sea una imagen.
    if (archivo.type.indexOf('image') < 0) {
      this.imagenSubir = null;
      swal('Sólo imágenes', 'El archivo seleccionado no es una imagen', 'error');
      return;
    }

    this.imagenSubir = archivo;

    const reader = new FileReader();
    const urlImagenTemp = reader.readAsDataURL(archivo);
    reader.onloadend = () => {
      this.imagenTemp = String(reader.result);
    };

  }

  cerrarModal() {
    this.imagenTemp = null;
    this.imagenSubir = null;

    this._modalUploadService.ocultarModal();
  }

  subirImagen() {
    this._subirArchivoService.subirArchivo(this.imagenSubir, this._modalUploadService.tipo, this._modalUploadService.id)
     .then(resp => {
       this._modalUploadService.notificacion.emit(resp);
       this.cerrarModal();
     })
     .catch(err => {
       console.log('error en la carga');
     });
  }
}
