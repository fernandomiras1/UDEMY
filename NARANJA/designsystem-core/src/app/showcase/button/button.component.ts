import { Component, OnInit } from '@angular/core';
import { Documentation } from './documentation.component';

@Component({
  selector: 'dsn-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent implements OnInit {
  title = 'ds-naranja';
  isLoadingPrimaryWithSpinner: boolean;
  isLoadingSecondaryWithSpinner: boolean;
  isLoadingStickyWithSpinner: boolean;
  text: string;
  textPrimarywithSpinner: string;
  textSecondaryWithSpinner: string;
  textStickyWithSpinner: string;
  textDisabled: string;
  disabled: boolean;
  inputsDocumentation: any[] = [];
  outputsDocumentation: any[] = [];
  description = 'Los botones permiten a los usuarios realizar una o más acciones concretas ' +
    'en una página o aplicación: registrarse, comprar, suscribirse. Estas acciones deben ser siempre claras, visibles y precisas.';
  link = 'https://brandbook.naranja.com/document/248804#/componentes/card';
  public documentation: Documentation;
  info = {
    status: 'available',
    browserSupport: {
      versionNumber: ['66+', '63+', '11.1+', '15+', '11', '50+', '5+', '5+'],
      visualSupport: ['Si', 'Si', 'Si', 'Si', 'No', 'Si', 'Si', 'Si'],
      functionalSupport: ['Si', 'Si', 'Si', 'Si', 'Si', 'Si', 'Si', 'Si']
    }
  };

  constructor() {
    this.inputsDocumentation = [
      {
        name: 'disabled',
        type: 'boolean',
        description: 'Si está habilitado para la edición.',
        required: 'No',
        value: '-'
      },
      {
        name: 'isLoading',
        type: 'boolean',
        description: 'Para manejar el spinner interno del botón.',
        required: 'No',
        value: '-'
      },
      {
        name: 'text',
        type: 'string',
        description: 'El texto del botón.',
        required: 'Si',
        value: '-'
      },
      {
        name: 'type',
        type: 'string',
        description: 'Admite el estilo primary, secondary, link y sticky',
        required: 'No',
        value: '-'
      },
      {
        name: 'widthButton',
        type: 'string',
        description: 'Para parametrizar un ancho fijo del botón, este incluye el padding definido.',
        required: 'No',
        value: '-'
      }];

    this.outputsDocumentation = [
      {
        name: 'clickButton',
        type: 'event',
        description: 'Propaga el evento click',
        required: 'No',
        value: '-'
      }];
  }
  ngOnInit() {
    this.text = 'Default';
    this.textPrimarywithSpinner = 'Spinner';
    this.textSecondaryWithSpinner = 'Spinner';
    this.textStickyWithSpinner = 'Spinner';
    this.textDisabled = 'Disabled';
    this.documentation = new Documentation();
  }

  onClickPrimaryWithSpinner() {
    this.isLoadingPrimaryWithSpinner = true;
    setTimeout(() => {
      this.isLoadingPrimaryWithSpinner = false;
    },         3000);
  }

  onClickSecondaryWithSpinner() {
    this.isLoadingSecondaryWithSpinner = true;
    setTimeout(() => {
      this.isLoadingSecondaryWithSpinner = false;
    },         3000);
  }

  onClickStickyWithSpinner() {
    this.isLoadingStickyWithSpinner = true;
    setTimeout(() => {
      this.isLoadingStickyWithSpinner = false;
    },         3000);
  }
}
