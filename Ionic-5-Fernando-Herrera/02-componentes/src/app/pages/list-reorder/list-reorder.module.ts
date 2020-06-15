import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListReorderPageRoutingModule } from './list-reorder-routing.module';

import { ListReorderPage } from './list-reorder.page';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListReorderPageRoutingModule,
    ComponentsModule
  ],
  declarations: [ListReorderPage]
})
export class ListReorderPageModule {}
