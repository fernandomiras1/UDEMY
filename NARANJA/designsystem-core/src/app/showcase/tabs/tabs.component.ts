import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'dsn-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss']
})
export class TabsComponent implements OnInit {
  public inputsDocumentation: any[] = [];
  public styleArray: any;
  description = 'Las pestañas o tabs constituyen una forma fácil de organizar contenido ' +
    'del mismo nivel, agrupando información similar. Esto permite la visualización ' +
    'de múltiples contenidos sin abandonar una única página.';

  link = 'https://brandbook.naranja.com/document/248804#/componentes/tabs';
  info = {
    status: 'beta',
    browserSupport: {
      versionNumber: ['66+', '63+', '11.1+', '15+', '11', '50+', '5+', '5+'],
      visualSupport: ['Si', 'Si', 'Si', 'Si', 'Si', 'Si', 'Si', 'Si'],
      functionalSupport: ['Si', 'Si', 'Si', 'Si', 'Si', 'Si', 'Si', 'Si']
    }
  };
  constructor() {
    this.inputsDocumentation = [
      {
        name: 'title',
        type: 'string',
        description: 'Título del tab.',
        required: 'Si',
        value: '-'
      },
      {
        name: 'disabled',
        type: 'boolean',
        description: 'Indica si la tab esta habilitada.',
        required: 'No',
        value: 'false'
      },
      {
        name: 'isActive',
        type: 'boolean',
        description: 'La tab con esta propiedad inicia como activa por defecto.',
        required: 'No',
        value: 'false'
      },
      {
        name: 'isHidden',
        type: 'boolean',
        description: 'Esta propiedad no muestra la tab indicada.',
        required: 'No',
        value: 'false'
      }
    ];
  }

  ngOnInit() {
    this.styleArray = { height: '100%' };
  }
}
