import { Component } from '@angular/core';

@Component({
  selector: 'dsn-accordion',
  templateUrl: './accordion.component.html',
  styleUrls: ['./accordion.component.scss']
})
export class AccordionComponent {
  inputsDocumentation: any[] = [];

  description = 'Los listados tipo acordeón permiten al usuario expandir y colapsar secciones de contenido.';

  info = {
    status: 'beta',
    browserSupport: {
      versionNumber: ['66+', '63+', '11.1+', '18+', '11', '50+', '5+', '5+'],
      visualSupport: ['-', '-', '-', '-', '-', '-', '-', '-'],
      functionalSupport: ['-', '-', '-', '-', '-', '-', '-', '-']
    }
  };

  link = 'https://brandbook.naranja.com/document/248804#/componentes/accordion';

  constructor() {
    this.inputsDocumentation = [
      {
        name: 'isOpen',
        type: 'boolean',
        description: 'Indica el estado del acordeón.',
        required: 'No',
        value: 'true, false. Por defecto viene en estado "false" (Cerrado)'
      }];
  }

}
