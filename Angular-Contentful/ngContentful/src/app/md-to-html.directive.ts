import { Directive, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';
import * as marked from 'marked';

@Directive({
  selector: '[appMdToHtml]'
})
export class MdToHtmlDirective implements OnInit {

  @Input('appMdToHtml') value: string;

  constructor(private render: Renderer2, private el: ElementRef) { }

  ngOnInit() {
    this.render.setAttribute(this.el.nativeElement, 'innerHTML', this.value);
  }
}
