import { Component, OnInit } from '@angular/core';
import { Medico } from 'src/app/models/medico.model';
import { MedicoService } from '../../services/medico/medico.service';

declare var swal: any;

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styles: []
})
export class MedicosComponent implements OnInit {

  medicos: Medico[];
  constructor(
    public _medicosService: MedicoService
  ) { }

  ngOnInit() {
    this.cargarMedicos();
  }

  cargarMedicos() {
    this._medicosService.cargarMedicos().subscribe(medicos => this.medicos = medicos);
  }

  buscarMedico(termino: string) {

    if (termino.length <= 0) {
      this.cargarMedicos();
      return;
    }

    this._medicosService.buscarMedicos(termino).subscribe(medicos => this.medicos = medicos);
  }

  editarMedico(medico: Medico) {

  }

  borrarMedico(medico: Medico) {
    swal({
      title: '¿Esta seguro?',
      text: 'Esta a punto de borrar el medico ' + medico.nombre,
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    }).then((borrar) => {

      if (borrar) {
        this._medicosService.borrarMedico(medico._id).subscribe(() => {
           this.cargarMedicos();
        });
      }
    });

  }

}
