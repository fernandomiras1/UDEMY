import { Component } from '@angular/core';

@Component({
  selector: 'dsn-ripple',
  templateUrl: './ripple.component.html',
  styleUrls: ['./ripple.component.scss']
})
export class RippleComponent {
  public inputsDocumentation: any[] =  [
    {
      name: 'isClickable',
      type: 'boolean',
      description: 'Se utiliza para aplicar el efecto',
      required: 'No',
      value: '-'
    },
    {
      name: 'backgroundColor',
      type: 'string',
      description: 'Se utiliza para aplicar un color de background especifíco dentro del componente utilizado',
      required: 'No',
      value: '-'
    }
  ];
  info = {
    status: 'available',
    browserSupport: {
      versionNumber: ['66+', '63+', '11.1+', '15+', '11', '50+', '5+', '5+'],
      visualSupport: ['Si', 'Si', 'Si', 'Si', 'Si', 'Si', 'Si', 'Si'],
      functionalSupport: ['Si', 'Si', 'Si', 'Si', 'Si', 'Si', 'Si', 'Si']
    }
  };
  // tslint:disable-next-line:prefer-template
  public title: any = 'Hacé clic en esta card para ver el efecto ripple.';
  // tslint:disable-next-line:max-line-length
  public description = `Usamos esta directiva cuando necesitamos aplicar el efecto ripple en un elemento.`;

  constructor() {}

}
