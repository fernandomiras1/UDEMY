import { Directive, ElementRef, Input, OnInit } from '@angular/core';
import { NavigatorService } from '../../../core/utils/services/navigator.service';

@Directive({
  selector: '[appDatasrcset]',
})
export class LazysizespictureDirective implements OnInit {
  @Input() appDatasrcset: string;
  @Input() qualityImg = 70;

  constructor(private elementRef: ElementRef, private navigatorService: NavigatorService) {
  }

  ngOnInit() {
    let imageUrl: string;
    const widthMobile = 400;
    if (this.navigatorService.isMobile) {
      imageUrl = `${this.appDatasrcset}?fm=webp&fit=scale&w=${widthMobile}`;
    } else {
      imageUrl = `${this.appDatasrcset}?fm=webp&q=${Number(this.qualityImg)}`;
    }
    if (this.navigatorService.isBrowser) {
      this.elementRef.nativeElement.dataset.srcset = imageUrl;
    }
  }
}
