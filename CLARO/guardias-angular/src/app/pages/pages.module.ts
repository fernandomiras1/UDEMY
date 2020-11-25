import { RouterModule } from '@angular/router';
import { MaterialModule } from '../material/material.module';
import { BrowserModule } from '@angular/platform-browser';
import { TurnosLicenciasComponent } from './turnos-licencias/turnos-licencias.component';
import { DetalleGrupoComponent } from './detalle-grupo/detalle-grupo.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DndModule } from 'ngx-drag-drop';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { TooltipModule } from 'ng2-tooltip-directive';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { NgxInfiniteScrollerModule } from 'ngx-infinite-scroller';
import { NgxUsefulSwiperModule } from 'ngx-useful-swiper';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { MdePopoverModule } from '@material-extended/mde';
import { ModalModule } from 'angular-custom-modal';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ComponentsModule } from '../components/components.module';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { NuevoGrupoComponent } from './nuevo-grupo/nuevo-grupo.component';
import { PerfilComponent } from './perfil/perfil.component';
import { CarruselComponent } from './turnos-licencias/carrusel/carrusel.component';
//Hacer lazy loading de estos dos componentes de el componente turnos-licencias
import { LicenciasComponent } from './turnos-licencias/licencias/licencias.component';
import { TurnosComponent } from './turnos-licencias/turnos/turnos.component';
import { PipesModule } from '../pipes/pipes.module';
import { NuevaPlantillaComponent } from './nueva-plantilla/nueva-plantilla.component';
import { ListarPlantillasComponent } from './listar-plantillas/listar-plantillas.component';
import { IntegrationTemipComponent } from './integration-temip/integration-temip.component';
import { PeopleTemipComponent } from './integration-temip/people-temip/people-temip.component';


@NgModule({
  imports: [
    BrowserModule,
    RouterModule,
    MaterialModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule.withConfig({warnOnNgModelWithFormControl: 'never'}),
    ComponentsModule,
    PipesModule,
    DndModule,
    NgxSkeletonLoaderModule,
    TooltipModule,
    NgxMatSelectSearchModule,
    NgxInfiniteScrollerModule,
    NgxUsefulSwiperModule,
    Ng2SearchPipeModule,
    MdePopoverModule,
    ModalModule
  ],
  declarations: [
    DetalleGrupoComponent,
    HomeComponent,
    LoginComponent,
    NuevoGrupoComponent,
    PerfilComponent,
    NuevoGrupoComponent,
    TurnosLicenciasComponent,
    CarruselComponent,
    LicenciasComponent,
    TurnosComponent,
    NuevaPlantillaComponent,
    ListarPlantillasComponent,
    IntegrationTemipComponent,
    PeopleTemipComponent
  ],
  exports: [
  ]
})
export class PagesModule { }
