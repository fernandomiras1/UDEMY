import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NuevaPlantillaComponent } from './nueva-plantilla.component';


const routes: Routes = [
  {
    path: '',
    component: NuevaPlantillaComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NuevaPlantillaRoutingModule { }