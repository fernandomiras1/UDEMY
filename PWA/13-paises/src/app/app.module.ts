import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PaisesComponent } from './pages/paises/paises.component';
import { PaisComponent } from './pages/pais/pais.component';

@NgModule({
  declarations: [
    AppComponent,
    PaisesComponent,
    PaisComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
