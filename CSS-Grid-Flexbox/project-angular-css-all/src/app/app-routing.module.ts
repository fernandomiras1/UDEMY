import { OrdersPageComponent } from './pages/orders-page/orders-page.component';
import { UsersPageComponent } from './pages/users-page/users-page.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CircleProgressBarYappaComponent } from 'src/app/pages/circle-progress-bar-yappa-page/circle-progress-bar-yappa.component';

const routes: Routes = [
  { path: '', redirectTo: 'users', pathMatch: 'full' },
  { path: 'users', component: UsersPageComponent },
  { path: 'orders', component: OrdersPageComponent },
  { path: 'circle-progress-yappa', component: CircleProgressBarYappaComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
