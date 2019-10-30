import { async, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { PLATFORM_ID } from '@angular/core';
import { WindowService } from '../window/window.service';
import { NavigatorService } from './navigator.service';

describe('NavigatorService', () => {
  let service: NavigatorService;
  let windowService: WindowService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        WindowService,
        { provide: PLATFORM_ID, useValue: 'browser' }]
    });

    service = TestBed.get(NavigatorService);
    windowService = TestBed.get(WindowService);
  }));

  it('should retrieve false', () => {
    expect(service.isMobile).toBeFalsy();
  });

  it('should retrieve true', () => {
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
