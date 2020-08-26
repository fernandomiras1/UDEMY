import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { RespuestaPosts, Usuario } from '../models/interfaces';
import { Plugins } from '@capacitor/core';
import { NavController } from '@ionic/angular';

const { Storage } = Plugins;

const URL = environment.url;


@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  token: string = null;
  usuario: Usuario = {};

  constructor(private http: HttpClient,
              private navCtrl: NavController) { }

  login(email: string, password: string) {
    const data = { email, password };

    return new Promise( resolve => {
      this.http.post(`${URL}/user/login`, data)
        .subscribe((resp: any) => {
          console.log(resp);
          if (resp.ok) {
            this.guardarToken(resp.token);
            resolve(true);
          } else {
            this.token = null;
            this.clear();
            resolve(false);
          }
        });
    });

  }

  registro(usuario: Usuario) {
    return new Promise(resolve => {
      this.http.post(`${URL}/user/create`, usuario)
        .subscribe( (resp: any) => {
          console.log(resp);
          if (resp.ok) {
            this.guardarToken(resp.token);
            resolve(true);
          } else {
            this.token = null;
            this.clear();
            resolve(false);
          }
        });
    });
  }

  async guardarToken( token: string ) {
    this.token = token;
    await Storage.set({
      key: 'token',
      value: token
    });
  }

  async obtenerToken() {
    this.token = (await Storage.get({ key: 'token'})).value || null;
  }

  getUsuario() {
    if (!this.usuario._id) {
      this.validaToken();
    }

    return { ...this.usuario };
  }


  async clear() {
    await Storage.clear();
  }

  async validaToken(): Promise<boolean> {

    await this.obtenerToken();
    console.log(this.token);
    if (!this.token) {
      this.navCtrl.navigateRoot('/login');
      return Promise.resolve(false);
    }

    return new Promise<boolean>( resolve => {

      const headers = new HttpHeaders({
        'x-token': this.token
      });

      this.http.get(`${ URL}/user/`, { headers })
        .subscribe((resp: { ok: boolean, usuario: Usuario}) => {
          if ( resp.ok) {
            this.usuario = resp.usuario;
            resolve(true);
          } else {
            this.navCtrl.navigateRoot('/login');
            resolve(false);
          }
        });
    });
  }

  actualizarUsuario(usuario: Usuario) {
    const headers = new HttpHeaders({
      'x-token': this.token
    });

    return new Promise(resolve => {
      this.http.post(`${ URL }/user/update`, usuario, { headers })
        .subscribe( (resp: {ok: boolean, token: string}) => {
          if ( resp.ok ) {
            this.guardarToken(resp.token);
            resolve(true);
          } else {
            resolve(false);
          }
        });
    });
  }
}
