import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'dsn-hover',
  templateUrl: './hover.component.html',
  styleUrls: ['./hover.component.scss']
})
export class HoverComponent implements OnInit {

  info = {
    status: 'available',
    browserSupport: {
      versionNumber: ['66+', '63+', '11.1+', '15+', '11', '50+', '5+', '5+'],
      visualSupport: ['Si', 'Si', 'Si', 'Si', 'Si', 'Si', 'Si', 'Si'],
      functionalSupport: ['Si', 'Si', 'Si', 'Si', 'Si', 'Si', 'Si', 'Si']
    }
  };
  public inputsDocumentation: any[] =  [
    {
      name: 'isHover',
      type: 'boolean',
      description: 'Se utiliza para aplicar la directiva',
      required: 'No',
      value: '-'
    },
    {
      name: 'stylesEnter',
      type: 'array',
      description: 'Se utiliza para aplicar un estilo específico dentro del componente utilizado',
      required: 'No',
      value: '-'
    },
    {
      name: 'stylesLeave',
      type: 'array',
      description: 'Se utiliza para aplicar un estilo especifo al salir del componente utilizado',
      required: 'No',
      value: '-'
    },
    {
      name: 'breakpointMinWithoutStyles',
      type: 'number',
      description: 'Se utiliza para especificar un mínimo de resolución en el cual no se tienen que aplicar estilos',
      required: 'No',
      value: '-'
    }
  ];

  public status = 'available';
  public description = `Usamos esta directiva cuando necesitamos aplicar un hover sobre un elemento.`;
  public text = `Este botón usa la directiva hover`;
  public styleArray = { padding: '24px 24px 24px 24px' };

  constructor() { }

  ngOnInit() {
  }

}
