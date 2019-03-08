import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Usuario } from '../model/usuario';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {

  public socketStatus: boolean;
  public usuario: Usuario;
  constructor(private socket: Socket, private router: Router) {
    this.checkStatus();
    this.cargarStorage();
  }

  checkStatus() {
    this.socket.on('connect', () => {
      console.log('Conectado al servidor');
      this.socketStatus = true;
      this.cargarStorage();
    });

    this.socket.on('disconnect', () => {
      console.log('Desconectado de servidor');
      this.socketStatus = false;
    });

  }

  emit( evento: string, payload?: any, callback?: Function ) {
    // emit('EVENTO', payload, callback)
    this.socket.emit(evento, payload, callback);
  }

  // Escuchar cualquier evento que emita el servidor
  listen( evento: string ) {
    return this.socket.fromEvent(evento);
  }

  loginWS( nombre: string) {
    return new Promise((resolve, reject) => {
      this.emit('configurar-usuario', { nombre }, resp => {

        this.usuario = new Usuario(nombre);
        this.guardarStorage();
        resolve();
      });

    });
  }

  logoutWS() {
    this.usuario = null;
    localStorage.removeItem('usuario');

    const payload = {
      nombre: 'sin-nombre'
    };

    this.emit('configurar-usuario', payload, () => {});

    this.router.navigateByUrl('login');
  }

  guardarStorage() {
    localStorage.setItem('usuario', JSON.stringify(this.usuario));
  }

  cargarStorage() {
    if ( localStorage.getItem('usuario')) {
      this.usuario = JSON.parse( localStorage.getItem('usuario') );
      this.loginWS( this.usuario.nombre );
    }
  }

  getUsuario() {
    return this.usuario;
  }

}
