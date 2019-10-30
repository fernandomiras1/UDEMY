import { Directive, ElementRef, HostListener, Input, Renderer2 } from '@angular/core';
import { ZBrowser } from '../../util/browser/browser';
import { DocumentService } from '../../services/document/document.service';
import { WindowService } from '../../services/window/window.service';

@Directive({
  selector: '[zRippleEffect]'
})
export class ZRippleEffectDirective {

  @Input() isClickable = true;
  @Input() backgroundColor = 'rgba(255, 255, 255, 0.32)';

  constructor(public renderer: Renderer2, public element: ElementRef,
              private documentService: DocumentService,
              private windowService: WindowService) {
  }

  @HostListener('click', ['$event'])
  public onClick(event) {
    const browser = new ZBrowser(this.windowService);
    if (browser.getBrowser() === 'safari') {
      this.isClickable = false;
    }
    if (!this.isClickable) { return; }

    const span = this.generateEffect(event);

    setTimeout(() => {
      this.renderer.removeChild(this.element.nativeElement, span);
    },         600);

  }

  westernArabicNumeralsOnly(style: string): number {
    return style.match(/\d+/g).map(Number)[0];
  }

  generateEffect(event) {
    event.stopPropagation();

    const style = getComputedStyle(event.srcElement);
    const posX = event.layerX;
    const posY = event.layerY;

    let width = 0;
    let height = 0;
    if (style.getPropertyValue('width') === 'auto') {
      width = this.westernArabicNumeralsOnly(getComputedStyle(event.target.parentElement).getPropertyValue('width'));
      height = this.westernArabicNumeralsOnly(getComputedStyle(event.target.parentElement).getPropertyValue('height'));
    } else {
      width = this.westernArabicNumeralsOnly(style.getPropertyValue('width'));
      height = this.westernArabicNumeralsOnly(style.getPropertyValue('height'));
    }

    if (width >= height) {
      height = width;
    } else {
      width = height;
    }

    const x = posX - width / 2;
    const y = posY - height / 2;

    const span = this.documentService.nativeDocument.createElement('span');
    span.style.background = this.backgroundColor;
    span.style.borderRadius = '50%';
    span.style.height = `${height}px`;
    span.style.left = `${x}px`;
    span.style.opacity = '1';
    span.style.position = 'absolute';
    span.style.transform = 'scale(0)';
    span.style.top = `${y}px`;
    span.style.width = `${width}px`;

    this.renderer.addClass(span, 'z-rippleEffect');
    this.element.nativeElement.appendChild(span);
    return span;
  }
}
