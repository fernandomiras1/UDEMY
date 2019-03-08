/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { NoveltiesService } from './novelties.service';

describe('Service: Novelties', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NoveltiesService]
    });
  });

  it('should ...', inject([NoveltiesService], (service: NoveltiesService) => {
    expect(service).toBeTruthy();
  }));
});
