import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PerfilRoutingModule } from './perfil.routing';
import { PerfilComponent } from './perfil.component';
import { ComponentsModule } from '@app/components/components.module';
import { ReactiveFormsModule } from '@angular/forms';
import { PipesModule } from '@app/pipes/pipes.module';


@NgModule({
  imports: [
    CommonModule,
    PerfilRoutingModule,
    ComponentsModule,
    ReactiveFormsModule,
    PipesModule
  ],
  declarations: [PerfilComponent],
})
export class PerfilModule { }