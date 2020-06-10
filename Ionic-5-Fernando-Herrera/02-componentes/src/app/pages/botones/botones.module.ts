import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BotonesPageRoutingModule } from './botones-routing.module';

import { BotonesPage } from './botones.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BotonesPageRoutingModule
  ],
  declarations: [BotonesPage]
})
export class BotonesPageModule {}
