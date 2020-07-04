import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HttpInterceptor } from '@angular/common/http';

import { HttpService } from './http.service';
import { ErrorInterceptor } from './error.interceptor';
import { AuthenticationInterceptor } from '../authentication/interceptors/authentication.interceptor';
import { TimingInterceptor } from './timing.interceptor';
import { AuthenticationService } from '../authentication/services/authentication.service';
import { of } from 'rxjs';

describe('HttpService', () => {
  let http: HttpClient;
  let httpMock: HttpTestingController;
  const authServiceStub = {
    getToken$: () => of('-something-'),
    isAuthenticated$: of(true),
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
      ],
      providers: [
        ErrorInterceptor,
        AuthenticationInterceptor,
        { provide: AuthenticationService, useValue: authServiceStub },
        TimingInterceptor,
        {
          provide: HttpClient,
          useClass: HttpService,
        },
      ],
    });
  });

  beforeEach(inject(
    [HttpClient, HttpTestingController],
    (_http: HttpClient, _httpMock: HttpTestingController) => {
      http = _http;
      httpMock = _httpMock;
    },
  ));

  afterEach(() => {
    httpMock.verify();
  });

  it('should skip error handler', () => {
    // Arrange
    let interceptors: HttpInterceptor[];
    const realRequest = http.request;
    spyOn(HttpService.prototype, 'request').and.callFake(function (this: any) {
      interceptors = this.interceptors;
      return realRequest.apply(this, arguments);
    });

    // Act
    const request = http.skipErrorHandler().get('/api/something');

    // Assert
    request.subscribe(() => {
      expect(interceptors.some(i => i instanceof ErrorInterceptor)).toBeFalsy();
    });
    httpMock.expectOne({}).flush({});
  });
});
