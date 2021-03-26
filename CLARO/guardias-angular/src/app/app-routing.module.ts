import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginGuard } from './guards/login.guard';
import { AdminGuardGuard } from './guards/admin-guard.guard';
import { HomeGuard } from './guards/home.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    canActivate: [HomeGuard],
    loadChildren: () => import('./pages/login/login.module').then(m => m.LoginModule)
  },
  {
    path: 'home',
    canActivate: [LoginGuard],
    loadChildren: () => import('./pages/home/home.module').then(m => m.HomeModule)
  },
  {
    path: 'perfil/:id',
    canActivate: [LoginGuard],
    loadChildren: () => import('./pages/perfil/perfil.module').then(m => m.PerfilModule)
  },
  {
    path: 'nuevo-grupo',
    canActivate: [LoginGuard],
    loadChildren: () => import('./pages/nuevo-grupo/nuevo-grupo.module').then(m => m.NuevoGrupoModule)
  },
  {
    path: 'detalle-grupo/:tipo_grupo/:id',
    canActivate: [LoginGuard],
    loadChildren: () => import('./pages/detalle-grupo/detalle-grupo.module').then(m => m.DetalleGrupoModule)
  },
  {
    path: 'calendario/:id',
    canActivate: [LoginGuard],
    loadChildren: () => import('./pages/turnos-licencias/turnos-licencias.module').then(m => m.TurnosLicenciasModule)
  },
  {
    path: 'plantilla/listar',
    canActivate: [LoginGuard, AdminGuardGuard],
    loadChildren: () => import('./pages/listar-plantillas/listar-plantillas.module').then(m => m.ListarPlantillasModule)
  },
  {
    path: 'plantilla/crear',
    canActivate: [LoginGuard, AdminGuardGuard],
    loadChildren: () => import('./pages/nueva-plantilla/nueva-plantilla.module').then(m => m.NuevaPlantillaModule)
  },
  {
    path: 'integracion/temip',
    loadChildren: () => import('./pages/integration-temip/integration-temip.module').then(m => m.IntegrationTemipModule)
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
