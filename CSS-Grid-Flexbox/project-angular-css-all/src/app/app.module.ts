import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { UsersPageComponent } from './pages/users-page/users-page.component';
import { OrdersPageComponent } from './pages/orders-page/orders-page.component';
import { CircleProgressBarYappaComponent } from './pages/circle-progress-bar-yappa-page/circle-progress-bar-yappa.component';


@NgModule({
  declarations: [		
    AppComponent,
    HeaderComponent,
    SidebarComponent,
    UsersPageComponent,
    OrdersPageComponent,
    CircleProgressBarYappaComponent
   ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
