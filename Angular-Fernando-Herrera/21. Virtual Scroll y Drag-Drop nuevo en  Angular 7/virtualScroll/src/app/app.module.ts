import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { VirtualComponent } from './virtual/virtual.component';

import { ScrollingModule } from '@angular/cdk/scrolling';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { HttpClientModule } from '@angular/common/http';


import { DragComponent } from './drag/drag.component';
import { PaisesComponent } from './paises/paises.component';
import { from } from 'rxjs';
import { GraficosTestComponent } from './graficos-test/graficos-test.component';
import { ChartsModule } from 'ng2-charts';

@NgModule({
  declarations: [
    AppComponent,
    VirtualComponent,
    DragComponent,
    PaisesComponent,
    GraficosTestComponent
  ],
  imports: [
    BrowserModule,
    ScrollingModule,
    DragDropModule,
    HttpClientModule,
    ChartsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
