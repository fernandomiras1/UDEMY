import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'dsn-switch',
  templateUrl: './switch.component.html',
  styleUrls: ['./switch.component.scss']
})
export class SwitchComponent implements OnInit {
  switch = { text: 'Habilitar notificaciones', selected: false, disabled: false };
  switchOn = { text: 'Habilitar notificaciones', selected: true, disabled: false };
  switchDisabled = { text: 'Habilitar notificaciones', selected: false, disabled: true };
  switchOnLeft = { text: 'Habilitar notificaciones', selected: true, disabled: false };
  switchDisabledLeft = { text: 'Habilitar notificaciones', selected: false, disabled: true };
  description = 'Los interruptores o toggles son una forma rápida de optar entre estados binarios. ' +
    'Se usan solo cuando el impacto de la acción es inmediato; no se usan en casos en que se requiera una ' +
    'confirmación extra a través de un botón (Ok, Aceptar, Continuar, Enviar).';
  link = 'https://brandbook.naranja.com/document/248804#/componentes/switch';
  inputsDocumentation: any[] = [];
  outputsDocumentation: any[] = [];
  info = {
    status: 'available',
    browserSupport: {
      versionNumber: ['66+', '63+', '11.1+', '18+', '11', '50+', '5+', '5+'],
      visualSupport: ['Si', 'Si', 'Si', 'Si', 'Si', 'Si', 'Si', 'Si'],
      functionalSupport: ['Si', 'Si', 'Si', 'Si', 'Si', 'Si', 'Si', 'Si']
    }
  };

  form: FormGroup;
  constructor() {
    this.inputsDocumentation = [{
      name: 'switch',
      type: 'any',
      description: 'Propiedades del objeto (selected: boolean, disabled: boolean, text: string), text no es obligatorio.',
      required: 'Si',
      value: '-'
    }, {
      name: 'type',
      type: 'string',
      description: 'Define la alineación del componente con el label (right-align - left-align). Por defecto es right-align.',
      required: 'No',
      value: '-'
    }];

    this.outputsDocumentation = [{
      name: 'switchChange',
      type: 'Event',
      description: 'Emite el objeto seleccionado.',
      required: 'No',
      value: '-'
    }];
  }

  ngOnInit() {
    this.form = new FormGroup({
      switch: new FormControl(this.switch)});
  }

}
