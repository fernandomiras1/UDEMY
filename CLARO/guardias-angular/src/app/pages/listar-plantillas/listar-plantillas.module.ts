import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListarPlantillasComponent } from './listar-plantillas.component';
import { ComponentsModule } from '@app/components/components.module';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '@app/material/material.module';
import { ListarPlantillasRoutingModule } from './listar-plantillas.routing';


@NgModule({
  imports: [
    CommonModule,
    ListarPlantillasRoutingModule,
    ComponentsModule,
    RouterModule,
    MaterialModule
  ],
  declarations: [ListarPlantillasComponent],
})
export class ListarPlantillasModule { }