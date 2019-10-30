import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PublishComponent } from './publish.component';
import { MarkdownModule } from 'ngx-markdown';
import { ComponentsModule } from '../../components/components.module';
import { PublishRoutingModule } from './publish.routing';

@NgModule({
  imports: [
    CommonModule,
    PublishRoutingModule,
    ComponentsModule,
    MarkdownModule.forChild()
  ],
  declarations: [
    PublishComponent
  ],
  exports: [
    PublishComponent
  ]
})
export class PublishPageModule { }
