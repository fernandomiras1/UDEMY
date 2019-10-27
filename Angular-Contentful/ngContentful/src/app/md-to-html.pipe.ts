import { Pipe, PipeTransform } from '@angular/core';
import * as marked from 'marked';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({
  name: 'mdToHtml'
})
export class MdToHtmlPipe implements PipeTransform {

  constructor(protected sanitizer: DomSanitizer) {}

  // link: https://medium.com/@swarnakishore/angular-safe-pipe-implementation-to-bypass-domsanitizer-stripping-out-content-c1bf0f1cc36b
  
  // DomSanitizer , un servicio de Angular, ayuda
  // a evitar que los atacantes inyecten scripts
  // maliciosos del lado del cliente en páginas web, lo que a menudo se conoce como Cross-site Scripting o XSS .


  // Aquí estamos vinculando una variable llamada 'htmlSnippet' a innerHTML. El atacante tiene control sobre él
  // y puede introducir contenido malicioso que hace que la aplicación sea vulnerable ya que se ejecutará el código en el script.
  
  transform(value: any): any {
    return this.sanitizer.bypassSecurityTrustHtml(marked(value));
  }

}
