import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({
  name: 'imageSanitizer'
})
export class ImageSanitizerPipe implements PipeTransform {

  constructor(private domSanitize: DomSanitizer) {}

  transform(img: string): any {
    return this.domSanitize.bypassSecurityTrustUrl(img);
  }

}
