import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent {

  @Input() routerLink: string;
  @Input() text: string;
  @Input() icon: string;
  @Input() iconRight = false;
  @Input() iconLeft = false;
  @Input() disabled = false;

  @Output() clicked: EventEmitter<number> = new EventEmitter();
  constructor() { }

  onClick(): void {
    this.clicked.emit();
  }

}
