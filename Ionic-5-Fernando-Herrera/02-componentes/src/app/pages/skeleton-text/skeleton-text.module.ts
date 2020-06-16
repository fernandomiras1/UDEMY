import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SkeletonTextPageRoutingModule } from './skeleton-text-routing.module';

import { SkeletonTextPage } from './skeleton-text.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SkeletonTextPageRoutingModule
  ],
  declarations: [SkeletonTextPage]
})
export class SkeletonTextPageModule {}
