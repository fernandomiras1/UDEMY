import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IntegrationTemipComponent } from './integration-temip.component';


const routes: Routes = [
  {
    path: '',
    component: IntegrationTemipComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IntegrationTemipRoutingModule { }
