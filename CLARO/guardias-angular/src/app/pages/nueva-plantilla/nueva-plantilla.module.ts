import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NuevaPlantillaRoutingModule } from './nueva-plantilla.routing';
import { NuevaPlantillaComponent } from './nueva-plantilla.component';
import { MaterialModule } from '@app/material/material.module';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  imports: [
    CommonModule,
    NuevaPlantillaRoutingModule,
    MaterialModule,
    ReactiveFormsModule
  ],
  declarations: [NuevaPlantillaComponent],
})
export class NuevaPlantillaModule { }