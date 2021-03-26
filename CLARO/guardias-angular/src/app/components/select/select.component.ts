import { Component, EventEmitter, Input, Output } from '@angular/core';

interface OptionSelect {
  value: string;
  name: string;
}

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss']
})

export class SelectComponent {
  @Input() valueSelected: string;
  @Input() options: OptionSelect[];
  @Output() onChangedValue: EventEmitter<string> = new EventEmitter();

  constructor() { }

}
