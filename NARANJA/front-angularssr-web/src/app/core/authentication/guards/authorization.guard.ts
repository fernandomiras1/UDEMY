import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable, EMPTY } from 'rxjs';
import { catchError, map, first, tap, concatMap, filter } from 'rxjs/operators';
import { AuthenticationService } from '../services/authentication.service';
import * as _ from 'lodash';

export class AuthorizationGuard implements CanActivate {
  constructor(
    private allowedRoles: string[],
    private authService: AuthenticationService,
    private router: Router,
    ) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Observable<boolean> | Promise<boolean> | boolean  {
    return this.authService.isAuthenticated$.pipe(
      first(),
      concatMap((isAuthenticated) => {
        if (isAuthenticated) {
          return this.authService.userProfile$.pipe(
            filter(user => user !== null),
            map((user: any) => {
              if (!user || !user.roles) {
                return false;
              }
              return (_.intersection(this.allowedRoles, user.roles)).length > 0;
            }),
            tap((allowed) => {
              if (!allowed) {
                this.router.navigateByUrl('/');
                return EMPTY;
              }
            }),
            catchError(() => EMPTY),
          );
        }
        return EMPTY;
      }),
    );
  }
}
