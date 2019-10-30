import { Component } from '@angular/core';

@Component({
  selector: 'dsn-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent {
  inputsDocumentation: any[] = [];
  description = 'Los usamos para indicar al usuario algún tipo de alerta.';
  link = 'https://brandbook.naranja.com/document/248804#/componentes/message';
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
        name: 'text',
        type: 'string',
        description: 'texto del mensaje',
        required: 'Si',
        value: '-'
      },
      {
        name: 'type',
        type: 'string',
        description: '(success, warning, error)',
        required: 'No',
        value: 'success'
      }
    ];
  }

}
