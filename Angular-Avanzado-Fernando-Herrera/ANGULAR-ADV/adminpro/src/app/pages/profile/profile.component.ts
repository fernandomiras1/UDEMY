import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/services/service.index';
import { Usuario } from 'src/app/models/usuario.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styles: []
})
export class ProfileComponent implements OnInit {
  usuario: Usuario;
  imagenSubir: File;
  imagenTemp: string;
  constructor(public _usuarioService: UsuarioService) { this.usuario = this._usuarioService.usuario; }

  ngOnInit() {
  }

  guardar(usuario: Usuario): void {
   console.log(usuario);

   this.usuario.nombre = usuario.nombre;
   // Si no es de google entonces si lo puede editar
   if ( !this.usuario.google) {
     this.usuario.email = usuario.email;
    }
   this._usuarioService.actualizarUsuario(this.usuario).subscribe();
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

  cambiarImagen() {
    this._usuarioService.cambiarImagen(this.imagenSubir, this.usuario._id);
  }

}
