import { Injectable } from '@angular/core';
import { StepperSelectionEvent } from '@angular/cdk/stepper';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StepperGroupService {

  private stepActiveGroup = new Subject<boolean>();
  public stepActiveGroup$ = this.stepActiveGroup.asObservable();
  public stepGroupPeople = 'step-people-by-group';
  constructor() { }

  public onChangedStep(event: StepperSelectionEvent) {
    if (event.selectedStep.label === this.stepGroupPeople) {
      this.stepActiveGroup.next(event.selectedStep.interacted);
    }
  }

}
