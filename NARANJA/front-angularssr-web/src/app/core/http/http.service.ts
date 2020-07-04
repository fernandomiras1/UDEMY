import { HttpHandler, HttpInterceptor, HttpRequest, HttpEvent, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { InjectionToken, Injectable, Injector, Optional, Inject } from '@angular/core';
import { ErrorInterceptor } from './error.interceptor';
import { AuthenticationInterceptor } from '../authentication/interceptors/authentication.interceptor';
import { TimingInterceptor } from './timing.interceptor';

// (see https://github.com/Microsoft/TypeScript/issues/13897)
declare module '@angular/common/http/src/client' {
    export interface HttpClient {
      /**
       * Skips default error handler for this request.
       * @return  The new instance.
       */
      skipErrorHandler(): HttpClient;

      skipUniversalInterceptor(): HttpClient;
    }
}

// From @angular/common/http/src/interceptor: allows to chain interceptors
class HttpInterceptorHandler implements HttpHandler {

  constructor(private next: HttpHandler, private interceptor: HttpInterceptor) { }

  handle(request: HttpRequest<any>): Observable<HttpEvent<any>> {
    return this.interceptor.intercept(request, this.next);
  }

}

/**
 * Allows to override default dynamic interceptors that can be disabled with the HttpService extension.
 * Except for very specific needs, you should better configure these interceptors directly in the constructor below
 * for better readability.
 *
 * For static interceptors that should always be enabled (like ApiPrefixInterceptor), use the standard
 * HTTP_INTERCEPTORS token.
 */
export const HTTP_DYNAMIC_INTERCEPTORS = new InjectionToken<HttpInterceptor>('HTTP_DYNAMIC_INTERCEPTORS');

/**
 * Extends HttpClient with per request configuration using dynamic interceptors.
 */
@Injectable()
export class HttpService extends HttpClient {

  constructor(
    private httpHandler: HttpHandler,
    private injector: Injector,
    @Optional() @Inject(HTTP_DYNAMIC_INTERCEPTORS) private interceptors: HttpInterceptor[] = [],
  ) {
    super(httpHandler);

    if (!this.interceptors) {
      this.interceptors = [
        this.injector.get(TimingInterceptor),
        this.injector.get(ErrorInterceptor),
        this.injector.get(AuthenticationInterceptor),
      ];
    }
  }

  skipErrorHandler(): HttpClient {
    return this.removeInterceptor(ErrorInterceptor);
  }

  // Override the original method to wire interceptors when triggering the request.
  request(method?: any, url?: any, options?: any): any {
    const handler = this.interceptors.reduceRight(
            (next, interceptor) => new HttpInterceptorHandler(next, interceptor),
            this.httpHandler,
        );
    return new HttpClient(handler).request(method, url, options);
  }

  private removeInterceptor(interceptorType: Function): HttpService {
    return new HttpService(
      this.httpHandler,
      this.injector,
      this.interceptors.filter(i => !(i instanceof interceptorType)),
    );
  }

  private addInterceptor(interceptor: HttpInterceptor): HttpService {
    return new HttpService(this.httpHandler, this.injector, this.interceptors.concat([interceptor]));
  }

}
