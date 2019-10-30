import { Component, Input } from '@angular/core';

@Component({
  selector: 'z-control-message',
  templateUrl: 'control-message.component.html'
})

export class ControlMessageComponent {
  @Input() error: string;
  show = false;

  showsErrorIncludedIn(errors: string[]): boolean {
    return errors.some(error => error === this.error);
  }
}
