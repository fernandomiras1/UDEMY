import { AppState } from './../../../root-store/root-store.reducer';
import { Injectable } from '@angular/core';
import auth0SpaJs from '@auth0/auth0-spa-js';
import Auth0Client from '@auth0/auth0-spa-js/dist/typings/Auth0Client';
import { from, of, Observable, BehaviorSubject, combineLatest, throwError } from 'rxjs';
import { tap, catchError, concatMap, shareReplay, map } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';
import { Store } from '@ngrx/store';
import { Logout, LoginFailure, LoginSuccess } from '../store/auth.actions';
import { AuthenticationUtilsService } from './authentication-utils.service';
import { Router } from '@angular/router';

@Injectable()
export class AuthenticationService {
  // Create an observable of Auth0 instance of client
  auth0Client$ = (from(
    auth0SpaJs({
      domain: environment.auth0.domain,
      client_id: environment.auth0.clientID,
      redirect_uri: `${window.location.origin}${environment.auth0.urlRedirectAfterLogin}`,
      audience: environment.auth0.audience,
      scope: environment.auth0.scope,
      // prompt: 'none',
      // responseType: 'token id_token',
    }),
  ) as Observable<Auth0Client>).pipe(
    shareReplay(1), // Every subscription receives the same shared value
    catchError(err => throwError(err)),
  );

  // Define observables for SDK methods that return promises by default
  // For each Auth0 SDK method, first ensure the client instance is ready
  // concatMap: Using the client instance, call SDK method; SDK returns a promise
  // from: Convert that resulting promise into an observable
  isAuthenticated$ = this.auth0Client$.pipe(
    concatMap((client: Auth0Client) => from(client.isAuthenticated())),
    tap(res => this.loggedInSubject$.next(res)),
  );

  handleRedirectCallback$ = this.auth0Client$.pipe(
    concatMap((client: Auth0Client) => from(client.handleRedirectCallback())),
  );

  // Create subject and public observable of user profile data
  private userProfileSubject$ = new BehaviorSubject<any>(null);
  userProfile$ = this.userProfileSubject$.asObservable();
  // Create subject and public observable to loginIn
  private loggedInSubject$ = new BehaviorSubject<any>(null);
  isLoggedIn$ = this.loggedInSubject$.asObservable();
  // Create subject and public observable in progress
  private loginInProgressSubject$ = new BehaviorSubject<any>(null);
  loginInProgress$ = this.loginInProgressSubject$.asObservable();
  // Path to redirect to after login processed
  targetRoute: string;

  constructor(
    private store: Store<AppState>,
    private _authUtils: AuthenticationUtilsService,
    private router: Router,
  ) {
    // On initial load, check authentication state with authorization server
    // Set up local auth streams if user is already authenticated
    this.localAuthSetup();
    // Handle redirect from Auth0 login
    this.handleAuthCallback();
  }

  // When calling, options can be passed if desired
  // https://auth0.github.io/auth0-spa-js/classes/auth0client.html#getuser
  // tslint:disable-next-line:function-name
  getUser$(options?): Observable<any> {
    return this.auth0Client$.pipe(
      concatMap((client: Auth0Client) => combineLatest(from(client.getUser(options)), from(client.getTokenSilently(options)))),
      map(([user, token]) => ({ ...user, ...this._authUtils.parseToken(token) })),
      tap(data => this.userProfileSubject$.next(data)),
    );
  }

  private localAuthSetup() {
    this.loginInProgressSubject$.next(true);
    const checkAuth$ = this.isAuthenticated$.pipe(
      concatMap((loggedIn: boolean) => {
        if (loggedIn) {
          // If authenticated, get user and set in app
          // NOTE: you could pass options here if needed
          return this.getUser$().pipe(
            tap(user =>  this.store.dispatch(new LoginSuccess(user))),
          );
        }
        // If not authenticated, return stream that emits 'false'
        return of(loggedIn);
      }),
      tap(() => {
        this.loginInProgressSubject$.next(false);
      }),
    );
    checkAuth$.subscribe();
  }

  login(redirectPath: string = '/') {
    // A desired redirect path can be passed to login method
    // (e.g., from a route guard)
    // Ensure Auth0 client instance exists
    this.auth0Client$.subscribe((client: Auth0Client) => {
      // Call method to log in
      client.loginWithRedirect({
        redirect_uri: `${window.location.origin}${environment.auth0.urlRedirectAfterLogin}`,
        appState: { target: redirectPath },
      });
    });
  }

  private handleAuthCallback() {
    // Call when app reloads after user logs in with Auth0
    const params = window.location.search;
    if (params.includes('code=') && params.includes('state=')) {
      const authComplete$ = this.handleRedirectCallback$.pipe(
        // Have client, now call method to handle auth callback redirect
        // Get and set target redirect route from callback results
        tap(cbRes => this.targetRoute = cbRes.appState && cbRes.appState.target ? cbRes.appState.target : '/'),
        concatMap(() =>  combineLatest(
          this.getUser$(),
          this.isAuthenticated$,
        )),
      );
      // Subscribe to authentication completion observable
      authComplete$.subscribe(([user, loggedIn]) => {
        if (loggedIn) {
          this.router.navigate([this.targetRoute]);
          this.store.dispatch(new LoginSuccess(user));
        } else {
          this.router.navigate([environment.auth0.urlRedirectUnauthorized]);
          this.store.dispatch(new LoginFailure('unauthorized'));
          setTimeout(() => {
            this.store.dispatch(new Logout());
          },         2000);
        }
      });
    }
  }

  logout() {
    // Ensure Auth0 client instance exists
    this.auth0Client$.subscribe((client: Auth0Client) => {
      client.logout({
        client_id: environment.auth0.clientID,
        returnTo: `${window.location.origin}${environment.auth0.urlRedirectAfterLogout}`,
      });
    });
  }

  /**
   * Return an Observable of token
   * @returns Observable
   */
  // tslint:disable-next-line:function-name
  public getToken$() {
    return this.auth0Client$.pipe(
      concatMap((client: Auth0Client) => from(client.getTokenSilently())),
    );
  }
}
