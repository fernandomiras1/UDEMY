import { MarkdownModule } from 'ngx-markdown';

import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
// load library
import { ZumoModule } from '../lib/src';
//
import { AppRoutingModule } from './app.routing';
//
import { AppComponent } from './app.component';
import { ShowcaseModule } from './showcase/showcase.module';
import { ComponentsModule } from './components/components.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    BrowserModule.withServerTransition({ appId: 'ds-naranja' }),
    ZumoModule.forRoot(),
    ComponentsModule,
    ShowcaseModule,
    MarkdownModule.forRoot({
      loader: HttpClient
    }),
    AppRoutingModule
  ],
  bootstrap: [AppComponent],
  schemas: [NO_ERRORS_SCHEMA]
})
export class AppModule { }
