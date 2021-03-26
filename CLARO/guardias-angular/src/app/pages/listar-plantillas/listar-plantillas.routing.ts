import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListarPlantillasComponent } from './listar-plantillas.component';


const routes: Routes = [
  {
    path: '',
    component: ListarPlantillasComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ListarPlantillasRoutingModule { }