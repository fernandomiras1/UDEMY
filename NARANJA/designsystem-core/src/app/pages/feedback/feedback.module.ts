import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeedbackComponent } from './feedback.component';
import { FeedbackRoutingModule } from './feedback.routing';
import { ShowcaseModule } from '../../showcase/showcase.module';
import { ZumoModule } from '../../../lib/src/zumo.module';

@NgModule({
  imports: [
    CommonModule,
    ZumoModule,
    ShowcaseModule,
    FeedbackRoutingModule
  ],
  declarations: [
    FeedbackComponent
  ],
  exports: [
    FeedbackComponent
  ]
})
export class FeedbackModule {}
