import { Injectable } from '@angular/core';
import { CanActivate, Router, CanLoad } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { tap, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanLoad {

  constructor( private authService: AuthService,
               private router: Router ) {}

  canActivate(): Observable<boolean>{
    return this.authService.isAuth()
        .pipe(
          tap( estado => {
            if ( !estado ) { this.router.navigate(['/login'])}
          })
        );
  }

  // Tiene que disparar la subciption cuando se carga. ( canLoad con Lazy Load)
  // Por lo cual agregamos el take(1), para cuando entre a la primera vez cancelamos la subriciion
  canLoad(): Observable<boolean>{
    return this.authService.isAuth()
        .pipe(
          tap( estado => {
            if ( !estado ) { this.router.navigate(['/login'])}
          }),
          take(1)
        );
  }

}
