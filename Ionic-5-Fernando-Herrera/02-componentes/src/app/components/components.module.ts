import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { IonicModule } from '@ionic/angular';
import { MenuComponent } from './menu/menu.component';
import { RouterModule } from '@angular/router';
import { PopoverInfoComponent } from './popover-info/popover-info.component';


@NgModule({
  imports: [
    IonicModule,
    RouterModule,
    CommonModule
  ],
  declarations: [
    HeaderComponent,
    MenuComponent,
    PopoverInfoComponent
  ],
  exports:[
    HeaderComponent,
    MenuComponent,
    PopoverInfoComponent
  ]
})
export class ComponentsModule { }
