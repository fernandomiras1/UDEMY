/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { CruisingSalaryService } from './cruising-salary.service';

describe('Service: CruisingSalary', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CruisingSalaryService]
    });
  });

  it('should ...', inject([CruisingSalaryService], (service: CruisingSalaryService) => {
    expect(service).toBeTruthy();
  }));
});
