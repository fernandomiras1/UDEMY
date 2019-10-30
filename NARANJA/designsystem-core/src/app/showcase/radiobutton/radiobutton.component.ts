import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'dsn-radiobutton',
  templateUrl: './radiobutton.component.html',
  styleUrls: ['./radiobutton.component.scss']
})
export class RadiobuttonComponent implements OnInit {
  public listRadioButtons: any[] = [{ id: 1, disabled: false, selected: false, text: 'Imprimir resumen de cuenta' },
    { id: 1, disabled: false, selected: true, text: 'Pagar resumen' },
    { id: 1, disabled: true, selected: false, text: 'Solicitar un préstamo' }];
  public listRadioButtonsDisabled: any[] = [{ id: 1, disabled: true, selected: false, text: 'Solicitar un préstamo' }];
  public listRadioButtonsEnabled: any[] = [{ id: 1, disabled: false, selected: false, text: 'Imprimir resumen de cuenta' }];
  public description = 'Los radio button permiten la selección de una alternativa única dentro de una lista corta de opciones. ' +
    'La selección de una opción provoca la deselección de la opción elegida previamente.';
  public link = 'https://brandbook.naranja.com/document/248804#/componentes/radio-button';
  public inputsDocumentation: any[];
  public outputsDocumentation: any[];
  public text = '¿Qué quiere hacer el cliente?';
  info = {
    status: 'available',
    browserSupport: {
      versionNumber: ['66+', '63+', '11.1+', '15+', '11', '50+', '5+', '5+'],
      visualSupport: ['Si', 'Si', 'Si', 'Si', 'Si', 'Si', 'Si', 'Si'],
      functionalSupport: ['Si', 'Si', 'Si', 'Si', 'Si', 'Si', 'Si', 'Si']
    }
  };
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
  constructor() {
    this.inputsDocumentation = [{
      name: 'listRadioButtons',
      type: 'any[]',
      description: 'Propiedades dentro de cada item (text: string, selected: boolean, disabled: boolean).',
      required: 'Si',
      value: '-'
    }, {
      name: 'text',
      type: 'string',
      description: 'Título del conjunto de radio buttons',
      required: 'No',
      value: '-'
    }];

    this.outputsDocumentation = [{
      name: 'radioButtonChange',
      type: 'event',
      description: 'Emite el objeto seleccionado',
      required: 'No',
      value: '-'
    }];
  }

  ngOnInit() {
  }

  return() {
    return this.data;
  }

}
