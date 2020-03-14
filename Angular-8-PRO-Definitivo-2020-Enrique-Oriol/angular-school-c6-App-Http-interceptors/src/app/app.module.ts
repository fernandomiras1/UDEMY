import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { ContactsListComponent } from './contacts-list/contacts-list.component';
import { ContactComponent } from './contact/contact.component';
import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './login/login.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { LogOutComponent } from './log-out/log-out.component';

import { ContactDetailModule } from './contact-detail/contact-detail.module';
import { AppRoutingModule } from './app-routing.module';
import { TokenInterceptor } from './auth/token-interceptor';


@NgModule({
  declarations: [
    AppComponent,
    ContactsListComponent,
    ContactComponent,
    HeaderComponent,
    LoginComponent,
    NotFoundComponent,
    LogOutComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ContactDetailModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [ { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },],
  bootstrap: [AppComponent]
})
export class AppModule { }
