
import { ZErrorFeedbackDirective } from './error-feedback.directive';
import { FormControl, Validators } from '@angular/forms';
import { ElementRef } from '@angular/core';
import { CustomValidators } from '../../forms/custom-validators/custom-validators';

describe('Directive: ErrorFeedbackDirective', () => {

  const control = new FormControl('123', Validators.compose([Validators.required, CustomValidators.number]));
  const nativeElement = new ElementRef(control);
  const directive = new ZErrorFeedbackDirective(nativeElement);

  it('should directive valid', () => {
    control.setValue('as');
    directive.control.statusChanges.subscribe(() => {
      expect(this.control.invalid && this.control.dirty).toEqual(true);
    });
  });

  it('should directive.controlWithError true', () => {
    const directive2 = new ZErrorFeedbackDirective(
      new ElementRef(new FormControl('')));
    directive2.ngOnInit();
    directive2.control.setValidators(Validators.compose([Validators.required, CustomValidators.number]));
    directive2.control.setValue('123');
    directive2.ngOnInit();
    directive2.control.setValue('abc');
    directive2.control.statusChanges.subscribe(() => {
      expect(directive2.controlWithError).toEqual(true);
    });
  });

  it('probando clase del input', () => {
    const template = '<input zErrorFeedBack [control]="control" formControlName="input" [type]="text">';
    directive.control = new FormControl('123', Validators.compose([Validators.required, CustomValidators.number]));
    directive.ngOnInit();
    directive.control.setValue('abc');
    directive.control.statusChanges.subscribe((change) => {
      if (change) {
        expect(this.nativeElement.nativeElement.classList).toEqual('has-danger');
      }
    });
  });

  it('should directive calss input', () => {
    control.setValue('as');
    directive.control.statusChanges.subscribe(() => {
      expect(this.nativeElement.nativeElement.classList).toEqual('has-danger');
    });
  });
});
