import { TestBed } from '@angular/core/testing';

import { SigosLogService } from './sigos-log.service';

describe('SigosLogService', () => {
  let service: SigosLogService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SigosLogService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
