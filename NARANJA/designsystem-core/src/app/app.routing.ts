import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'home', loadChildren: './pages/home/home.module#HomePageModule' },
  { path: 'publish', loadChildren: './pages/publish/publish.module#PublishPageModule' },
  { path: 'angular', loadChildren: './pages/angular/angular.module#AngularPageModule' },
  { path: 'styleguide', loadChildren: './pages/styleguide/styleguide.module#StyleguideModule' },
  { path: 'feedback', loadChildren: './pages/feedback/feedback.module#FeedbackModule'  },
  { path: 'kitchen-sink', loadChildren: './pages/kitchen-sink/kitchen-sink.module#KitchenSinkModule'  },
  { path: '', pathMatch: 'full', redirectTo: '/home' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      useHash: false,
      enableTracing: false
    })
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
