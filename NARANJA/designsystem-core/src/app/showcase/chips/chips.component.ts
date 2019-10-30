import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'dsn-chips',
  templateUrl: './chips.component.html',
  styleUrls: ['./chips.component.scss']
})
export class ChipsComponent implements OnInit {
  public form: FormGroup;
  public listChips: any[] = [{ id: 1, disabled: false, selected: false, text: '$50' },
    { id: 2, disabled: false, selected: false, text: '$500' },
    { id: 3, disabled: false, selected: false, text: '$1.000' },
    { id: 4, disabled: true, selected: false, text: '$10.000' }];
  public listChipsRadio: any[] = [{ id: 1, disabled: false, selected: false, text: '$50' },
    { id: 2, disabled: false, selected: false, text: '$500' },
    { id: 3, disabled: false, selected: false, text: '$1.000' },
    { id: 4, disabled: true, selected: false, text: '$10.000' }];
  public listChipsCheckbox: any[] = [{ id: 1, disabled: false, selected: false, text: '$50' },
    { id: 2, disabled: false, selected: false, text: '$500' },
    { id: 3, disabled: false, selected: false, text: '$1.000' },
    { id: 4, disabled: true, selected: false, text: '$10.000' }];
  public listChipsSelected: any[] = [{ id: 1, disabled: false, selected: true, text: '$1.000' }];
  public listChipsDisabled: any[] = [{ id: 3, disabled: true, selected: false, text: '$10.000' }];
  public inputsDocumentation: any[];
  public outputsDocumentation: any[];
  description = 'Las choice chips permiten seleccionar un ítem dentro de una serie de opciones.' +
    ' Las usamos para mostrar información de forma compacta. Son una buena alternativa para los radio buttons y los single selects.';
  link = 'https://brandbook.naranja.com/document/248804#/componentes/chips';
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
      name: 'defaultIndexSelected',
      type: 'number',
      description: 'Establece el chip seleccionado por defecto de acuerdo al índice de la lista.',
      required: 'No',
      value: '-'
    }, {
      name: 'listChips',
      type: 'any[]',
      description: 'Propiedades obligatorias dentro de cada objeto de la lista (text: string, selected: boolean, disabled: true).',
      required: 'Si',
      value: '-'
    }, {
      name: 'type',
      type: 'string',
      description: 'Admite el tipo radio y checkbox.',
      required: 'No',
      value: '-'
    }];

    this.outputsDocumentation = [{
      name: 'chipChecked',
      type: 'event',
      description: 'Emite el objeto seleccionado.',
      required: 'No',
      value: '-'
    }];
  }

  ngOnInit() {
    this.createForm();

  }

  createForm(): void {
    this.form = new FormGroup({
      chip: new FormControl(this.listChips)
    });
  }
}
