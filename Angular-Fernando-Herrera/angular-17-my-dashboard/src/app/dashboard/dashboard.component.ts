import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SidemenuComponent } from '@shared/sidemenu/sidemenu.component';

@Component({
  standalone: true,
  imports: [RouterModule, SidemenuComponent],
  templateUrl: './dashboard.component.html',
  styles: ``,
})

/**
 * Default:
 *
 * Nos permite poder exportarlo de esta forma si poner el compoente por defecto
 * loadComponent: () => import('./dashboard/dashboard.component'),
 */
export default class DashboardComponent {}
