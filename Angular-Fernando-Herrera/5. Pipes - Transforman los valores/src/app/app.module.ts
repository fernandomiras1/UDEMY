import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';

// configuracion para que el formato de fecha
import { registerLocaleData } from '@angular/common';
import localEs from '@angular/common/locales/es'; // Español
import localFr from '@angular/common/locales/fr'; // Frances

registerLocaleData(localEs);
registerLocaleData(localFr);


import { AppComponent } from './app.component';
import { CapitalizadoPipe } from './pipes/capitalizado.pipe';
import { DomseguroPipe } from './pipes/domseguro.pipe';
import { ContrasenaPipe } from './pipes/contrasena.pipe';

@NgModule({
  declarations: [
    AppComponent,
    CapitalizadoPipe,
    DomseguroPipe,
    ContrasenaPipe
  ],
  imports: [
    BrowserModule
  ],
  providers: [
    {
      provide: LOCALE_ID,
      useValue: 'es' // defaul en español
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
