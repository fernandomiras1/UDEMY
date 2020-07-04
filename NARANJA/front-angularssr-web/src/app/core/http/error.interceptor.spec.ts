import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';

import { ErrorInterceptor } from './error.interceptor';

describe('ErrorInterceptor', () => {
  let errorHandlerInterceptor: ErrorInterceptor;
  let http: HttpClient;
  let httpMock: HttpTestingController;

  function createInterceptor() {
    errorHandlerInterceptor = new ErrorInterceptor();
    return errorHandlerInterceptor;
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [{
        provide: HTTP_INTERCEPTORS,
        useFactory: createInterceptor,
        multi: true,
      }],
    });
  });

  beforeEach(inject([HttpClient, HttpTestingController], (_http: HttpClient, _httpMock: HttpTestingController) => {
    http = _http;
    httpMock = _httpMock;
  }));

  afterEach(() => {
    httpMock.verify();
  });

  it('should catch error and call error handler', () => {
    // Arrange
    // Note: here we spy on private method since target is customization here,
    // but you should replace it by actual behavior in your app
    spyOn(ErrorInterceptor.prototype as any, 'customErrorHandler').and.callThrough();

    // Act
    http.get('/toto').subscribe(() => fail('should error'), (error) => {
      // Assert
      expect(error).toBeTruthy();
      expect(ErrorInterceptor.prototype['customErrorHandler']).toHaveBeenCalled();
    });

    httpMock.expectOne({}).flush(null, {
      status: 404,
      statusText: 'error',
    });
  });
});
