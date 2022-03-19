import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Pipe({
  name: 'sanitizer',
})
export class SanitizerPipe implements PipeTransform {
  constructor(protected sanitizer: DomSanitizer) {}

  transform(value: string, type?: 'html'): SafeResourceUrl {
    if (type && type === 'html') {
      return this.sanitizer.bypassSecurityTrustHtml(value);
    }

    return this.sanitizer.bypassSecurityTrustResourceUrl(value);
  }
}
