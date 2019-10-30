import { Directive, ElementRef, Renderer2 } from '@angular/core';
import { ZBrowser } from '../../util/browser/browser';
import { WindowService } from '../../services/window/window.service';

@Directive({
  selector: '[zBrowser]'
})
export class ZBrowserDirective {
  constructor(private renderer: Renderer2, private element: ElementRef, private windowService: WindowService) {
    const browser = new ZBrowser(this.windowService);
    this.renderer.addClass(element.nativeElement, `browser-${browser.getBrowser()}`);
  }
}
