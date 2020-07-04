import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed, inject } from '@angular/core/testing';
import { AuthenticationInterceptor } from './authentication.interceptor';
import { HttpService } from '../../http/http.service';
import { AuthenticationService } from '../services/authentication.service';
import { of, throwError, EMPTY } from 'rxjs';

describe('Token-interceptor.service', () => {
  let http: HttpClient;
  let httpMock: HttpTestingController;
  const fakeToken = '-fake token-';
  const authServiceStub = {
    getToken$: () => of(fakeToken),
    isAuthenticated$: of(true),
  };

  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      HttpClientModule,
      HttpClientTestingModule,
    ],
    providers: [
      HttpService,
      {
        provide: HTTP_INTERCEPTORS,
        useClass: AuthenticationInterceptor,
        multi: true,
      },
      { provide: AuthenticationService, useValue: authServiceStub },
    ],
  }));

  beforeEach(inject([HttpClient, HttpTestingController], (
    _http: HttpClient,
    _httpMock: HttpTestingController) => {
    http = _http;
    httpMock = _httpMock;
  }));

  afterEach(() => {
    httpMock.verify();
  });

  describe('intercept HTTP requests', () => {
    it('should add token when the user is logged', inject([AuthenticationService], (_authService) => {
      spyOn(_authService, 'getToken$').and.returnValue(of(fakeToken));
      spyOn(_authService, 'isAuthenticated$').and.returnValue(of(true));
      const expectedToken = `Bearer ${fakeToken}`;
      http.get('/api').subscribe(response => expect(response).toBeTruthy());
      const request = httpMock.expectOne((req) => {
        return (req.headers.has('Authorization') && req.headers.get('Authorization') === expectedToken);
      });
      request.flush([]);
      httpMock.verify();
    }));

    it('should not add token if exist an error', inject([AuthenticationService], (_authService) => {
      spyOn(_authService, 'getToken$').and.returnValue(throwError('something'));
      spyOn(_authService, 'isAuthenticated$').and.returnValue(of(false));
      http.get('/anything').subscribe(() => { }, (e) => {
        expect(e).toBe('something');
      });
      httpMock.verify();
    }));
  });
});
