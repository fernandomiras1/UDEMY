import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor (private authService: AuthService, private router: Router) {}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    // le pasamos la url que esta en este momento.
    // Sirve para redireccional al usuario cuando se logee  de nuevo a la ultima ruta que estuvo
    return this.checkLogin(state.url);
  }

  checkLogin(url: string) {
    if (this.authService.user != null) {
      return true;
    }
    this.authService.redirectUrl = url;
    this.router.navigate(['/login']);
    return false;
  }
}
