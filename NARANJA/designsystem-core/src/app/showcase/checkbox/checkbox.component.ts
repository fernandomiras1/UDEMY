import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'dsn-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss']
})
export class CheckboxComponent implements OnInit {
  public text = '¿Qué tarjetas querés recibir?';
  public listCheckboxs = [{id: 1, disabled: false, selected: false, indeterminate: false, text: 'Todas',
    listCheckboxs: [
      { id: 1, disabled: false, selected: false, indeterminate: false, text: 'Naranja' },
      { id: 1, disabled: false, selected: false, indeterminate: false, text: 'VISA' },
      { id: 1, disabled: false, selected: false, indeterminate: false, text: 'Mastercard' },
      { id: 1, disabled: false, selected: false, indeterminate: false, text: 'American Express' }
    ]}];
  public listCheckboxsEnabled = [{ id: 1, disabled: false, selected: false, indeterminate: false,
    text: 'Acepto los términos y condiciones' },
    { id: 1, disabled: false, selected: false, indeterminate: false, text: 'Quiero recibir promociones' }];
  public listCheckboxsIndeterminate = [{id: 1, disabled: false, selected: false, indeterminate: false, text: 'En cualquier momento del día',
    listCheckboxs: [
      { id: 1, disabled: false, selected: false, indeterminate: false, text: 'Por la mañana' },
      { id: 1, disabled: false, selected: true, indeterminate: false, text: 'Por la tarde' },
      { id: 1, disabled: false, selected: false, indeterminate: false, text: 'Por la noche' }]}];
  public textIndeterminate = '¿En qué momento querés recibirlas?';
  public listCheckboxsDisabled = [{id: 1, disabled: true, selected: false, indeterminate: false, text: 'Habilitar notificaciones',
    listCheckboxs: []}];
  description = 'Los checkboxes o casillas de verificación permiten la selección de múltiples opciones.';
  link = 'https://brandbook.naranja.com/document/248804#/componentes/checkbox';
  inputsDocumentation: any [] = [];
  outputsDocumentation: any [] = [];
  info = {
    status: 'available',
    browserSupport: {
      versionNumber: ['66+', '63+', '11.1+', '15+', '11', '50+', '5+', '5+'],
      visualSupport: ['Si', 'Si', 'Si', 'Si', 'Si', 'Si', 'Si', 'Si'],
      functionalSupport: ['Si', 'Si', 'Si', 'Si', 'Si', 'Si', 'Si', 'Si']
    }
  };
  constructor() {
    this.inputsDocumentation = [{
      name: 'listCheckboxs',
      type: 'any[]',
      description: 'Propiedades dentro de cada objeto de la lista (text: string, indeterminate: boolean, listCheckboxs: any[], ' +
        'selected: boolean, disabled: boolean). ',
      required: 'Si',
      value: '-'
    }, {
      name: 'text',
      type: 'string',
      description: 'Título del conjunto de checkboxes',
      required: 'No',
      value: '-'
    }];

    this.outputsDocumentation = [{
      name: 'checkboxChange',
      type: 'event',
      description: 'Emite el objeto seleccionado, también emite la jerarquía de los hijos',
      required: 'No',
      value: '-'
    }];
  }

  ngOnInit() {
  }

}
