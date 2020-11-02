import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { PerfilComponent } from './pages/perfil/perfil.component';
import { NuevoGrupoComponent } from './pages/nuevo-grupo/nuevo-grupo.component';
import { DetalleGrupoComponent } from './pages/detalle-grupo/detalle-grupo.component';
import { LoginGuard } from './guards/login.guard';
import { AdminGuardGuard } from './guards/admin-guard.guard';
import { HomeGuard } from './guards/home.guard';
import { TurnosLicenciasComponent } from './pages/turnos-licencias/turnos-licencias.component';
import { ListarPlantillasComponent } from './pages/listar-plantillas/listar-plantillas.component';
import { NuevaPlantillaComponent } from './pages/nueva-plantilla/nueva-plantilla.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [HomeGuard]
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [LoginGuard]
  },
  {
    path: 'perfil/:id',
    component: PerfilComponent,
    canActivate: [LoginGuard]
  },
  {
    path: 'nuevo-grupo',
    component: NuevoGrupoComponent,
    canActivate: [LoginGuard]
  },
  {
    path: 'detalle-grupo/:tipo_grupo/:id',
    component: DetalleGrupoComponent,
    canActivate: [LoginGuard]
  },
  {
    path: 'calendario/:id',
    component: TurnosLicenciasComponent,
    canActivate: [LoginGuard]
  },
  {
    path: 'plantilla/listar', component: ListarPlantillasComponent,
    canActivate: [LoginGuard, AdminGuardGuard]
  },
  {
    path: 'plantilla/crear', component: NuevaPlantillaComponent,
    canActivate: [LoginGuard, AdminGuardGuard]
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
