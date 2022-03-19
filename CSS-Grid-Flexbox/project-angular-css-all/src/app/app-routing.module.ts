import { AnchorLinksPageComponent } from './pages/anchor-links-page/anchor-links-page.component';
import { OrdersPageComponent } from './pages/orders-page/orders-page.component';
import { UsersPageComponent } from './pages/users-page/users-page.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CircleProgressBarYappaComponent } from 'src/app/pages/circle-progress-bar-yappa-page/circle-progress-bar-yappa.component';
import { PrettyPrintJsonPageComponent } from './pages/pretty-print-json-page/pretty-print-json-page.component';

const routes: Routes = [
  { path: '', redirectTo: 'users', pathMatch: 'full' },
  { path: 'users', component: UsersPageComponent },
  { path: 'orders', component: OrdersPageComponent },
  { path: 'circle-progress-yappa', component: CircleProgressBarYappaComponent },
  { path: 'pretty-print-json', component: PrettyPrintJsonPageComponent },
  { path: 'anchor-links', component: AnchorLinksPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
