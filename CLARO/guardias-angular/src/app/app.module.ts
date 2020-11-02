import { PagesModule } from './pages/pages.module';
import { BrowserModule } from '@angular/platform-browser';
import { ComponentsModule } from './components/components.module';
import { NgModule, LOCALE_ID } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

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
    ComponentsModule,
    PagesModule
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
