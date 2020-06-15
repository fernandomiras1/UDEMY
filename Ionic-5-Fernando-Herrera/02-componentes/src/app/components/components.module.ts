import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { IonicModule } from '@ionic/angular';
import { MenuComponent } from './menu/menu.component';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    HeaderComponent,
    MenuComponent
  ],
  imports: [
    IonicModule,
    RouterModule,
    CommonModule
  ],
  exports:[
    HeaderComponent,
    MenuComponent
  ]
})
export class ComponentsModule { }
