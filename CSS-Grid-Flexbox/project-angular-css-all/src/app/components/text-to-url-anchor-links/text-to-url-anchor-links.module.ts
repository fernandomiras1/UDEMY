import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TextToUrlAnchorLinksComponent } from './text-to-url-anchor-links.component';
import { SanitizerPipe } from './sanitizer.pipe';
import { ParseUrlPipe } from './parse-url.pipe';

@NgModule({
  imports: [CommonModule],
  declarations: [TextToUrlAnchorLinksComponent, SanitizerPipe, ParseUrlPipe],
  exports: [TextToUrlAnchorLinksComponent],
})
export class TextToUrlAnchorLinksModule {}
