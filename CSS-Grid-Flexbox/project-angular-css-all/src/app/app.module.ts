import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MaterialModule } from "./material.module";
import { HeaderComponent } from "./header/header.component";
import { SidebarComponent } from "./sidebar/sidebar.component";
import { UsersPageComponent } from "./pages/users-page/users-page.component";
import { OrdersPageComponent } from "./pages/orders-page/orders-page.component";
import { CircleProgressBarYappaComponent } from "./pages/circle-progress-bar-yappa-page/circle-progress-bar-yappa.component";
import { PrintJsonObjectModule } from "./components/base-print-json-object/base-print-json-object.module";
import { PrettyPrintJsonPageComponent } from "./pages/pretty-print-json-page/pretty-print-json-page.component";

const PAGES = [
  UsersPageComponent,
  OrdersPageComponent,
  CircleProgressBarYappaComponent,
  PrettyPrintJsonPageComponent,
];
@NgModule({
  declarations: [AppComponent, HeaderComponent, SidebarComponent, PAGES],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    PrintJsonObjectModule,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
