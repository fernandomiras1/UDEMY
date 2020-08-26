import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../models/interfaces';
import { UsuarioService } from '../../services/usuario.service';
import { NgForm } from '@angular/forms';
import { AlertService } from '../../services/alert.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit {

  usuario: Usuario = {};
  constructor(private usuarioService: UsuarioService,
              private alertSercice: AlertService) {}

  ngOnInit() {
    this.usuario = this.usuarioService.getUsuario();
    console.log(this.usuario);
  }

  async actualizar(fActualizar: NgForm) {
    if ( fActualizar.valid ) {
      const valido = await this.usuarioService.actualizarUsuario(this.usuario);
      if (valido) {
        // toast con el mensaje
        this.alertSercice.presentToast('Usuario actualizado correctamente');
      } else {
        // toas con el error.
        this.alertSercice.presentToast('Error al actualizar el usuario');
      }
    }
  }

  logout() {

  }

}
