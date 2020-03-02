import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { VirtualComponent } from './virtual/virtual.component';

import { ScrollingModule } from '@angular/cdk/scrolling';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { HttpClientModule } from '@angular/common/http';


import { DragComponent } from './drag/drag.component';
import { PaisesComponent } from './paises/paises.component';
import { GraficosTestComponent } from './graficos-test/graficos-test.component';
import { ChartsModule } from 'ng2-charts';
import { FormComponent } from './form/form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './home/home.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { LazysizesDirective } from './lazysizes.directive';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
   declarations: [
      AppComponent,
      VirtualComponent,
      DragComponent,
      PaisesComponent,
      GraficosTestComponent,
      FormComponent,
      HomeComponent,
      FooterComponent,
      HeaderComponent,
      LazysizesDirective
   ],
   imports: [
      BrowserAnimationsModule,
      ReactiveFormsModule,
      BrowserModule,
      ScrollingModule,
      DragDropModule,
      HttpClientModule,
      ChartsModule
   ],
   providers: [],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
