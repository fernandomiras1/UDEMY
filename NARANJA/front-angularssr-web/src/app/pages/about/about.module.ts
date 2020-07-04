import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { AboutComponent } from './about.component';
import { AboutPageRoutingModule } from './about.routing';

@NgModule({
  imports: [
    CommonModule,
    AboutPageRoutingModule,
    SharedModule,
  ],
  declarations: [AboutComponent],
})
export class AboutModule { }
