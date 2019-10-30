import { async, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { PLATFORM_ID } from '@angular/core';
import { WindowService } from './window.service';

describe('WindowService in browser', () => {
  let service: WindowService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [WindowService, { provide: PLATFORM_ID, useValue: 'browser' },
        { provide: PLATFORM_ID, useValue: '' }]
    });

    service = TestBed.get(WindowService);
  }));

  it('should get nativeDocument when is not browser', () => {
    const window = service.nativeWindow;

    expect(window).toBeTruthy();
  });
});
describe('WindowService', () => {
  let service: WindowService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [WindowService, { provide: PLATFORM_ID, useValue: 'wip' },
                                       { provide: PLATFORM_ID, useValue: '' }]
    });

    service = TestBed.get(WindowService);
  }));

  it('should get nativeDocument when is not browser', () => {
    const window = service.nativeWindow;

    expect(window).toBeTruthy();
  });
});
