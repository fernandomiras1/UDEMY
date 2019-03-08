import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRotingModule } from './app-roting.module';

import { AppComponent } from './app.component';
import { EscritorioComponent } from './pages/escritorio/escritorio.component';
import { HomeComponent } from './pages/home/home.component';
import { NuevoTicketComponent } from './pages/nuevo-ticket/nuevo-ticket.component';
import { PublicoComponent } from './pages/publico/publico.component';

@NgModule({
  declarations: [
    AppComponent,
    EscritorioComponent,
    HomeComponent,
    NuevoTicketComponent,
    PublicoComponent
  ],
  imports: [
    BrowserModule,
    AppRotingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
