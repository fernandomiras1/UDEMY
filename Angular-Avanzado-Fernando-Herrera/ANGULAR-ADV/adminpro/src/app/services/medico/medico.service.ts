import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { SubirArchivoService } from '../subir-archivo/subir-archivo.service';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { UsuarioService } from '../usuario/usuario.service';
import { Medico } from 'src/app/models/medico.model';


@Injectable({
  providedIn: 'root'
})
export class MedicoService {

  url = environment.apiUrl;
  token: string;
  totalMedicos: number = 0;
  constructor(public http: HttpClient, public _subirArchivoService: SubirArchivoService,
    public router: Router, public _usuarioService: UsuarioService) { }


    cargarMedicos() {
      return this.http.get(this.url + '/medico').pipe(
        map((resp: any) => {
          this.totalMedicos = resp.total;
          return resp.medicos;
        })
      );
    }

    buscarMedicos(termino: string) {
      const url = this.url + '/busqueda/colleccion/medicos/' + termino;
      return this.http.get(url).pipe(
        map( (resp: any) => resp.medicos )
      );
    }


    borrarMedico( id: string ) {
      let url = this.url + '/medico/' + id;
      url += '?token=' + this._usuarioService.token;

      return this.http.delete(url).pipe(
        map(resp => swal('Medico Borrado', 'Médico Eliminado Correctamente' , 'success'))
      );
    }

    guardarMedio( medico: Medico) {
     let url = this.url + '/medico';
      if (medico._id) {
        // Actualizando Medico
        url += '/' + medico._id;
        url += '?token=' + this._usuarioService.token;
        return this.http.put(url, medico).pipe(
          map((resp: any) => {
            swal('Medico Actualizado', medico.nombre , 'success');
            return resp.medico;
          })
        );
      } else {
        // Creando
        url += '?token=' + this._usuarioService.token;
       return this.http.post(url, medico).pipe(
           map((resp: any) => {
             swal('Medico Creado', medico.nombre , 'success');
            return resp.medico;
           })
         );
      }

    }

    obtenerMedico(id: string) {
      const url = this.url + '/medico/' + id;
      return this.http.get(url).pipe(
        map( (resp: any) => resp.medico)
      );
    }

}
