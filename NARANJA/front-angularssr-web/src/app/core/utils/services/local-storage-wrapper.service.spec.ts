import { async, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { PLATFORM_ID } from '@angular/core';
import { LocalStorageWrapper } from './local-storage-wrapper.service';

describe('LocalStorageWrapper', () => {
  let service: LocalStorageWrapper;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
      ],
      providers: [LocalStorageWrapper, { provide: PLATFORM_ID, useValue: 'browser' },
        { provide: PLATFORM_ID, useValue: '' }],
    });

    service = TestBed.get(LocalStorageWrapper);
  }));

  it('should get localStorage when is not browser', () => {
    const localStrg = service.localStorage;
    expect(localStrg).toBeTruthy();
  });

  it('should get localStorage and call method clear when is not browser', () => {
    const localStrg = service.localStorage;
    expect(localStrg.clear()).toBeUndefined();
  });

  it('should get localStorage and call method getItem when is not browser', () => {
    const localStrg = service.localStorage;
    expect(localStrg.getItem('value')).toBeUndefined();
  });

  it('should get localStorage and call method key when is not browser', () => {
    const localStrg = service.localStorage;
    expect(localStrg.key(1)).toBeUndefined();
  });

  it('should get localStorage and call method removeItem when is not browser', () => {
    const localStrg = service.localStorage;
    expect(localStrg.removeItem('value')).toBeUndefined();
  });

  it('should get localStorage and call method setItem when is not browser', () => {
    const localStrg = service.localStorage;
    expect(localStrg.getItem('value')).toBeUndefined();
  });
});
