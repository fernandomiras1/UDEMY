import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

// lib
import { SliderControlComponent } from 'src/lib/slider-control/slider-control.component';

@NgModule({
  declarations: [
    AppComponent,
    SliderControlComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
