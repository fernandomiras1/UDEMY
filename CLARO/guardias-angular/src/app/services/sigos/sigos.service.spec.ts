import { TestBed } from '@angular/core/testing';

import { SigosService } from './sigos.service';

describe('SigosService', () => {
  let service: SigosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SigosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
