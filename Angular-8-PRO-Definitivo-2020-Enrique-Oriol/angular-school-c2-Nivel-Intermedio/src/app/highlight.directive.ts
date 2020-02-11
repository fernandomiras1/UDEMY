import { Directive, Input, OnChanges, ElementRef } from '@angular/core';

@Directive({
  selector: '[appHighlight]'
})
export class HighlightDirective implements OnChanges {

  // tslint:disable-next-line: no-input-rename
  @Input('appHighlight') isHighlighted = false;
  @Input() color = '#fdf498';
  constructor(private element: ElementRef) { }

  ngOnChanges(): void {
    if (this.isHighlighted) {
      // cambio el background color
      this.element.nativeElement.childNodes[0].style.backgroundColor = this.color;
    } else {
      // restablecer el color original
      this.element.nativeElement.childNodes[0].style.backgroundColor = '';
    }
  }
}
