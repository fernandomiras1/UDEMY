import { NgModule } from '@angular/core';
import { DomSanitizerPipe } from './dom-sanitizer.pipe';
import { ImageSanitizerPipe } from './image-sanitizer.pipe';


@NgModule({
  declarations: [
    DomSanitizerPipe,
    ImageSanitizerPipe
  ],
  exports: [
    DomSanitizerPipe,
    ImageSanitizerPipe
  ]
})
export class PipesModule { }
