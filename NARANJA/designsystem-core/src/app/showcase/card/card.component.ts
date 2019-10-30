import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'dsn-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

  description = 'Las cards muestran contenido relacionado de forma agrupada.';
  link = 'https://brandbook.naranja.com/document/248804#/componentes/card';
  info = {
    status: 'available',
    browserSupport: {
      versionNumber: ['66+', '63+', '11.1+', '15+', '11', '50+', '5+', '5+'],
      visualSupport: ['Si', 'Si', 'Si', 'Si', 'Si', 'Si', 'Si', 'Si'],
      functionalSupport: ['Si', 'Si', 'Si', 'Si', 'Si', 'Si', 'Si', 'Si']
    }
  };

  styleArray = { padding: '24px' };
  public inputsDocumentation: any[];
  public outputsDocumentation: any[];

  ngOnInit() {
    this.inputsDocumentation = [{
      name: 'clickable',
      type: 'boolean',
      description: 'Establece que la card puede ser clickeada.',
      required: 'No',
      value: '-'
    },
    {
      name: 'isNotHover',
      type: 'boolean',
      description: 'Si la propiedad esta en true quita el hover',
      required: 'No',
      value: '-'
    },
    {
      name: 'isNotShadow',
      type: 'boolean',
      description: 'Si la propiedad esta en true quita el shadow',
      required: 'No',
      value: '-'
    },
    {
      name: 'defaultStyles',
      type: 'boolean',
      description: 'Si el booleano está en false, en resoluciones menores a 767px, la card pierde todos sus ' +
        'estilos y se aplica el input styleListMobile.',
      required: 'No',
      value: 'true'
    },
    {
      name: 'styleList',
      type: 'any',
      description: 'Establece una lista de estilos que pueden ser aplicados a la card.',
      required: 'No',
      value: '-'
    },
    {
      name: 'styleListMobile',
      type: 'any',
      description: 'Si el booleano defaultStyles esta en false, establece una ' +
        'lista de estilos que pueden ser aplicados a la card para resoluciones menores a 767px.',
      required: 'No',
      value: '-'
    },
    {
      name: 'styleListBody',
      type: 'any',
      description: 'Establece una lista de estilos que pueden ser aplicados en el cuerpo de la card.',
      required: 'No',
      value: '-'
    },
    {
      name: 'styleListBodyMobile',
      type: 'any',
      description: 'Si el booleano defaultStyles esta en false, establece una ' +
        'lista de estilos que pueden ser aplicados en el cuerpo de la card para resoluciones menores a 767px.',
      required: 'No',
      value: '-'
    }
    ];

    this.outputsDocumentation = [{
      name: 'clickCard',
      type: 'event',
      description: 'Propaga el evento click.',
      required: 'No',
      value: '-'
    }];
  }

  showConsole(): void {
  }

}
