import { TestBed, inject } from '@angular/core/testing';

import { PmsService } from './pms.service';

describe('PmsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PmsService]
    });
  });

  it('should be created', inject([PmsService], (service: PmsService) => {
    expect(service).toBeTruthy();
  }));
});
