import { Directive, ElementRef, Input, OnInit, HostBinding } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';

@Directive({
  selector: '[zErrorFeedBack]'
})

export class ZErrorFeedbackDirective implements OnInit {

  @Input() control: FormControl = new FormControl();
  private statusChangesSubscription: Subscription;
  @HostBinding('class.has-danger') controlWithError = false;
  @HostBinding('class.has-success') controlWithSuccess = false;

  constructor(private el: ElementRef) {
  }

  ngOnInit(): void {
    this.statusChangesSubscription =
    this.control
      .statusChanges
      .subscribe(() => {
        this.controlWithError = (this.control.invalid && this.control.dirty);
      });
  }
}
