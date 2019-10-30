import { Component } from '@angular/core';

@Component({
  selector: 'dsn-browser',
  templateUrl: './browser.component.html',
  styleUrls: ['./browser.component.scss']
})
export class BrowserComponent {
  public inputsDocumentation: any[] =  [
    {
      name: 'clickOutside',
      type: 'eventEmitter',
      description: 'Ingresamos la función que queremos ejecutar luego de hacer el click por fuera',
      required: 'Si',
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
  // tslint:disable-next-line:max-line-length
  public description = `Usamos esta directiva para identificar el navegador del usuario y reproducir una solución particular para ese browser. En navegadores donde no podemos reproducir una solución particular de nuestro design system, generamos una variante visual manteniendo la funcionalidad del componente.`;
  public demoExp = `En este ejemplo, mostramos un mensaje particular solo en Opera.`;

  constructor() {}
}
