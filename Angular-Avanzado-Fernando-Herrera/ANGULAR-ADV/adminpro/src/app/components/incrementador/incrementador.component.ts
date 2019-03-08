import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-incrementador',
  templateUrl: './incrementador.component.html',
  styles: []
})
export class IncrementadorComponent implements OnInit {
  //  Usamos este decorador para hacer referencia al html de un componente en particular
  // tiene como parametro a una referencia del HTML. ( se agregar en el HTML #txtProgress para diferenciar el elemento)
  @ViewChild('txtProgress') txtProgress: ElementRef;

  @Input() leyenda: string = 'Leyenda';
  @Input() progreso: number = 50;

  @Output() cambioValor: EventEmitter<number> = new EventEmitter();


  constructor() { }

  ngOnInit() {
  }

  onChanges(newValue: number): void {
   console.log(this.txtProgress);

   if (newValue >= 100) {
     this.progreso = 100;
   } else if (newValue <= 0) {
     this.progreso = 0;
   } else {
     this.progreso = newValue;
   }

  //  elemHTML.value = this.progreso;
  this.txtProgress.nativeElement.value = this.progreso;
   this.cambioValor.emit(this.progreso);
  }

  cambiarValor(valor: number) {

    if (this.progreso >= 100 && valor > 0) {
      this.progreso = 100;
      return;
    }

    if (this.progreso <= 0 && valor < 0) {
      this.progreso = 0;
      return;
    }

    this.progreso = this.progreso + valor;

    // Emitimos el valor que tiene el progreso. para pasarcelo al componente Padre- De esta forma cambiara el progress bar
    this.cambioValor.emit(this.progreso);

    // Poner el Foco el input
    this.txtProgress.nativeElement.focus();
  }

}
