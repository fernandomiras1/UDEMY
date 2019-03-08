import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UsuarioService } from '../services/service.index';
import { Usuario } from '../models/usuario.model';

declare function init_plugins();
// Libreria para el login con Google.
declare const gapi: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  recuerdame: boolean = false;
  email: string;
  auth2: any;

  constructor(public router: Router, public _usuarioService: UsuarioService) { }

  ngOnInit() {
    // Llamamos a la funcion creada en custom.js
    init_plugins();
    this.googleInit();
    this.email = localStorage.getItem('email') || '';
    if (this.email.length > 1) {
      this.recuerdame = true;
    }

  }

  googleInit() {
    gapi.load('auth2', () => {

       this.auth2 = gapi.auth2.init({
        client_id: '120761017014-pkhb9ha9rrgcqp16kcbciv2sgoldg4ke.apps.googleusercontent.com',
        cookiepolicy: 'single_host_origin',
        scope: 'profile email'
       });

       this.attachSignin(document.getElementById('btnGoogle'));
    });
  }

  attachSignin(element) {
    this.auth2.attachClickHandler(element, {}, (googleUser) => {

      // Obtenemos la informacion de la persona de gmail
       const profile = googleUser.getBasicProfile();

       const token = googleUser.getAuthResponse().id_token;
       // Llamo al  servicio de googleLogin con el token de google.
       this._usuarioService.loginGoogle(token).subscribe(() => window.location.href = '#/dashboard' );
    });
  }

  ingresar(forma: NgForm): void {

    if (forma.invalid) {
      return;
    }

    const usuario = new Usuario(null, forma.value.email, forma.value.password);
    this._usuarioService.login(usuario, forma.value.recuerdame).subscribe(() => this.router.navigate(['/dashboard']));

    // console.log(forma.valid);
    // console.log(forma.value);
  }

}
