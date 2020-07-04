import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { map, tap } from 'rxjs/operators';
import { AuthenticationService } from '../services/authentication.service';
import * as fromAuth from './auth.actions';
import { AuthenticationUtilsService } from '../services/authentication-utils.service';

@Injectable({
  providedIn: 'root',
})
export class AuthEffects {

  constructor(
    private actions$: Actions,
    private _authService: AuthenticationService,
    private _authUtils: AuthenticationUtilsService,
  ) {}

  @Effect({ dispatch: false })
  login$ = this.actions$
    .pipe(ofType<fromAuth.Login>(fromAuth.AuthActionTypes.Login))
    .pipe(
      map(data => data.payload),
      tap(url => this._authService.login(url)),
    );

  @Effect({ dispatch: false })
    logout$ = this.actions$
      .pipe(ofType<fromAuth.Logout>(fromAuth.AuthActionTypes.Logout))
      .pipe(tap(() => this._authService.logout()));

  @Effect({ dispatch: false })
    afterLoginSuccess$ = this.actions$
      .pipe(ofType<fromAuth.LoginSuccess>(fromAuth.AuthActionTypes.LoginSuccess))
      .pipe(
        map(action => action.payload),
        tap((data: any) => {
          this._authUtils.pushSignInEvent(data);
          this._authUtils.pushAuthEvent(data);
        }),
      );
}
