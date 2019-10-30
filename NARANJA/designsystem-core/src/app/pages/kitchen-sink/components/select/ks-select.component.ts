import { Component } from '@angular/core';

@Component({
  selector: 'dsn-ksselect',
  templateUrl: './ks-select.component.html',
  styleUrls: ['./ks-select.component.scss']
})
export class KsSelectComponent {
  hintText = 'Hint';

  items = [
    { id: 1, text: 'Item 01', disabled: false },
    { id: 2, text: 'Item 02', disabled: false },
    { id: 3, text: 'Item 03', disabled: false },
    { id: 4, text: 'Item 04', disabled: false },
    { id: 5, text: 'Item 05 - Disabled', disabled: true }
  ];

}
