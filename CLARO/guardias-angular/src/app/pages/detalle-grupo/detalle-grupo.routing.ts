import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DetalleGrupoComponent } from './detalle-grupo.component';


const routes: Routes = [
  {
    path: '',
    component: DetalleGrupoComponent
  }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class DetalleGrupoRoutingModule { }
