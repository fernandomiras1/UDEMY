import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BotonesPage } from './botones.page';

const routes: Routes = [
  {
    path: '',
    component: BotonesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BotonesPageRoutingModule {}
