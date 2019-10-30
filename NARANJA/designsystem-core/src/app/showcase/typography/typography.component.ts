import { Component, OnInit } from '@angular/core';
import { Documentation } from './typography.documents';

@Component({
  selector: 'dsn-typography',
  templateUrl: './typography.component.html',
  styleUrls: ['./typography.component.scss']
})
export class TypographyComponent implements OnInit {
  description = 'La aplicación consistente de familias tipográficas otorga a nuestros productos un carácter reconocible e identificable. ' +
    'Ayuda a cumplir las expectativas del usuario, reduce la fricción y aumenta la confianza del cliente.';
  link = 'https://brandbook.naranja.com/document/248804#/foundations/Tipograf%C3%ADa-1540308048';
  info = {
    status: 'available',
    browserSupport: {
      versionNumber: ['66+', '63+', '11.1+', '15+', '11', '50+', '5+', '5+'],
      visualSupport: ['Si', 'Si', 'Si', 'Si', 'Si', 'Si', 'Si', 'Si'],
      functionalSupport: ['Si', 'Si', 'Si', 'Si', 'Si', 'Si', 'Si', 'Si']
    }
  };
  documentation: Documentation;

  ngOnInit() {
    this.documentation = new Documentation();
  }

}
