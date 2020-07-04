import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CallbackComponent } from './pages/callback/callback.component';
import { UnauthorizedComponent } from './pages/unauthorized/unauthorized.component';

const commonsRoutes: Routes = [
  {
    path: 'unauthorized',
    component: UnauthorizedComponent,
  },
  {
    path: 'callback',
    component: CallbackComponent,
  },
  {
    path: 'demo',
    loadChildren: './pages/demo/demo.module#DemoModule',
    canActivate: [
      'authTITOnlyGuard',
    ],
    data: {
      title: 'un titulo friendly 2',
      description: 'una description para about',
      canonicalUrl: '/about',
    },
  },
  {
    path: 'home',
    loadChildren: './pages/home/home.module#HomeModule',
    data: {
      title: 'un titulo friendly',
      description: 'una description',
      canonicalUrl: '/home',
      robots: 'follow',
    },
  },
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full',
  },
  // Fallback when no prior route is matched
  { path: '**', redirectTo: 'not-found' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(commonsRoutes),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
