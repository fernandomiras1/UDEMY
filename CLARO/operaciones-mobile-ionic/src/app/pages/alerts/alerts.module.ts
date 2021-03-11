import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AlertsPageRoutingModule } from './alerts-routing.module';

import { AlertsPage } from './alerts.page';
import { ComponentsModule } from '@app/components/components.module';
import { AlertDetailComponent } from '@modals/alert-detail/alert-detail.component';
import { AlertsFilterModalComponent } from '@modals/alerts-filter-modal/alerts-filter-modal.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    AlertsPageRoutingModule,
    ComponentsModule
  ],
  declarations: [
    AlertsPage,
    AlertDetailComponent,
    AlertsFilterModalComponent
  ]
})
export class AlertsPageModule {}
