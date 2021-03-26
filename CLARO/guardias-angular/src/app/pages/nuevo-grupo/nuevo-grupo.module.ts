import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NuevoGrupoRoutingModule } from './nuevo-grupo.routing';
import { NuevoGrupoComponent } from './nuevo-grupo.component';
import { MaterialModule } from '@app/material/material.module';
import { ComponentsModule } from '@app/components/components.module';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  imports: [
    CommonModule,
    NuevoGrupoRoutingModule,
    MaterialModule,
    ComponentsModule,
    ReactiveFormsModule
  ],
  declarations: [NuevoGrupoComponent],
})
export class NuevoGrupoModule { }