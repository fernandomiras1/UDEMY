import { Injectable, EventEmitter } from '@angular/core';

@Injectable()
export class AppService {

  isView: boolean;
  btnCancelarClickeadoEvent: EventEmitter<any> = new EventEmitter();
  btnGuardarClickeadoEvent: EventEmitter<any> = new EventEmitter();
  guardadoCorrectoEvent: EventEmitter<any> = new EventEmitter();

  constructor() { }

}
