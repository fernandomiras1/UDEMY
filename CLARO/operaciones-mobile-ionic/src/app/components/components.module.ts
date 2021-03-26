import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { CircleAvatarComponent } from './circle-avatar/circle-avatar.component';
import { HeaderComponent } from './header/header.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  imports: [
    IonicModule,
    RouterModule,
    FormsModule,
    CommonModule
  ],
  declarations: [
    CircleAvatarComponent,
    HeaderComponent,
  ],
  exports:[
    CircleAvatarComponent,
    HeaderComponent,
  ]
})
export class ComponentsModule { }
