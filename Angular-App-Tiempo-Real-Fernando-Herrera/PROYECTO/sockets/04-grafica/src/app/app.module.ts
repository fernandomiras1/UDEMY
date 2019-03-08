import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ChartsModule } from 'ng2-charts';
import { HttpClientModule } from '@angular/common/http';

import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';

const config: SocketIoConfig = { url: 'http://localhost:5000', options: {} };


import { AppComponent } from './app.component';
import { GraficaComponent } from './components/grafica/grafica.component';
import { EncuestaComponent } from './components/encuesta/encuesta.component';

@NgModule({
  declarations: [
    AppComponent,
    GraficaComponent,
    EncuestaComponent
  ],
  imports: [
    BrowserModule,
    SocketIoModule.forRoot(config),
    ChartsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
