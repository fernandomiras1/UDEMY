import { Directive, ElementRef, Output, EventEmitter, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[zOuterClick]'
})
export class ZOuterClickDirective {

  @Output()
  public clickOutside = new EventEmitter();

  @Input() disabledClose = false;

  constructor(private _elementRef: ElementRef) {
  }

  // Attaching document click.
  @HostListener('document:click', ['$event.target'])
  public onClick(targetElement) {
    if (!this.disabledClose) {
      const clickedInside = this._elementRef.nativeElement.contains(targetElement);
      if (!clickedInside) { // Just emit event to notify the outside click
        this.clickOutside.emit(null);
      }
    }
  }
}
