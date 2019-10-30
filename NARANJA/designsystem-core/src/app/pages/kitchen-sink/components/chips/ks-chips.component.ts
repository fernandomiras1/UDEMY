import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'dsn-kschips',
  templateUrl: './ks-chips.component.html',
  styleUrls: ['./ks-chips.component.scss']
})
export class KsChipsComponent implements OnInit {

  public form: FormGroup;
  public listChips: any[] = [
    { id: 1, disabled: false, selected: true, text: 'Chip 01' },
    { id: 2, disabled: false, selected: false, text: 'Chip 02' },
    { id: 3, disabled: false, selected: false, text: 'Chip 03' },
    { id: 4, disabled: true, selected: false, text: 'Chip 04 - Disabled' }
  ];

  ngOnInit() {
    this.createForm();
  }

  createForm(): void {
    this.form = new FormGroup({
      chip: new FormControl(this.listChips)
    });
  }

}
