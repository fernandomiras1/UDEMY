/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { StepperGroupService } from './stepper-group.service';

describe('Service: StepperGroup', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StepperGroupService]
    });
  });

  it('should ...', inject([StepperGroupService], (service: StepperGroupService) => {
    expect(service).toBeTruthy();
  }));
});
