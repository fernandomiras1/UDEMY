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

  // Para manejar routas con lasyLoad. Para que cuando no tenga permisos para navegar a esa ruta.
  // Que no descage los modulos.
  // canLoad(route: Route, segments: UrlSegment[]): boolean {
  //   const url = segments.map(item => item.path).join('/');
  //   return this.checkLogin(url);
  // }

  checkLogin(url: string) {
    if (this.authService.user != null) {
      return true;
    }
    this.authService.redirectUrl = url;
    this.router.navigate(['/login']);
    return false;
  }
}
