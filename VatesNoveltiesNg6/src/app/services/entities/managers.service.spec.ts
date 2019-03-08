/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ManagersService } from './managers.service';

describe('Service: Managers', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ManagersService]
    });
  });

  it('should ...', inject([ManagersService], (service: ManagersService) => {
    expect(service).toBeTruthy();
  }));
});
