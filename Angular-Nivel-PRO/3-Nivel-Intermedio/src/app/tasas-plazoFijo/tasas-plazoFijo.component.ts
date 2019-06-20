import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tasas-plazoFijo',
  templateUrl: './tasas-plazoFijo.component.html',
  styleUrls: ['./tasas-plazoFijo.component.scss']
})
export class TasasPlazoFijoComponent implements OnInit {

  montoActual: number;
  tasa: number;
  periodo: number;
  resultado: number;
  constructor() { }

  ngOnInit() {
    this.resultado = 0;
  }

  calcular() {
    this.resultado = this.montoActual * ( this.tasa * this.periodo/365);
  }

}
