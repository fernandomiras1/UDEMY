import { Directive, ElementRef, HostListener, Input, OnInit, Renderer2 } from '@angular/core';
import { DocumentService } from '../../services/document/document.service';

@Directive({
  selector: '[zHover]'
})
export class ZHoverDirective implements OnInit {

  @Input() isHover = false;
  @Input() stylesEnter: any[] = [];
  @Input() stylesLeave: any[] = [];
  @Input() breakpointMinWithoutStyles = 0;
  style: any = {};
  width: number;
  widthViewport: number;

  constructor(public el: ElementRef, public renderer: Renderer2, private documentService: DocumentService) {
    this.calculateWidthViewport();
  }

  calculateWidthViewport(): void {
    this.widthViewport = this.documentService.nativeDocument.body.offsetWidth;
  }

  ngOnInit(): void {
    this.style = getComputedStyle(this.el.nativeElement);
    this.width = this.westernArabicNumeralsOnly(this.style.width);
  }

  @HostListener('mouseenter') onMouseEnter() {
    if (this.isHover && this.breakpointMinWithoutStyles !== null && this.widthViewport >= this.breakpointMinWithoutStyles) {
      for (const style of this.stylesEnter) {
        this.renderer.setStyle(this.el.nativeElement, style.style, style.value);
      }
    }
  }

  @HostListener('mouseleave') onMouseLeave() {
    if (this.isHover && this.breakpointMinWithoutStyles !== null && this.widthViewport >= this.breakpointMinWithoutStyles) {
      for (const style of this.stylesLeave) {
        this.renderer.setStyle(this.el.nativeElement, style.style, style.value);
      }
    }
  }

  westernArabicNumeralsOnly(style: string): number {
    return style.match(/\d+/g).map(Number)[0];
  }
}
