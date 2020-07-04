import { async, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { PLATFORM_ID } from '@angular/core';
import { WindowService } from './window.service';
import { NavigatorService } from './navigator.service';
import { REQUEST } from '@nguniversal/express-engine/tokens';

describe('NavigatorService in browser', () => {
  let service: NavigatorService;
  let windowService: WindowService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
      ],
      providers: [
        WindowService,
        { provide: PLATFORM_ID, useValue: 'browser' }],
    });

    service = TestBed.get(NavigatorService);
    windowService = TestBed.get(WindowService);
  }));

  it('should is mobile false', () => {
    expect(service.isMobile).toBeFalsy();
  });

  it('should is mobile true', () => {
    const originalUserAgent = navigator.userAgent;
    windowService.nativeWindow.navigator['__defineGetter__']('userAgent', () => {
      return 'Mobile Safari';
    });

    expect(service.isMobile).toBeTruthy();

    windowService.nativeWindow.navigator['__defineGetter__']('userAgent', () => {
      return originalUserAgent;
    });
  });
});

class MockRequest {
  headers = {
    'user-agent': 'fake',
  };
}

describe('NavigatorService in server', () => {
  let service: NavigatorService;
  let windowService: WindowService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
      ],
      providers: [
        WindowService,
        { provide: PLATFORM_ID, useValue: 'server' },
        { provide: REQUEST, useClass: MockRequest }],
    });

    service = TestBed.get(NavigatorService);
    windowService = TestBed.get(WindowService);
  }));

  it('should is mobile false', () => {
    expect(service.isMobile).toBeFalsy();
  });

  it('should is server true', () => {
    expect(service.isServer).toBeTruthy();
  });

  it('should is crawler in server', () => {
    expect(service.isGoogleBot).toBeFalsy();
  });
});
