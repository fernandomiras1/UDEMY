import { Component, OnInit } from '@angular/core';
import { FileItem } from 'src/app/model/file-item';
import { CargarImagenesService } from '../../services/cargar-imagenes.service';


@Component({
  selector: 'app-carga',
  templateUrl: './carga.component.html',
  styles: []
}) 
export class CargaComponent implements OnInit {

  // Esta sobre el elemento Drop 
  estaSobreElemento: boolean;
  archivos: FileItem[] = [];
  constructor( private _cargaImageneService: CargarImagenesService ) { }

  ngOnInit() {
  }

  cargarImagenes() {
    this._cargaImageneService.cargarImagenFireBase( this.archivos );
  }

  limpiarArchivos(): void {
    this.archivos = [];
  }

}
