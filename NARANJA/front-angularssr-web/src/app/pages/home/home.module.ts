import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';

import { HomeComponent } from './home.component';
import { CountriesModule } from '../../features/countries/countries.module';
import { HomeRoutingModule } from './home.routing';
@NgModule({
  imports: [
    CommonModule,
    HomeRoutingModule,
    CountriesModule.forRoot(),
    SharedModule,
  ],
  declarations: [
    HomeComponent,
  ],
  entryComponents: [
    HomeComponent,
  ],
})
export class HomeModule { }
