import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AngularPageComponent } from './angular.component';

const routes: Routes = [
  {
    path: ':id',
    component: AngularPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AngularRoutingModule { }
