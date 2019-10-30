import { Component } from '@angular/core';

@Component({
  selector: 'dsn-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss']
})
export class SpinnerComponent {
  inputsDocumentation: any[] = [];
  description = 'Los usamos para indicar al usuario que algún tipo de contenido está siendo ' +
    'cargado o alguna tarea se está procesando en un segundo plano, y esta insumirá un tiempo indeterminado.';
  link = 'https://brandbook.naranja.com/document/248804#/componentes/spinner';
  info = {
    status: 'available',
    browserSupport: {
      versionNumber: ['66+', '63+', '11.1+', '15+', '11', '50+', '5+', '5+'],
      visualSupport: ['Si', 'Si', 'Si', 'Si', 'Si', 'Si', 'Si', 'Si'],
      functionalSupport: ['Si', 'Si', 'Si', 'Si', 'Si', 'Si', 'Si', 'Si']
    }
  };

  constructor() {
    this.inputsDocumentation = [
      {
        name: 'size',
        type: 'string',
        description: '(extra-large, large, medium, small, very-small)',
        required: 'No',
        value: 'medium'
      }];
  }

}
