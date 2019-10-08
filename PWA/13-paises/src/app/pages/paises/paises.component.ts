import { Component, OnInit } from '@angular/core';
import { PaisesService } from 'src/app/services/paises.service';
import { PaisInterface } from 'src/app/interface/pais.interface';

@Component({
  selector: 'app-paises',
  templateUrl: './paises.component.html',
  styleUrls: ['./paises.component.css']
})
export class PaisesComponent implements OnInit {

  constructor(public paisesService: PaisesService) { }

  paises: PaisInterface[] = [];

  ngOnInit() {
    this.paisesService.getPaises().then(paises => {
      this.paises = paises;
      console.log(paises);
    });
  }

}
