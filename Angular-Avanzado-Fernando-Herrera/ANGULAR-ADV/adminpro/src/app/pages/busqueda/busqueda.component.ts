import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Usuario } from 'src/app/models/usuario.model';
import { Medico } from 'src/app/models/medico.model';
import { Hospital } from 'src/app/models/hospital.model';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styles: []
})
export class BusquedaComponent implements OnInit {

  url = environment.apiUrl;

  usuarios: Usuario[];
  medicos: Medico[];
  hospitales: Hospital[];

  constructor(
    public activatedRoute: ActivatedRoute,
    public http: HttpClient
  ) {
    activatedRoute.params.subscribe( params => {
      const termino = params['termino'];
      this.buscar(termino);
    });
   }

  ngOnInit() {
  }

  buscar(termino: string) {
    const url = this.url + '/busqueda/todo/' + termino;
    this.http.get(url).subscribe((resp: any) => {
      // console.log(resp);
      this.usuarios = resp.usuarios;
      this.hospitales = resp.hospitales;
      this.medicos = resp.medicos;
    });
  }

}
