import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { UsuarioService, ModalUploadService } from 'src/app/services/service.index';

declare var swal: any;

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: []
})
export class UsuariosComponent implements OnInit {

  // Areglo de usuarios
  usuarios: Usuario[];
  // Paginacion
  desde: number = 0;
  totalRegistros: number = 0;
  cargando: boolean = true;

  constructor(public _usuarioService: UsuarioService, public _modalUploadService: ModalUploadService) { }

  ngOnInit() {
    this.cargarUsuario();

    // Me subscribo al Metodo de Actualizar imangen de usuario. para que regreseque la grilla de usuarios con su nueva imange.
    this._modalUploadService.notificacion.subscribe(() => this.cargarUsuario());
  }

  cargarUsuario() {
   this.cargando = true;
   this._usuarioService.cargarUsuarios(this.desde).subscribe((resp: any) => {
     this.totalRegistros = resp.total;
     this.usuarios = resp.usuarios;
     this.cargando = false;
   });
  }


  cambiarDesde(valor: number) {
    const desde = this.desde + valor;
    if (desde >= this.totalRegistros) {
      return;
    }

    if (desde < 0) {
      return;
    }

    this.desde += valor;
    this.cargarUsuario();

  }

  buscarUsuario(termino: string) {
    if (termino.length <= 0) {
      this.cargarUsuario();
      return;
    }
    this.cargando = true;
    this._usuarioService.buscarUsuarios(termino).subscribe((usuarios: Usuario[]) => {
     this.usuarios = usuarios;
     this.cargando = false;
   });
  }

  borrarUsuario(usuario: Usuario) {

    if (usuario._id === this._usuarioService.usuario._id) {
      swal('No se puede borrar usuario', 'No se puede borrar a si mismo', 'error');
      return;
    }

    swal({
      title: '¿Esta seguro?',
      text: 'Esta a punto de borrar a ' + usuario.nombre,
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    }).then((borrar) => {

      if (borrar) {
        this._usuarioService.borrarUsuario(usuario._id).subscribe(borrado => {
           this.cargarUsuario();
        });
      }
    });

  }

  guardarUsuario(usuario: Usuario) {
    this._usuarioService.actualizarUsuario(usuario).subscribe();
  }

  mostrarModal(id: string) {
    this._modalUploadService.mostrarModal('usuarios', id);
  }

}
