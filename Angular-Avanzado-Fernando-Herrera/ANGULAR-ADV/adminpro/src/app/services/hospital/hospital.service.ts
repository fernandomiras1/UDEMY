import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Hospital } from 'src/app/models/hospital.model';
import { SubirArchivoService } from '../subir-archivo/subir-archivo.service';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { UsuarioService } from '../usuario/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class HospitalService {

  url = environment.apiUrl;
  hospital: Hospital;
  token: string;
  constructor(public http: HttpClient, public _subirArchivoService: SubirArchivoService,
    public _usuarioService: UsuarioService,
    public router: Router) { }


  cargarHospitales() {
    return this.http.get(this.url + '/hospital');
  }

  obtenerHospital( id: string ) {
    return this.http.get(this.url + '/hospital/' + id).pipe(
      map((resp: any) => resp.hospital)
    );
  }

  borrarHospital( id: string ) {
    let url = this.url + '/hospital/' + id;
    url += '?token=' + this._usuarioService.token;

    return this.http.delete(url).pipe(
      map(resp => swal('Hospital Borrado', 'Eliminado Correctamente' , 'success'))
    );
  }

  crearHospital( nombre: string ) {
    let url = this.url + '/hospital';
    url += '?token=' + this._usuarioService.token;

    return this.http.post(url, {nombre: nombre}).pipe(
      map((resp: any) => {
        swal('Hospital creado', nombre , 'success');
        return resp.hospital;
      })
    );
  }

  buscarHospital( termino: string ) {
    const url = this.url + '/busqueda/colleccion/hospitales/' + termino;
    return this.http.get(url).pipe(
      map( (resp: any) => resp.hospitales )
    );
  }

  actualizarHospital( hospital: Hospital ) {
    let url = this.url + '/hospital/' + hospital._id;
    url += '?token=' + this._usuarioService.token;

    return this.http.put(url, hospital).pipe(
      map((resp: any) => {
        swal('Hospital actualizado', hospital.nombre , 'success');
        return resp.hospital;
      })
    );
  }
}
