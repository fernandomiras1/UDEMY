import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IntegrationTemipRoutingModule } from './integration-temip.routing';
import { IntegrationTemipComponent } from './integration-temip.component';
import { PeopleTemipComponent } from './people-temip/people-temip.component';
import { ComponentsModule } from '@app/components/components.module';
import { MaterialModule } from '@app/material/material.module';


@NgModule({
  imports: [
    CommonModule,
    IntegrationTemipRoutingModule,
    ComponentsModule,
    MaterialModule
  ],
  declarations: [
    IntegrationTemipComponent,
    PeopleTemipComponent
  ],
})
export class IntegrationTemipModule { }