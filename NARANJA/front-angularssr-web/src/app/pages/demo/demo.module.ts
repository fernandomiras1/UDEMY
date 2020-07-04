import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { DemoComponent } from './demo.component';
import { DemoPageRoutingModule } from './demo.routing';

@NgModule({
  imports: [
    CommonModule,
    DemoPageRoutingModule,
    SharedModule,
  ],
  declarations: [DemoComponent],
})
export class DemoModule { }
