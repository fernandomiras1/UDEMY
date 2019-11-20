import { Directive, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appDatasrc]',
})
export class LazysizesDirective implements OnInit {
  @Input() appDatasrc: string;

  constructor(
    private elementRef: ElementRef,
    private renderer: Renderer2,
  ) {}

  ngOnInit() {
    this.renderer.setAttribute(this.elementRef.nativeElement, 'data-src' , this.appDatasrc);
  }
}
