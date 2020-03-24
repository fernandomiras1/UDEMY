import { NgModule } from '@angular/core';
import { RouterModule, Routes, PreloadAllModules, NoPreloading} from '@angular/router';

// Component
import { ContactsListComponent } from './contacts-list/contacts-list.component';
import { LoginComponent } from './login/login.component';
import { LogOutComponent } from './log-out/log-out.component';
import { NotFoundComponent } from './not-found/not-found.component';
// Guard
import { AuthGuard } from './auth/auth.guard';

const appRoutes: Routes = [
  {
    path: 'contacts',
    component: ContactsListComponent,
    data: {title: 'Contacts'},
    canActivate: [AuthGuard]
  },
  {
    path: 'contact-detail',
    canActivate: [AuthGuard],
    loadChildren: './contact-detail/contact-detail.module#ContactDetailModule'
    // en angular 9.
    // loadChildren: () => import('./contact-detail/contact-detail.module').then(m => m.ContactDetailModule),
  },
  {
    path: 'login',
    component: LoginComponent,
    data: {title: 'Login'}
  },
  // le ponemos el outlet con el nombre del name de routeroutlet
  {
    path: 'logout',
    component: LogOutComponent,
    outlet: 'popup',
    canActivate: [AuthGuard]
  },
  {
    path: 'not-found',
    component: NotFoundComponent,
    data: {title: 'Not Found - 404'}
  },
  {
    path: '',
    redirectTo: '/contacts',
    pathMatch: 'full'
  },
  // Para cualquier otra cosa ** que carge NotFoundComponent. <siempre tiene que ir al final>
  {
    path: '**',
    redirectTo: 'not-found',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [
    // enableTracing te muestra por consola todo el trasado de las routas
    // preloadingStrategy:PreloadAllModules te va cargado los modulos lasyLoad por background. para cuando tenga que navegar
    // no tenga que esperar q el modulo se carge.
    // NoPreloading: no hace previo cargado de los modules. Es el default.
    RouterModule.forRoot(appRoutes, { enableTracing: false, preloadingStrategy: PreloadAllModules }),
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
