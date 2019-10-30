import { Component } from '@angular/core';

@Component({
  selector: 'dsn-ksradiobutton',
  templateUrl: './ks-radiobutton.component.html',
  styleUrls: ['./ks-radiobutton.component.scss']
})
export class KsRadiobuttonComponent {
  public text = 'Checkbox title';

  public listRadioButtons: any[] = [
    { id: 1, disabled: false, selected: false, text: 'Radiobutton 1' },
    { id: 1, disabled: false, selected: true, text: 'Radiobutton 2' },
    { id: 1, disabled: true, selected: false, text: 'Radiobutton 3 - Disabled' }
  ];

}
