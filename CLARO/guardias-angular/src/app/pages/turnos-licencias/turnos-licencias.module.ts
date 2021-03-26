import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TurnosLicenciasRoutingModule } from './turnos-licencias.routing';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { ComponentsModule } from '@app/components/components.module';
import { MaterialModule } from '@app/material/material.module';
import { TurnosLicenciasComponent } from './turnos-licencias.component';
import { TurnosComponent } from './turnos/turnos.component';
import { LicenciasComponent } from './licencias/licencias.component';
import { CarruselComponent } from './carrusel/carrusel.component';
import { NgxUsefulSwiperModule } from 'ngx-useful-swiper';
import { DndModule } from 'ngx-drag-drop';
import { PipesModule } from '@app/pipes/pipes.module';
import { TooltipModule } from 'ng2-tooltip-directive';

@NgModule({
  imports: [
    CommonModule,
    TurnosLicenciasRoutingModule,
    ComponentsModule,
    PipesModule,
    NgxSkeletonLoaderModule,
    NgxUsefulSwiperModule,
    MaterialModule,
    TooltipModule,
    DndModule
  ],
  declarations: [
    TurnosLicenciasComponent,
    TurnosComponent,
    LicenciasComponent,
    CarruselComponent
  ],
})
export class TurnosLicenciasModule { }