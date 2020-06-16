import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SkeletonTextPage } from './skeleton-text.page';

const routes: Routes = [
  {
    path: '',
    component: SkeletonTextPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SkeletonTextPageRoutingModule {}
