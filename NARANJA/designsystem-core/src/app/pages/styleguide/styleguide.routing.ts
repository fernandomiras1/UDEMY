import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StyleguideComponent } from './styleguide.component';

const routes: Routes = [
  {
    path: '',
    component: StyleguideComponent,
    children: [
      { path: ':id', component: StyleguideComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StyleguideRoutingModule { }
