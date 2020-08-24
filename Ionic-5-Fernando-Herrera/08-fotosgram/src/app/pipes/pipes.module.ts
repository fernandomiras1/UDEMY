import { NgModule } from '@angular/core';
import { DomSanitizerPipe } from './dom-sanitizer.pipe';


@NgModule({
  declarations: [
    DomSanitizerPipe
  ],
  exports: [
    DomSanitizerPipe
  ]
})
export class PipesModule { }
