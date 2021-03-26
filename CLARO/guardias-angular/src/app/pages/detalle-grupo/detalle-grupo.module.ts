import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DetalleGrupoRoutingModule } from './detalle-grupo.routing';
import { DetalleGrupoComponent } from './detalle-grupo.component';
import { ComponentsModule } from '@app/components/components.module';
import { ModalModule } from 'angular-custom-modal';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '@app/material/material.module';
import { PipesModule } from '@app/pipes/pipes.module';

@NgModule({
  imports: [
    CommonModule,
    DetalleGrupoRoutingModule,
    ComponentsModule,
    ModalModule,
    FormsModule,
    MaterialModule,
    PipesModule
  ],
  declarations: [
    DetalleGrupoComponent
  ],
})
export class DetalleGrupoModule { }