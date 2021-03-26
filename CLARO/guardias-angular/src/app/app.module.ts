import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from '@app/material/material.module';
import { HttpClientModule } from '@angular/common/http';
import localeEsAr from '@angular/common/locales/es-AR';
import { registerLocaleData } from '@angular/common';

import { Data } from "./providers/data/data";

registerLocaleData(localeEsAr, 'es-AR');
@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MaterialModule
  ],
  declarations: [
    AppComponent
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'es-AR' },
    [ Data ]
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
