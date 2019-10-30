import { Component } from '@angular/core';

@Component({
  selector: 'dsn-slider-control',
  templateUrl: './slider-control.component.html',
  styleUrls: ['./slider-control.component.scss']
})
export class SliderControlComponent {
  min = 0;
  max = 2000;
  step = 1;
  disabled = false;
  titleActive = '¿Tus ingresos aproximados?';
  prefix = '$';
  public link = 'https://company-136401.frontify.com/d/zQh48gmAEeba/zumo#/componentes/slider';

  public inputsDocumentation: any[] = [];
  public outputsDocumentation: any[] = [];
  info = {
    status: 'beta',
    browserSupport: {
      versionNumber: ['66+', '63+', '11.1+', '15+', '11', '50+', '5+', '5+'],
      visualSupport: ['Si', 'Si', 'Si', 'Si', 'Si', 'Si', 'Si', 'Si'],
      functionalSupport: ['Si', 'Si', 'Si', 'Si', 'Si', 'Si', 'Si', 'Si']
    }
  };

  constructor() {
    this.inputsDocumentation = [{
      name: 'min',
      type: 'number',
      description: 'Valor mínimo.',
      required: 'Si',
      value: '-'
    }, {
      name: 'max',
      type: 'number',
      description: 'Valor máximo.',
      required: 'Si',
      value: '-'
    }, {
      name: 'step',
      type: 'number',
      description: 'Valor del salto del rango del Slider.',
      required: 'Si',
      value: '-'
    }, {
      name: 'title',
      type: 'string',
      description: 'Define el título del control',
      required: 'No',
      value: '-'
    }, {
      name: 'prefix',
      type: 'string',
      description: 'Define un prefix en caso de necesitarlo. Ejemplo: $',
      required: 'No',
      value: '-'
    },
    {
      name: 'disabled',
      type: 'boolean',
      description: 'Si está habilitado para la edición.',
      required: 'No',
      value: 'false'
    }];

    this.outputsDocumentation = [{
      name: 'valuesChange',
      type: 'eventEmitter',
      description: 'Emite el valor seleccionado.',
      required: 'No',
      value: '-'
    }];
  }

  public valuesChange(value: number) {
  }
}
