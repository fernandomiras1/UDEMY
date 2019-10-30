import { Component } from '@angular/core';

@Component({
  selector: 'dsn-avatar',
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.scss']
})
export class AvatarComponent {
  inputsDocumentation: any[] = [];
  inputsDocumentationPill: any[] = [];

  imagBase64: string;
  description = 'Los avatars son imágenes que identifican a personas o entidades.';

  info = {
    status: 'beta',
    browserSupport: {
      versionNumber: ['66+', '63+', '11.1+', '18+', '11', '50+', '5+', '5+'],
      visualSupport: ['-', '-', '-', '-', '-', '-', '-', '-'],
      functionalSupport: ['-', '-', '-', '-', '-', '-', '-', '-']
    }
  };

  link = 'https://brandbook.naranja.com/document/248804#/componentes/avatar';

  documentationPill = `<z-avatar-pill [name]="'Fernando Miras'">
  <z-avatar [size]="'small'" [iconName]="'icon-user'">
  </z-avatar>
</z-avatar-pill>`;

  constructor() {
    this.inputsDocumentation = [
      {
        name: 'urlImg',
        type: 'string',
        description: 'Ruta de la imagen',
        required: 'No',
        value: '-'
      },
      {
        name: 'size',
        type: 'string',
        description: 'Tamaño del componente',
        required: 'No',
        value: 'extra-large, large, medium, small; por defecto es extra-large'
      },
      {
        name: 'initials',
        type: 'char',
        description: 'Inicial del nombre o apellido',
        required: 'No',
        value: '-'
      }];
    this.inputsDocumentationPill = [
      {
        name: 'name',
        type: 'string',
        description: 'Nombre del usuario/cliente, toma tamaño del avatar como definición.',
        required: 'Si',
        value: '-'
      },
      {
        name: 'z-avatar',
        type: 'component',
        description: 'Proyecta un avatar dentro de pill.',
        required: 'Si',
        value: '-'
      }];
  }

}
