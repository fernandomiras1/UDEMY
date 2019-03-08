import { Injectable } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
// Importamos solo el operador map. para no cargar el nav con otros operadores.
// import 'rxjs/add/operator/map';
import { map, catchError } from 'rxjs/operators';
import { SubirArchivoService } from '../subir-archivo/subir-archivo.service';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  url = environment.apiUrl;
  usuario: Usuario;
  token: string;
  menu: any = [];
  constructor(public http: HttpClient,
              public _subirArchivoService: SubirArchivoService,
              public router: Router) { this.cargarStorage(); }

  estaLogueado() {

    if (this.token === null) {
      return;
    } else {
      return (this.token.length > 5) ? true : false;
    }
  }

  cargarStorage() {
    if (localStorage.getItem('token')) {
      this.token = localStorage.getItem('token');
      this.usuario = JSON.parse(localStorage.getItem('usuario'));
      this.menu = JSON.parse(localStorage.getItem('menu'));
    } else {
      this.token = '';
      this.usuario = null;
      this.menu = [];
    }
  }

  guardarStorage(id: string, token: string, usuario: Usuario, menu: any) {
    localStorage.setItem('id', id);
    localStorage.setItem('token', token);
    localStorage.setItem('usuario', JSON.stringify(usuario));
    localStorage.setItem('menu', JSON.stringify(menu));

    this.usuario = usuario;
    this.token = token;
    this.menu = menu;
  }

  logout() {
    this.usuario = null;
    this.token = '';
    this.menu = [];

    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    localStorage.removeItem('menu');

    this.router.navigate(['/login']);
  }


  loginGoogle(token: string) {
    return this.http.post(this.url + '/login/google', {token: token}).pipe(
      map((resp: any) => {
        this.guardarStorage(resp.id, resp.token, resp.usuario, resp.menu);
        return true;
      })
    );
  }


  login(usuario: Usuario, recordar: boolean) {

    if (recordar) {
      localStorage.setItem('email', usuario.email);
    } else {
      localStorage.removeItem('email');
    }

    return this.http.post(this.url + '/login', usuario).pipe(
      map((resp: any) => {
        this.guardarStorage(resp.id, resp.token, resp.usuarios, resp.menu);
        return true;
      }),
      catchError(err => {
       swal('Error en el login', err.error.mensaje , 'error');
       return throwError(err);
      })
    );

  }

  renuevaToken() {
    let url = this.url + '/login/renuevatoken';
    url += '?token=' + this.token;

    return this.http.get(url).pipe(
      map((resp: any) => {
        this.token = resp.token;
        localStorage.setItem('token', this.token);
        console.log('token renovado');
        return true;
      }),
      catchError(err => {
       this.logout();
       swal('Error Token', 'No fue posible renovar token' , 'error');
       return throwError(err);
      })
    );
  }



  crearUsuario(usuario: Usuario) {

   return this.http.post(this.url + '/usuario', usuario).pipe(
            map((resp: any) => {
              swal('Usuario creado', usuario.email , 'success');
              return resp.usuario;
            }),
            catchError(err => {
             swal(err.error.mensaje, err.error.errors.message , 'error');
             return throwError(err);
            })
          );

  }

  actualizarUsuario(usuario: Usuario) {
    let url = this.url + '/usuario/' + usuario._id;
    url += '?token=' + this.token;
    return this.http.put(url, usuario).pipe(
      map((resp: any) => {

        // Pregunto si el usuario soy yo mismo
        if (usuario._id === resp.usuario) {
          const usuarioDB: Usuario = resp.usuario;
          // modificamos el LocalStorage.
        this.guardarStorage(usuarioDB._id, this.token, resp.usuario, this.menu);
        }

        swal('Usuario actualizado', usuario.nombre , 'success');
        return true;
      }),
      catchError(err => {
       swal(err.error.mensaje, err.error.errors.message , 'error');
       return throwError(err);
      })
    );
  }

  cambiarImagen(archivo: File, id: string) {
    this._subirArchivoService.subirArchivo(archivo, 'usuarios', id)
      .then((resp: any) => {
        this.usuario.img = resp.usuario.img;
        swal('Imagen Actualizada', this.usuario.nombre , 'success');
        // Guardamos la nueva imagene en el localStroage, para que se replique en todos las pantallas.
        this.guardarStorage(id, this.token, this.usuario, this.menu);
      })
      .catch(resp => {
        console.log(resp);
      });
  }

  cargarUsuarios(desde: number = 0) {
    const url = this.url + '/usuario?desde=' + desde;
    return this.http.get(url);
  }

  buscarUsuarios(termino: string) {
    const url = this.url + '/busqueda/colleccion/usuarios/' + termino;
    return this.http.get(url).pipe(
      map( (resp: any) => resp.usuarios )
    );
  }

  borrarUsuario(id: string) {
    let url = this.url + '/usuario/' + id;
    url += '?token=' + this.token;

    return this.http.delete(url).pipe(
      map(() => {
         swal('Usuario borrado', 'El usuario a sido eliminado correctamente', 'success');
         return true;
      })
    );
  }


}
