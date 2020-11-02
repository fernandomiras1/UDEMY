import { TestBed } from '@angular/core/testing';

import { DataObsService } from './data-obs.service';

describe('DataObsService', () => {
  let service: DataObsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DataObsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
