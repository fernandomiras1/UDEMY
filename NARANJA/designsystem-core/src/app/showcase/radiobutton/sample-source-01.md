```html
<!-- caso: Con ngModel-->
<z-radiobuttons [(ngModel)]="listRadioButtons">
</z-radiobuttons>

<!-- caso: Con Form-->
<div [formGroup]="form">
  <z-radiobuttons formControlName="radiobutton">
  </z-radiobuttons>
</div>

<!-- caso: con Input -->
<z-radiobuttons [listRadioButtons]="listRadioButtons">
</z-radiobuttons>

```
```typescript
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'dsn-radiobutton',
  templateUrl: './radiobutton.component.html',
  styleUrls: ['./radiobutton.component.scss']
})
export class RadiobuttonComponent implements OnInit {
  public form: FormGroup;
    public listRadioButtons: any[] = [{ id: 1, disabled: false, selected: false, text: '$50' },
      { id: 1, disabled: false, selected: true, text: '$500' },
      { id: 1, disabled: false, selected: false, text: '$1.000' },
      { id: 3, disabled: true, selected: false, text: '$10.000' }];
  
  ngOnInit() {
     this.createForm();
  }
  
  createForm(): void {
    this.form = new FormGroup({
      radiobutton: new FormControl(this.listRadioButtons)
    });
  }

}
```
