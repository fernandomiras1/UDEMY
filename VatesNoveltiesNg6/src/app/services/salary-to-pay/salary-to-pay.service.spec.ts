/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { SalaryToPayService } from './salary-to-pay.service';

describe('Service: SalaryToPay', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SalaryToPayService]
    });
  });

  it('should ...', inject([SalaryToPayService], (service: SalaryToPayService) => {
    expect(service).toBeTruthy();
  }));
});
