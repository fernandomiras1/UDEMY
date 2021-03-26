import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TurnosLicenciasComponent } from './turnos-licencias.component';


const routes: Routes = [
  {
    path: '',
    component: TurnosLicenciasComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TurnosLicenciasRoutingModule { }