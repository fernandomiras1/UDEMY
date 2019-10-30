import { Component, OnInit } from '@angular/core';
import { Documentation } from './documentation.component';

@Component({
  selector: 'dsn-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {

  description = 'Nuestra grilla está conformada por 12 columnas. Las columnas están separadas por calles de ancho fijo. ' +
    'La grilla posee márgenes laterales que separan el contenido del borde de la pantalla.';
  link = 'https://brandbook.naranja.com/document/248804#/foundations/layout';

  public documentation: Documentation;
  public list;
  constructor() {
    this.documentation = new Documentation();
    this.list = [
      {
        range: '1 - 359',
        variable: 'col-xxs',
        height: '100%',
        columns: '12',
        cases: '16',
        margins: '16'
      },
      {
        range: '360 - 575',
        variable: 'col-xs',
        height: '100%',
        columns: '12',
        cases: '16',
        margins: '24'
      },
      {
        range: '576 - 767',
        variable: 'col-sm',
        height: '100%',
        columns: '12',
        cases: '32',
        margins: '32'
      },
      {
        range: '768 - 1023',
        variable: 'col-md',
        height: '100%',
        columns: '12',
        cases: '32',
        margins: '32'
      },
      {
        range: '1024 - 1365',
        variable: 'col-lg',
        height: '960px',
        columns: '12',
        cases: '32',
        margins: 'auto'
      },
      {
        range: '1366+',
        variable: 'col-xl',
        height: '1096px',
        columns: '12',
        cases: '32',
        margins: 'auto'
      }
    ];
  }

  ngOnInit() {
  }

}
