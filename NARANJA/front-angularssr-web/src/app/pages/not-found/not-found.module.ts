import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotFoundComponent } from './not-found.component';
import { NotFoundPageRoutingModule } from './not-found.routing';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    NotFoundPageRoutingModule,
    SharedModule,
  ],
  declarations: [NotFoundComponent],
})
export class NotFoundModule { }
