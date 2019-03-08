import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { UsuarioService } from '../usuario/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class VerificaTokenGuard implements CanActivate {

  constructor (
    public _usuarioService: UsuarioService
  ) {}
  canActivate(): Promise<boolean> | boolean {

    console.log('tokenGuard');

    const token = this._usuarioService.token;
    // atob : Decodifica una cadea en base 64
    const payload = JSON.parse( atob(token.split('.')[1]));
    const expirado = this.expirado(payload.exp);

    if (expirado) {
      this._usuarioService.logout();
      return false;
    }



    return this.verificaRenueva(payload.exp);
  }

  verificaRenueva(fechaExp: number): Promise<boolean> {
    return new Promise((resolve, reject) => {

      // La fecha de expiracion del token
      const tokenExp = new Date ( fechaExp * 1000 );
      const ahora = new Date();

      // Incrementamos 4 horas a la fecha acutal de ahora.
      ahora.setTime( ahora.getTime() + ( 1 * 60 * 60 * 1000 ) );

      // El token tiene mas de 4 horas para que expire
      if (tokenExp.getTime() > ahora.getTime()) {
        resolve(true);
      } else {
        // Esta a proximo a vencer y tengo que renovarlo
        this._usuarioService.renuevaToken().subscribe(() => {
          resolve(true);
        }, () => {
          this._usuarioService.logout();
          reject(false);
        });
      }

     resolve(true);

    });
  }

  //  verificar si el Token Expiro
  expirado(fechaExp: number) {
    const ahora = new Date().getTime() / 1000;
    if ( fechaExp < ahora) {
      // Expiro el token
      return true;
    } else {
      return false;
    }
  }

}
