import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'dsn-slider-confirmation',
  templateUrl: './slider-confirmation.component.html',
  styleUrls: ['./slider-confirmation.component.scss']
})
export class SliderConfirmationComponent implements OnInit {

  public textSlider1 = 'Deslizá para pagar';
  public textSlider2 = 'Deslizá para transferir';
  public isLoadingOne = false;
  public isLoadingTwo = false;
  description = 'El confirmation slider permite confirmar una acción crítica para finalizar un flujo. ' +
    'Logra que el usuario se enfoque en la acción y tome una decisión consciente.';
  public link = 'https://brandbook.naranja.com/document/248804#/componentes/confirmation-slider';

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
    this.inputsDocumentation = [
      {
        name: 'text',
        type: 'string',
        description: 'Texto del confirmation slider',
        required: 'Si',
        value: ' - '
      },
      {
        name: 'loading',
        type: 'boolean',
        description: 'Valor que se usa para desencadenar el spinner',
        required: 'Si',
        value: ' - '
      }];

    this.outputsDocumentation = [
      {
        name: 'confirm',
        type: 'event',
        description: 'Se desencadena cuando el ícono del confirmation slider llega al extremo derecho y pierde foco',
        required: 'Si',
        value: ' true '
      }];
  }

  ngOnInit() {
  }

  public confirmDemoOne(event) {
    this.isLoadingOne = true;
    setTimeout(() => {
      this.isLoadingOne = false;
      this.textSlider1 = 'Deslizá para pagar';
    },         5000
    );
  }
  public confirmDemoTwo(event) {
    this.isLoadingTwo = true;
    setTimeout(() => {
      this.isLoadingTwo = false;
      this.textSlider2 = 'Deslizá para transferir';
    },         5000
    );
  }
}
