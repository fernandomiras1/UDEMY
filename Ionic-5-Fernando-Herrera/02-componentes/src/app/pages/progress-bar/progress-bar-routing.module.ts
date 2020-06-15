import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProgressBarPage } from './progress-bar.page';

const routes: Routes = [
  {
    path: '',
    component: ProgressBarPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProgressBarPageRoutingModule {}
