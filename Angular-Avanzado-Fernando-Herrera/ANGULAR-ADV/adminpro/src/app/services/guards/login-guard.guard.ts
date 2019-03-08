import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UsuarioService } from '../usuario/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuardGuard implements CanActivate {

  constructor(public route: Router, public _usuarioService: UsuarioService) { }

  canActivate() {

    if (this._usuarioService.estaLogueado()) {
      // console.log( 'PASO EL GUARD');
      return true;
    }

    this.route.navigate(['/login']);

  }
}
