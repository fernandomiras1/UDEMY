import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'dsn-kscheckbox',
  templateUrl: './ks-checkbox.component.html',
  styleUrls: ['./ks-checkbox.component.scss']
})
export class KsCheckboxComponent implements OnInit {

  public form: FormGroup;

  public listCheckboxsWithChildrens = [{
    id: 1, disabled: false, selected: false, indeterminate: false, text: 'Check all',
    listCheckboxs: [
          { id: 1, disabled: false, selected: false, indeterminate: false, text: 'Checkbox 01' },
          { id: 1, disabled: false, selected: false, indeterminate: false, text: 'Checkbox 02' },
          { id: 1, disabled: false, selected: false, indeterminate: false, text: 'Checkbox 03' },
          { id: 1, disabled: false, selected: false, indeterminate: false, text: 'Checkbox 04' }
    ]
  }];

  public listCheckboxsEnabled = [
    { id: 1, disabled: false, selected: false, indeterminate: false, text: 'Condition 01' },
    { id: 1, disabled: true, selected: false, indeterminate: false, text: 'Condition 02 - Disabled' }
  ];

  ngOnInit() {
    this.createForm();
  }

  createForm(): void {
    this.form = new FormGroup({
      checkboxs: new FormControl(this.listCheckboxsWithChildrens)
    });
  }

}
