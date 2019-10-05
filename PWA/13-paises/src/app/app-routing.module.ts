import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PaisesComponent } from './pages/paises/paises.component';
import { PaisComponent } from './pages/pais/pais.component';


const routes: Routes = [
  { path: '', component: PaisesComponent },
  { path: 'pais/:id', component: PaisComponent },
  { path: '**', component: PaisesComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
