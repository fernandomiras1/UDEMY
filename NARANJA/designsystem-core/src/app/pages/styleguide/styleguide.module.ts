import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StyleguideComponent } from './styleguide.component';
import { StyleguideRoutingModule } from './styleguide.routing';
import { ComponentsModule } from '../../components/components.module';
import { MarkdownModule } from 'ngx-markdown';

@NgModule({
  imports: [
    CommonModule,
    StyleguideRoutingModule,
    ComponentsModule,
    MarkdownModule.forChild()
  ],
  declarations: [
    StyleguideComponent
  ],
  exports: [
    StyleguideComponent
  ],
  providers: []
})
export class StyleguideModule {}
