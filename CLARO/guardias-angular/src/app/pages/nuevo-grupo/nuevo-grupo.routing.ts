import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NuevoGrupoComponent } from './nuevo-grupo.component';


const routes: Routes = [
  {
    path: '',
    component: NuevoGrupoComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NuevoGrupoRoutingModule { }