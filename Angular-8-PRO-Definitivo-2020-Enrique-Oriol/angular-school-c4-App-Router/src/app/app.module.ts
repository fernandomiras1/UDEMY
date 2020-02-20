import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { ContactsListComponent } from './contacts-list/contacts-list.component';
import { ContactComponent } from './contact/contact.component';
import { ContactDetailComponent } from './contact-detail/contact-detail.component';
import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './login/login.component';
import { NotFoundComponent } from './not-found/not-found.component';

const appRoutes: Routes = [
  {path: 'contacts', component: ContactsListComponent, data: {title: 'Contacts'}},
  {path: 'contact-detail/:id', component: ContactDetailComponent, data: {title: 'Contact detail'}},
  {path: 'login', component: LoginComponent, data: {title: 'Login'}},
  {path: 'not-found', component: NotFoundComponent, data: {title: 'Not Found - 404'}},
  {path: '', redirectTo: '/contacts', pathMatch: 'full'},
  // Para cualquier otra cosa ** que carge NotFoundComponent. <siempre tiene que ir al final>
  {path: '**', redirectTo: 'not-found', pathMatch: 'full'}
];
@NgModule({
  declarations: [
    AppComponent,
    ContactsListComponent,
    ContactComponent,
    ContactDetailComponent,
    HeaderComponent,
    LoginComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
