import { Component, OnInit } from '@angular/core';
import { Hospital } from '../../models/hospital.model';
import { ModalUploadService, HospitalService } from 'src/app/services/service.index';

declare var swal: any;

@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styles: []
})
export class HospitalesComponent implements OnInit {

  hospitales: Hospital[];
  totalRegistros: number = 0;
  constructor(public _hospitalService: HospitalService, public _modalUploadService: ModalUploadService) { }

  ngOnInit() {
    this.cargarHospitales();
    this._modalUploadService.notificacion.subscribe(() => this.cargarHospitales());
  }

  cargarHospitales() {
    this._hospitalService.cargarHospitales().subscribe((resp: any) => {
     this.hospitales = resp.hospitales;
     this.totalRegistros = resp.hospitales.length;
    });
  }

  buscarHospital(termino: string) {

    if (termino.length <= 0) {
      this.cargarHospitales();
      return;
    }

    this._hospitalService.buscarHospital(termino).subscribe((hospital: Hospital[]) => {
      this.hospitales = hospital;
      this.totalRegistros = hospital.length;
    });

  }

  crearHospital() {

    swal({
      title: 'Crear Hospital',
      text: 'Ingrese el nombre del hospital',
      content: 'input',
      icon: 'info',
      buttons: true,
      dangerMode: true,
    }).then((valor: string) => {

      if (!valor || valor.length === 0) {
        return;
      }

      if (valor) {
        this._hospitalService.crearHospital(valor).subscribe(() => this.cargarHospitales());
      }
    });
  }

  actualizarHospital(hospital: Hospital) {
    this._hospitalService.actualizarHospital(hospital).subscribe();
  }

  borrarHospital(hospital: Hospital) {
    swal({
      title: '¿Esta seguro?',
      text: 'Esta a punto de borrar el hospital ' + hospital.nombre,
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    }).then((borrar) => {

      if (borrar) {
        this._hospitalService.borrarHospital(hospital._id).subscribe(() => {
           this.cargarHospitales();
        });
      }
    });

  }

  actualizarImagen( hospital: Hospital) {
    this._modalUploadService.mostrarModal('hospitales', hospital._id);
  }


}
