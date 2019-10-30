import { Component } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'dsn-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss']
})
export class SelectComponent {

  itemsDias = [
    { id: 1, text: 'Lunes', disabled: false },
    { id: 2, text: 'Martes', disabled: false },
    { id: 3, text: 'Miércoles', disabled: false },
    { id: 4, text: 'Jueves', disabled: false },
    { id: 5, text: 'Viernes', disabled: true }
  ];
  itemsProductos = [
    { id: 1, text: 'Convivimos', disabled: false },
    { id: 2, text: 'HBO', disabled: false },
    { id: 3, text: 'Préstamo', disabled: false },
    { id: 4, text: 'Seguro', disabled: false },
    { id: 5, text: 'Tarjetas', disabled: true }
  ];

  data = {
    consumptions: {
      filters: {
        users: [
          { id: 1, text: 'Sancho Panza', disabled: false },
          { id: 2, text: 'Mario Borges', disabled: false },
          { id: 3, text: 'Adolfito Mccarthney', disabled: false }],
        cards: [{ id: 1, text: 'Naranja', disabled: false },
         { id: 2, text: 'Visa', disabled: false }, { id: 3, text: 'AMEX', disabled: false }]
      }
    }
  };
  submitValidation: BehaviorSubject<boolean>;
  messageHint = 'Tenés que estar presente';

  public description = 'Select es un elemento que representa un control que provee un menú de opciones, ' +
    'donde se puede seleccionar una única opción.';
  public link = 'https://brandbook.naranja.com/document/248804#/componentes/select';
  public inputsDocumentation: any[] = [];
  public outputsDocumentation: any[] = [];
  info = {
    status: 'available',
    browserSupport: {
      versionNumber: ['66+', '63+', '11.1+', '15+', '11', '50+', '5+', '5+'],
      visualSupport: ['Si', 'Si', 'Si', 'Si', 'Si', 'Si', 'Si', 'Si'],
      functionalSupport: ['Si', 'Si', 'Si', 'Si', 'Si', 'Si', 'Si', 'Si']
    }
  };

  constructor() {
    this.submitValidation = new BehaviorSubject<boolean>(false);
    this.inputsDocumentation = [{
      name: 'items',
      type: 'any[]',
      description: 'Propiedades dentro de cada objeto de la lista (text: string, id: number).',
      required: 'Si',
      value: '-'
    }, {
      name: 'dropUp',
      type: 'boolean',
      description: 'Permite desplegar el select de acuerdo a la posición de la pantalla.',
      required: 'No',
      value: '-',
      defaultValue: 'true'
    }, {
      name: 'disabled',
      type: 'boolean',
      description: 'Deshabilita el control',
      required: 'Si',
      value: '-'
    }, {
      name: 'item',
      type: 'any',
      description: 'Permite setear el objeto seleccionado.',
      required: 'No',
      value: ' - '
    }, {
      name: 'defaultValue',
      type: 'string',
      description: 'Primera opción por defecto.',
      required: 'No',
      value: '-'
    }, {
      name: 'placeholderDefault',
      type: 'string',
      description: 'Placeholder que se mostrará en el elemento.',
      required: 'No',
      value: '-'
    }, {
      name: 'required',
      type: 'boolean',
      description: 'Valida si es requerido',
      required: 'No',
      value: 'true'
    }, {
      name: 'messagesSuccess',
      type: 'string',
      description: 'Mensaje que advierte cuando está bien lo ingresado en la caja de texto',
      required: 'No',
      value: '-'
    }, {
      name: 'messagesHint',
      type: 'string',
      description: 'Mensaje que aclara como completar el campo',
      required: 'No',
      value: '-'
    }, {
      name: 'messagesError',
      type: 'string',
      description: 'Mensaje que advierte cuando está mal lo ingresado en la caja de texto',
      required: 'No',
      value: '-'
    }, {
      name: 'checkValidation',
      type: 'Observable<boolean>',
      description: 'Permite checkear la validación en un momento determinado.',
      required: 'No',
      value: '-'
    }];

    this.outputsDocumentation = [{
      name: 'itemSelected',
      type: 'any',
      description: 'Emite el item seleccionado.',
      required: 'No',
      value: '-'
    }, {
      name: 'handlerError',
      type: 'eventEmitter',
      description: 'Se ejecuta siempre que cambia el estado del Textfield ',
      required: 'No',
      value: ' true o false'
    }];
  }

  submit() {
    this.submitValidation.next(true);
  }
}
