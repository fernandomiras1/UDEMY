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
import { ContactDetailShellComponent } from './contact-detail-shell/contact-detail-shell.component';
import { LogOutComponent } from './log-out/log-out.component';
import { AuthGuard } from './auth/auth.guard';

const appRoutes: Routes = [
  {path: 'contacts', component: ContactsListComponent, data: {title: 'Contacts'}, canActivate: [AuthGuard]},
  {path: 'contact-detail', component: ContactDetailShellComponent, data: {title: 'Contact detail'}, children: [
    { path: ':id', component: ContactDetailComponent }
  ], canActivate: [AuthGuard]},
  {path: 'login', component: LoginComponent, data: {title: 'Login'}},
  // le ponemos el outlet con el nombre del name de routeroutlet
  {path: 'logout', component: LogOutComponent, outlet: 'popup', canActivate: [AuthGuard]},
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
    NotFoundComponent,
    ContactDetailShellComponent,
    LogOutComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
