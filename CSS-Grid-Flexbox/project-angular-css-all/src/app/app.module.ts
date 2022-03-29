import { RichTextEditorPageComponent } from './pages/rich-text-editor-page/rich-text-editor-page.component';
import { TransparentListHoverEffectsPageComponent } from './pages/transparent-list-hover-effects-page/transparent-list-hover-effects-page.component';
import { AnchorLinksPageComponent } from './pages/anchor-links-page/anchor-links-page.component';
import { BrowserModule } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { UsersPageComponent } from './pages/users-page/users-page.component';
import { OrdersPageComponent } from './pages/orders-page/orders-page.component';
import { CircleProgressBarYappaComponent } from './pages/circle-progress-bar-yappa-page/circle-progress-bar-yappa.component';
import { PrintJsonObjectModule } from './components/base-print-json-object/base-print-json-object.module';
import { PrettyPrintJsonPageComponent } from './pages/pretty-print-json-page/pretty-print-json-page.component';
import { TextToUrlAnchorLinksModule } from './components/text-to-url-anchor-links/text-to-url-anchor-links.module';
import { WhatsappWebPageComponent } from './pages/whatsapp-web-page/whatsapp-web-page.component';

import { QuillModule } from 'ngx-quill';
import { FormsModule } from '@angular/forms';

const modules = [
  PrintJsonObjectModule,
  TextToUrlAnchorLinksModule,
  QuillModule.forRoot(),
];

const pages = [
  UsersPageComponent,
  OrdersPageComponent,
  CircleProgressBarYappaComponent,
  PrettyPrintJsonPageComponent,
  AnchorLinksPageComponent,
  TransparentListHoverEffectsPageComponent,
  WhatsappWebPageComponent,
  RichTextEditorPageComponent,
];

@NgModule({
  declarations: [AppComponent, HeaderComponent, SidebarComponent, pages],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    MaterialModule,
    modules,
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
