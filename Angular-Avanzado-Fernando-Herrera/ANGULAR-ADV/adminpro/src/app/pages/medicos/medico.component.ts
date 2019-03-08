import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Hospital } from '../../models/hospital.model';
import { Medico } from '../../models/medico.model';
import { MedicoService, HospitalService, ModalUploadService } from 'src/app/services/service.index';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
  styles: []
})
export class MedicoComponent implements OnInit {

  hospitales: Hospital[];
  medico: Medico = new Medico('', '', '', '', '');
  hospital: Hospital = new Hospital('');

  constructor(
    public _hospitalService: HospitalService,
    public _medicoService: MedicoService,
    public router: Router,
    public activedRoute: ActivatedRoute,
    public _modalUploadService: ModalUploadService
  ) {

    // Obtengo el Id que esta en la url.
     activedRoute.params.subscribe(params => {

        const id = params['id'];

        if (id !== 'nuevo') {
          this.cargarMedico(id);
        }
     });
  }

  ngOnInit() {
    this._hospitalService.cargarHospitales().subscribe((hospitales: any) => this.hospitales = hospitales.hospitales);
    this._modalUploadService.notificacion.subscribe(resp => {
      // Colocamos la nueva imagen en el objeto del medico.
      this.medico.img = resp.medico.img;
    });
  }

  cargarMedico(id: string) {
    this._medicoService.obtenerMedico(id).subscribe(medico => {
      this.medico = medico;
      // Para que lo cargue en el select de hospital.
      this.medico.hospital = medico.hospital._id;
      this.cambioHospital(this.medico.hospital);

    });
  }

  guardarMedico(f: NgForm) {
    if ( f.invalid) {
      return;
    }

     this._medicoService.guardarMedio(this.medico).subscribe(medico => {
       this.medico._id = medico._id;
       this.router.navigate(['/medico', medico._id]);
     });
  }

  cambioHospital(id) {

    this._hospitalService.obtenerHospital(id).subscribe(hospital => this.hospital = hospital);

  }

  cambiarFoto() {
    this._modalUploadService.mostrarModal('medicos', this.medico._id);
  }

}
