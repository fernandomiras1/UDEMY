import { Injectable, Injector } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpHeaderResponse, HttpProgressEvent, HttpErrorResponse, HttpResponse, HttpClient, HttpSentEvent, HttpUserEvent } from '@angular/common/http';
import { Observable, BehaviorSubject, throwError } from 'rxjs';
import {take, filter, catchError, switchMap, finalize, tap } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';
import { ProgressBarService } from '../application/progress-bar.service';
import { MatSnackBar } from '@angular/material';
// Articulo de Referencia: http://ericsmasal.com/2018/07/02/angular-6-with-jwt-and-refresh-tokens-and-a-little-rxjs-6/
@Injectable()
export class CustomHttpInterceptor implements HttpInterceptor {

   constructor(
    private injector: Injector,
    private _http: HttpClient,
    public snackBar: MatSnackBar,
    private progressBarService: ProgressBarService
  ) {}
  authService = this.injector.get(AuthService);
  isRefreshingToken: Boolean = false;
  tokenSubject: BehaviorSubject<string> = new BehaviorSubject<string>(null);

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpSentEvent | HttpHeaderResponse | HttpProgressEvent | HttpResponse<any> | HttpUserEvent<any> | any> {
    this.progressBarService.increase();
    return next.handle(this.addTokenToRequest(request, this.authService.getTokenData('accessToken')))
      .pipe(
        tap(event => {
          if (event instanceof HttpResponse) {
            this.progressBarService.decrease();
          }
        }),
        catchError(err => {
          this.progressBarService.decrease();
          if (err instanceof HttpErrorResponse) {
            switch ((<HttpErrorResponse>err).status) {
              case 401:
                return this.handle401Error(request, next);
              case 400:
                 return <any>this.handle400Error(err);
              case 500:
                 return <any>this.handle500Error(err);
            }
            const applicationError = err.headers.get('Application-Error');
            if (applicationError) {
                console.error(applicationError);
                return throwError(applicationError);
            }
            const serverError = err.error;
            let modalStateErrors = '';
            if (serverError && typeof serverError === 'object') {
                for (const key in serverError) {
                    if (serverError[key]) {
                        modalStateErrors += serverError[key] + '\n';
                    }
                }
            }
            return throwError(modalStateErrors || serverError || 'Server Error');
          } else {
            return throwError(err);
          }
        }), finalize(() => {
          this.progressBarService.decrease();
        }));
  }

  private addTokenToRequest(request: HttpRequest<any>, token: string): HttpRequest<any> {
    return request.clone({ setHeaders: { Authorization: `Bearer ${token}`}});
  }

  handle400Error (error) {
    this.snackBar.open(error.error, 'Aceptar', {
      duration: 7000
    });
     return throwError(error.statusText);
  }

  handle500Error (error) {
    this.snackBar.open('Se ha producido un error en la aplicación', 'Aceptar', {
      duration: 7000
    });
    return throwError(error.statusText);
  }

  handle401Error(request: HttpRequest<any>, next: HttpHandler) {
    if (!this.isRefreshingToken) {
     this.isRefreshingToken = true;
     this.tokenSubject.next(null);
     return this.authService.refreshToken()
     .pipe(
       switchMap((auth: any) => {
         if (auth) {
           this.tokenSubject.next(auth.access_token);
           console.clear();
           return next.handle(this.addTokenToRequest(request, auth.access_token));
         }

         return <any>this.authService.logoutUser();
       }),
       catchError(err => {
         return <any>this.authService.logoutUser();
       }),
       finalize(() => {
         this.isRefreshingToken = false;
       })
     );
 } else {
   this.isRefreshingToken = false;

   return this.tokenSubject
     .pipe(filter(token => token != null),
       take(1),
       switchMap(token => {
       return next.handle(this.addTokenToRequest(request, token));
     }));
 }

}


}
