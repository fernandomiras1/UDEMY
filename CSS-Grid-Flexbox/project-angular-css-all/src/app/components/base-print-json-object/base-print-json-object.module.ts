import { BasePrintJsonObjectComponent } from './base-print-json-object.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HtmlPipe } from './html.pipe';

@NgModule({
  imports: [CommonModule],
  declarations: [BasePrintJsonObjectComponent, HtmlPipe],
  exports: [BasePrintJsonObjectComponent],
})
export class PrintJsonObjectModule {}
