import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { AuthGuard } from './guards/auth.guard';
import { IndexComponent } from './components/novelties/index/index.component';
import { CruisingSalaryIndexComponent } from './components/cruisingSalary/cruising-salary-index/cruising-salary-index.component';
import { LiquidateIndexComponent } from './components/liquidate/liquidate-index/liquidate-index.component';

export const appRoutes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: '',
    runGuardsAndResolvers: 'always',
    canActivate: [AuthGuard],
    children: [
      { path: 'home', component: HomeComponent },
      { path: 'novelties', component: IndexComponent },
      { path: 'cruising-salary', component: CruisingSalaryIndexComponent },
      { path: 'liquidate', component: LiquidateIndexComponent },
      { path: '**', redirectTo: 'home', pathMatch: 'full' }
    ]
  },
 { path: '**', redirectTo: 'login', pathMatch: 'full' }
];
