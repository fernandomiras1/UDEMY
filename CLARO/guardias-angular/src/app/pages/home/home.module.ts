import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRoutingModule } from './home.routing';
import { HomeComponent } from './home.component';

import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { MaterialModule } from '@app/material/material.module';
import { MdePopoverModule } from '@material-extended/mde';
import { TooltipModule } from 'ng2-tooltip-directive';
import { PipesModule } from '@app/pipes/pipes.module';
import { ComponentsModule } from '@app/components/components.module';
import { FormsModule } from '@angular/forms';
import { NgxInfiniteScrollerModule } from 'ngx-infinite-scroller';

@NgModule({
  imports: [
    CommonModule,
    HomeRoutingModule,
    TooltipModule,
    PipesModule,
    MdePopoverModule,
    MaterialModule,
    ComponentsModule,
    FormsModule,
    NgxSkeletonLoaderModule,
    NgxInfiniteScrollerModule
  ],
  declarations: [
    HomeComponent
  ],
})
export class HomeModule { }