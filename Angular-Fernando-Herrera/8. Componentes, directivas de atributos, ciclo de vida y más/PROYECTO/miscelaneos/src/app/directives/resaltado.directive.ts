import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appResaltado]'
})
export class ResaltadoDirective {

  constructor(private el: ElementRef) { 
    console.log('directiaba');
  }

  @Input("appResaltado") nuevoColor: string;

  @HostListener('mouseenter') mouseEntro() {
    this.resaltar(this.nuevoColor || 'yellow');
  }

  @HostListener('mouseleave') mouseSalio() {
    this.el.nativeElement.style.backgroundColor = null;
  }

  private resaltar( color ) {
    this.el.nativeElement.style.backgroundColor = color;
  }

}
