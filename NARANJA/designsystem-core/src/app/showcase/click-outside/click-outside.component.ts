import { Component } from '@angular/core';

@Component({
  selector: 'dsn-click-outside',
  templateUrl: './click-outside.component.html',
  styleUrls: ['./click-outside.component.scss']
})
export class ClickOutsideComponent {
  public inputsDocumentation: any[] =  [
    {
      name: 'clickOutside',
      type: 'eventEmitter',
      description: 'Ingresamos la función que queremos ejecutar luego de hacer el click por fuera',
      required: 'Si',
      value: '-'
    }
  ];
  public number: any = 0;
  // tslint:disable-next-line:prefer-template
  public title: any = 'El número cambiará cada vez que hagas clic fuera de esta card: ';
  // tslint:disable-next-line:max-line-length
  public description = `Usamos esta directiva cuando necesitamos ejecutar una acción luego de que el usuario hace click fuera de un elemento.`;
  info = {
    status: 'available',
    browserSupport: {
      versionNumber: ['66+', '63+', '11.1+', '15+', '11', '50+', '5+', '5+'],
      visualSupport: ['Si', 'Si', 'Si', 'Si', 'Si', 'Si', 'Si', 'Si'],
      functionalSupport: ['Si', 'Si', 'Si', 'Si', 'Si', 'Si', 'Si', 'Si']
    }
  };
  constructor() {}

  onClickOutside() {
    // tslint:disable-next-line:prefer-template
    this.title = `El número cambiará cada vez que hagas clic fuera de esta card: `;
    // tslint:disable-next-line:block-spacing
    this.number = `${Math.round(Math.random() * 10)}`;
  }
}
